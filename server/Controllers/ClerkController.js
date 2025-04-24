const Clerk = require("../Models/ClerksSchema");

const multer = require("multer");
const jwt = require("jsonwebtoken");
const secret = "Clerk";

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

const specUp = multer({ storage: storage }).fields([
  { name: "profile", maxCount: 1 }, // Handle profile image
  { name: "idproof", maxCount: 2 }, // Handle ID proofs (max 2 files)
])

// Function to add a new Clerk
const AddClerk = async (req, res) => {  
  try {
    const {
      name,
      email,
      contact,
      password,
      dob,
      qualification,
      chooseid,
      address,
      dateofjoining,
    } = req.body;

    // Check for existing Clerk by email
    let existingClerkEmail = await Clerk.findOne({ email });
    if (existingClerkEmail) {
      return res.status(409).json({
        msg: "Email Already Registered With Us !!",
        data: null,
      });
    }

    // Check for existing Clerk by contact
    let existingClerkContact = await Clerk.findOne({ contact });
    if (existingClerkContact) {
      return res.status(409).json({
        msg: "Contact Already Exists !!",
        data: null,
      });
    }

    // Creating a new Clerk instance
    const newClerk = new Clerk({
      name,
      email,
      contact,
      password,
      dob,
      qualification,
      chooseid,
      address,
      idproof: req.files[0], // assuming first file is ID proof
      dateofjoining,
      profile: req.files[1], // assuming second file is profile image
    });

    // Save the new Clerk to the database
    await newClerk
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

const viewClerks = (req, res) => {
  Clerk.find()
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

const viewClerkById = (req, res) => {
  Clerk.findById(req.params.clerkid)
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

const editClerkById = async (req, res) => {
  const {
    name,
      email,
      contact,
      password,
      dob,
      qualification,
      chooseid,
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
      chooseid,
      address,
      dateofjoining,
  };

  if(req.files.idproof) {
    updateData.idproof = req.files.idproof[0];
  }

  if (req.files.profile) {
    updateData.profile = req.files.profile[0];
  }

  try {
    const data = await Clerk.findByIdAndUpdate(
      req.params.clerkid,
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

const loginClerk = (req, res) => {
  
  const { email, password } = req.body;
  Clerk.findOne({ email })
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
        msg:"login successfully"
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

const activateClerkById = (req, res) => {
  Clerk.findByIdAndUpdate({ _id: req.params.clerkid }, { ActiveStatus: true })
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
const deActivateClerkById = (req, res) => {
  Clerk.findByIdAndUpdate({ _id: req.params.clerkid }, { ActiveStatus: false })
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
  upload,loginClerk,
  AddClerk,
  viewClerks,
  viewClerkById,
  editClerkById,
  activateClerkById,
  deActivateClerkById,
  specUp
};
