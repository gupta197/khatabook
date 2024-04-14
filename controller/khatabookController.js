const User = require("../model/user"),
Customer = require('../model/customer'),
Transaction = require('../model/transaction'),
BussinessDetail = require('../model/businessDetail'),
Joi = require('joi'),
commonFunctions = require("../commonFunctions"),
mongoose = require('mongoose');
module.exports = { 
    getAllTransaction : async (req, res)=>{
        try {
            return res.status(500).send({
                success: true,
                message: "New Customer Created",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
    detailCustomer : async (req, res)=>{
        try {
            return res.status(500).send({
                success: true,
                message: "New Customer Created",
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
                message: "New Customer Created",
              });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
}