const LoanSchema = require('../Models/LoanSchema');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).fields([
    { name: 'panCardFile', maxCount: 1 },
    { name: 'aadhaarFile', maxCount: 1 },
    { name: 'votersIDFile', maxCount: 1 },
    { name: 'passportFile', maxCount: 1 },
    { name: 'drivingLicenseFile', maxCount: 1 },
    // { name: 'profilepicture', maxCount: 1 },
    { name: 'salaryslipimg', maxCount: 1 }
]);


// for saving loan application data
const SaveLoanApplicationData = async (req, res) => {
const loantype=req.body.loanType
const userid=req.params.userid
const userData = new LoanSchema({
        userid: req.params.userid,
        loantype: req.body.loanType,
        loanamount: req.body.loanAmount,
        loanpurpose: req.body.loanPurpose,
        pancardnumber: req.body.pancardNumber,
        pancardimage: req.files['panCardFile'] ? req.files['panCardFile'][0] : null,
        aadharnumber: req.body.aadhaarNumber,
        aadharimage: req.files['aadhaarFile'] ? req.files['aadhaarFile'][0] : null,
        votersidfile: req.files['votersIDFile'] ? req.files['votersIDFile'][0] : null,
        drivinglicensefile: req.files['drivingLicenseFile'] ? req.files['drivingLicenseFile'][0] : null,
        passportfile: req.files['passportFile'] ? req.files['passportFile'][0] : null,
        nameofemployer: req.body.nameofemployer,
        employercontact: req.body.employercontact,
        workexp: req.body.workexp,
        salary: req.body.salary,
        position: req.body.position,
        salaryslipimg: req.files['salaryslipimg'] ? req.files['salaryslipimg'][0] : null
    })
    const existingApplication = await LoanSchema.findOne({ userid, loantype });

    if (existingApplication) {
        return res.json({ status: 400, msg: "Already applied for this same Loan before" });
    }
    await userData.save()
        .then((response) => {
            res.json({ status: 200, msg: 'Application Successfull', data: response })
        })

        .catch((error) => {
            console.log(error)
            res.json({ status: 500, msg: 'Application Failed', data: error })
        })

}

const ViewVerifiedLoanApplication = (req, res) => {

    // const loanid = req.params.loanid
    console.log('loan-loam', req.params.loanid)

    LoanSchema.find({ _id: req.params.loanid }).populate('userid')
        .then((response) => {
            // console.log('response', response)
            if (response == "") {
                return res.status(404).json({ status: 404, msg: 'No Loan Application Found' });
            }
            res.json({ status: 200, msg: 'Loan Application Fetched', data: response });
        })
        .catch((error) => {
            res.status(500).json({ status: 500, msg: 'Loan Application Fetch Failed', data: error });
        });

};

const ViewApprovedLoanApplication = (req, res) => {

    const loanid = req.params.loanid

    LoanSchema.find({ _id: loanid }).populate('userid')
        .then((response) => {
            if (response == "") {
                return res.status(404).json({ status: 404, msg: 'No Loan Application Found' });
            }
            res.json({ status: 200, msg: 'Loan Application Fetched', data: response });
        })
        .catch((error) => {
            res.status(500).json({ status: 500, msg: 'Loan Application Fetch Failed', data: error });
        });

};


// for seeing all loan applications
const ViewAllLoanApplications = (req, res) => {

    LoanSchema.find({}).populate('userid')
        .then((response) => {
            if (response == "") {
                res.json({ status: 200, msg: 'No Applications' })
            }
            else {
                res.json({ status: 200, msg: 'Data fetched', data: response })
            }
        })
        .catch((error) => {
            res.json({ status: 500, mgs: 'Loan Applications Fetch Failed', data: error })
        })

}

// for seeing all loan applications of a user
const ViewUserLoanApplications = (req, res) => {

    LoanSchema.find({ userid: req.params.id }).populate('userid')
        .then((response) => {
            if (response == "") {
                res.json({ status: 200, msg: 'No Applications' })
            }
            else {
                res.json({ status: 200, msg: 'Data fetched', data: response })
            }
        })
        .catch((error) => {
            res.json({ status: 500, mgs: 'Loan Applications Fetch Failed', data: error })
        })

}

