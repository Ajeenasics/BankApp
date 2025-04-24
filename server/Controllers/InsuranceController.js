const Insurance = require("../Models/InsuranceSchema");

const multer = require("multer");
const jwt = require("jsonwebtoken");
const secret = "Insurance";

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

// Function to add a new Insurance
const adminAddInsurance = async (req, res) => {
  const date = new Date();
  try {
    const {
      planname,
      description,
      coverageamount,
      amounttobepaid,
      policyterm,
      paymentfrequency,
    } = req.body;

    // Creating a new Insurance instance
    const newInsurance = new Insurance({
      planname,
      description,
      coverageamount,
      amounttobepaid,
      policyterm,
      paymentfrequency,
      planimage: req.files[0],
    });

    // Save the new Insurance to the database
    await newInsurance
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
}

const ViewInsuranceApplication = (req, res) => {
  Insurance.find( { approvalstatus: "Pending" })
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found", data: response });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

// for viewing user credit card applications
// const ViewUserInsuranceApplication = (req, res) => {

//   Insurance.find({ userid: req.params.id }).populate('userid')
//       .then((response) => {
//           if (response == "") {
//               res.json({ status: 200, msg: 'No Data Found', data: response });
//           }
//           else {
//               res.json({ status: 200, msg: 'Data fetch Successful', data: response });
//           }
//       })
//       .catch((error) => {
//           res.json({ status: 500, msg: 'Data fetch failed', data: error });
//       });
// };

// for viewing one credit card application
const ViewSingleInsuranceApplication = (req, res) => {
  Insurance.find({ _id: req.params.planid })
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found", data: response });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

// for viewing non verified applications
const NonVerifiedInsuranceApplication = (req, res) => {
  Insurance.find({ verificationstatus: false })
    .populate("userid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found" });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

// for verifiying a credit card application
const VerifyInsuranceApplication = async (req, res) => {
  const data = req.params.id;

  await Insurance.findByIdAndUpdate(
    data,
    { verificationstatus: true },
    { new: true }
  )
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found" });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

// for viewing verified applications
const VerifiedInsuranceApplication = (req, res) => {
  Insurance.find({ verificationstatus: true })
    .populate("userid")
    .populate("userid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found" });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

// for viewing non approved applications
const NonApprovedInsuranceApplication = (req, res) => {
  Insurance.find({ verificationstatus: true, approvalstatus: "Pending" })
    .populate("userid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found" });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

// for approving a credit card application
const ApproveInsuranceApplication = async (req, res) => {
  const data = req.params.id;

  await Insurance.findByIdAndUpdate(
    data,
    { approvalstatus: "Approved" },
    { new: true }
  )
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found" });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

const RejectInsuranceApplication = async (req, res) => {
  const data = req.params.id;

  await Insurance.findByIdAndUpdate(
    data,
    { approvalstatus: "Rejected" },
    { new: true }
  )
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found" });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

// for viewing approved applications
const ApprovedInsuranceApplication = (req, res) => {
  Insurance.find({ verificationstatus: true, approvalstatus: "Approved" })
    .populate("userid")
    .then((response) => {
      if (response == "") {
        res.json({ status: 200, msg: "No Data Found" });
      } else {
        res.json({ status: 200, msg: "Data fetch Successful", data: response });
      }
    })
    .catch((error) => {
      res.json({ status: 500, msg: "Data fetch failed", data: error });
    });
};

const editInsuranceById = async (req, res) => {
  const {
    planname,
    description,
    coverageamount,
    amounttobepaid,
    policyterm,
    paymentfrequency,
  } = req.body;

  console.log("Request Body:", req.body);
  console.log("Request Params:", req.params);

  const updateData = {
    planname,
    description,
    coverageamount,
    amounttobepaid,
    policyterm,
    paymentfrequency,
    planimage: req.files[0],
  };

  try {
    const updatedInsurance = await Insurance.findByIdAndUpdate(
      req.params.planid,
      updateData,
      { new: true }
    );

    if (!updatedInsurance) {
      return res.status(404).json({
        status: 404,
        msg: "Insurance plan not found",
      });
    }

    res.json({
      status: 200,
      msg: "Updated successfully",
      data: updatedInsurance,
    });
  } catch (err) {
    console.error("Error updating insurance:", err);
    res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  adminAddInsurance,
  upload,
  editInsuranceById,
  ViewInsuranceApplication,
  ApprovedInsuranceApplication,
  ApproveInsuranceApplication,
  NonApprovedInsuranceApplication,
  VerifiedInsuranceApplication,
  VerifyInsuranceApplication,
  NonVerifiedInsuranceApplication,
  NonApprovedInsuranceApplication,
  ViewSingleInsuranceApplication,
  RejectInsuranceApplication,
};
