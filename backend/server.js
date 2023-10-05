const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {ErrorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT
// const adminModel = require('./model/PharmacyAdmin')
// const doctorModel = require('./model/Pharmacist')
// const patientModel = require('./model/PharmacyPatient')

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(ErrorHandler)



server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from server"})
})