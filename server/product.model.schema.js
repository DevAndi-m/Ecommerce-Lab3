const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    productDateOfListing: { type: Date, default: Date.now },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
});

module.exports = mongoose.model('Product', productSchema);
