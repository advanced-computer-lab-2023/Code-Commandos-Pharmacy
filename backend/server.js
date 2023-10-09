const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {ErrorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT


server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from server"})
})

const pharmacistRoutes= require('./route/pharmacistRoute')
const pharmacistRequestRoutes = require('./route/PharmacistRequestRoute')

server.use('/api/pharmacist',pharmacistRoutes)
server.use('/api/pharmacistRequest',pharmacistRequestRoutes)

server.use(ErrorHandler)
