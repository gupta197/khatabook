const router = require('express').Router();
const {setup2fa,getUserDetail} = require('../controller/userController');
const auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management
 * /user/2fa:
 *   post:
 *     description: API is use to enable/disbale the 2 factor authication
 *     tags: [User]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: flag
 *         description: Flag is used for enable the 2 factor authicaation, it should be boolean value
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 2FA is alread enabled or disabled successfully
 *       400:
 *         description: Bad Request / no user found with such userId!!!
 *       500:
 *         description: Something went wrong!...
 */

// Enable and disble the 2fA
router.post('/2fa',auth,setup2fa);
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management
 * /user:
 *   get:
 *     description: API is use to enable/disbale the 2 factor authication
 *     tags: [User]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User detail found successfully
 *       4040:
 *         description: Bad Request 
 *       404:
 *         description: No User Found
 *       500:
 *         description: Something went wrong!...
 */
// Get User Detail
router.get('/',auth,getUserDetail);


module.exports = router;