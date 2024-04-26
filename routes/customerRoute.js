const router = require('express').Router(),
customerController = require('../controller/customerController'),
 auth = require("../middleware/auth");

 /**
 * @swagger
 * /customer:
 *   get:
 *     description: API is use to get the all customers and customer detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: customer id that you need to check the detail
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Customer Found Successfully
 *       400:
 *         description: Bad Request 
 *       404:
 *         description: Customers not found
 *       500:
 *         description: Something went wrong!...
 */

// Get All Customers or get Customer Details 
router.get('/',auth, customerController.getCustomers);


//Create new Customer with respect to user
router.post('/',auth, customerController.addNewCustomer);



// Update Customer Detail
router.put('/',auth, customerController.updateCustomerDetails);


//Delete Customer
router.delete('/',auth, customerController.deleteCustomer);

module.exports = router;