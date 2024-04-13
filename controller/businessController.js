const User = require("../model/user"),
    Customer = require('../model/customer'),
    Transaction = require('../model/transaction'),
    BussinessDetail = require('../model/businessDetail'),
    Joi = require('joi'),
    commonFunctions = require("../commonFunctions"),
    mongoose = require('mongoose');


module.exports = {
    getBussinessDetail: async (req, res) => {
        try {
            const { userId } = req.user;
            if (commonFunctions.checkBlank([userId])) {
                return res.status(400).send({
                    success: false,
                    message: "Bad Request",
                });
            }
            const businessDetail = await BussinessDetail.findOne({ userId });
            if (!businessDetail) {
                return res.status(200).send({ success: false, message: "No Business Detail Found Found" });
            }
            return res.status(200).send({ success: true, message: "Business detail found successfully", businessDetail });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    },

    CreateBussinessDetail: async (req, res) => {
        try {
            const { userId } = req.user;
            const { businessName, contactNumber, address, businessType, additionalDetail } = req.body;
            if(commonFunctions.checkBlank([businessName,contactNumber])){
                return res.status(400).send({
                    success: false,
                    message: error.message,
                });
            }
            const oldDetails = await BussinessDetail.findOne({ userId });

            if (oldDetails) {
                return res.status(409).send({
                    success: false,
                    message: "Bussiness Detail Already Exist. ",
                });
            }
            const bussinessDetail = await BussinessDetail.create({
                businessName,
                contactNumber,
                address,
                businessType,
                userId,
                additionalDetail
            });

            return res.status(201).send({
                success: true,
                message: "Business Detail Created successfully!!",
                bussinessDetail
            });


        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    },
    updateBussinessDetail2: async (req, res) => {
        try {
            const { userId } = req.user;
            const { businessName, contactNumber, address, businessType, additionalDetail } = req.body;
            const { id } = req.params;

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    },
}