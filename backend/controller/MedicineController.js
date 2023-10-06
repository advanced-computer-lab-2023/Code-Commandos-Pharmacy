const Medicine = require('../model/Medicine');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')


// Add a new medicine
const addOrUpdateMedicine =asyncHandler( async (req, res) => {
    //if the medicine is already in stock, update its quantity
    const medicineBody = req.body
    let med
    try {
        med = await Medicine.findOne({name: medicineBody.name})
    }
    catch (error){
        throw new Error(error.message)
    }
    if (med) {
        med.quantity += Number(med.quantity)
        await med.save();
        res.status(200).json(med)
    }
    else {
        // else create a new medicine
        try {
            const medicine = await Medicine.create(medicineBody)
            res.status(200).json(medicine)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

// View Available Medicines
const viewAvailableMedicines =asyncHandler( async (req, res) => {
    try {
        const medicines = await Medicine.find({quantity: {$ne: 0}}).sort({createdAt: -1})
        res.status(200).json(medicines)
    }
    catch (error){
        throw new Error(error.message)
    }
})

// Search for Medicine based on name
const viewMedicineByName =asyncHandler( async (req, res) => {
    const {name} = req.params
    try {
        const medicine = await Medicine.findOne({name})
        if (medicine) {
            res.status(200).json(medicine)
        } else {
            res.status(404)
            throw new Error('No such a medicine')
        }
    }
    catch (error){
        throw new Error(error.message)
    }

})

// Edit medicine Details and Price
const updateDetailsAndPrice =asyncHandler( async (req, res) => {
    const {name} = req.params
    //new:true ensures that the updated medicine is returned in response
    const {details, price} = req.body
    // I didn't do it in a try catch because I didn't know how to :)
    //It's ok ya Arwa ❤️:)
    try {
        const medicine = await Medicine.findOneAndUpdate({name: name}, {$set: {details, price}}, {new: true})
        if (!medicine) {
            res.status(400)
            throw new Error('No such a medicine')
        }
        res.status(200).json(medicine)
    }
    catch (error){
        throw new Error(error.message)
    }
})

// View the Available quantity, and Sales of each medicine
const viewQuantityAndSales = async (req, res) => {
    try {
        const medicines = await Medicine.find({}, 'name quantity sales -_id');
        res.status(200).json(medicines)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
}

// Filter medicines based on Medicinal Use
const filterMedicines = async (req,res) => {
    const {medicinalUse} = req.params
    try{
        const medicines = await Medicine.find({medicinalUse: medicinalUse})
        res.status(200).json(medicines)
    }
    catch(error){
        res.status(400)
        throw new Error(error.message)
    }
}

module.exports = {
    addOrUpdateMedicine,
    viewAvailableMedicines,
    viewMedicineByName,
    updateDetailsAndPrice,
    viewQuantityAndSales,
    filterMedicines
}