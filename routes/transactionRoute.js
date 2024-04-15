const router = require('express').Router(),
transactionController = require('../controller/transactionController'),
 auth = require("../middleware/auth");

// Create New Transaction
router.post('/',auth, transactionController.createTransaction);

// Get All transaction or get particular transaction
router.get('/',auth, transactionController.getTransactions);

// Update transaction 
router.put('/',auth, transactionController.updateTransaction);

//Delete Transaction
router.delete('/',auth, transactionController.deleteTransaction);


module.exports = router;