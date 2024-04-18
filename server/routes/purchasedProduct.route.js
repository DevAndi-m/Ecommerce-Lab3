const express = require('express');
const router = express.Router();
const PurchasedProduct = require('../models/purchasedProduct.model.schema');

// GET all purchased products
router.get('/', async (req, res) => {
    try {   
        const purchasedProducts = await PurchasedProduct.find({}).lean();
        res.status(200).json(purchasedProducts);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// GET a single purchased product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const purchasedProduct = await PurchasedProduct.findById(id).lean();
        if (!purchasedProduct) {
            return res.status(404).json({ message: "Purchased product not found" });
        }
        res.status(200).json(purchasedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new purchased product
router.post('/', async (req, res) => {
    try {
        const purchasedProduct = await PurchasedProduct.create(req.body);
        res.status(200).json(purchasedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (update) a purchased product by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };
        const updatedPurchasedProduct = await PurchasedProduct.findOneAndUpdate(filter, req.body, { new: true });

        if (!updatedPurchasedProduct) {
            return res.status(404).json({ message: "Purchased product not found!" });
        }

        res.status(200).json(updatedPurchasedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a purchased product by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: id };

        const purchasedProduct = await PurchasedProduct.findByIdAndDelete(filter);
        if (!purchasedProduct) {
            return res.status(404).json({ message: "Purchased product not found!" });
        }

        res.status(200).json({ message: `Purchased product with ID ${id} has been deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
