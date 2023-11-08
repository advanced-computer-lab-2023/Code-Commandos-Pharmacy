const Medicine = require('../model/Medicine');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const multer = require('multer')

// Add a new medicine

const addOrUpdateMedicine = asyncHandler(async (req, res) => {
    // If the medicine is already in stock, update its quantity
    const medicineBody = req.body;
    let med;
    try {
        med = await Medicine.findOne({ name: medicineBody.name });
    } catch (error) {
        throw new Error(error.message);
    }

    if (med) {
        med.quantity += Number(medicineBody.quantity); // Update quantity
        await med.save(); // Save the updated medicine
        res.status(200).json(med);
    } else {
        // Create a new medicine
        try {
            const {
                name,
                description,
                details,
                price,
                quantity,
                manufacturer,
                ingredients,
                sideEffects,
                productionDate,
                expiryDate,
                medicinalUse,
                customerReviews,
                customerRatings,
                sales,
            } = req.body;
            const { file } = req;

            const newMed = new Medicine({
                name,
                description,
                details,
                price,
                quantity,
                manufacturer,
                ingredients,
                sideEffects,
                productionDate,
                expiryDate,
                medicinalUse,
                customerReviews,
                customerRatings,
                sales,
                imageUpload: file.path || null,
            });
            await newMed.save(); // Save the new medicine
            res.status(200).json(newMed);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});


// View Available Medicines
const viewAvailableMedicines = asyncHandler(async (req, res) => {
    try {
        const medicines = await Medicine.find({quantity: {$ne: 0}}).sort({createdAt: 1})
        res.status(200).json(medicines)
    } catch (error) {
        throw new Error(error.message)
    }
})

// Search for Medicine based on name
const searchMedicineByName = asyncHandler(async (req, res) => {
    const {name} = req.params
    try {
        const medicines = await Medicine.find({name: {$regex: new RegExp(name, 'i')}})
        if (medicines.length > 0) {
            console.log(medicines)
            res.status(200).json(medicines)
        } else {
            res.status(404)
            throw new Error('No such a medicine')
        }
    } catch (error) {
        throw new Error(error.message)
    }

})

// Edit medicine Details and Price
const updateDetailsAndPrice = asyncHandler(async (req, res) => {
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
    } catch (error) {
        throw new Error(error.message)
    }
})

// View the Available quantity, and Sales of each medicine
const viewQuantityAndSales = asyncHandler(async (req, res) => {
    try {
        const medicines = await Medicine.find({}, 'name quantity sales -_id');
        res.status(200).json(medicines)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Filter medicines based on Medicinal Use
const filterMedicines = asyncHandler(async (req, res) => {
    const {medicinalUse} = req.params
    try {
        const medicines = await Medicine.find({medicinalUse: medicinalUse})
        res.status(200).json(medicines)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// Delete Medicine
const deleteMedicine = asyncHandler((async (req, res) => {
    const {name} = req.params
    const medicine = await Medicine.findOne({name})
    if (!medicine) {
        return res.status(404).json({message: 'Medicine not found'});
    }
    await medicine.deleteOne({name})
    res.json({message: 'Medicine deleted successfully'});
}))

module.exports = {
    addOrUpdateMedicine,
    viewAvailableMedicines,
    searchMedicineByName,
    updateDetailsAndPrice,
    viewQuantityAndSales,
    filterMedicines,
    deleteMedicine
}