// for verifying loan application
const VerifyLoanApplication = async (req, res) => {

    const data = req.params.id;

    await LoanSchema.findByIdAndUpdate(data, { loanverification: true }, { new: true })
        .then((response) => {
            res.json({ status: 200, msg: 'Loan Verified', data: response })
        })
        .catch((error) => {
            res.json({ status: 200, msg: 'Loan Verification Failed', data: error })
        })

}

// for viewing non verified applications
const NonVerifiedLoanApplication = (req, res) => {

    LoanSchema.find({ loanverification: false }).populate('userid')
        .then((response) => {
            if (response == "") {
                res.json({ status: 200, msg: 'No Applications' })
            }
            else {
                res.json({ status: 200, msg: 'Data fetched', data: response })
            }
        })
        .catch((error) => {
            res.json({ status: 500, msg: 'Data failed to retrieve', data: error })
        })

}

// for viewing verified loan applications
const VerifiedLoanApplication = (req, res) => {

    LoanSchema.find({ loanverification: true }).populate('userid')
        .then((response) => {
            if (response == "") {
                res.json({ status: 200, msg: 'No Applications' })
            }
            else {
                res.json({ status: 200, msg: 'Data fetched', data: response })
            }
        })
        .catch((error) => {
            res.json({ status: 500, msg: 'Data failed to retrive', data: error })
        })

}

// for approving loans
const ApproveLoanApplication = async (req, res) => {

    const data = req.params.id;

    await LoanSchema.findByIdAndUpdate(data, { loanapproval: "Approved" }, { new: true })
        .then((response) => {
            res.json({ status: 200, msg: 'Loan Approved', data: response })
        })
        .catch((error) => {
            res.json({ status: 500, msg: 'Loan Approval Failed', data: error })
        })

}

// for rejecting loans
const RejectLoanApplication = async (req, res) => {

    const data = req.params.id;

    await LoanSchema.findByIdAndUpdate(data, { loanapproval: "Rejected" }, { new: true })
        .then((response) => {
            res.json({ status: 200, msg: 'Loan Approved', data: response })
        })
        .catch((error) => {
            res.json({ status: 500, msg: 'Loan Approval Failed', data: error })
        })

}

// for viewing non approved loans
const NonApprovedLoanApplication = (req, res) => {

    LoanSchema.find({ loanverification: true, loanapproval: "Pending" }).populate('userid')
        .then((response) => {
            if (response == "") {
                res.json({ status: 200, msg: 'No Applications' })
            }
            else {
                res.json({ status: 200, msg: 'Data fetched', data: response })
            }
        })
        .catch((error) => {
            res.json({ status: 200, msg: 'Data not Fectched', data: error })
        })

}

// for viewing approved loans
const ApprovedLoanApplication = (req, res) => {

    LoanSchema.find({ loanverification: true, loanapproval: "Approved" }).populate('userid')
        .then((response) => {
            if (response == "") {
                res.json({ status: 200, msg: 'No Applications' })
            }
            else {
                res.json({ status: 200, msg: 'Data fetched', data: response })
            }
        })
        .catch((error) => {
            res.json({ status: 200, msg: 'Data failed to fetch', data: error })
        })

}


const ApprovedLoanApplicationbyUserId = (req, res) => {
    console.log(req.params.userid);
    LoanSchema.find({ userid: req.params.userid, loanverification: true, loanapproval: "Approved" }).populate('userid')
        .then((response) => {
            if (response == "") {
                res.json({ status: 200, msg: 'No Applications' })
            }
            else {
                res.json({ status: 200, msg: 'Data fetched', data: response })
            }
        })
        .catch((error) => {
            res.json({ status: 200, msg: 'Data failed to fetch', data: error })
        })

}
module.exports = { SaveLoanApplicationData, upload,ViewUserLoanApplications, ViewVerifiedLoanApplication, ViewApprovedLoanApplication, VerifiedLoanApplication, NonVerifiedLoanApplication, ApprovedLoanApplication, NonApprovedLoanApplication, ViewAllLoanApplications, VerifyLoanApplication, ApproveLoanApplication, RejectLoanApplication, ApprovedLoanApplicationbyUserId }