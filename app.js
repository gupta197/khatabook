const express = require("express"),
 usersRoute = require('./routes/userRoute'),
 businessRoute = require('./routes/businessRoute'),
 customerRoute = require('./routes/customerRoute'),
 transactionRoute = require('./routes/transactionRoute'),
 userController = require('./controller/userController'),
 app = express();
 //Swagger Route
 const swaggerJsdoc = require("swagger-jsdoc");
 const swaggerUi = require("swagger-ui-express");



app.use(express.json());
app.use(express.urlencoded({extended:false}));

// importing Auth context
const auth = require('./controller/authContoller')

// Register
app.post("/register", auth.register);



// Login and setup 2 factor authication
app.post("/login",auth.login);

// Verify Email
app.get("/verifyEmail",auth.verifyEmail);

// Forget Password
app.post("/forgetPassword",auth.forgetPassword);

// Reset Passwords
app.post("/resetPassword/:id/:token",auth.resetPassword);
// OTP verification
app.post("/verifyOTP",auth.verifyOTP);
//otp share
app.post("/resendOtp",auth.resendOtp);

//Contact Support API
app.post("/contact-support",userController.contactSuppport);

// Handle multiple routes like 2FA and User details
app.use("/user",usersRoute);

// Handle user Business Details
app.use("/business",businessRoute);

// Handle Customer Details
app.use("/customer",customerRoute);

// Handle User and Customer Transaction
app.use("/transaction",transactionRoute);



// Home page API
app.get('/',(req,res)=>{
    res.send("Welcome to Khatabook")
})
const {options} = require('./swagger');
//Swagger Route
var swaggerSpecs = swaggerJsdoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
//No Page API
app.get('**',(req,res)=>{
    res.send("Page Not Found!")
})


module.exports = app;