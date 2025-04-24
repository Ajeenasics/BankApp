const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({

    loantype: {
        type: String,
        required: true
    },
    loanamount: {
        type: Number,
        required: true
    },
    loanpurpose: {
        type: String,
        required: true
    },
    loanapproval: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    loanverification: {
        type: Boolean,
        default: false
    },
    pancardnumber: {
        type: String,
        required: true
    },
    pancardimage: {
        type: Object,
        required: true
    },
    aadharnumber: {
        type: String,
        required: true
    },
    aadharimage: {
        type: Object,
        required: true
    },
    votersidfile: {
        type: Object
    },
    drivinglicensefile: {
        type: Object
    },
    passportfile: {
        type: Object
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    nameofemployer: {
        type: String,
        required: true
    },
    employercontact: {
        type: Number,
        required: true
    },
    workexp: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salaryslipimg: {
        type: Object,
        required: true
    }


})

const Loan = mongoose.model("Loan", LoanSchema);
module.exports = Loan;