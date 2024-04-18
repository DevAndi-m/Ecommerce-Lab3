const express = require('express');
const router = express.Router();
const Product = require('../models/product.model.schema');

// GET all products
router.get('/', async (req, res) => {
    try {   
        const products = await Product.find({}).lean();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).lean();
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new product
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (update) a product by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };
        const updatedProduct = await Product.findOneAndUpdate(filter, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };

        const product = await Product.findByIdAndDelete(filter);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({ message: `Product with ID ${id} has been deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
