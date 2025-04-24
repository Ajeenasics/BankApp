var mongoose = require("mongoose");

const OnlineTransaction = new mongoose.Schema({
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
  chequeimage: {
    type: Object,
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
  transactionapproval: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
},
transactionverification: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
},
time:{
  type:String,
  required: true
}
});

module.exports = mongoose.model("onlinechequetransaction", OnlineTransaction);
