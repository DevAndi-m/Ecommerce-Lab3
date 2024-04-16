const mongoose = require('mongoose');

// Skema per produkt
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    productID: { type: Number, required: true },
    productDateOfListing: { type: Date, default: Date.now }
});

// skema per produkt t'blem
const purchasedProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productID: { type: Number, required: true },
    productDateOfPurchase: { type: Date, default: Date.now }
});

// skema per user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userEmail: { type: String, required: true },
    userProfile: { type: String, required: true },
    userPhoneNum: { type: String, required: true },
    userPassword: { type: String, required: true },
    userDateOfCreation: { type: Date, default: Date.now },
    userDateOfUpdate: { type: Date, default: Date.now },
    userID: { type: Number, required: true },
    userIsAdmin: { type: Boolean, required: true },
    userSellingProducts: { type: [productSchema], default: [] },
    userPurchases: { type: [purchasedProductSchema], default: [] }
});

module.exports = mongoose.model('User', userSchema);
