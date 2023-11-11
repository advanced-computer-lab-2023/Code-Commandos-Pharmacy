const mongoose = require('mongoose');
const AdminModel = require('../model/Admin')
const asyncHandler = require('express-async-handler')

const addAdmin = asyncHandler(async (req,res) => {
    const adminBody = req.body
    try {
        const admin = await AdminModel.create(adminBody)
        res.status(200).json(admin)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {addAdmin}