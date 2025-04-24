const Waterbill = require("../Models/WaterbillSchema");
const Electricbill = require("../Models/ElectricbillSchema");
const Payment = require("../Models/MobilerechargeSchema");
const NormalTransaction = require("../Models/NormalTransactionschema");
const OnlineTransaction = require("../Models/OnlineTransaction");

const getUserTransactions = async (req, res) => {
    try {
        const { userid } = req.params;

        const waterBills = await Waterbill.find({ userid }).lean();
        const electricBills = await Electricbill.find({ userid }).lean();
        const payments = await Payment.find({ userid }).lean();
        const normalTransactions = await NormalTransaction.find({ userid }).lean();
        const onlineTransactions = await OnlineTransaction.find({ userid }).lean();

        let allTransactions = [
            ...waterBills.map(bill => ({ ...bill, type: 'Water Bill' })),
            ...electricBills.map(bill => ({ ...bill, type: 'Electric Bill' })),
            ...payments.map(payment => ({ ...payment, type: 'Mobile recharge' })),
            ...normalTransactions.map(transaction => ({ ...transaction, type: 'Normal Transaction' })),
            ...onlineTransactions.map(transaction => ({ ...transaction, type: 'Online Transaction' })),
        ];

    console.log(allTransactions,"");
    allTransactions.sort((a, b) => a.time-b.time)
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json({ success: true, data: allTransactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getAllTransactions = async (req, res) => {
    try {

        const waterBills = await Waterbill.find().populate('userid').lean();
        const electricBills = await Electricbill.find().populate('userid').lean();
        const payments = await Payment.find().populate('userid').lean();
        const normalTransactions = await NormalTransaction.find().populate('userid').lean();
        const onlineTransactions = await OnlineTransaction.find().populate('userid').lean();

        let allTransactions = [
            ...waterBills.map(bill => ({ ...bill, type: 'Water Bill' })),
            ...electricBills.map(bill => ({ ...bill, type: 'Electric Bill' })),
            ...payments.map(payment => ({ ...payment, type: 'Mobile recharge' })),
            ...normalTransactions.map(transaction => ({ ...transaction, type: 'Normal Transaction' })),
            ...onlineTransactions.map(transaction => ({ ...transaction, type: 'Online Cheque Transaction' })),
        ];

        allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        
        res.status(200).json({ success: true, data: allTransactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports={getUserTransactions,getAllTransactions}