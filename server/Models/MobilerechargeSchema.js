const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Ensure the reference to the User model
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  operator: {
    type: String,
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "RechargePlan",
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
