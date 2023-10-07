const admin= require('../model/Pharmacist')
const admin1= require('../model/PharmacistRequest')
const mongoose= require('mongoose')
const asyncHandler= require('express-async-handler')

// Task 22- view a  pharmacist
 const viewPharmacist= async(req,res) =>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    const pharmacist= await admin.findById(id).select('-password')
    if(!pharmacist){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    res.status(200).json(pharmacist)
 }

// Task 6 remove a pharmacist
const removePharmacist= async(req,res) =>{
const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    const pharmacist= await admin.findOneAndDelete({_id: id})
     if(!pharmacist){
        return res.status(404).json({error:'Pharmacist is Not Found'})
        }
      res.status(200).json(pharmacist)
}

//Task 7 view data uploaded by a pharmacist
const  viewUploadByPharmacist= async(req,res)=>{
const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    const pharmacistReq= await admin1.findById(id).select('-password')
    if(!pharmacistReq){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    res.status(200).json(pharmacistReq)
 }
 // addPharmacist to test on
const addPharmacist = async(req,res) => {
   //add a new user to the database with
   //Name, Email and Age
      const{username,name,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground,timestamps}=req.body;
      console.log(req.body);
      try{
      const pharmacist= await admin.create({username,name,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground,timestamps});
      console.log(pharmacist);
      res.status(200).json(pharmacist)
      }catch(error){
      res.status(400).json({error:error.message})
      }
      }
// addPharmacistReq to test on
const addPharmacistReq = async(req,res) => {
   //add a new user to the database with
   //Name, Email and Age
      const{username,name,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground,timestamps}=req.body;
      console.log(req.body);
      try{
      const pharmacist= await admin1.create({username,name,email,password,dateOfBirth,hourlyRate,affiliation,educationalBackground,timestamps});
      console.log(pharmacist);
      res.status(200).json(pharmacist)
      }catch(error){
      res.status(400).json({error:error.message})
      }
      }

 module.exports={
 viewPharmacist,
 removePharmacist,
 viewUploadByPharmacist,
 addPharmacist,
 addPharmacistReq
 }