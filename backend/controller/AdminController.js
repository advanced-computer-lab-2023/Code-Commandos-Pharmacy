const mongoose = require('mongoose');
const AdminModel = require('../model/Admin')
const asyncHandler = require('express-async-handler')
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const addAdmin = asyncHandler(async (req,res) => {
    const {username,password,email} = req.body
    try {
        if (password.search(/[a-z]/) < 0 || password.search(/[A-Z]/) < 0 || password.search(/[0-9]/) < 0) {
            res.status(400)
            throw new Error("Password must contain at least one number, one capital letter and one small letter")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await User.create({username,password:hashedPassword,'role':'ADMIN'})
        const admin =await AdminModel.create({username,password:password,email:email})
        res.status(200).json(admin)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {addAdmin}