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
 *       4040:
 *         description: Bad Request 
 *       404:
 *         description: No Business Detail Found Found
 *       500:
 *         description: Something went wrong!...
 */ 
// Get Business Detail
router.get('/',auth, businessControllerController.getBussinessDetail);


// Create business detail for user you businessName, contactNumber are required field to complete the request
router.post('/',auth, businessControllerController.CreateBussinessDetail);

// Update business Detail id field are compulasry to update the records
router.put('/',auth, businessControllerController.updateBussinessDetail);


module.exports = router;