var mongoose = require("mongoose")

const normalTransaction = new mongoose.Schema({
 payeename: {
    type: String,
    required: true,
  },
  payamount: {
    type: Number,
    required: true,
  },
  ifsccode: {
    type: String,
    required: true,
  },
  accountnumber: {
    type: Number,
    required: true,
  },
  transactiontype: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,  
  },
  time:{
  type:String,
  required: true
}
})

module.exports= mongoose.model("normaltransaction",normalTransaction)
