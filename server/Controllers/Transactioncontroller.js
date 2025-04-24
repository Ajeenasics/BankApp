const NormalTransactionSchema = require("../Models/NormalTransactionschema");
const User = require("../Models/UsersSchema"); // Import User model
const createNormalTransaction = async (req, res) => {
  console.log(req.body);
  try {
    const { payeename, payamount, ifsccode, accountnumber, transactiontype, userid } = req.body;

    // Find the sender (payer)
    const sender = await User.findById(userid);
    if (!sender) {
      return res.status(404).json({ message: "Sender not found." });
    }

    // Check if sender has enough balance
    if (sender.userBalance < payamount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    if (transactiontype === "internal") {
      // Internal Transaction: Deduct from sender and credit receiver
      const receiver = await User.findOne({ userNumber: accountnumber });
      if (!receiver) {
        return res.status(404).json({ message: "Receiver account not found." });
      }

      sender.userBalance -= parseInt(payamount);
      receiver.userBalance += parseInt(payamount);

      await sender.save();
      await receiver.save();
    } else {
      // External Transaction: Deduct from sender only
      sender.userBalance -= parseInt(payamount);
      await sender.save();
    }

    // Create transaction record (applies to both internal & external)
    const transaction = new NormalTransactionSchema({
      payeename,
      payamount,
      ifsccode,
      accountnumber,
      transactiontype,
      userid,
      time: new Date().toLocaleTimeString()

    });

    await transaction.save();

    res.status(201).json({ message: "Transaction done successfully.",data:transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// const createNormalTransaction = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { payeename, payamount, ifsccode, accountnumber, transactiontype, userid } = req.body;

//     // Find the sender (payer)
//     const sender = await User.findById(userid);
//     if (!sender) {
//       return res.status(404).json({ message: "Sender not found." });
//     }

//     // Check if sender has enough balance
//     if (sender.userBalance < payamount) {
//       return res.status(400).json({ message: "Insufficient balance." });
//     }

//     // Find the receiver (payee) based on account number
//     const receiver = await User.findOne({ userNumber: accountnumber });
//     if (!receiver) {
//       return res.status(404).json({ message: "Receiver account not found." });
//     }

//     // Deduct amount from sender's balance
//     sender.userBalance -=parseInt(payamount);
//     await sender.save(); // Save sender's updated balance

//     // Credit amount to receiver's balance
//     receiver.userBalance += parseInt(payamount);
//     await receiver.save(); // Save receiver's updated balance

//     // Create transaction record
//     const transaction = new NormalTransactionSchema({
//       payeename,
//       payamount,
//       ifsccode,
//       accountnumber,
//       transactiontype,
//       userid,
//     });

//     await transaction.save();

//     res.status(201).json({ message: "Transaction done successfully." });
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };


// const createNormalTransaction = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { payeename, payamount, ifsccode, accountnumber, transactiontype, userid } = req.body;

//     // Find the user
//     const user = await User.findById(userid);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Check if user has enough balance
//     if (user.userBalance < payamount) {
//       return res.status(400).json({ message: "Insufficient balance." });
//     }

//     // Deduct amount from user balance
//     user.userBalance -= payamount;
//     await user.save(); // Save updated balance

//     // Create transaction
//     const transaction = new NormalTransactionSchema({
//       payeename,
//       payamount,
//       ifsccode,
//       accountnumber,
//       transactiontype,
//       userid,
//     });

//     await transaction.save();

//     res.status(201).json({ message: "Transaction done successfully." });
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

const viewAlllNormaTransactions = async (req, res) => {
  try {
    const transactions = await NormalTransactionSchema.find().populate("userid");
    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found." });
    }
    res.status(200).json({ message: "Data fetched", data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const transaction = await NormalTransactionSchema.findById(req.params.transactionid);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.status(200).json({ message: "Transaction found", data: transaction });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transaction", error });
  }
};
module.exports = { createNormalTransaction,viewAlllNormaTransactions ,getTransactionById};
