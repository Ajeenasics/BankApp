const User = require("../Models/UsersSchema");

const multer = require("multer");
const jwt = require("jsonwebtoken");
const secret = "User";

const nodemailer = require("nodemailer");
const config = require("../configuration");

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "supprot.web.application@gmail.com",
    pass: "ukyw olqq kuql jnty",
  },
});

const testMail = (data) => {
  
  let email = data.email;
  const mailOptions = {
    from: "supprot.web.application@gmail.com",
    to: email,
    subject: "Reset Password From Unicredit bank Application",
    text: `Dear ${data.username},${"\n"}please check this link : ${
      config.serverUrl ||  config.localUrl
    }${data._id} to reset your password`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
    }
  });
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("userPicture");

// Function to add a new user
const UserRegister = async (req, res) => {
  try {
    const {
      username,
      userContact,
      userAddress,
      userCode,
      userPassword,
      userMail,
      userDate,
      userNumber,
      userPicture,
    } = req.body;

    // Check for existing user by email
    let existingUserEmail = await User.findOne({ userMail });
    if (existingUserEmail) {
      return res.status(409).json({
        msg: "Email Already Registered With Us !!",
        data: null,
      });
    }

     // Check for existing user by email
     let existingUserAccount = await User.findOne({ userNumber });
     if (existingUserAccount) {
       return res.status(409).json({
         msg: "Account Number is Already Exists !!",
         data: null,
       });
     }

    // Check for existing user by contact
    let existingUserContact = await User.findOne({ userContact });
    if (existingUserContact) {
      return res.status(409).json({
        msg: "Contact Already Exists !!",
        data: null,
      });
    }

    // Creating a new User instance
    const newUser = new User({
      username,
      userContact,
      userAddress,
      userCode,
      userPassword,
      userMail,
      userDate,
      userNumber,
      userBalance:1000,
      userPicture: req.files[0],
    });

    // Save the new user to the database
    await newUser
      .save()
      .then((data) => {
        res.status(200).json({
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Data not Inserted",
          data: err,
        });
      });
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: error.message });
  }
};

const viewUsers = (req, res) => {
  User.find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json({
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "No Data obtained",
          data: [],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

const viewUserById = (req, res) => {
  User.findById(req.params.userid)
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const editUserById = async (req, res) => {
  const {
    username,
    userContact,
    userAddress,
    userCode,
    userPassword,
    userMail,
    userDate,
    userNumber,
    userPicture
  } = req.body;

  const updateData = {
    username,
    userContact,
    userAddress,
    userCode,
    userPassword,
    userMail,
    userDate,
    userNumber,
    userPicture
  };

  if (req.files) {
    updateData.userPicture = req.files[0]
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userid, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    res.status(200).json({ status: 200, msg: "Updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ status: 500, msg: "An error occurred", error: error.message });
  }
};


//  login

const createToken = (user) => {
  return jwt.sign({ userId: user.id }, secret, { expiresIn: "1hr" });
};

const LoginUser = (req, res) => {
  
  const { userMail, userPassword } = req.body;

  User.findOne({ userMail })
    .exec()
    .then((user) => {

      if (!user) {
        return res.json({ status: 409, msg: "user not found" });
      } else if (user.userPassword !== userPassword) {
        return res.json({ status: 409, msg: "Password Missmatch !!" });
      }

      const token = createToken(user);

      res.json({
        data: user,
        status: 200,
        token: token,
        ActiveStatus:user.ActiveStatus,
        msg: "User login successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    });
};
// Validate Token
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ msg: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
  });
};

// Forgot Password for entrepreneur
const forgotPassword = (req, res) => {
  Clerk.findOneAndUpdate(
      { email: req.body.email },
      {
        password: req.body.password,
      }
    )
    .exec()
    .then((data) => {
      if (data != null)
        res.status(200).json({
          msg: "Updated successfully",
        });
      else
        res.status(500).json({
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not Updated",
        Error: err,
      });
    });
};

const activateUserById = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { ActiveStatus: true })
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Activated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "No Data obtained",
        Error: err,
      });
    });
};

// approve investorReq by  Admin
const deActivateUserById = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, { ActiveStatus: false })
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "DeActivated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const forgotPWDsentMail = async (req, res) => {
 console.log(req.body,"pp");
 
  try {
    const data = await User.find({userMail:req.body.email})
    console.log(data.userMail ,"data");

    if(data.userMail) {
      
      const id = data._id.toString();
      console.log(id ,"data");

      testMail(data);
      res.json({
        status: 200,
        msg: "A password reset link has been sent to your Email.Please check",
      });
    } else {
      res.json({
        status: 500,
        msg: "Enter your Registered MailId",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      msg: "Data not Updated",
      Error: err,
    });
  }
};

const resetPassword = async (req, res) => {
  await Clerk.findByIdAndUpdate(
    { _id: req.params.id },
    {
      password: req.body.password,
    }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Password Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

module.exports = {
  upload,
  UserRegister,
  viewUsers,
  viewUserById,
  editUserById,
  activateUserById,
  deActivateUserById,
  LoginUser,
  forgotPWDsentMail,
  resetPassword
};
