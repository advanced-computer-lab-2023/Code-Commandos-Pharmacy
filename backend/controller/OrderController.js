const asyncHandler = require('express-async-handler')
const Order = require('../model/Order')
const Cart = require('../model/Cart')

// Place My Order :  Confirm Order
const placeOrder = asyncHandler(async (req, res) => {
    try {
        const patientId = req.user.id
        const cart = await Cart.findOne({patientId})
        if (!cart) {
            return res.status(404).json({message: 'Cart is empty'});
        }
        const order = new Order({
            patientId: patientId,
            cartId: cart._id,
            subtotal: cart.subtotal,
            shipping: cart.shipping,
            totalPrice: cart.subtotal + cart.shipping,
            totalNumberOfItems: cart.totalNumberOfItems,
        })
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
// View Order Details
const viewOrderDetails = asyncHandler(async (req, res) => {
    try {
        const patientId = req.user.id;
        const orders = await Order.find({patientId});
        const orderDetails = orders.map((order) => {
            return {
                orderId: order._id,
                totalNumberOfItems: order.totalNumberOfItems,
                totalPrice: order.totalPrice,
                paymentMethod: order.paymentMethod,
                status: order.status,
            };
        });
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Cancel order by id
const cancelOrder = asyncHandler(async (req, res) => {
    try{
        const {id} = req.params
        const patientId = req.user.id
        const order = await Order.findOne({patientId:patientId, _id: id})
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        await order.deleteOne({id})
        res.json({message: 'Order cancelled successfully'});
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {
    placeOrder,
    viewOrderDetails,
    cancelOrder
}