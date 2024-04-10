const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Business Schema
 */
var businessSchema = new Schema({
    userId: {
        type: String,
    },
    businessName: {
      type: String,
    },
    address: {
      type: String
    },
    contactNumber: {
      type: String
    },
    businessType: {
      type: String
    },
    additionalDetail: {
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
  
  module.exports = mongoose.model('Business', businessSchema);