const Cart = require('../model/Cart')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Medicine = require('../model/Medicine')

// Add to Cart of (logged in patient)
const addToCart = asyncHandler(async (req, res) => {
    const {name} = req.params; // Panadol
    const medicine = await Medicine.findOne({name});
    const medicineId = medicine._id;

    try {
        const patientId = req.user.id

        // Check if the patient has a cart
        let cart = await Cart.findOne({patientId});

        // If the patient does not have a cart, create a new cart for this patient.
        if (!cart) {
            cart = new Cart({
                patientId,
                medicines: [medicineId]
            })
        }
        // else add the medicine to the array
        else {
            cart.medicines.push(medicineId)
        }
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// View Medicines in MY Cart
const viewCart = asyncHandler(async (req, res) => {
    try {
        const patientId = req.user.id;
        const cart = await Cart.findOne({patientId});
        if (!cart) {
            return res.status(404).json({message: 'Cart is empty'});
        }

        // Retrieve the medicines array of my cart
        const medicines = cart.medicines;
        res.status(200).json(medicines);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Remove Medicine from MY Cart
const removeMedicine = asyncHandler(async (req, res) => {
    const {name} = req.params
    const medicine = await Medicine.findOne({name})

    if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
    }
    const medicineId = medicine._id; // Medicine Id
    try {

        const patientId = req.user.id;
        var cart = await Cart.findOne({patientId});

        if (!cart) {
            return res.status(404).json({message: 'Cart is empty'});
        }

        cart.medicines = cart.medicines.filter(item => !item._id.equals(medicineId));
        await cart.save()
        res.status(200).json({message: 'Medicine removed from cart successfully',cart:cart});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})


// View All Carts (for me)
const viewAllCarts = asyncHandler(async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        throw new Error(error.message)
    }
})

// Delete Cart
const deleteCart = asyncHandler((async (req, res) => {
    const {id} = req.params
    const medicine = await Cart.findOne({name})
    if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
    }
    await medicine.deleteOne({id})
    res.json({message: 'Cart deleted successfully'});
}))


module.exports = {
    addToCart,
    viewCart,
    viewAllCarts,
    deleteCart,
    removeMedicine
}
