const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {ErrorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//routes

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from server"})
})


const MedicineRoute = require('./route/MedicineRoute')
const pharmacistRoutes= require('./route/pharmacistRoute')
const pharmacistRequestRoutes = require('./route/PharmacistRequestRoute')
const patientRoutes = require('./route/PharmacyPatientRoute')
const adminRoutes = require('./route/PharmacyAdminRoute')

server.use('/api/pharmacist',pharmacistRoutes)
server.use('/api/pharmacistRequest',pharmacistRequestRoutes)
server.use('/api/pharmacyPatient', patientRoutes)
server.use('/api/medicine', MedicineRoute)
server.use('/api/admin',adminRoutes)
server.use(ErrorHandler)
