const mongoose = require('mongoose');
const Products = require('./productModel');

const Schema = mongoose.Schema;

//create shop schema

const adminProfile = new Schema({

    adminId: { type: String },
    // shopname: { type: String },
    address: { type: String },
    landmark: { type: String },
    city: { type: String },
    pincode: { type: Number },
    phone: { type: Number},
    adminShopImage: { type: String },
    products: [Products],
    
});

const shop = mongoose.model('profile', adminProfile);

module.exports = shop;