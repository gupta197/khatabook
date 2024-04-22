const router = require('express').Router(),
usersRoute = require('./userRoute'),
businessRoute = require('./businessRoute'),
customerRoute = require('./customerRoute'),
transactionRoute = require('./transactionRoute'),
userController = require('../controller/userController'),
auth = require('../controller/authContoller');

/**
 * @swagger
 * /register:
 *   post:
 *     description: Signup to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: User firstName to use for signup.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: User lastName use for signup.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: email
 *         description: User Email use for signup.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User password use for signup.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User registered successfully, Please verify your email!!
 *       400:
 *         description: login
 *       409:
 *         description: User Already Exist. Please Login
 *       500:
 *         description: login
 */

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
 *       - name: email
 *         description: email to use for login.
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
 *       400:
 *         description: login
 *       500:
 *         description: login
 */
// Login and setup 2 factor authication
router.post("/login",auth.login);

/**
 * @swagger
 * /verifyEmail:
 *   get:
 *     description: Verfiy the user Email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: q
 *         description: User id to use for verifyEmail.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User verified successfully, Please login!!
 *       400:
 *         description: Bad Request , no user found with such email!!!
 *       409:
 *         description: User Already verified. please login
 *       500:
 *         description: server error
 */
// Verify Email
router.get("/verifyEmail",auth.verifyEmail);

/**
 * @swagger
 * /forgetPassword:
 *   post:
 *     description: api to help the user to recover the password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User email to use for forget password api.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Reset Password email send to register email. Please check email
 *       400:
 *         description: Bad Request 
 *       500:
 *         description: server error
 */
// Forget Password
router.post("/forgetPassword",auth.forgetPassword);

/**
 * @swagger
 * /resetPassword/{id}/{token}:
 *   post:
 *     description: api to help the user to recover the password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User id to use for recover the password.
 *         in: path
 *         required: true
 *         type: string
 *       - name: token
 *         description: reset token help the user to recover the password.
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         description: create new password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Reset you password successfully
 *       400:
 *         description: Bad Request / Link expired or User Not Found!
 *       404:
 *         description: User not found 
 *       500:
 *         description: server error
 */

// Reset Passwords
router.post("/resetPassword/:id/:token",auth.resetPassword);
// OTP verification
router.post("/verifyOTP",auth.verifyOTP);
//otp share
router.post("/resendOtp",auth.resendOtp);

/**
 * @swagger
 * /contact-support:
 *   post:
 *     description: contact support api to help user to send his feedback
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: First name of user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: Last Name of user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: message
 *         description: Message to send to user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email to send to user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone to send to user
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: email Sent to user.
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Something went wrong!...
 */

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