
const insuranceApplySchema = require("../Models/InsuranceApplySchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).fields([
  { name: "idproof", maxCount: 1 },
  { name: "incomeproof", maxCount: 1 },
  { name: "medicalreport", maxCount: 1 },
]);

// for saving loan application data
const SaveInsuranceApplyApplicationData = async (req, res) => {
  const insuranceData = new insuranceApplySchema({
    userid: req.body.userid,
    planid: req.body.planid,
    nomineename: req.body.nomineename,
    nomineecontactnumber: req.body.nomineecontactnumber,
    nomineerelationship: req.body.nomineerelationship,
    nomineeaddress: req.body.nomineeaddress,
    currentmedication: req.body.currentmedication,
    existingconditions: req.body.existingconditions,
    idproof: req.files["idproof"] ? req.files["idproof"][0] : null,
    smoking: req.body.smoking,
    incomeproof: req.files["incomeproof"] ? req.files["incomeproof"][0] : null,
    medicalreport: req.files["medicalreport"]
      ? req.files["medicalreport"][0]
      : null,
  });

  await insuranceData
    .save()
    .then((response) => {
      res.json({ status: 200, msg: "Application Successfull", data: response });
    })

    .catch((error) => {
      console.log(error);
      res.json({ status: 500, msg: "Application Failed", data: error });
    });
};

const ViewInsuranceApplicationbyPlanId = (req, res) => {
  insuranceApplySchema
    .findById({_id: req.params.id }).populate("userid planid")
  
    .then((response) => {
      res.status(200).json({
        msg:"data fetched",
        data:response
      })
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        msg: "Loan Application Fetch Failed",
        data: error,
      });
    });
};

const ViewApprovedInsuranceApplication = (req, res) => {
  const loanid = req.params.loanid;

  insuranceApplySchema
    .find({ _id: loanid })
    .populate("userid")
    .then((response) => {
      if (response == "") {
        return res
          .status(404)
          .json({ status: 404, msg: "No Loan Application Found" });
      }
      res.json({
        status: 200,
        msg: "Loan Application Fetched",
        data: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        msg: "Loan Application Fetch Failed",
        data: error,
      });
    });
};

// for seeing all loan applications
const ViewAllInsuranceApplications = async (req, res) => {
  try {
    const userId = req.query.userid; // Assuming user ID is passed as a query param

    // Fetch all applied insurance plan IDs for the given user
    const appliedPlans = await insuranceApplySchema.find({ userid: userId }).select("planid");
    
    // Extract plan IDs
    const appliedPlanIds = appliedPlans.map(app => app.planid);
    
    // Fetch all insurance applications excluding already applied plans for the user
    const applications = await insuranceApplySchema.find({ planid: { $nin: appliedPlanIds } }).populate("userid planid");

    if (applications.length === 0) {
      return res.json({ status: 200, msg: "No Applications" });
    }

    res.json({ status: 200, msg: "Data fetched", data: applications });
  } catch (error) {
    console.error(error);
    res.json({ status: 500, msg: "Insurance Applications Fetch Failed", data: error });
  }
};


// for seeing all loan applications of a user
const ViewUserInsuranceApplications = (req, res) => {
  insuranceApplySchema
    .find({ userid: req.params.userid })
    .populate("userid planid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Applications" });
      } else {
        res.json({ status: 200, msg: "Data fetched", data: response });
      }
    })
    .catch((error) => {
      res.json({
        status: 500,
        mgs: "Loan Applications Fetch Failed",
        data: error,
      });
    });
};

// for verifying loan application
const VerifyInsuranceApplication = async (req, res) => {
  const data = req.params.id;

  await insuranceApplySchema
    .findByIdAndUpdate(data, { insuranceverification: true }, { new: true })
    .then((response) => {
      res.json({ status: 200, msg: "Loan Verified", data: response });
    })
    .catch((error) => {
      res.json({ status: 200, msg: "Loan Verification Failed", data: error });
    });
};

// for viewing non verified applications
const NonVerifiedInsuranceApplication = (req, res) => {
  insuranceApplySchema
    .find({ insuranceverification: false })
    .populate("userid planid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Applications" });
      } else {
        res.json({ status: 200, msg: "Data fetched", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data failed to retrieve", data: error });
    });
};

// for viewing verified loan applications
const VerifiedInsuranceApplication = (req, res) => {
  insuranceApplySchema
    .find({ insuranceverification: true })
    .populate("userid planid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Applications" });
      } else {
        res.json({ status: 200, msg: "Data fetched", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data failed to retrive", data: error });
    });
};

// for approving loans
const ApproveInsuranceApplication = async (req, res) => {
  const data = req.params.id;

  await insuranceApplySchema
    .findByIdAndUpdate(data, { approvalstatus: "Approved" }, { new: true })
    .then((response) => {
      res.json({ status: 200, msg: "Loan Approved", data: response });
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Loan Approval Failed", data: error });
    });
};

// for rejecting loans
const RejectInsuranceApplication = async (req, res) => {
  const data = req.params.id;

  await insuranceApplySchema
    .findByIdAndUpdate(data, { approvalstatus: "Rejected" }, { new: true })
    .then((response) => {
      res.json({ status: 200, msg: "Loan Approved", data: response });
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Loan Approval Failed", data: error });
    });
};

// for viewing non approved loans
const NonApprovedInsuranceApplication = (req, res) => {
  insuranceApplySchema
    .find({ insuranceverification: true, approvalstatus: "Pending" })
    .populate("userid planid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Applications" });
      } else {
        res.json({ status: 200, msg: "Data fetched", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 200, msg: "Data not Fectched", data: error });
    });
};

// for viewing approved loans
const ApprovedInsuranceApplication = (req, res) => {
  insuranceApplySchema
    .find({ insuranceverification: true, approvalstatus: "Approved" })
    .populate("userid planid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Applications" });
      } else {
        res.json({ status: 200, msg: "Data fetched", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 200, msg: "Data failed to fetch", data: error });
    });
};

const ApprovedInsuranceApplicationbyUserId = (req, res) => {
  console.log(req.params.userid);
  insuranceApplySchema
    .find({
      userid: req.params.userid,
      insuranceverification: true,
      approvalstatus: "Approved",
    })
    .populate("userid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Applications" });
      } else {
        res.json({ status: 200, msg: "Data fetched", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 200, msg: "Data failed to fetch", data: error });
    });
};
module.exports = {
  SaveInsuranceApplyApplicationData,
  ViewInsuranceApplicationbyPlanId,
  ViewUserInsuranceApplications,
  NonApprovedInsuranceApplication,
  ApproveInsuranceApplication,
  RejectInsuranceApplication,

  upload,
  ViewApprovedInsuranceApplication,
  VerifiedInsuranceApplication,
  NonVerifiedInsuranceApplication,
  ApprovedInsuranceApplication,
  ViewAllInsuranceApplications,
  VerifyInsuranceApplication,
  ApprovedInsuranceApplicationbyUserId,
};
