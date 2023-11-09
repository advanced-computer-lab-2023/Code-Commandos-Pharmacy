const Order = require('../model/Order')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Medicine = require("../model/Medicine");

// View My Orders
const viewMyOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        throw new Error(error.message)
    }
})

// Add Order
const addOrder = asyncHandler(async (req, res) => {
    const orderBody = req.body
    try {
        const order = await Order.create({...orderBody, justAddedOrder: true});
        res.status(200).json(order)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Delete Order by id
const deleteOrder = asyncHandler((async (req, res) => {
    const {id} = req.params
    const order = await Order.findOne({id})
    if (!order) {
        return res.status(404).json({message: 'Order not found'});
    }
    await order.deleteOne({id})
    res.json({message: 'Medicine deleted successfully'});
}))

// Set Payment to be Credit Card only if justAddedOrder is true
const cardPayment = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({justAddedOrder: true});
        if (!orders) {
            return res.status(404).json({message: "No orders found"});
        }

        for (const order of orders) {
            order.paymentOption = "CreditCard";
            await order.save();
        }

        res.status(200).json({message: "Payment option set to CreditCard for eligible orders"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

// Set Payment to be Credit Card only if justAddedOrder is true
const walletPayment = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({justAddedOrder: true});
        if (!orders) {
            return res.status(404).json({message: "No orders found"});
        }

        for (const order of orders) {
            order.paymentOption = "Wallet";
            await order.save();
        }

        res.status(200).json({message: "Payment option set to Wallet for eligible orders"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

// Set Payment to be Cash only if justAddedOrder is true
const cashPayment = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({justAddedOrder: true});
        if (!orders) {
            return res.status(404).json({message: "No orders found"});
        }

        for (const order of orders) {
            order.paymentOption = "CashOnDelivery";
            await order.save();
        }

        res.status(200).json({message: "Payment option set to Cash on Delivery"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

// When i Place order, toBeDisplayed is set to true, and justAddedOrder is set to false
// (to orders that  justAddedOrder is true)
const confirmOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({justAddedOrder: true})
        if (!orders) {
            return res.status(404).json({message: "No orders found"});
        }
        for (const order of orders) {
            order.toBeDisplayed = true;
            order.justAddedOrder = false;
            await order.save();
        }
        res.status(200).json({message: "Order Confirmed"});

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
})

// View Orders Whose toBeDisplayed is set to true
const displayConfirmedOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({toBeDisplayed: true})
        if (!orders) {
            return res.status(404).json({message: "No orders found"})
        }
        res.status(200).json(orders)
    } catch (error) {
        throw new Error(error.message)
    }
})

// View ID,Status and Payment of each order
const viewOrderDetails = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ toBeDisplayed: true }, 'id status paymentOption');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Set Total Price of those justAddedOrder to be subtotal + 50
const setTotalPrice = asyncHandler(async (req, res) => {
    try {
        const { subtotal } = req.params;
        const orders = await Order.find({ justAddedOrder: true });

        for (const order of orders) {
            order.totalPrice = parseInt(subtotal) + 50;
            await order.save();
        }
        res.status(200).json({ message: "Total price updated for eligible orders" });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Delete Order by Id
const cancelOrder = asyncHandler(async (req,res)=>{
    try{
        const {id} = req.params
        const order = await Order.findOne({id})
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        await order.deleteOne({id})
        res.json({message: 'Order cancelled successfully'});
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})



module.exports = {
    viewMyOrders,
    addOrder,
    deleteOrder,
    cardPayment,
    cashPayment,
    confirmOrder,
    displayConfirmedOrders,
    viewOrderDetails,
    setTotalPrice,
    cancelOrder,
    walletPayment
}