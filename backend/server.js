const express = require("express")
const path = require('path');
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {ErrorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());
server.use(cors({ origin: 'http://localhost:3000' }));

server.use('/uploads', express.static('uploads'));
server.use(bodyParser.json());

const httpServer = require("http").createServer(server);
httpServer.listen(port,() => console.log(`Http server is listening on port ${port}`))
//server.listen(port, () => console.log(`Server is listening on port ${port}`))
connectDB()


server.get('/', (req, res) => {
    res.status(200).json({message: "Hello from server"})
})

const MedicineRoute = require('./route/MedicineRoute')
const pharmacistRoutes = require('./route/pharmacistRoute')
const pharmacistRequestRoutes = require('./route/PharmacistRequestRoute')
const patientRoutes = require('./route/PatientRoute')
const adminRoutes = require('./route/AdminRoute')
const userRoutes= require('./route/UserRoute')
const fileRoutes = require('./route/FileRoute')
const cartRoute = require('./route/CartRoute')
const orderRoute = require('./route/OrderRoute')
const salesRoute = require('./route/SalesReportRoute')
const messageRoutes = require('./route/MessageRoute')
const chatRoutes = require('./route/ChatRoute')

server.use('/api/pharmacist', pharmacistRoutes)
server.use('/api/pharmacistRequest', pharmacistRequestRoutes)
server.use('/api/patient', patientRoutes)
server.use('/api/medicine', MedicineRoute)
server.use('/api/admin',adminRoutes)
server.use('/api/user',userRoutes)
server.use('/api/file',fileRoutes.routes)
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use('/api/cart', cartRoute)
server.use('/api/order', orderRoute)
server.use('/api/sales', salesRoute)
server.use('/api/message',messageRoutes)
server.use('/api/chat',chatRoutes)

server.use(ErrorHandler)

const io = require("socket.io")(httpServer, {
    cors: {
        origin: [`http://localhost:${port}`,'http://localhost:3000'],
        methods: ["GET","POST","DELETE","PUT"]
    }
})
io.on("connection", (socket) => {
	socket.on("setup", (userData) => {
		socket.join(userData.userId);
		socket.emit("connected");
	  });
	
	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User Joined Room: " + room);
	});
	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;
		if(!chat) return
		if (!chat.users) return console.log("chat.users not defined");

		chat.users.forEach((user) => {
			if (user._id == newMessageRecieved.sender._id) return;

			socket.in(user._id).emit("message recieved", newMessageRecieved);
		});
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData.userId);
	});
});




