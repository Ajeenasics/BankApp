const mongoose = require("mongoose");

const LifeInsuranceAppalySchema = new mongoose.Schema({
  nomineename: {
    type: String,
    required: true,
  },
  nomineecontactnumber: {
    type: Number,
    required: true,
  },
  nomineerelationship: {
    type: String,
    required: true,
  },
  nomineeaddress: {
    type: String,
    required: true,
  },
  incomeproof: {
    type: Object,
    required: true,
  },
  medicalreport: {
    type: Object,
  },
  idproof: {
    type: Object,
    required: true,
  },
  smoking: {
    type: String,
    required: true,
  },
  currentmedication: {
    type: String,
    required: true,
  },
  existingconditions: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Insurance",
    required: true,

  },
  approvalstatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  insuranceverification:{
    type:Boolean,
    default: false,

  }
});

const insuranceapply = mongoose.model(
  "InsuranceApply",
  LifeInsuranceAppalySchema
);
module.exports = insuranceapply;
