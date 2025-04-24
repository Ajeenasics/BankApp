import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./Components/User/UserLogin";
import LandingNav from "./Components/Main/LandingNav";
import LandingPage from "./Components/Main/LandingPage";
import AdminLogin from "./Components/Admin/AdminLogin";
import LandingFooter from "./Components/Main/LandingFooter";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminviewManagers from "./Components/Admin/AdminviewManagers";
import AdminAddManagers from "./Components/Admin/AdminAddManagers";
import AdminViewAManager from "./Components/Admin/AdminViewAManager";
import AdminEditAmanagerData from "./Components/Admin/AdminEditAmanagerData";
import UserRegister from "./Components/User/UserRegister";
import ManagerLogin from "./Components/Manager/ManagerLogin";
import UserHomePage from "./Components/User/UserHomePage";
import UserSentForgotpswd from "./Components/User/UserSentForgotpswd";
import UserForgotmailAccept from "./Components/User/UserForgotmailAccept";
import ManagerHome from "./Components/Manager/ManagerHome";
import ManagerProfile from "./Components/Manager/ManagerProfile";
import ManagerEditProfile from "./Components/Manager/ManagerEditProfile";
import ManagerViewUsers from "./Components/Manager/ManagerViewUsers";
import ManagerAddClerk from "./Components/Manager/ManagerAddClerk";
import AdminViewClerks from "./Components/Admin/AdminViewClerks";
import ManagerViewUserDetails from "./Components/Manager/ManagerViewUserDetails";
import ClerkLogin from "./Components/Clerk/ClerkLogin";
import ClerkDashboard from "./Components/Clerk/ClerkDashboard";
import ManagerViewClerks from "./Components/Manager/ManagerViewClerks";
import ManagerEditClerk from "./Components/Manager/ManagerEditClerk";
import CustomerApplyLoan from "./Components/CustomerLoan/CustomerApplyLoan";
import CustomerLoanPersonalDetails from "./Components/CustomerLoan/CustomerApplicationStatus";
import CustomerLoanpersonDetail from "./Components/CustomerLoan/CustomerLoanpersonDetail";
import CustomerLoanIdentity from "./Components/CustomerLoan/CustomerLoanIdentity";
import CustomerLoanEmployeDetails from "./Components/CustomerLoan/CustomerLoanEmployeDetails";
import ClerkManageLoan from "./Components/Clerk/ClerkManageLoan";
import ClerkViewDetails from "./Components/Clerk/ClerkViewDetails";
import ManagerManageLoan from "./Components/Manager/ManagerManageLoan";
import ManagerViewLoanDetails from "./Components/Manager/ManagerViewLoanDetails";
import AdminViewUserslist from "./Components/Admin/AdminViewUserslist";
import AdminviewUserDetails from "./Components/Admin/AdminviewUserDetails"
import CustomerApplyCreaditCard from "./Components/User/CustomerApplyCreaditCard";
import CustomerApplyLifeInsurance from "./Components/customerInsurance/CustomerApplyLifeInsurance";
import UserCreditApplicationDetails from "./Components/User/UserCreditApplicationDetails";
import CustomerViewLoanDetails from "./Components/CustomerLoan/CustomerViewLoanDetails";
import CustomerCreditCardApply from "./Components/User/CustomerCreditCardApply";
import CustomerCreditApplyCardDetails from "./Components/User/CustomerCreditApplyCardDetails";
import CustomerLifeInsurancePersonalDetails from "./Components/customerInsurance/CustomerLifeInsurancePersonalDetails";
import LifeInsurancePlicyPage from "./Components/customerInsurance/LifeInsurancePlicyPage";
import ClerkManageCreditCard from "./Components/Clerk/ClerkManageCreditCard";
import ClerkViewCardDetails from "./Components/Clerk/ClerkViewCardDetails";
import ManagerManageCreditCard from "./Components/Manager/ManagerManageCreditCard";
import ManagerViewCardDetails from "./Components/Manager/ManagerViewCardDetails";
import AdminViewPlan from "./Components/AdminInsurance/AdminViewPlan";
import CustomeLifeinsuranceApplicationLast from "./Components/customerInsurance/CustomeLifeinsuranceApplicationLast";
import CustomerInsuranceApplyDetails from "./Components/customerInsurance/CustomerInsuranceApplyDetails";
import ClerkviewInsurance from "./Components/Clerk/ClerkviewInsurance";
import ClerkViewInsuranceDetails from "./Components/Clerk/ClerkViewInsuranceDetails";
import ManagerViewVerifiedInsurance from "./Components/Manager/ManagerViewVerifiedInsurance";
import ManagerViewInsuranceApplicationDetails from "./Components/Manager/ManagerViewInsuranceApplicationDetails";
import ClerkViewuserList from "./Components/Clerk/ClerkViewuserList";
import ClerkViewUserDetails from "./Components/Clerk/ClerkViewUserDetails";
import CustomerMobileRecharge from "./Components/CustomerBillPayment/CustomerMobileRecharge";
import CustomerBillPayment from "./Components/CustomerBillPayment/CustomerBillPayment";
import CustomerElectricityBill from "./Components/CustomerBillPayment/CustomerElectricityBill";
import CustomerWaterBill from "./Components/CustomerBillPayment/CustomerWaterBill";
import CustomerOnlineTransaction from "./Components/customerTransaction/CustomerOnlineTransaction";
import NormalTransaction from "./Components/customerTransaction/NormalTransaction";
import CustomerTransactionHistory from "./Components/customerTransaction/CustomerTransactionHistory";
import AdminviewtransactionHistory from "./Components/Admin/AdminviewtransactionHistory";
import ClerkViewTransactionHistory from "./Components/Clerk/ClerkViewTransactionHistory";
import ClerkViewonlineTransaction from "./Components/Clerk/ClerkViewonlineTransaction";
import ManagerChequeTransaction from "./Components/Manager/ManagerChequeTransaction";
import ManagerViewUserTransactions from "./Components/Manager/ManagerViewUserTransactions";
import AllTransactionHistory from "./Components/Main/AllTransactionHistory";
import ManagerViewAllTransactions from "./Components/Manager/ManagerViewAllTransactions";
import ClerkSideBar from "./Components/Clerk/ClerkSideBar";
import ClerkviewAllTransactions from "./Components/Clerk/ClerkviewAllTransactions";
import AdminViewTransactions from "./Components/Admin/AdminViewTransactions";
import AdminViewAllApprovedCreadit from "./Components/Admin/AdminViewAllApprovedCreadit";
import AdminViewAcreadit from "./Components/Admin/AdminViewAcreadit";
import AdminViewAllApprovedLoan from "./Components/Admin/AdminViewAllApprovedLoan";
import AdminViewALoanDetails from "./Components/Admin/AdminViewALoanDetails";
import UserTermsAndCondition from "./UserTermsAndCondition";
import AboutPage from "./Components/Main/AboutPage";

