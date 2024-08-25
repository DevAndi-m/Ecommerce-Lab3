const mongoose = require('mongoose');

const maxWords = 40;

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    productDateOfListing: { type: Date, default: Date.now },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: {
        type: String,
        validate: [
          function(value) { return value.trim().split(/\s+/).length <= maxWords; },
          `Description cannot contain more than ${maxWords} words.`
        ]
    }
      
});

module.exports = mongoose.model('Product', productSchema);
