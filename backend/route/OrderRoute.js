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
    viewOrderDetails,
    setTotalPrice,
    cancelOrder,
    walletPayment
} = require('../controller/OrderController')

const router = express.Router()

// View My Medicines
router.get('/viewMyOrders', viewMyOrders)

// Add Order
router.post('/addOrder', addOrder)

// Delete Order
router.delete('/deleteOrder/:id', deleteOrder)

// Set Credit Payment
router.put('/setCreditPayment', cardPayment)

// Set Cash Payment
router.put('/setCashPayment', cashPayment)

// Set Wallet Payment
router.put('/setWalletPayment', walletPayment)

// Confirm order
router.put('/confirmOrder', confirmOrder)

// Display Confirmed Orders
router.get('/displayConfirmedOrders', displayConfirmedOrders)

// View Order Details
router.get('/getOrderDetails', viewOrderDetails)

// Set Total Price
router.put('setTotalPrice/:subtotal', setTotalPrice)

// Delete Order by Id
router.delete('/cancelOrder/:id', cancelOrder)

module.exports = router

