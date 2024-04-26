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

/**
 * @swagger
 * /customer:
 *   post:
 *     description: API is use to create the customer detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: name
 *         description: Name of the customer
 *         in: formData
 *         required: true
 *         type: string
 *       - name: contactNumber
 *         description: customer Contact Number
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Customer email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: address
 *         description: Customer addess is not required
 *         in: formData
 *         required: false
 *         type: string 
 *     responses:
 *       201:
 *         description: New Customer added Successfully!!
 *       400:
 *         description: Parameter missing.. !!
 *       409:
 *         description: Customer Already exists!! 
 *       500:
 *         description: Something went wrong!...
 */ 

//Create new Customer with respect to user
router.post('/',auth, customerController.addNewCustomer);

/**
 * @swagger
 * /customer:
 *   put:
 *     description: API is use to update the customer detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: id of the customer
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: Name of the customer
 *         in: formData
 *         required: false
 *         type: string
 *       - name: contactNumber
 *         description: customer Contact Number
 *         in: formData
 *         required: false
 *         type: string
 *       - name: email
 *         description: Customer email
 *         in: formData
 *         required: false
 *         type: string
 *       - name: address
 *         description: Customer addess is not required
 *         in: formData
 *         required: false
 *         type: string 
 *     responses:
 *       200:
 *         description: Customer Detail Updated Successfully
 *       400:
 *         description: Parameter missing.. !! / Customer Already exists!! 
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Something went wrong!...
 */ 

// Update Customer Detail
router.put('/',auth, customerController.updateCustomerDetails);

/**
* @swagger
* /customer:
*   delete:
*     description: API is use to delete the customer detail
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: an authorization header
*         in: header
*         required: true
*         type: string
*       - name: id
*         description: customer id
*         in: formData
*         required: true
*         type: string
*     responses:
*       200:
*         description: Customer deleted Successfully
*       400:
*         description: Parameter missing.. !!
*       404:
*         description: Customer not found
*       500:
*         description: Something went wrong!...
*/
//Delete Customer
router.delete('/',auth, customerController.deleteCustomer);

module.exports = router;