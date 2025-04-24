const Payment = require("../Models/MobilerechargeSchema");
const User = require("../Models/UsersSchema");

// Function to check if the user has already paid in the given month
const checkExistingMobilePayment = async ({ userid, month, year,mobileNumber}) => {
  const existingPayment = await Payment.findOne({
    userid, // Ensure filtering by userid
    month,
    year,
    mobileNumber
  }).exec();
  return !!existingPayment; // Returns true if payment exists, otherwise false
};

const mobilepayment = async (req, res) => {
  try {
    const { mobileNumber, operator, planId, amount, month, year, userid } = req.body;

    // Validate required fields
    if (!mobileNumber || !operator || !planId || !amount || !month || !year || !userid) {
      return res.status(400).json({ msg: "All fields are required." });
    }
    if (amount <= 0) {
      return res.status(400).json({ msg: "Invalid amount." });
    }

    // Check if the user has already made a payment for this month
    const hasExistingPayment = await checkExistingMobilePayment({ userid, month, year ,mobileNumber});

    if (hasExistingPayment) {
      return res.status(400).json({
        msg: "You have already made a payment for this month.",
      });
    }

    // Validate user and check balance
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    if (user.userBalance < amount) {
      return res.status(400).json({ msg: "Insufficient balance for bill payment." });
    }

    // Deduct balance and update user
    user.userBalance -= amount;
    await user.save();

    // Create and save new payment record
    const payment = new Payment({
      userid, // Ensure userid is saved in the database
      mobileNumber,
      operator,
      planId,
      amount,
      month,
      year,
      date: new Date(), // Save the current date of payment
    });

    await payment.save();

    // Respond with success message
    res.status(200).json({
      msg: "Payment successful!",
      payment,
      remainingBalance: user.userBalance,
    });
  } catch (error) {
    console.error("Error in processing payment:", error);
    res.status(500).json({
      msg: "An error occurred while processing payment.",
    });
  }
};

module.exports = { mobilepayment };
