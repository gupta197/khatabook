const router = require('express').Router(),
usersRoute = require('./userRoute'),
businessRoute = require('./businessRoute'),
customerRoute = require('./customerRoute'),
transactionRoute = require('./transactionRoute'),
userController = require('../controller/userController'),
auth = require('../controller/authContoller');

// Register
router.post("/register", auth.register);

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
// Login and setup 2 factor authication
router.post("/login",auth.login);

// Verify Email
router.get("/verifyEmail",auth.verifyEmail);

// Forget Password
router.post("/forgetPassword",auth.forgetPassword);

// Reset Passwords
router.post("/resetPassword/:id/:token",auth.resetPassword);
// OTP verification
router.post("/verifyOTP",auth.verifyOTP);
//otp share
router.post("/resendOtp",auth.resendOtp);

//Contact Support API
router.post("/contact-support",userController.contactSuppport);

// Handle multiple routes like 2FA and User details
router.use("/user",usersRoute);

// Handle user Business Details
router.use("/business",businessRoute);

// Handle Customer Details
router.use("/customer",customerRoute);

// Handle User and Customer Transaction
router.use("/transaction",transactionRoute);

// Home page API
router.get('/',(req,res)=>{
    res.send("Welcome to Khatabook")
})

module.exports = router;