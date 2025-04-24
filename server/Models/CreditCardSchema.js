const mongoose = require("mongoose");

const CreditCardSchema = new mongoose.Schema({

    pancardnumber: {
        type: String,
        required: true
    },
    cardtype: {
        type: String,
        enum: ['Platinum', 'Gold'],
    },
    employmentstatus: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    creditcardlimit: {
        type: Number,
        required: true
    },
    idproof: {
        type: Object,
        required: true
    },
    incomeproof: {
        type: Object,
        required: true
    },
    verificationstatus: {
        type: Boolean,
        default: false
    },
    approvalstatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
});

const Card = mongoose.model("Card", CreditCardSchema);
module.exports = Card;