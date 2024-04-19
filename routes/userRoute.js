const router = require('express').Router();
const {setup2fa,getUserDetail} = require('../controller/userController');
const auth = require("../middleware/auth");
/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
// Enable and disble the 2fA
router.post('/2fa',auth,setup2fa);
// Get User Detail
router.get('/',auth,getUserDetail);


module.exports = router;