const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userProfile: { type: String, required: false },
    userPhoneNum: { type: String, required: true },
    userPassword: { type: String, required: true },
    userDateOfCreation: { type: Date, default: Date.now },
    userDateOfUpdate: { type: Date, default: Date.now },
    userID: { type: Number, required: true },
    userIsAdmin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
