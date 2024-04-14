const router = require('express').Router(),
khatabookController = require('../controller/khatabookController'),
customerController = require('../controller/customerController'),
 auth = require("../middleware/auth");
// create Customer 
router.get('/customers',auth, customerController.getCustomers);
router.post('/customer',auth, customerController.addNewCustomer);
router.put('/customer',auth, customerController.updateCustomerDetails);
router.delete('/customer',auth, customerController.deleteCustomer);

router.post('/',auth, khatabookController.getAllTransaction);


module.exports = router;