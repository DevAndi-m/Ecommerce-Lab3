const Product = require('../models/product.model.schema');
const PurchasedProduct = require('../models/purchasedProduct.model.schema');
const User = require('../models/user.model.schema.js');

exports.purchaseProducts = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { cart } = req.body; 

        for (const cartItem of cart) {
            try {
                const { _id: productId, quantity } = cartItem;
                console.log('Processing Product ID:', productId); 

                const product = await Product.findById(productId);

                if (!product) {
                    console.log(`Product not found: ${productId}`);
                    return res.status(404).json({ message: `Product not found: ${productId}` });
                }

                if (product.productQuantity < quantity) {
                    console.log(`Insufficient stock for ${product.productName}`);
                    return res.status(400).json({ message: `Insufficient stock for ${product.productName}` });
                }

                product.productQuantity -= quantity;
                if (product.productQuantity < 0) {
                    product.productQuantity = 0;
                }
                await product.save();

                const purchasedProduct = new PurchasedProduct({
                    product: product._id,
                    buyer: userId, 
                    quantityPurchased: quantity,
                    productDateOfPurchase: Date.now()
                });

                await purchasedProduct.save();
            } catch (err) {
                console.error('Error processing cart item:', err);
                return res.status(500).json({ message: 'Error processing cart item' });
            }
        }
        res.status(200).json({ message: 'Purchase successful!' });

    } catch (error) {
        console.error('Error processing purchase:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


