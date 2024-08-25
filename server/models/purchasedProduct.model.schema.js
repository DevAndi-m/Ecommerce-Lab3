const mongoose = require('mongoose');

const purchasedProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    buyer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    quantityPurchased: { type: Number, required: true},
    productDateOfPurchase: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PurchasedProduct', purchasedProductSchema);