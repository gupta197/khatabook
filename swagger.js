const path = require('path');
// ------ Configure swagger docs ------

module.exports.options = {
    swaggerDefinition: {
      info: {
        title: "My API",
        version: "1.0.0",
        description: "My API for doing cool stuff!",
      },
    },
    apis: [path.join(__dirname, "/routes/*.js")],
  };
