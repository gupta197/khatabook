const path = require('path');
// ------ Configure swagger docs ------

module.exports.options = {
    swaggerDefinition: {
      info: {
        title: "Khatabook API",
        version: "1.0.0",
        description: "Khatabook api for  practise",
        license: {
          name: "MIT",
          url: "https://github.com/gupta197",
        },
        contact: {
          name: "Vikas Gupta",
          url: "https://github.com/gupta197",
          email: "vikasgupta1097@gmail.com",
        },
      },
    },
    apis: [
        path.join(__dirname, "/routes/*.js"),
        path.join(__dirname, "app.js"),
    ],
  };
