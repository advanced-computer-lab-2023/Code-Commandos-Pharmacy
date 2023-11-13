const Cart = require('../model/Cart')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Medicine = require('../model/Medicine')

// Add to Cart of (logged in patient) & Update the subtotal
const addToCart = asyncHandler(async (req, res) => {
    const {name} = req.params; // Panadol
    const medicine = await Medicine.findOne({name});
    const medicineId = medicine._id; // panadolId in Medicine

    try {
        const patientId = req.user.id

        // Check if the patient has a cart
        let cart = await Cart.findOne({patientId});
        console.log("from backend ",medicine)
        // If the patient does not have a cart, create a new cart for this patient.
        if (!cart) {
            cart = new Cart({
                patientId,
                medicines: [{
                    medicineId: medicine._id,
                    amount: 1,
                    price: medicine.price,
                    description: medicine.description,
                    name: medicine.name,
                    imageUploadID: medicine.imageUploadID
                }]
            })
        }
        // else add the medicine to the array
        else {
            // I want to check if the medicine is already in cart, an alert appears that says medicine already in cart
            const existingMedicine = cart.medicines.find((item) => item.medicineId.equals(medicineId))

            if (existingMedicine) {
                return res.status(400).json({message: 'Medicine already in cart'})
            }

            cart.medicines.push({
                medicineId: medicine._id,
                amount: 1,
                price: medicine.price,
                description: medicine.description,
                name: medicine.name,
                imageUploadID: medicine.imageUploadID
            });
        }
        // add the medicine price to the subtotal and update the totalNumberOfItems to be
        // the sum of the amount of the medicines
        cart.totalNumberOfItems = cart.medicines.reduce(
            (total, item) => total + item.amount,
            0
        );
        cart.subtotal += medicine.price;
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
        const subtotal = cart.subtotal;
        const total = subtotal + 50; // Calculate the total based on the subtotal and any additional charges

        const cartData = {
            medicines,
            subtotal,
            total,
        };
        res.status(200).json(cartData);
    } catch (error) {
        res.status(400)
        throw new Error(error.message())
    }
});

// Get the subtotal and shipping of My Cart


// Remove Medicine from MY Cart
const removeMedicine = asyncHandler(async (req, res) => {
    const {name} = req.params
    const medicine = await Medicine.findOne({name})
    const medicineId = medicine._id; // Medicine Id

    try {

        const patientId = req.user.id;
        var cart = await Cart.findOne({patientId});

        if (!cart) {
            return res.status(404).json({message: 'Cart is empty'});
        }
        cart.medicines = cart.medicines.filter(item => !item.medicineId.equals(medicineId));

        cart.totalNumberOfItems = cart.medicines.reduce(
            (total, item) => total + item.amount,
            0
        );
        cart.subtotal = cart.medicines.reduce(
            (total, item) => total + (item.price * item.amount),
            0
        );
        await cart.save()
        res.status(200).json({message: 'Medicine removed from cart successfully', cart: cart});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

// Update Amount of a Medicine in Logged in Patient's Cart
const updateAmountInCart = asyncHandler(async (req, res) => {
    const {name} = req.params
    const {newAmount} = req.params

    const medicine = await Medicine.findOne({name})
    if (!medicine) {
        return res.status(404).json({message: 'Medicine not found'});
    }
    const medicineId = medicine._id // i have medicineId

    try {
        const patientId = req.user.id
        const cart = await Cart.findOne({patientId})
        if (!cart) {
            return res.status(404).json({message: 'Cart is empty'});
        }
        // Loop over the medicines array and find the index of this medicineId in my medicines array, then set its amount
        const medicineIndex = cart.medicines.findIndex(
            (medicine) => medicine.medicineId.toString() === medicineId.toString()
        );

        if (medicineIndex === -1) {
            return res.status(404).json({message: 'Medicine not found in cart'});
        }

        // Update the amount of the medicine at the found index
        cart.medicines[medicineIndex].amount = newAmount;

        // i want to loop over the medicines array, and add all the amount of the medicines
        cart.totalNumberOfItems = cart.medicines.reduce(
            (total, item) => total + item.amount,
            0
        );
        cart.subtotal = cart.medicines.reduce(
            (total, item) => total + (item.price * item.amount),
            0
        );
        // Save the updated cart
        await cart.save();

        res.status(200).json({message: 'Medicine amount updated in cart successfully'});

    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = {
    addToCart,
    viewCart,
    removeMedicine,
    updateAmountInCart
}
