const router = require('express').Router(),
 khatabookController = require('../controller/khatabookController'),
 auth = require("../middleware/auth");
// Get Business Detail
router.get('/business',auth, khatabookController.getBussinessDetail);
// Get User Detail
// router.get('/',auth,getUserDetail);


module.exports = router;