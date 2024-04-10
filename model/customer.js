const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var customerSchema = new Schema({
    userId: {
        type: String,
    },
    customerId: {
      type: Number,
    },
    name: {
      type: String // Credit OR debit
    },
    contactNumber: {
      type: String
    },
    email: {
      type: String
    },
    address: {
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
  
  module.exports = mongoose.model('Customer', customerSchema);