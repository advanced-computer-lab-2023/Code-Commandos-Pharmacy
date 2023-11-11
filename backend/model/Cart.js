const mongoose = require('mongoose');
const Medicine =require('../model/Medicine')

const CartSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    medicines: [{
        medicineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine' // Reference to the Medicine model
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
        imageUpload: {
            type: String,
            red: 'Medicine.imageUpload'
        }
    }]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
