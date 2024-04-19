const express = require("express"),
app = express(),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express"),
mainRoute = require('./routes/mainRoute');

app.use(express.json());
app.use(express.urlencoded({extended:false}));


const {options} = require('./swagger');
//Swagger Route
var swaggerSpecs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/',mainRoute)
//No Page API
app.get('**',(req,res)=>{
    res.send("Page Not Found!")
})


module.exports = app;