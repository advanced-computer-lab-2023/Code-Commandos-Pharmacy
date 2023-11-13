const mongoose = require('mongoose');
const Medicine = require('../model/Medicine')

const CartSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    medicines: [{
        medicineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine'
        },
        amount: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            ref: 'Medicine.price'
        },
        description: {
            type: String,
            ref: 'Medicine.description'
        },
        name: {
            type: String,
            ref: 'Medicine.name'
        },
        imageUploadID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
            required: true,
        },
    }],
    subtotal: {
        type: Number,
        default:0
    },
    shipping: {
        type: Number,
        default: 50
    },
    totalNumberOfItems: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
