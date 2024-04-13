const router = require('express').Router(),
 businessControllerController = require('../controller/businessController'),
 auth = require("../middleware/auth");
 
// Get Business Detail
router.get('/',auth, businessControllerController.getBussinessDetail);

// // Create business detail for user you businessName, contactNumber are required field to complete the request
router.post('/',auth, businessControllerController.CreateBussinessDetail);

// Update business Detail id field are compulasry to update the records
router.put('/',auth, businessControllerController.updateBussinessDetail);


module.exports = router;