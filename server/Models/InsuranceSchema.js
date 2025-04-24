const mongoose = require("mongoose");

const LifeInsuranceSchema = new mongoose.Schema({

    planname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverageamount: {
        type: Number,
        required: true
    },
    amounttobepaid: {
        type: Number,
        required: true
    },
    policyterm: {
        type: String,
        required: true
    },
    paymentfrequency: {
        type: String,
        required: true
    },
    planimage: {
        type: Object,
        required: true
    },
    insuranceverification: {
        type: Boolean,
        default: false
    },
    approvalstatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const Card = mongoose.model("Insurance", LifeInsuranceSchema);
module.exports = Card;