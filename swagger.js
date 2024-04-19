const path = require('path');
// ------ Configure swagger docs ------

module.exports.options = {
    swaggerDefinition: {
      info: {
        title: "Khatabook API",
        version: "1.0.0",
        description: "Khatabook api for  practise",
      },
    },
    apis: [
        path.join(__dirname, "/routes/*.js"),
        path.join(__dirname, "app.js"),
    ],
  };
