const mongoose = require('mongoose');
const ApproveRequestModel = require('./approveRequestModel')

module.exports =  ProductModel = new mongoose.Schema({

    productname: { type: String },
    productcategory: { type: String },
    productImages: Array,
    stock: {type: String},
    productDescription: { type: String},
    city: { type: String },
    productCategory: { type: String},
    expectedItem: {type: String},
    // approveRequests: [ApproveRequestModel],
    adminId: {type: String}
    
});

// const Product = mongoose.model('product', ProductModel);
// module.exports = Product;