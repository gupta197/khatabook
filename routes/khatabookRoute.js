const router = require('express').Router(),
khatabookController = require('../controller/khatabookController'),
customerController = require('../controller/customerController'),
 auth = require("../middleware/auth");
// create Customer 
router.get('/customers',auth, customerController.getCustomers);
router.get('/customer/:id',auth, customerController.customerDetail);
router.post('/customer/',auth, customerController.addNewCustomer);
router.put('/customers',auth, customerController.updateCustomerDetails);
router.delete('/customers',auth, customerController.deleteCustomer);

router.post('/',auth, khatabookController.getAllTransaction);


module.exports = router;