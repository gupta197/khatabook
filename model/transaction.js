const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Transaction Schema
 */
var transactionSchema = new Schema({
    customerId: {
        type: String,
    },
    transactionId: {
      type: String,
    },
    type: {
      type: String // Credit OR debit
    },
    amount: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updateAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Transaction', transactionSchema);