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
    const pharmacist= await Pharmacist.findById(id)
    if(!pharmacist){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    res.status(200).json(pharmacist).select('-password')
 }

// Task 6 remove a pharmacist
const removePharmacist= async(req,res) =>{
const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    const pharmacist= await Pharmacist.findOneAndDelete({_id: id})
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
    const pharmacistReq= await PharmacistRequest.findById(id)
    if(!pharmacistReq){
    return res.status(404).json({error:'Pharmacist is Not Found'})
    }
    res.status(200).json(pharmacistReq).select('-password')
 }



 module.exports={
 viewPharmacist,
 removePharmacist,
 viewUploadByPharmacist
 }