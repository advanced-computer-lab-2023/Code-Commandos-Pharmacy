const express = require('express')

const {
    addToCart,
    viewCart,
    viewAllCarts,
    deleteCart,
    removeMedicine
} = require('../controller/CartController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");
const router = express.Router()

// Add medicine to the logged in patient
router.post('/addToCart/:name', protect, checkPatientRole, addToCart)

// View My Cart
router.get('/viewMyCart', protect, checkPatientRole, viewCart)

// Remove Medicine from Logged in patient's Cart
router.put('/removeMedicine/:name', protect, checkPatientRole, removeMedicine);

// View All Carts
router.get('/viewAllCarts', viewAllCarts)

// Delete cart
router.delete('/deleteCart/:id', deleteCart)

module.exports = router