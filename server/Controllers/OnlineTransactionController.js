const OnlineTransaction = require("../Models/OnlineTransaction");
const User = require("../Models/UsersSchema"); // Import User model
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("chequeimage");

// Create a new online transaction
const createTransaction = async (req, res) => {
  console.log(req.body);

  try {
    const { payeename, payamount, ifsccode, accountnumber, userid } = req.body;
    
    // Check if cheque image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Cheque image is required." });
    }

    // Find the user
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if user has enough balance
    if (user.userBalance < payamount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    // Deduct amount from user balance
    // user.userBalance -= payamount;
    await user.save(); // Save updated balance

    // Create transaction
    const transaction = new OnlineTransaction({
      payeename,
      payamount,
      ifsccode,
      accountnumber,
      chequeimage: req.file, // Store only file path
      userid,
      time: new Date().toLocaleTimeString()
    });

    await transaction.save();

    res.status(201).json({ message: "Transaction successfully created.",data:transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all transactions
const viewAllTransactions = async (req, res) => {
  try {
    const transactions = await OnlineTransaction.find().populate("userid");
    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

// Get transactions by user ID
const viewUserTransactions = async (req, res) => {
  try {
    const transactions = await OnlineTransaction.find({ userid: req.params.userid }).populate("userid");
    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for this user." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

// Verify a transaction
const toVerifyTransactions = async (req, res) => {
  try {
    const transaction = await OnlineTransaction.findByIdAndUpdate(
      req.params.transactionid,
      { transactionverification: "Approved" },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.status(200).json({ message: "Transaction Verified", data: transaction });
  } catch (error) {
    res.status(500).json({ message: "Transaction verification failed", error });
  }
};

// View non-verified transactions
const viewNonVerifiedTransactions = async (req, res) => {
  try {
    const transactions = await OnlineTransaction.find({ transactionverification: "Pending" }).populate("userid");
    if (transactions.length === 0) {
      return res.status(404).json({ message: "No pending transactions." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transactions", error });
  }
};

const toRejectverificationTransactions = async (req, res) => {
  try {
    const transaction = await OnlineTransaction.findByIdAndUpdate(
      req.params.transactionid,
      { transactionverification: "Rejected" },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.status(200).json({ message: "Transaction Rejected", data: transaction });
  } catch (error) {
    res.status(500).json({ message: "Transaction rejection failed", error });
  }
};

// View verified transactions
const viewVerifiedTransactions = async (req, res) => {
  try {
    const transactions = await OnlineTransaction.find({ transactionverification: "Approved" }).populate("userid");
    if (transactions.length === 0) {
      return res.status(404).json({ message: "No approved transactions." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transactions", error });
  }
};

// Approve a transaction
const toApproveTransactions = async (req, res) => {
  try {
    // Find the transaction
    const transaction = await OnlineTransaction.findById(req.params.transactionid);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // Find the user associated with the transaction
    const user = await User.findById(transaction.userid);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if user has enough balance before approving
    if (user.userBalance < transaction.payamount) {
      return res.status(400).json({ message: "Insufficient balance for approval." });
    }

    // Deduct the amount from the user's balance
    user.userBalance -= transaction.payamount;
    await user.save(); // Save updated balance

    // Update the transaction status to approved
    transaction.transactionapproval = "Approved";
    await transaction.save(); // Save updated transaction status

    res.status(200).json({ message: "Transaction Approved and amount deducted.", data: transaction });
  } catch (error) {
    console.error("Error approving transaction:", error);
    res.status(500).json({ message: "Transaction approval failed", error });
  }
};


// Reject a transaction
const toRejectTransactions = async (req, res) => {
  try {
    const transaction = await OnlineTransaction.findByIdAndUpdate(
      req.params.transactionid,
      { transactionapproval: "Rejected" },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.status(200).json({ message: "Transaction Rejected", data: transaction });
  } catch (error) {
    res.status(500).json({ message: "Transaction rejection failed", error });
  }
};


// View non-approved transactions
const viewNonApprovedTransactions = async (req, res) => {
  try {
    const transactions = await OnlineTransaction.find({
      transactionverification: "Approved",
      transactionapproval: "Pending",
    }).populate("userid");

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No pending approvals." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transactions", error });
  }
};

// View approved transactions
const viewApprovedTransactions = async (req, res) => {
  try {
    const transactions = await OnlineTransaction.find({
      transactionverification: "Approved",
      transactionapproval: "Approved",
    }).populate("userid");

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No approved transactions." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transactions", error });
  }
};

// View approved transactions by user ID
const viewApprovedTransactionsByUserId = async (req, res) => {
  try {
    const transactions = await OnlineTransaction.find({
      userid: req.params.userid,
      transactionverification: "Approved",
      transactionapproval: "Approved",
    }).populate("userid");

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No approved transactions for this user." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve transactions", error });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transaction = await OnlineTransaction.findById(req.params.transactionid);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.status(200).json({ message: "Transaction found", data: transaction });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transaction", error });
  }
};


module.exports = {
  upload,
  createTransaction,
  viewAllTransactions,
  viewUserTransactions,
  toVerifyTransactions,
  viewNonVerifiedTransactions,
  viewVerifiedTransactions,
  toApproveTransactions,
  toRejectTransactions,
  viewNonApprovedTransactions,
  viewApprovedTransactions,
  toRejectverificationTransactions,
  viewApprovedTransactionsByUserId,getTransactionById
};
