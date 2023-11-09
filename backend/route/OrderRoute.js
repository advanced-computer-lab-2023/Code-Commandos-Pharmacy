const express = require('express')
const multer = require('multer')

const {
    viewMyOrders,
    addOrder,
    deleteOrder,
    cardPayment,
    cashPayment,
    confirmOrder,
    displayConfirmedOrders,
    viewOrderDetails
} = require('../controller/OrderController')

const router = express.Router()

// View My Medicines
router.get('/viewMyOrders', viewMyOrders)

// Add Order
router.post('/addOrder', addOrder)

// Delete Order
router.delete('/deleteOrder/:id', deleteOrder)

// Set Credit Payment by id
router.put('/setCreditPayment',cardPayment)

// Set Cash Payment by id
router.put('/setCashPayment',cashPayment)

// Confirm order
router.put('/confirmOrder',confirmOrder)

// Display Confirmed Orders
router.get('/displayConfirmedOrders', displayConfirmedOrders)

// View Order Details
router.get('/getOrderDetails', viewOrderDetails)

module.exports = router

