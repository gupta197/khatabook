const User = require("../model/user"),
Customer = require('../model/customer'),
Transaction = require('../model/transaction'),
BussinessDetail = require('../model/businessDetail'),
Joi = require('joi'),
commonFunctions = require("../commonFunctions");

module.exports = { 
    getTransactions : async (req, res)=>{
        try {
            return res.status(200).send({
                success: true,
                message: "All Transaction Fetched sucessfully",
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