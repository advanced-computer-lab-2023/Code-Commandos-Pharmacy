const mongoose = require('mongoose');

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
        }
    }]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
