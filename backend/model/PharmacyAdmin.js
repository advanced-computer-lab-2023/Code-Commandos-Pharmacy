const mongoose = require('mongoose');

const PharmacyAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{ timestamps: true });

const PharmacyAdmin = mongoose.model('PharmacyAdmin', PharmacyAdminSchema);
module.exports = PharmacyAdmin;
