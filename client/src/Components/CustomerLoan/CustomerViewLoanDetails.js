import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate, useParams,Link } from "react-router-dom";
import "../../Asserts/Styles/CustomerViewLoanDetails.css";
import LandingFooter from "../Main/LandingFooter";
import UserNavbar from "../User/UserNavbar";
import { FaArrowLeft } from "react-icons/fa6";

function CustomerViewLoanDetails() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { data } = useParams();

    const openFileInNewTab = (filePath) => {
        window.open(`${imgurl}/${filePath}`, "_blank");
    };
    const UserbackButton = () => {
        if (window.location.pathname === "/bank_app/user/homepage") {
          navigate("/user/homepage");
        } else {
          navigate(-1);
        }
      };
    const GetUserData = async () => {
        try {
            const response = await axiosInstance.post(
                `/viewonenonverifiedloan/${data}`
            );
            if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                console.log("response-response", response);
                setUser(response.data.data[0]);
            } else {
                console.error("Unexpected API response structure.");
            }
            console.log("API Response:", response.data.data);
        } catch (error) {
            alert("Failed to fetch user details. Please try again.");
            console.error("Error fetching user data:", error);
        }
    };

    const CancelbuttonOnClick = () => {
        navigate("/clerk/manageloan");
    };

    const VerifybuttonOnClick = async () => {
        try {
            await axiosInstance.post(`/verifyloan/${user._id}`);
            alert("Loan Verified Successfully");
            // navigate("/clerk/manageloan");
        } catch (error) {
            console.error("Error verifying loan:", error);
        }
    };

    useEffect(() => {
        GetUserData();
    }, [data]);

   

    return (
        <div className="CVLD-MainDiv">
        <UserNavbar/>

            <div className="CVLD-MainDiv-ContainDiv">
                

                <div className="CVLD-MainDiv-ContainDiv-ContentDiv">
                <div className=" d-flex justify-content-start">
                <button
            className="btn btn-light"
            type="button"
            onClick={UserbackButton}
          >
            <FaArrowLeft />
          </button></div>
                    <div className="CVLD-MainDiv-ContainDiv-HeaderDiv ">
                    
                        <h1 className="CVLD-h1">Applicant Details</h1>
                    </div>

                    <div className="CVLD-MainDiv-ContainDiv-Content">
                    
                        <div>
                            <img
                                className="CVLD-profile-img"
                                src={`${imgurl}/${user?.userid?.userPicture?.originalname}`}
                                alt="PROFILE"
                            />
                        </div>

                        <div>
                            <h1 className="CVLD-h3">{user?.userid?.username}</h1>
                        </div>

                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Upper">
                            {/* Personal Details */}
                            <div className="CVLD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVLD-h5">Personal Details</h1>

                                <div className="CVLD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left-Details">
                                            <div className="CVLD-textcontain">
                                                <label for="email" className="CVLD-label">
                                                    E-mail
                                                </label>
                                                <h1 name="email" className="CVLD-h4">
                                                    {user?.userid?.userMail}
                                                </h1>
                                            </div>

                                            <div className="CVLD-textcontain">
                                                <label for="DOB" className="CVLD-label">
                                                    Date Of Birth
                                                </label>
                                                <h1 name="DOB" className="CVLD-h4">
                                                    {new Date(user?.userid?.userDate).toLocaleDateString(
                                                        "en-GB"
                                                    )}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVLD-textcontain">
                                            <label for="Contact" className="CVLD-label">
                                                Contact
                                            </label>
                                            <h1 name="Contact" className="CVLD-h4">
                                                {user?.userid?.userContact}
                                            </h1>
                                        </div>

                                        <div className="CVLD-textcontain">
                                            <label for="address" className="CVLD-label">
                                                Address
                                            </label>
                                            <h1 name="address" className="CVLD-h4">
                                                {user?.userid?.userAddress}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Identity */}
                            <div className="CVLD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVLD-h5">Identity</h1>

                                <div className="CVLD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left-Details">
                                            <div className="CVLD-textcontain">
                                                <label for="email" className="CVLD-label">
                                                    PAN Card Number
                                                </label>
                                                <h1 name="email" className="CVLD-h4">
                                                    {user?.pancardnumber}
                                                </h1>
                                            </div>

                                            <div className="CVLD-textcontain">
                                                <label for="pancard" className="CVLD-label">
                                                    PAN Card
                                                </label>
                                                <a
                                                    name="pancard"
                                                    className="CVLD-h4-img text-decoration-underline"
                                                    onClick={() =>
                                                        user?.pancardimage == null
                                                            ? "no pancard image"
                                                            : openFileInNewTab(user?.pancardimage?.filename)
                                                    }
                                                >
                                                    View File
                                                </a>
                                            </div>

                                            <div className="CVLD-textcontain">
                                                <label for="aadhaarnum" className="CVLD-label">
                                                    Aadhaar Number
                                                </label>
                                                <h1 name="aadhaarnum" className="CVLD-h4">
                                                    {user?.aadharnumber}
                                                </h1>
                                            </div>

                                            <div className="CVLD-textcontain">
                                                <label htmlFor="aadhaarcard" className="CVLD-label">
                                                    Aadhaar Card
                                                </label>
                                                {user?.aadharimage?.filename ? (
                                                    <h1
                                                        name="aadhaarcard"
                                                        className="CVLD-h4-img text-decoration-underline"
                                                        onClick={() =>
                                                            openFileInNewTab(user?.aadharimage?.filename)
                                                        }
                                                    >
                                                        View File
                                                    </h1>
                                                ) : (
                                                    <h1
                                                        name="aadhaarcard"
                                                        className="CVLD-h4"
                                                        style={{ color: "gray" }}
                                                    >
                                                        No file found
                                                    </h1>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVLD-textcontain">
                                            <label htmlFor="votersid" className="CVLD-label">
                                                Voter's ID
                                            </label>
                                            {user?.votersidfile?.filename ? (
                                                <h1
                                                    name="votersid"
                                                    className="CVLD-h4-img"
                                                    onClick={() =>
                                                        openFileInNewTab(user?.votersidfile?.filename)
                                                    }
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1
                                                    name="votersid"
                                                    className="CVLD-h4"
                                                    style={{ color: "gray" }}
                                                >
                                                    No file found
                                                </h1>
                                            )}
                                        </div>

                                        <div className="CVLD-textcontain">
                                            <label htmlFor="dl" className="CVLD-label">
                                                Driving License
                                            </label>
                                            {user?.drivinglicensefile?.filename ? (
                                                <h1
                                                    name="dl"
                                                    className="CVLD-h4-img"
                                                    onClick={() =>
                                                        openFileInNewTab(user?.drivinglicensefile?.filename)
                                                    }
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1
                                                    name="dl"
                                                    className="CVLD-h4"
                                                    style={{ color: "gray" }}
                                                >
                                                    No file found
                                                </h1>
                                            )}
                                        </div>

                                        <div className="CVLD-textcontain">
                                            <label for="passport" className="CVLD-label">
                                                Passport
                                            </label>
                                            {user?.passportfile?.filename ? (
                                                <h1
                                                    name="passport"
                                                    className="CVLD-h4-img"
                                                    onClick={() =>
                                                        openFileInNewTab(user?.passportfile?.filename)
                                                    }
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1
                                                    name="passport"
                                                    className="CVLD-h4"
                                                    style={{ color: "gray" }}
                                                >
                                                    No file found
                                                </h1>
                                            )}{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Lower">
                            {/* Employment Details */}
                            <div className="CVLD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVLD-h5">Employment Details</h1>

                                <div className="CVLD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left-Details">
                                            <div className="CVLD-textcontain">
                                                <label for="empname" className="CVLD-label">
                                                    Name Of Employer
                                                </label>
                                                <h1 name="empname" className="CVLD-h4">
                                                    {user?.nameofemployer}
                                                </h1>
                                            </div>

                                            <div className="CVLD-textcontain">
                                                <label for="workexp" className="CVLD-label">
                                                    Work Experience
                                                </label>
                                                <h1 name="workexp" className="CVLD-h4">
                                                    {user?.workexp} Years
                                                </h1>
                                            </div>

                                            <div className="CVLD-textcontain">
                                                <label for="Position" className="CVLD-label">
                                                    Position
                                                </label>
                                                <h1 name="Position" className="CVLD-h4">
                                                    {user?.position}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVLD-textcontain">
                                            <label for="Contact" className="CVLD-label">
                                                Contact
                                            </label>
                                            <h1 name="Contact" className="CVLD-h4">
                                                {user?.employercontact}
                                            </h1>
                                        </div>

                                        <div className="CVLD-textcontain">
                                            <label for="address" className="CVLD-label">
                                                Salary
                                            </label>
                                            <h1 name="address" className="CVLD-h4">
                                                ₹{user?.salary}/-
                                            </h1>
                                        </div>

                                        <div className="CVLD-textcontain">
                                            <label for="salslip" className="CVLD-label">
                                                Salary Slip
                                            </label>
                                            <h1
                                                name="salslip"
                                                className="CVLD-h4-img"
                                                onClick={() =>
                                                    user?.salaryslipimg == null
                                                        ? "no salaryslipimg image"
                                                        : openFileInNewTab(user?.salaryslipimg?.filename)
                                                }
                                            >
                                                View File
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Loan Details */}
                            <div className="CVLD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVLD-h5">Loan Details</h1>

                                <div className="CVLD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left-Details">
                                            <div className="CVLD-textcontain">
                                                <label for="loantype" className="CVLD-label">
                                                    Loan Type
                                                </label>
                                                <h1 name="loantype" className="CVLD-h4">
                                                    {user?.loantype}
                                                </h1>
                                            </div>

                                            <div className="CVLD-textcontain">
                                                <label for="loanpurpose" className="CVLD-label">
                                                    Purpose Of Loan
                                                </label>
                                                <h1 name="loanpurpose" className="CVLD-h4">
                                                    {user?.loanpurpose}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVLD-textcontain">
                                            <label for="loanamount" className="CVLD-label">
                                                Amount Required
                                            </label>
                                            <h1 name="loanamount" className="CVLD-h4">
                                                ₹{user?.loanamount}/-
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LandingFooter/>
        </div>
    );
}

export default CustomerViewLoanDetails;
