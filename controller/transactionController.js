const Customer = require('../model/customer'),
Transaction = require('../model/transaction'),
Joi = require('joi'),
commonFunctions = require("../commonFunctions");

module.exports = { 
    // Get all transaction with respect to user and get transaction detail
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

    // Generate new Transaction with respect to user
    createTransaction : async (req, res)=>{
        try {
            const { userId } = req.user;
            // these field are used to create the customer amount, type , customerId, address
            let { amount, type , customerId} = req.body;

            // Check the type should be credit or debit
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
            const { userId } = req.user;
            // these field are used to create the customer amount, type , customerId, address
            let { transactionId } = req.body;
            // Check if user will not update the to credit ot debit
            req.body.type ? req.body.type != "credit" ? req.body.type = "debit" : req.body.type = "credit" :  null ;
            //Check the Transaction id is not blank
            if(commonFunctions.checkBlank([transactionId])){

                //Sending the response to End user or requested user
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            //Check Transaction is exist with respect to user, only owner user will get his transaction detail
            let checkCustomer = await Transaction.find({transactionId, userId});

            //Check the transaction is present on DB for requested user
            if(checkCustomer && checkCustomer.length == 0){
                return res.status(400).send({
                    success: false,
                    message: "Transaction not found",
                });
            }

            // Update Transactions detail 
            delete req.body.customerId;
            delete req.body.userId;
            delete req.body._id;

            // Delete Transaction with respect to user, only owner user will delete his transaction 
            await Transaction.updateOne({transactionId }, req.body);

            //Sending the response to End user or requested user
            return res.status(200).send({
                success: true,
                message: "Transaction update successfully",
              });
              
        } catch (error) {
            //Sending the response to End user or requested user
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
            //Check the Transaction id is not blank
            if(commonFunctions.checkBlank([transactionId])){
                //Sending the response to End user or requested user
                return res.status(400).send({
                    success: false,
                    message: "Parameter missing.. !!",
                });
            }
            //Check Transaction is exist with respect to user, only owner user will get his transaction detail
            const checkTransaction = await Transaction.findOne({transactionId, userId});

            //Check the transaction is present on DB for requested user
            if(checkTransaction && checkTransaction.length == 0){

                //Sending the response to End user or requested user
                return res.status(400).send({
                    success: false,
                    message: "Transaction not found",
                });
            }
            // Delete Transaction with respect to user, only owner user will delete his transaction 
            await Transaction.deleteOne({transactionId, userId});

            //Sending the response to End user or requested user
            return res.status(200).send({
                success: true,
                message: "Transaction Delete Successfully",
              });

              //Handle the error
        } catch (error) {

            //Sending the response to End user or requested user
            return res.status(500).send({
                success: false,
                message: error.message,
              });
        }
    },
}