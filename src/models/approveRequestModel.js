const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const fromToSchema = Schema({
//     from: {type: String},
//     to: {type: String}
// })

//create shop schema
const requestSchema =  Schema({
    users: Array,
    productID: {type: String},
},{timestamps: true})

const request = mongoose.model('request', requestSchema);
module.exports = request;

