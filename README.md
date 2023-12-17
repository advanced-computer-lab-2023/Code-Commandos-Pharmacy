
## Code Commandos Pharmacy--El7a2ny

A virtual pharmacy, like El7a2ny, offers a comprehensive digital platform connecting patients, doctors, and pharmacists. It facilitates seamless communication, prescription management, and medication fulfillment. Patients can consult with healthcare professionals remotely, receive electronic prescriptions, and access personalized medication information. Pharmacists can efficiently dispense medications, offer guidance, and monitor patient adherence. The platform enhances convenience, accessibility, and accuracy in healthcare interactions, optimizing the entire process from diagnosis to treatment.


## Motivation 🥁🥳:
We created El7a2ny to empower patients by offering them a seamless, convenient, and secure platform to connect with healthcare professionals. By enabling virtual consultations, easy prescription management, and medication information access, we aim to improve patient outcomes and satisfaction
#Build Status:

-The project is currently in development as there are UX validations to avoid spamming requests to the backend .

-The project needs in the near future to be deployed through AWS Services or alike.

## Code Style 📜:

The code style is enforced using eslint and prettier. The code style is enforced using pre-commit hooks and pre-commit github action.

Eslint : in the backend and the frontend to write the most optimum clean code possible and to define rules for the team to be able to write code in the same code style

## Screenshots 📸:

![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/IMG-20231217-WA0009.jpg?raw=true)
![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/IMG-20231217-WA0010.jpg?raw=true)
![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/IMG-20231217-WA0011.jpg?raw=true)
![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/IMG-20231217-WA0012.jpg?raw=true)
![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/IMG-20231217-WA0013.jpg?raw=true)



## API Reference:
*Admin routes
####  Add admin

http
POST /api/admin/addAdmin


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| username | string |Required.username of user |
| email | string |Required.email of user |
| password | string |Required.password of user |

*Patient Routes
####  Get Patient Information

http
GET /api/patient/getPatient/:id


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Id | integer |Required.id of user |


####  Create Patient

http
POST /api/patient/createPatient


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| username | string |Required.username of user |
| name | string |Required.name of user |
| email | string |Required.email of user |
| password | string |Required.password of user |
| date of birth | date |Required.dateOfBirth of user |
| gender | string |Required.gender of user |
| mobile number | string |Required.mobileNumber of user |
| addresses | string |Required.addresses of user |
| emergency contact | string |Required.emergencyContact of user |

####  Delete Patient

http
DELETE /api/patient/deletePatient


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Id | integer |Required.id of user |

#### View available addresses

http
GET /api/patient/viewAvailableAddresses


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Id | integer |Required.id of user |


#### File Routes

http
POST /api/file/addSingleFile



#### Add single file

http
POST /api/file/addSingleFileGuest/:username


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Username | String |Required.username of user |



#### Get single file

http
GET /api/file/getSingleFiles/:id


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Id | integer |Required.id of user |



#### Upload multiple files

http
POST /api/file/addMultipleFiles


#### Get all single files

http
GET /api/file/getMultipleFiles


#### Delete single file

http
DELETE /api/file/deleteSingleFile/:id

| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Id | integer |Required.id of user |


#### Delete all single files

http
DELETE /api/file/deleteAllSingleFiles



*User Routes


#### Login

http
POST /api/user/login


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| username | string |Required.username of user |
| password | string |Required.password of user |


#### Logout

http
POST /api/user/logout


#### Generate OTP

http
POST /api/user/generateOTP


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| email | String |Required.email of user |

#### Reset password

http
POST /api/user/resetPassword

| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| username | string |Required.username of user |
| password | string |Required.password of user |


#### Change password

http
POST /api/user/changePassword

| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| username | string |Required.username of user |
| role | enum |Required.role of user |

*Pharmacist Routes

#### View pharmacist

http
GET /api/pharmacist/viewPharmacist/:id


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Id | integer |Required.id of user |


#### Remove pharmacist

http
DELETE /api/pharmacist/removePharmacist/:id


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| Id | integer |Required.id of user |


#### Add pharmacist

http
POST /api/pharmacist/addPharmacist


| Parameter | Type     |        Description        |
| :-------- | :------- | :------------------------- |
| username | string |Required.username of user |
| name | String |Required.name of user |
| email | string |Required.email of user |
| password | string |Required.password of user |
| date of birth | date |Required.dateOfBirth of user |
| Hourly rate | number |Required.hourlyRate of user |
| Affiliation | string |Required.affiliation of user |
| Educational background | string |Required.educationalBackground of user |


#### View all pharmacists

http
GET /api/pharmacist/viewPharmacists

*Cart Routes

#### Add medicine to cart

```http
  POST /api/cart/addToCart/:name
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |

#### View my cart

```http
  GET /api/cart/viewMyCart
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `patientId`      | `integer` | **Required**.patientId |

