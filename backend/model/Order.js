const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    id: {
        type: Number,
        default: () => Date.now()
    },
    status: {
        type: String,
        default: "Pending"
    },
    selectedAddress: {
        type: String
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    paymentOption: {
        type: String,
        enum: ['CreditCard', 'CashOnDelivery']
    },
    toBeDisplayed: {
        type: Boolean,
        default: false
    },
    justAddedOrder: {
        type: Boolean,
        default:false,
    }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order