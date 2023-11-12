const asyncHandler = require('express-async-handler')
const Order = require('../model/Order')
const Cart = require('../model/Cart')
// Make an order with the current items in my Cart
const placeOrder = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Checkout My Order :  Confirm Order
const checkoutOrder = asyncHandler(async (req, res) => {
    try {
        const patientId = req.user.id
        const cart = await Cart.findOne({patientId})
        if (!cart) {
            return res.status(404).json({message: 'Cart is empty'});
        }
        const order =  new Order({
            patientId: patientId,
            cartId: cart._id,
            subtotal: cart.subtotal,
            shipping: cart.shipping,
            totalPrice: cart.subtotal + cart.shipping,
            totalNumberOfItems: cart.totalNumberOfItems
        })
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {
    placeOrder,
    checkoutOrder
}