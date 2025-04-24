const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
  },
  userContact: {
    type: Number,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
  userCode: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userDate: {
    type: Date,
    required: true,
  },
  userNumber: {
    type: Number,
    required: true,
  },
  userPicture: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  ActiveStatus: {
    type: Boolean,
    default: true,
  },
  userBalance:{
    type: Number,
    required: true,
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;