#### Remove Medicine from cart

```http
  PUT /api/cart/removeMedicine/:name
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |

#### Update Amount of Medicine in cart

```http
  PUT /api/cart/updateAmount/:name/:newAmount
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |
| `newAmount` | `integer` | **Required**.newAmount  |

#### Add Prescription Medicines To Cart

```http
  POST /api/cart/addAllPrescriptionMedicinesToCart
```

*Medicine Routes

#### Add or update a new Medicine 

```http
  POST /api/medicine/addMedicine
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |
| `description` | `string` | **Required**.description  |
| `details` | `string` | **Required**.details  |
| `price` | `Number` | **Required**.price  |
| `quantity` | `Number` | **Required**.quantity  |
| `manufacturer` | `string` | **Required**.manufacturer  |
| `ingredients` | `[string]` | **Required**.ingredients  |
| `sideEffects` | `string` | **Required**.sideEffects  |
| `productionDate` | `Date` | **Required**.productionDate  |
| `expiryDate` | `Date` | **Required**.expiryDate  |
| `medicinalUse` | `enum` | **Required**.medicinalUse  |
| `imageUploadID` | `string` | **Required**.imageUploadID  |
| `isArchived` | `Boolean` | **Required**.isArchived  |
| `customerReviews` | `string` | **Required**.customerReviews  |
| `customerRatings` | `Number` | **Required**.customerRatings  |
| `sales` | `Number` | **Required**.sales  |


#### View a list of all available medicines

```http
  GET /api/medicine/viewAvailableMedicines
```

#### View a list of archived Medicines

```http
  GET /api/medicine/viewArchivedMedicines
```

#### View the Available quantity, and Sales of each medicine

```http
  GET /api/medicine/viewQuantityAndSales
```


#### Search for Medicine based on name

```http
  GET /api/medicine/searchMedicineByName/:name
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |

#### Edit medicine Details and Price

```http
  PUT /api/medicine/updateDetailsAndPrice/:name
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |
| `details` | `string` | **Required**.details  |
| `price` | `Number` | **Required**.price  |

#### Filter medicines based on Medicinal Use

```http
  GET /api/medicine/filterMedicines/:medicinalUse
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `medicinalUse` | `enum` | **Required**.medicinalUse  |


#### Delete Medicine

```http
  DELETE /api/medicine/delete/:name
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |

#### Archive a Medicine

```http
  PUT /api/medicine/archive/:name
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |

#### Unarchive a Medicine

```http
  PUT /api/medicine/unarchive/:name
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |

#### Medicine Alternatives

```http
  PUT /api/medicine/alternatives/:name
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.name  |


*Order Routes

#### Get order details

```http
  GET /api/order/getOrders
```

#### Cancel Order

```http
  PUT /api/order/cancelOrder/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `date` | **Required**.id  |


#### choose payment

```http
  GET /api/order/payForOrder/:cartId/:paymentOption
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cartId` | `ObjectId` | **Required**.cartId  |
| `paymentOption` | `ObjectId` | **Required**.paymentOption  |


#### Complete payment

```http
  GET /api/order/completeCreditPayment/:sessionID
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sessionID` | `string` | **Required**.sessionID  |


*Pharmacist Requests Routes 

#### Add Pharmacist Request

```http
  POST /api/pharmacistRequest/addPharmacistRequest
```


#### View all Pharmacist Request

```http
  GET /api/pharmacistRequest/viewAllPharmacistRequests
```


#### accept Request 

```http
  POST /api/pharmacistRequest/acceptRequest/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` | **Required**.id  |


#### reject Request 

```http
  DELETE /api/pharmacistRequest/rejectRequest/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `ObjectId` | **Required**.id  |



## Installation:
Clone the project git clone https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy.git

Make sure you have latest version of Node.js installed on your machine

You will need to add the following environment variables to your .env file:

1- Add your Mongo database url at Mongo_URI=

2-Add your backend server Port at Backend_Port= 

 Install the used libraries for the backEnd:

         Cd backend
         then
         npm install

Install the used libraries for the frontEnd

         Cd frontend
         then
         npm install

To run the backEnd

         node backend/ server.js

To run the frontEnd

          cd frontend/app.js 
           then
           npm start

    
## Code Examples:

Authentication Handler:
const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler')

const User = require('../model/User')


const protect = asyncHandler(async (req,res,next) => {

    let token;
    if (req.cookies && req.cookies.token) {
        try {
            token = req.cookies.token;
            const decoded =
jwt.verify(token,process.env.JWT_SECRET)

            req.user = await User.findOne({username:decoded.username}).select('-password')
            req.user.id = decoded.id
            next()

        }
        catch (error){
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');

        }
    }
    else{
        res.status(401);
        throw new Error('You are not logged in, No token was found')

    }
})


const localVariables = asyncHandler(async (req, res, next) =>{

    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
})


