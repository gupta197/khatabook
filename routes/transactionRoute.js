const router = require('express').Router(),
transactionController = require('../controller/transactionController'),
 auth = require("../middleware/auth");

 
// Create New Transaction
router.post('/',auth, transactionController.createTransaction);

/**
 * @swagger
 * /transaction:
 *   get:
 *     description: API is use to get the all transaction and transaction detail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: transaction id that you need to check the detail
 *         in: query
 *         required: false
 *         type: string
*       - name: customerId
 *         description: Customer id that you need to check the transaction detail
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: transaction Found Successfully
 *       400:
 *         description: Bad Request 
 *       404:
 *         description: transactions not found
 *       500:
 *         description: Something went wrong!...
 */
// Get All transaction or get particular transaction
router.get('/',auth, transactionController.getTransactions);

// Update transaction 
router.put('/',auth, transactionController.updateTransaction);

//Delete Transaction
router.delete('/',auth, transactionController.deleteTransaction);


module.exports = router;