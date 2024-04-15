const router = require('express').Router(),
customerController = require('../controller/customerController'),
 auth = require("../middleware/auth");

// Get All Customers or get Customer Details 
router.get('/',auth, customerController.getCustomers);

//Create new Customer with respect to user
router.post('/',auth, customerController.addNewCustomer);

// Update Customer Detail
router.put('/',auth, customerController.updateCustomerDetails);

//Delete Customer
router.delete('/customer',auth, customerController.deleteCustomer);

module.exports = router;