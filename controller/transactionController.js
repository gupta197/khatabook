const Customer = require('../model/customer'),
Transaction = require('../model/transaction'),
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
            const { userId } = req.user;
            // these field are used to create the customer amount, type , customerId, address
            let { amount, type , customerId} = req.body;
            type  = type == "credit" ? "credit" : "debit";
            if(commonFunctions.checkBlank([amount, type , customerId])){
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            let checkCustomer = await Customer.findOne({customerId , userId});
            if(checkCustomer && checkCustomer.length){
                req.body.transactionId = new mongoose.Types.ObjectId().toString();
                req.body.userId = userId;
                const transactions = await Transaction.create(req.body);
                res.status(200).send({
                    success: true,
                    message: "Transaction Created successfully",
                    transactions
                  });
            }
            return res.status(400).send({
                success: true,
                message: "Customer not found!!",
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
            const { userId } = req.user;
            // these field are used to create the customer amount, type , customerId, address
            const { transactionId } = req.body;
            if(commonFunctions.checkBlank([transactionId])){
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            //Check Transaction is exist 
            const checkTransaction = await Transaction.findOne({transactionId, userId});
            if(checkTransaction && checkTransaction.length == 0){
                return res.status(400).send({
                    success: false,
                    message: "Customer not found",
                });
            }
            // Delete customer 
            await Transaction.deleteOne({transactionId, userId})
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