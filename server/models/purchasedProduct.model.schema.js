const mongoose = require('mongoose');

const purchasedProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDateOfPurchase: { type: Date, default: Date.now },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } 
});

module.exports = mongoose.model('PurchasedProduct', purchasedProductSchema);
