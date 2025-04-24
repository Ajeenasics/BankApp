const Manager = require("../Models/ManagerSchema");

const multer = require("multer");
const jwt = require("jsonwebtoken");
const secret = "Manager";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("files");

// Function to add a new manager
const adminAddManager = async (req, res) => {
  const date=new Date()
  try {
    const {
      name,
      email,
      contact,
      password,
      dob,
      qualification,
      destination,
      address,
      dateofjoining,
    } = req.body;

    // Check for existing manager by email
    let existingManagerEmail = await Manager.findOne({ email });
    if (existingManagerEmail) {
      return res.status(409).json({
        msg: "Email Already Registered With Us !!",
        data: null,
      });
    }

    // Check for existing manager by contact
    let existingManagerContact = await Manager.findOne({ contact });
    if (existingManagerContact) {
      return res.status(409).json({
        msg: "Contact Already Exists !!",
        data: null,
      });
    }

    // Creating a new Manager instance
    const newManager = new Manager({
      name,
      email,
      contact,
      password,
      dob,
      qualification,
      destination,
      address,
      idproof: req.files[0], // assuming first file is ID proof
      dateofjoining,
      profile: req.files[1], // assuming second file is profile image
    });

    // Save the new manager to the database
    await newManager
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

const viewManagers = (req, res) => {
  Manager.find()
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

const viewManagerById = (req, res) => {
  Manager.findById(req.params.managerid)
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

const editManagerById = async (req, res) => {
  const {
    name,
    email,
    contact,
    password,
    dob,
    qualification,
    destination,
    address,
    dateofjoining,
  } = req.body;

  const updateData = {
    name,
    email,
    contact,
    password,
    dob,
    qualification,
    destination,
    address,
    // idproof: req.files[0], // assuming first file is ID proof
    dateofjoining,
    // profile: req.files[1],
  };

  if (req.files && req.files.length > 0) {
    for (var i in req.files) {
      if (req.files[i].mimetype.indexOf("video") > 0) {
        updateData.idproof = req.files[i];
      } else {
        updateData.profile = req.files[i];
      }
    }
  }

  try {
    const data = await Manager.findByIdAndUpdate(
      req.params.managerid,
      updateData,
      {
        new: true,
      }
    );
    res.json({
      status: 200,
      msg: "Updated successfully",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.json({
      status: 502,
      msg: "Data not updated",
      Error: err,
    });
  }
};

//  login

const createToken = (user) => {
  return jwt.sign({ userId: user.id }, secret, { expiresIn: "1hr" });
};

const ManagerLogin = (req, res) => {
  
  const { email, password } = req.body;
 
    Manager.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.json({ status: 409, msg: "user not found" });
      } else if (user.password !== password) {
        return res.json({ status: 409, msg: "Password Missmatch !!" });
      }

      const token = createToken(user);

      res.json({
        data: user,
        status: 200,
        token: token,
        ActiveStatus:user.ActiveStatus,
        msg:"Login successfully"
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
  Mentor.mentors
    .findOneAndUpdate(
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

const activateManagerById = (req, res) => {
  Manager.findByIdAndUpdate({ _id: req.params.id }, { ActiveStatus: true })
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
const deActivateManagerById = (req, res) => {
  Manager.findByIdAndUpdate({ _id: req.params.id }, { ActiveStatus: false })
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

module.exports = {
  upload,
  adminAddManager,
  viewManagers,
  viewManagerById,
  editManagerById,
  activateManagerById,
  deActivateManagerById,
  ManagerLogin
};
