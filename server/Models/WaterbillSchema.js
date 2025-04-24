var mongoose = require("mongoose");

const WaterbillSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billnumber: {
    type: Number,
    required: true,
  },
  accountnumber: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,  
  },
  time: { 
        type: String, 
        required: true 
    } 
});

const waterbill = mongoose.model("waterbill", WaterbillSchema);
module.exports = waterbill;
