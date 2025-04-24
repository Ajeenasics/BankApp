const express = require("express")
const manager = require("./Controllers/ManagerController")
const user = require("./Controllers/UserController")
const clerk = require("./Controllers/ClerkController")
const loan = require("./Controllers/LoanController")
const card = require("./Controllers/CreditCardController")
const insurance = require("./Controllers/InsuranceController")
const insuranceApply = require("./Controllers/InsuranceApplyController")
const mobileplans=require("./Controllers/MobileplanController")
const mobilerecharge=require("./Controllers/rechargrpaymentcontroller")
const paybill=require("./Controllers/BillpaymentController")
const transaction=require("./Controllers/OnlineTransactionController")
const normaltransaction=require("./Controllers/Transactioncontroller")
const bills=require("./Controllers/billcontroller")

const router = express.Router()

router.post('/addmanger', manager.upload, manager.adminAddManager)
router.get('/viewallmangers', manager.viewManagers)
router.get('/view_a_manager/:managerid', manager.viewManagerById)
router.post('/editManagerById/:managerid', manager.upload, manager.editManagerById)
router.post('/deactivate_a_manger/:id', manager.deActivateManagerById)
router.post('/activate_a_manger/:id', manager.activateManagerById)
router.post('/managerlogin', manager.ManagerLogin)


router.post('/userRegister', user.upload, user.UserRegister)
router.post('/userlogin', user.LoginUser)
router.post('/forgotPWDsentMail', user.forgotPWDsentMail);
router.post('/resetPassword/:id', user.resetPassword);
router.get('/view_a_user/:userid', user.viewUserById);
router.post('/edit_a_user/:userid', user.upload, user.editUserById);
router.get('/viewusers', user.viewUsers);


router.post('/deactivate_a_user/:id', user.deActivateUserById)
router.post('/activate_a_user/:id', user.activateUserById)


// Loan application
router.post('/saveloandata/:userid', loan.upload, loan.SaveLoanApplicationData)                                 // Saving Loan data 
router.post('/viewonenonverifiedloan/:loanid', loan.ViewVerifiedLoanApplication)                                // viewing a loan application
router.post('/viewonenonapprovedloan/:loanid', loan.ViewApprovedLoanApplication)                                // viewing a loan application
router.get('/viewallloan', loan.ViewAllLoanApplications)                                                        // viewing all loan applications
router.post('/viewauserloan/:id', loan.ViewUserLoanApplications)                                                  // viewing all loan applications
router.post('/verifyloan/:id', loan.VerifyLoanApplication);                                                     // for verifying loan application
router.get('/nonverifiedloan', loan.NonVerifiedLoanApplication)                                                 // for viewing all non verified applicaton
router.get('/verifiedloan', loan.VerifiedLoanApplication)                                                       // for viewing all verified application
router.post('/approveloan/:id', loan.ApproveLoanApplication)                                                    // for approving loan application
router.post('/rejectloan/:id', loan.RejectLoanApplication)                                                      // for rejecting loan application
router.get('/nonapprovedloan', loan.NonApprovedLoanApplication)                                                 // for viewing verified but non approved application
router.get('/approvedloan', loan.ApprovedLoanApplication)                                                       // for viewing verified and approved loan application
router.get('/viewloanbyuser/:userid', loan.ApprovedLoanApplicationbyUserId)                                     // viewing all approved loan applications of user


// Credit Card
router.post('/carduser/:userid/:data', card.upload, card.CustomerPersonalDetails)
router.post('/viewallcreditapplication', card.ViewCreditCardApplication)
router.post('/viewusercreditapplication/:id', card.ViewUserCreditCardApplication)
router.post('/viewausercreditapplication/:id', card.ViewAUserCreditCardApplication)
router.post('/viewonecreditapplication/:data', card.ViewSingleCreditCardApplication)
router.post('/nonverifiedcreditapplication', card.NonVerifiedCreditCardApplication)
router.post('/verifiedcreditapplication', card.VerifiedCreditCardApplication)
router.post('/verifyingcreditapplication/:id', card.VerifyCreditCardApplication)
router.post('/nonapprovedcreditapplication', card.NonApprovedCreditCardApplication)
router.post('/approvecreditapplication/:id', card.ApproveCreditCardApplication)
router.post('/approvedcreditapplication', card.ApprovedCreditCardApplication)
router.post('/rejectcreaditcardapplication/:id', card.RejectCreditCardApplication)

