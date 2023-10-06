const Medicine = require('../model/Medicine');
const mongoose = require('mongoose');

// Add a new medicine
const addOrUpdateMedicine = async (req, res) => {

    //if the medicine is already in stock, update its quantity
    const {
        name,
        description,
        details,
        price,
        sales,
        quantity,
        medicinalUse,
        manufacturer,
        ingredients,
        sideEffects,
        expiryDate
    } = req.body

    const med = await Medicine.findOne({name: name})
    if (med) {
        med.quantity += Number(quantity)
        await med.save();
        res.status(200).json(med)
    } else {
        // else create a new medicine
        try {
            const medicine = await Medicine.create({
                name,
                description,
                details,
                price,
                sales,
                quantity,
                medicinalUse,
                manufacturer,
                ingredients,
                sideEffects,
                expiryDate
            })
            res.status(200).json(medicine)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}

// View Available Medicines
const viewAvailableMedicines = async (req, res) => {
    const medicines = await Medicine.find({quantity: {$ne: 0}}).sort({createdAt: -1})
    res.status(200).json(medicines)
}

// Search for Medicine based on name
const viewMedicine = async (req, res) => {
    const {name} = req.params
    const medicine = await Medicine.findOne({name})
    if (medicine) {
        res.json(medicine)
    } else {
        res.status(404).json({error: 'No such medicine'})
    }
}

// Edit medicine Details and Price
const updateDetailsAndPrice = async (req, res) => {
    const {name} = req.params
    //new:true ensures that the updated medicine is returned in response
    const {details, price} = req.body
    // I didn't do it in a try catch because I didn't know how to :)
    const medicine = await Medicine.findOneAndUpdate({name: name}, {$set: {details, price}}, {new: true})
    if (!medicine) {
        res.status(400).json({error: 'No such medicine'})
    }
    res.status(200).json(medicine)

}

// View the Available quantity, and Sales of each medicine
const viewQuantityAndSales = async (req, res) => {
    const {name} = req.params
    const medicine = await Medicine.findOne({name: name}).select('sales quantity -_id')
    if (!medicine) {
        return res.status(400).json({error: 'Medicine not found'});
    }
    res.status(200).json(medicine)
}

// Filter medicines based on Medicinal Use
const filterMedicines = async (req,res) => {
    const {medicinalUse} = req.params
    try{
        const medicines = await Medicine.find({medicinalUse: medicinalUse})
        res.status(200).json(medicines)
    }
    catch(error){
        res.status(400).json({error: 'No such medicine with medicinal use.'})
    }

}

module.exports = {
    addOrUpdateMedicine,
    viewAvailableMedicines,
    viewMedicine,
    updateDetailsAndPrice,
    viewQuantityAndSales,
    filterMedicines
}