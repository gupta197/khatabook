const router = require('express').Router(),
transactionController = require('../controller/transactionController'),
 auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction Management
 * /transaction:
 *   post:
 *     description: API is use to create the transaction
 *     tags: [Transaction]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: customerId
 *         description: customerId of the customer that you create transaction 
 *         in: formData
 *         required: true
 *         type: string
 *       - name: amount
 *         description: Amount
 *         in: formData
 *         required: true
 *         type: string
 *       - name: type
 *         description: transaction type should be debit or credit
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: transaction description
 *         in: formData
 *         required: false
 *         type: string 
 *     responses:
 *       201:
 *         description: Transaction Created successfully
 *       400:
 *         description: Parameter missing.. !!
 *       404:
 *         description: Customer not found!! 
 *       500:
 *         description: Something went wrong!...
 */  
// Create New Transaction
router.post('/',auth, transactionController.createTransaction);

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction Management
 * /transaction:
 *   get:
 *     description: API is use to get the all transaction and transaction detail
 *     tags: [Transaction]
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
 *         description: Transaction Fetched sucessfully
 *       400:
 *         description: Bad Request 
 *       404:
 *         description: transactions not found
 *       500:
 *         description: Something went wrong!...
 */
// Get All transaction or get particular transaction
router.get('/',auth, transactionController.getTransactions);

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction Management
 * /transaction:
 *   put:
 *     description: API is use to update the transaction detail
 *     tags: [Transaction]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: an authorization header
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: id of the transaction
 *         in: formData
 *         required: true
 *         type: string
 *       - name: amount
 *         description: Amount
 *         in: formData
 *         required: true
 *         type: string
 *       - name: type
 *         description: transaction type should be debit or credit
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: transaction description
 *         in: formData
 *         required: false
 *         type: string 
 *     responses:
 *       200:
 *         description: Transaction update successfully
 *       400:
 *         description: Parameter missing.. !! / Customer Already exists!! 
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Something went wrong!...
 */ 
// Update transaction 
router.put('/',auth, transactionController.updateTransaction);

/**
* @swagger
* tags:
*   name: Transaction
*   description: Transaction Management
* /transaction:
*   delete:
*     description: API is use to delete the transaction detail
*     tags: [Transaction]
*     produces:
*       - application/json
*     parameters:
*       - name: x-access-token
*         description: an authorization header
*         in: header
*         required: true
*         type: string
*       - name: transactionId
*         description: Transaction id
*         in: formData
*         required: true
*         type: string
*     responses:
*       200:
*         description: Transaction Delete Successfully
*       400:
*         description: Parameter missing.. !!
*       404:
*         description: Transaction not found
*       500:
*         description: Something went wrong!...
*/
//Delete Transaction
router.delete('/',auth, transactionController.deleteTransaction);


module.exports = router;