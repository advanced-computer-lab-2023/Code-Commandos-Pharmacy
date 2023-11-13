const mongoose = require('mongoose');
const Cart = require('../model/Cart')

const OrderSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    orderID: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['Cash On Delivery', 'Credit/Debit Card', 'Wallet']
    },
    status: {
        type: String,
        enum: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
    subtotal: {
        type: Number,
        ref: 'Cart'
    },
    shipping: {
        type: Number,
        ref: 'Cart'
    },
    totalNumberOfItems: {
        type: Number,
        ref: 'Cart'
    },
    totalPrice: {
        type: Number
    }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order;