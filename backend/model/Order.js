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
    status: {
        type: String,
        enum: ['PENDING', 'ONITSWAY', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
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
    },
    paymentOption: {
        type: String,
        enum: ['CreditCard', 'CashOnDelivery', 'Wallet']
    },
    totalPrice: {
        type: Number
    },
    sessionID: {
        type: String,
        default: 'NONE'
    }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order;