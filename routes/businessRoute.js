const router = require('express').Router(),
 businessControllerController = require('../controller/businessController'),
 auth = require("../middleware/auth");

/**
 * @swagger
 * /business:
 *   get:
 *     description: API is use to get the business detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Business detail found successfully
 *       400:
 *         description: Bad Request 
 *       404:
 *         description: No Business Detail Found Found
 *       500:
 *         description: Something went wrong!...
 */ 
// Get Business Detail
router.get('/',auth, businessControllerController.getBussinessDetail);

/**
 * @swagger
 * /business:
 *   post:
 *     description: API is use to create the business detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: businessName
 *         description: Business name of user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: contactNumber
 *         description: user Contact Number
 *         in: formData
 *         required: true
 *         type: string
 *       - name: address
 *         description: User Address
 *         in: formData
 *         required: false
 *         type: string
 *       - name: businessType
 *         description: Business type for example salesman, employee, employer, businessma, etc.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: additionalDetail
 *         description: Some addition detail about user
 *         in: formData
 *         required: false
 *         type: string 
 *     responses:
 *       201:
 *         description: Business Detail Created successfully!!
 *       400:
 *         description: Bad Request 
 *       409:
 *         description: Bussiness Detail Already Exist.
 *       500:
 *         description: Something went wrong!...
 */ 

// Create business detail for user you businessName, contactNumber are required field to complete the request
router.post('/',auth, businessControllerController.CreateBussinessDetail);

/**
* @swagger
* /business:
*   put:
*     description: API is use to update the business detail
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: an authorization header
*         in: header
*         required: true
*         type: string
*       - name: id
*         description: business detail id
*         in: formData
*         required: true
*         type: string
*       - name: businessName
*         description: updated Business detail
*         in: formData
*         required: false
*         type: string
*       - name: contactNumber
*         description: Updated contact number of user
*         in: formData
*         required: false
*         type: string
*       - name: address
*         description: updated  user address
*         in: formData
*         required: false
*         type: string
*       - name: businessType
*         description: update business type
*         in: formData
*         required: false
*         type: string
*       - name: additionalDetail
*         description: Update additional detil
*         in: formData
*         required: false
*         type: string 
*     responses:
*       200:
*         description: Business Detail Updated successfully!!
*       400:
*         description: Bad Request 
*       404:
*         description:Bussiness Detail Not Exist.
*       500:
*         description: Something went wrong!...
*/ 

// Update business Detail id field are compulasry to update the records
router.put('/',auth, businessControllerController.updateBussinessDetail);


module.exports = router;