function App() {
  return (
    <BrowserRouter basename="/bank_app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/adminlogin"
          element={[<LandingNav />, <AdminLogin />, <LandingFooter />]}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/viewmanages" element={<AdminviewManagers />} />
        <Route path="/admin/addmanagers" element={<AdminAddManagers />} />
        <Route path="/admin/view_a_managers/:managerid" element={<AdminViewAManager />} />
        <Route path="/admin/edit_a_managers/:managerid" element={<AdminEditAmanagerData />} />
        <Route path="/admin/viewclerks" element={<AdminViewClerks />} />
        <Route path="/admin/viewusers" element={<AdminViewUserslist />} />
        <Route path="/admin/viewuserdetails/:userid" element={<AdminviewUserDetails />} />

        <Route path="/manager/login" element={<ManagerLogin />} />
        <Route path="/manager/home" element={<ManagerHome />} />
        <Route path="/manager/profile" element={<ManagerProfile />} />
        <Route path="/manager/editprofile" element={<ManagerEditProfile />} />
        <Route path="/manager/viewusers" element={<ManagerViewUsers />} />
        <Route path="/manager/addClerk" element={<ManagerAddClerk />} />
        <Route path="/manager/viewuserdetails/:userid" element={<ManagerViewUserDetails />} />
        <Route path="/manager/viewclerks" element={<ManagerViewClerks />} />
        <Route path="/manager/editclerk/:clerkid" element={<ManagerEditClerk />} />
        <Route path="/manager/managermanageloan" element={<ManagerManageLoan />} />
        <Route path="/manager/managermanagecreditcard" element={<ManagerManageCreditCard />} />
        <Route path="/manager/managecreditcard/:data" element={<ManagerViewCardDetails/>} />
        <Route path="/manager/viewloandetails/:data" element={<ManagerViewLoanDetails/>} />

        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/homepage" element={<UserHomePage />} />
        <Route path="/user/forgot" element={<UserSentForgotpswd />} />
        <Route path="/reset-password/:id" element={<UserForgotmailAccept />} />

        <Route path="/clerk/login" element={<ClerkLogin />} />
        <Route path="/clerk/forgot" element={<UserSentForgotpswd />} />
        <Route path="/clerk/reset-password/:id" element={<UserForgotmailAccept />} />
        <Route path="/manager/profile" element={<ManagerProfile />} />
        <Route path="/manager/editprofile" element={<ManagerEditProfile />} />
        <Route path="/clerk/homepage" element={<ClerkDashboard />} />
        <Route path="/clerk/manageloan" element={<ClerkManageLoan />} />
        <Route path="/clerk/viewloandetails/:data" element={<ClerkViewDetails/>} />
        <Route path="/clerk/managecreditcard" element={<ClerkManageCreditCard />} />
        <Route path="/clerk/viewcreditcard/:data" element={<ClerkViewCardDetails />} />

        <Route path="/user/applyloan" element={<CustomerApplyLoan />} />
        <Route path="/user/applyloanpersonaldetail" element={<CustomerLoanpersonDetail />} />
        <Route path="/user/applyloanIdentity" element={<CustomerLoanIdentity />} />
        <Route path="/user/applyloanEmpdetails" element={<CustomerLoanEmployeDetails />} />
        <Route path="/user/applayloanpersonaldetails" element={<CustomerLoanPersonalDetails />} />
        <Route path="/user/viewloandetails/:data" element={<CustomerViewLoanDetails/>} />

        <Route path="/user/applylcreaditcard" element={<CustomerApplyCreaditCard />} /> 
        <Route path="/user/creditcarddetails/:data" element={<UserCreditApplicationDetails />} />
        <Route path="/user/personaldetails" element={<CustomerCreditCardApply />} />
        <Route path="/user/carddetails/:data" element={<CustomerCreditApplyCardDetails />} />

        <Route path="/user/applyllifeinsurance" element={<CustomerApplyLifeInsurance />} />
        <Route path="/user/applyllifeinsurancedetails/:planid" element={<CustomerLifeInsurancePersonalDetails />} />
        <Route path="/user/applyllifeinsurancepolicy" element={<LifeInsurancePlicyPage />} />
        <Route path="/user/applyllifeinsurancepolicylast" element={<CustomeLifeinsuranceApplicationLast />} />
        <Route path="/user/applyedllifeinsurancedetails/:data" element={<CustomerInsuranceApplyDetails />} />


        <Route path="/user/mobilerecharge" element={<CustomerMobileRecharge />} />
        <Route path="/user/billpayment" element={<CustomerBillPayment />} />
        <Route path="/user/electricbillpayment" element={<CustomerElectricityBill />} />
        <Route path="/user/waterbillpayment" element={<CustomerWaterBill />} />

        <Route path="/admin/Viewllifeinsurancepolicy" element={<AdminViewPlan />} />

        <Route path="/clerk/clerkviewinsurance" element={<ClerkviewInsurance />} />
        <Route path="/clerk/clerkviewuserlist" element={<ClerkViewuserList />} />
        <Route path="/clerk/viewuserdetails/:userid" element={<ClerkViewUserDetails />} />
        <Route path="/clerk/clerkviewinsurancedetailstoverify/:planapplicationid" element={<ClerkViewInsuranceDetails />} />
        
        <Route path="/manager/managerviewinsurance" element={<ManagerViewVerifiedInsurance />} />
        <Route path="/manager/managerviewinsurancedetails/:planapplicationid" element={<ManagerViewInsuranceApplicationDetails />} />

        <Route path="/manager/managerviewinsurance" element={<ManagerViewVerifiedInsurance />} />
        <Route path="/manager/managerviewinsurancedetails/:planapplicationid" element={<ManagerViewInsuranceApplicationDetails />} />
       
        <Route path="/user/onlinetransaction" element={<CustomerOnlineTransaction/>} />
        <Route path="/user/normaltransaction" element={<NormalTransaction/>} />
        <Route path="/user/transactionhistory" element={<CustomerTransactionHistory/>} />
        <Route path="/admin/transactionhistory/:userid" element={<AdminviewtransactionHistory/>} />
        <Route path="/clerk/transactionhistory/:userid" element={<ClerkViewTransactionHistory/>} />
        <Route path="/clerk/onlinetransaction" element={<ClerkViewonlineTransaction/>} />
        <Route path="/manager/onlinetransaction" element={<ManagerChequeTransaction/>} />
        <Route path="/manager/transactionhistory/:userid" element={<ManagerViewUserTransactions/>} />
        <Route path="/alltransactions" element={<AllTransactionHistory/>} />
        <Route path="/manager/alltransactions" element={<ManagerViewAllTransactions/>} />
        <Route path="/clerk/alltransactions" element={<ClerkviewAllTransactions/>} />
        <Route path="/admin/viewtransactions" element={<AdminViewTransactions/>} />
        <Route path="/admin/viewallapprovedcreadits" element={<AdminViewAllApprovedCreadit/>} />
        <Route path="/admin/viewacreaditcard/:data" element={<AdminViewAcreadit/>} />
        <Route path="/admin/viewallapprovedloans" element={<AdminViewAllApprovedLoan/>} />
        <Route path="/admin/viewaloandetails/:data" element={<AdminViewALoanDetails/>} />
        <Route path="/user/termsandcondition" element={<UserTermsAndCondition/>} />
        <Route path="/about" element={<AboutPage/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