router.post('/addClerk', clerk.upload, clerk.AddClerk)
router.get('/viewallclerks', clerk.viewClerks)
router.get('/view_a_clerk/:clerkid', clerk.viewClerkById)
router.post('/edit_a_clerk/:clerkid', clerk.specUp, clerk.editClerkById)
router.post('/deactivate_a_clerk/:clerkid', clerk.deActivateClerkById)
router.post('/activate_a_clerk/:clerkid', clerk.activateClerkById)
router.post('/clerklogin', clerk.loginClerk)

// lifeinsurance
router.post('/addInsurance', insurance.upload, insurance.adminAddInsurance)
router.post('/viewallinsuranceapplication', insurance.ViewInsuranceApplication)
// router.post('/viewuserinsuranceapplication/:id', insurance.ViewUserInsuranceApplication)
router.post('/viewoneinsuranceapplication/:planid', insurance.ViewSingleInsuranceApplication)
router.post('/editinsuranceapplication/:planid', insurance.upload,insurance.editInsuranceById)


router.post('/applyinsuranceapplication', insuranceApply.upload,insuranceApply.SaveInsuranceApplyApplicationData)
router.post('/viewapplyinsuranceapplicationbyuserid/:userid', insuranceApply.ViewUserInsuranceApplications)
router.post('/viewOneapplyedinsuranceapplication/:id',insuranceApply.ViewInsuranceApplicationbyPlanId)
router.post('/nonverifiedinsuranceapplication', insuranceApply.NonVerifiedInsuranceApplication)
router.post('/verifiedinsuranceapplication', insuranceApply.VerifiedInsuranceApplication)
router.post('/verifyinginsuranceapplication/:id', insuranceApply.VerifyInsuranceApplication)
router.post('/nonapprovedinsuranceapplication', insuranceApply.NonApprovedInsuranceApplication)
router.post('/approvedinsuranceapplication', insuranceApply.ApprovedInsuranceApplication)
router.post('/approveinsuranceapplication/:id', insuranceApply.ApproveInsuranceApplication)
router.post('/rejectinsuranceapplication/:id', insuranceApply.RejectInsuranceApplication)

router.post('/mobilerechargeplan', mobileplans.saverechargePlan)
router.post('/mobilerechargeplanview', mobileplans.findmobileplans)
router.post('/payElectricBill', paybill.payElectricBill)
router.post('/payWaterBill', paybill.payWaterBill)
router.get("/electric-bill/:billId", paybill.viewElectricBill);
router.get("/water-bill/:billId", paybill.viewWaterBill);
router.post("/mobileRechargePayment", mobilerecharge.mobilepayment);


router.post('/onlinetransaction', transaction.upload,transaction.createTransaction)
router.post('/getTransactionById/:transactionid',transaction.getTransactionById)
router.post('/normaltransaction',normaltransaction.createNormalTransaction)
router.post('/getTransactionById/:transactionid',normaltransaction.getTransactionById)
router.post('/findbillbyuserid/:userid',bills.getUserTransactions)
router.post('/findallbill',bills.getAllTransactions)

router.post('/ViewAllTransactions', transaction.upload,transaction.viewAllTransactions)
router.post('/ViewUserTransactions/:userid',transaction.viewUserTransactions)
router.post('/toVerifyTransactions/:transactionid',transaction.toVerifyTransactions)
router.post('/viewNonVerifiedTransactions', transaction.viewNonVerifiedTransactions)
router.post('/viewVerifiedTransactions',transaction.viewVerifiedTransactions)
router.post('/toApproveTransactions/:transactionid', transaction.toApproveTransactions)
router.post('/ViewApprovedtransaction',transaction.viewApprovedTransactions)
router.post('/toRejectTransactions/:transactionid',transaction.toRejectTransactions)
router.post('/viewNonApprovedTransactions',transaction.viewNonApprovedTransactions)
router.post('/toRejectverificationTransactions/:transactionid',transaction.toRejectverificationTransactions)
router.post('/viewnormaltransaction',normaltransaction.viewAlllNormaTransactions)
router.post('/viewallinsurances',insuranceApply.ViewAllInsuranceApplications)
router.post('/rejectinsurance/:id',insurance.RejectInsuranceApplication)

module.exports = router