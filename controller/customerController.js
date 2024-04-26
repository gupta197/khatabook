const User = require("../model/user"),
Customer = require('../model/customer'),
Transaction = require('../model/transaction'),
BussinessDetail = require('../model/businessDetail'),
Joi = require('joi'),
commonFunctions = require("../commonFunctions"),
mongoose = require('mongoose');
module.exports = {
    // Get User Customers and also we get customer detail in same api
    getCustomers : async (req, res)=>{
        try {
            const { userId } = req.user;
            let getDetailObj = {
                userId
            }
            if (commonFunctions.checkBlank([userId])) {
                return res.status(400).send({
                    success: false,
                    message: "Bad Request",
                });
            }
            // This condition will help to get the user detail in same api
            if(req.query.id && commonFunctions.checkBlank([req.query.id])){
                getDetailObj.customerId = req.query.id;
            }
            const customers = await Customer.findOne(getDetailObj);
            if (!customers || customers.length == 0) {
                return res.status(404).send({ success: false, message: "Customers not found" });
            }
            return res.status(200).send({ success: true, message: "Customer found Successfully", records: customers });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    // Create new with respect for user
    addNewCustomer : async (req, res)=>{
        try {
            const { userId } = req.user;
            // these field are used to create the customer name, contactNumber , email, address
            const { name, contactNumber , email} = req.body;
            if(commonFunctions.checkBlank([name, contactNumber , email])){
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            let checkCustomer = await Customer.find({email , userId})
            if(checkCustomer && checkCustomer.length){
                return res.status(409).send({
                    success: false,
                    message: "Customer Already exists!!",
                });
            }
            delete req.body.customerId;
            delete req.body.userId;
            req.body.customerId = new mongoose.Types.ObjectId().toString();
            req.body.userId = userId;
            const customerRes = await Customer.create(req.body);

            return res.status(201).send({
                success: true,
                message: "New Customer added Successfully!!",
                records: customerRes 
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    // Update customer Detail using this api
    updateCustomerDetails : async (req, res)=>{
        try {
            const { userId } = req.user;
            // these field are used to create the customer id, name, contactNumber , email, address
            const { id } = req.body;
            // Check if id is not null or empty
            if(commonFunctions.checkBlank([id])){
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            // get if user have customer with respect of id
            let checkCustomer = await Customer.find({customerId : id , userId})
            // Check if customer found in database
            if(checkCustomer && checkCustomer.length == 0){
                return res.status(404).send({
                    success: false,
                    message: "Customer not found",
                });
            }
            // Update customer detail 
            delete req.body.customerId;
            delete req.body.userId;
            delete req.body._id;
            await Customer.updateOne({customerId : id , userId}, req.body)
            return res.status(200).send({
                success: true,
                message: "Customer Detail Updated Successfully",
                records: []
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    // Delete the customer detail
    deleteCustomer : async (req, res)=>{
        try {
            const { userId } = req.user;
            // these field are used to create the customer id, name, contactNumber , email, address
            const { id } = req.body;
            // Check if id is not null or empty
            if(commonFunctions.checkBlank([id])){
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            // get if user have customer with respect of id
            const checkCustomer = await Customer.find({customerId : id , userId})
            // Check if customer found in database
            if(checkCustomer && checkCustomer.length == 0){
                return res.status(400).send({
                    success: false,
                    message: "Customer not found",
                });
            }
            // Delete customer 
            await Customer.deleteOne({customerId : id , userId})
            return res.status(200).send({
                success: true,
                message: "Customer deleted Successfully",
                records: []
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
}