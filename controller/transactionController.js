const User = require("../model/user"),
Customer = require('../model/customer'),
Transaction = require('../model/transaction'),
BussinessDetail = require('../model/businessDetail'),
Joi = require('joi'),
commonFunctions = require("../commonFunctions");

module.exports = { 
    getTransactions : async (req, res)=>{
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
            if(req.query.customerId && commonFunctions.checkBlank([req.query.customerId])){
                getDetailObj.customerId = req.query.customerId;
            }

            // This condition will help to get the user detail in same api
            if(req.query.id && commonFunctions.checkBlank([req.query.id])){
                getDetailObj.transactionId = req.query.id;
            }
            const transactions = await Transaction.find(getDetailObj);
            return res.status(200).send({
                success: true,
                message: "All Transaction Fetched sucessfully",
                records: transactions
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    createTransaction : async (req, res)=>{
        try {
            return res.status(200).send({
                success: true,
                message: "Transaction Created successfully",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    }, 
    updateTransaction : async (req, res)=>{
        try {
            return res.status(200).send({
                success: true,
                message: "Transaction update successfully",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    deleteTransaction : async (req, res)=>{
        try {
            return res.status(200).send({
                success: true,
                message: "Transaction Delete Successfully",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
}