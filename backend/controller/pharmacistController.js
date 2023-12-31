const PharmacistModel= require('../model/Pharmacist')
const mongoose= require('mongoose')
const asyncHandler= require('express-async-handler')
const User = require("../model/User");
const bcrypt = require("bcryptjs");


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
        await User.findOneAndDelete({username:pharmacist.username})
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
        if (pharmacistBody.password.search(/[a-z]/) < 0 || pharmacistBody.password.search(/[A-Z]/) < 0 || pharmacistBody.password.search(/[0-9]/) < 0) {
            res.status(400)
            throw new Error("Password must contain at least one number, one capital letter and one small letter")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(pharmacistBody.password,salt)
        const pharmacist = await PharmacistModel.create(pharmacistBody)
        const user = await User.create({username: pharmacistBody.username, password: hashedPassword, role:"PHARMACIST"})
        res.status(200).json(pharmacist)
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const viewAllPharmacists = asyncHandler(async (req,res) => {
    try {
        const pharmacists = await PharmacistModel.find()
        res.status(200).json(pharmacists)
    } catch (error) {
        throw new Error(error.message)
    }
})

const searchPharmacistsToChat = asyncHandler(async (req, res) => {
    const { name } = req.params;
    let query = {};
    
    if (name !== "none") 
      query = { name: { $regex: new RegExp(name, "i") } };
    
    try {
      const pharmacists = await PharmacistModel.find(query);
      let pharmacistList = []
      for (const pharmacistJSON of pharmacists) {
          const pharmacist = pharmacistJSON._doc
          const user = await User.findOne({username:pharmacist.username});
          if(user)
              pharmacistList.push({...pharmacist,userId:user._id,role:user.role})
      }
      res.status(200).json(pharmacistList);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
});
// req 38 -> akram
const getAmount = asyncHandler(async (req, res) => {
    try {
      un = req.user.username;
      const pharmacist = await PharmacistModel.findOne({username: un});
      if (! pharmacist ) {
        res.status(404).json({ message: 'Pharmacist not found', userId: un });
        return;
      }
      res.status(200).json(pharmacist.wallet);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

 module.exports={
    viewPharmacist,
    removePharmacist,
    addPharmacist,
    viewAllPharmacists,
    searchPharmacistsToChat,
     getAmount
 }
