const BussinessDetail = require('../model/businessDetail'),
    Joi = require('joi'),
    commonFunctions = require("../commonFunctions");


module.exports = {
    //Get Business Detail no field required
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
                return res.status(404).send({ success: false, message: "No Business Detail Found Found" });
            }
            return res.status(200).send({ success: true, message: "Business detail found successfully", records: businessDetail });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    },
    // Create business detail for user you businessName, contactNumber are required field to complete the request
    CreateBussinessDetail: async (req, res) => {
        try {
            const { userId } = req.user;
            // these field are used to create the business detail businessName, contactNumber, address, businessType, additionalDetail
            const { businessName, contactNumber} = req.body;
            if(commonFunctions.checkBlank([businessName,contactNumber])){
                return res.status(400).send({
                    success: false,
                    message: error.message,
                });
            }
            const oldDetails = await BussinessDetail.findOne({ userId });
            req.body.userId = userId;
            if (oldDetails) {
                return res.status(409).send({
                    success: false,
                    message: "Bussiness Detail Already Exist. ",
                });
            }
            
            const bussinessDetail = await BussinessDetail.create(req.body);

            return res.status(201).send({
                success: true,
                message: "Business Detail Created successfully!!",
                records: bussinessDetail
            });


        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    },
    // Update business detail records id field is compulasry to complete the request
    updateBussinessDetail: async (req, res) => {
        try {
            // these field are used to update detail businessName, contactNumber, address, businessType, additionalDetail
            const { id } = req.body;
            if(commonFunctions.checkBlank([id])){
                return res.status(400).send({
                    success: false,
                    message: error.message,
                });
            }
            const oldDetails = await BussinessDetail.findOne({ _id : id });
            if(!oldDetails){
                return res.status(404).send({
                    success: false,
                    message: "Bussiness Detail Not Exist. ",
                });
            }
            delete req.body.userId;
            let bussinessDetail = await BussinessDetail.updateOne(
                { _id: id }, req.body
              )
              return res.status(200).send({
                success: true,
                message: "Business Detail Updated successfully!!",
                records: bussinessDetail
            });

        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    },
}