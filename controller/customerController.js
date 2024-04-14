const User = require("../model/user"),
Customer = require('../model/customer'),
Transaction = require('../model/transaction'),
BussinessDetail = require('../model/businessDetail'),
Joi = require('joi'),
commonFunctions = require("../commonFunctions"),
mongoose = require('mongoose');
module.exports = {
    // Get User Customers 
    getCustomers : async (req, res)=>{
        try {
            const { userId } = req.user;
            if (commonFunctions.checkBlank([userId])) {
                return res.status(400).send({
                    success: false,
                    message: "Bad Request",
                });
            }
            const customers = await Customer.findOne({ userId });
            if (!customers || customers.length == 0) {
                return res.status(404).send({ success: false, message: "Customer list not found" });
            }
            return res.status(200).send({ success: true, message: "Customer list Found Successfully", customers });
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
                    message: "Name, Contact Number and Email are required",
                });
            }
            let checkCustomer = await Customer.find({email , userId})
            if(checkCustomer && checkCustomer.length){
                return res.status(400).send({
                    success: false,
                    message: "Customer Already exists!!",
                });
            }
            req.body.customerId = new mongoose.Types.ObjectId().toString();
            req.body.userId = userId;
            let customerRes = await Customer.create(req.body);

            return res.status(200).send({
                success: true,
                message: "New Customer added Successfully!!",
                customerRes 
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    customerDetail : async (req, res)=>{
        try {
            return res.status(200).send({
                success: true,
                message: "Customer detail Found Successfully!!",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    updateCustomerDetails : async (req, res)=>{
        try {
            return res.status(500).send({
                success: true,
                message: "customer deleted Successfully",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    deleteCustomer : async (req, res)=>{
        try {
            return res.status(500).send({
                success: true,
                message: "customer deleted Successfully",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
}