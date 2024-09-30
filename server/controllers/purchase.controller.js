const Product = require('../models/product.model.schema');
const PurchasedProduct = require('../models/purchasedProduct.model.schema');
const User = require('../models/user.model.schema');
const { Pool } = require('pg');  // PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce-website',
    password: 'yourpassword',
    port: 5432,
});

exports.purchaseProducts = async (req, res) => {
    try {
        const userId = req.user.id; 
        const client = await pool.connect();

        // Fetch cart data from PostgreSQL for the logged-in user
        const cartResult = await client.query('SELECT * FROM user_carts WHERE user_id = $1', [userId]);
        const cartItems = cartResult.rows;

        for (const cartItem of cartItems) {
            try {
                const { product_id: productId, quantity } = cartItem;

                const product = await Product.findById(productId);

                if (!product) {
                    console.log(`Product not found: ${productId}`);
                    return res.status(404).json({ message: `Product not found: ${productId}` });
                }

                if (product.productQuantity < quantity) {
                    console.log(`Insufficient stock for ${product.productName}`);
                    return res.status(400).json({ message: `Insufficient stock for ${product.productName}` });
                }

                // Update product stock
                product.productQuantity -= quantity;
                await product.save();

                // Create PurchasedProduct instance
                const purchasedProduct = new PurchasedProduct({
                    product: product._id,
                    buyer: userId, 
                    quantityPurchased: quantity,
                    productDateOfPurchase: Date.now(),
                });

                await purchasedProduct.save();

                // Remove the product from the cart in PostgreSQL
                await client.query('DELETE FROM user_carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);
            } catch (err) {
                console.error('Error processing cart item:', err);
                return res.status(500).json({ message: 'Error processing cart item' });
            }
        }

        client.release();
        res.status(200).json({ message: 'Purchase successful!' });

    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
