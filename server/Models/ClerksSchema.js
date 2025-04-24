const mongoose = require("mongoose");

const ClerkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  chooseid: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  idproof: {
    type: Object,
    required: true,
  },
  dateofjoining: {
    type: Date,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
  },
  password: {
    type: String,
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
});

const Clerk = mongoose.model('Clerk', ClerkSchema);
module.exports = Clerk;