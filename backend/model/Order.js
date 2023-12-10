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
    // the Medicines in cart (name, amount, and date.now)
    medicines: [
        {
            name: {
                type: String,
            },
            amount: {
                type: Number,
            },
            orderDate: {
                type: Date,
                default: Date.now,
            },
        },
    ],
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
});

OrderSchema.pre('save', async function (next) {
    const cart = await Cart.findById(this.cartId).populate('medicines.medicineId');
    if (!cart) {
        throw new Error('Cart not found');
    }

    const medicines = cart.medicines.map((medicine) => ({
        name: medicine.name,
        amount: medicine.amount,
        orderDate: Date.now(),
    }));

    this.medicines = medicines;
    next();
});

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order;