const PharmacistModel= require('../model/Pharmacist')
const mongoose= require('mongoose')
const asyncHandler= require('express-async-handler')
const checkAdminRole= require('../middleware/AccessHandler')


// Task 22- view a  pharmacist
 const viewPharmacist=asyncHandler( async(req,res) =>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400)
        throw new Error('Pharmacist not found')
    }
    try {
        const pharmacist= await PharmacistModel.findById(id).select('-password')
        if(!pharmacist){
            res.status(404)
            throw new Error('Pharmacist not found')
        }
        res.status(200).json(pharmacist)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
 })

// Task 6 remove a pharmacist
const removePharmacist=asyncHandler( async(req,res) =>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400)
        throw new Error('Pharmacist not found')
    }
    try {
        const pharmacist= await PharmacistModel.findByIdAndDelete(id)
        if(!pharmacist){
            res.status(404)
            throw new Error('Pharmacist not found')
        }
        res.status(200).json(pharmacist)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})


 // addPharmacist to test on

const addPharmacist =asyncHandler( async(req,res) => {
    const pharmacistBody = req.body;
    try {
        const pharmacist = await PharmacistModel.create(pharmacistBody);
               res.status(200).json(pharmacist)

    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const viewAllPharmacists = asyncHandler(async (req, res) => {
  try {
    // Assuming req.user contains the user information
    if (req.user && req.user.role === 'ADMIN') {
      const pharmacists = await PharmacistModel.find();
      res.status(200).json(pharmacists);
    } else {
      res.status(403).json({ message: 'Access denied. You do not have the Admin role.' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

 module.exports={
    viewPharmacist,
    removePharmacist,
    addPharmacist,
    viewAllPharmacists
 }