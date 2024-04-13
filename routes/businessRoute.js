const router = require('express').Router(),
 businessControllerController = require('../controller/businessController'),
 auth = require("../middleware/auth");
// Get Business Detail
router.get('/',auth, businessControllerController.getBussinessDetail);
router.post('/',auth, businessControllerController.CreateBussinessDetail);
router.put('/',auth, businessControllerController.updateBussinessDetail);


module.exports = router;