const router = require('express').Router(),
 businessControllerController = require('../controller/businessController'),
 auth = require("../middleware/auth");
// Get Business Detail
router.get('/',auth, businessControllerController.getBussinessDetail);


module.exports = router;