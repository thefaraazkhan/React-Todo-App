const mongoose = require("mongoose");


const eog_admin_register = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true,
    },

    lastName:{
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        trim: true
    },
   
    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: true    
    },

    isSuperAdmin: {
        type: Boolean,
        default: false    
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }

},
{timestamps: true}
);

const admin = new mongoose.model("eog_admin_register", eog_admin_register);

module.exports = admin;