module.exports = {protect,localVariables}




Change password:

const changePassword = async (req,res) => {
    
    const username = req.user.username
    const role = req.user.role
    const {currentPassword,newPassword,confirmPassword} = req.body
    var currentComparedPassword
    try {
        currentComparedPassword = await User.findOne({username}).select('password')
    }
    catch (error){
        return res.status(400).json({error:error.message})
    }
    const passCompare = await bcrypt.compare(currentPassword,currentComparedPassword.password)
    if(!passCompare){
        return res.status(401).json({ error: "Your current password is incorrect!" });
    }
    if (newPassword.search(/[a-z]/) < 0 || newPassword.search(/[A-Z]/) < 0 || newPassword.search(/[0-9]/) < 0) {
        return res.status(400).json({error: "Password must contain at least one number, one capital letter and one small letter"})
    }
    if(newPassword != confirmPassword){
        return res.status(400).json({ error: "Password confirmation incorrect" });
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        await User.findOneAndUpdate({username},{password:hashedPassword})
        if(role == "PATIENT"){
            await Patient.findOneAndUpdate({username},{password:newPassword})
        }
        if(role == "PHARMACIST"){
            await Pharmacist.findOneAndUpdate({username},{password:newPassword})
        }
        if(role == "ADMIN"){
            await Admin.findOneAndUpdate({username},{password:newPassword})
        }
        res.clearCookie('token')
        return res.status(200).json("Password changed successfully we recommend closing the browser!")
    }
    catch (error){
        return res.status(400).json({error:error.message})
    }


## How To use:
You are welcome to be one of the four primary users of our
 website (Admin, Pharmacist and Patient). You can make an 
 account and login to the website by using the sign up page to
  create an account, After that, you will be able to utilize 
  our features, log in, and change your password.

## Contribute:
We welcome and appreciate contributions from the community to enhance El7a2ny and make it more robust. Whether it's fixing bugs, adding new features, or improving documentation, your contributions are valuable to us.

## Credits:
https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA


https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg  

https://www.youtube.com/playlist?
list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY

https://www.youtube.com/playlist?
list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK

https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h

As this is a university project, there is a credit to the teaching assistant Nada Ibrahim who helped us with any question we had and provided clear ways to improve.

## Tech :

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Features 👨‍🔬:
Our Website User Types
{Admin, Pharmacist, Patient}

1-Admin’s Features

As an admin you can:
log in using a username and password and log out
add another adminstrator with a set username and password
remove a pharmacist/patient from the system
view all of the information uploaded by a pharmacist to apply to join the platform
accept or reject the request of a pharmacist to join the platform
change password
reset a forgotten password through OTP sent to email
view a list of all available medicines (including picture of medicine, price, description)
search for medicine based on name
filter medicines based on medicinal use
view a total sales report based on a chosen month
view a pharmacist's information
view a patients's basic information


2-Pharmacist’s Features

As a pharmacist you can:
log in using a username and password and log out
upload and submit required documents upon registration such as ID, pharmacy degree and Working licenses  
change password
view a list of all available medicines (including picture of medicine, price, description)
view the available quantity, and sales of each medicine
reset a forgotten password through OTP sent to email
search for medicine based on name
filter medicines based on medicinal use
add a medicine with its details (active ingredients) , price and available quantity 
upload medicine image
edit medicine details and price
archive/ unarchive a medicine
view a total sales report based on a chosen month
filter sales report based on a medicine/date
chat with a doctor
view the amount in my wallet
Receive a notification once a medicine is out of stock on the system and via email
search for medicine based on name
filter medicines based on medicinal use
add an over the counter medicine in my cart


3-Patient’s Features

As a patient you can:
log in using a username and password and log out
change password
reset a forgotten password through OTP sent to email
view a list of all available medicines (including picture of medicine, price, description)
add a prescription medicine to my cart based on my prescription
view cart items
remove an item from the cart
change the amount of an item in the cart
checkout my order 
add a new delivery address (or multiple addresses)
choose a delivery address from the delivery addresses available
choose to pay with wallet, credit card (using Stripe) or cash on delivery
view current and past orders
view order details and status
cancel an order
view alternatives to a medicine that is out of stock based on main active ingredient
view the amount in my wallet
chat with a pharmacist

## Tests:
![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/WhatsApp%20Image%202023-12-17%20at%2002.24.57_2fafb120.jpg?raw=true)
![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/WhatsApp%20Image%202023-12-17%20at%2002.24.57_531570aa.jpg?raw=true)
![App Screenshot](https://github.com/advanced-computer-lab-2023/Code-Commandos-Pharmacy/blob/main/Screenshots/WhatsApp%20Image%202023-12-17%20at%2002.24.58_4a039f73.jpg?raw=true)


## License:

[MIT](https://choosealicense.com/licenses/mit/)

The project is licensed under the Apache License 2.0