import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate, useParams } from "react-router-dom";
import "../../Asserts/Styles/CustomerViewLoanDetails.css";
import LandingFooter from "../Main/LandingFooter";
import UserNavbar from "../User/UserNavbar";
import { FaArrowLeft } from "react-icons/fa6";
import checkmark from '../../Asserts/images/Vector.png';
import { Col, Container, Row } from 'react-bootstrap';

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
            const response = await axiosInstance.post(`/viewonenonverifiedloan/${data}`);
            if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                setUser(response.data.data[0]);
            } else {
                console.error("Unexpected API response structure.");
            }
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
            navigate("/clerk/manageloan");
        } catch (error) {
            console.error("Error verifying loan:", error);
        }
    };

    useEffect(() => {
        GetUserData();
    }, [data]);

    return (
        <div className="CVLD-MainDiv">
            <UserNavbar />

            <div className="CVLD-MainDiv-ContainDiv">
                <div className="CVLD-MainDiv-ContainDiv-ContentDiv">
                    <div className="d-flex justify-content-start">
                        <button
                            className="btn btn-light"
                            type="button"
                            onClick={UserbackButton}
                        >
                            <FaArrowLeft />
                        </button>
                    </div>

                    <div className="CVLD-MainDiv-ContainDiv-HeaderDiv">
                        <h1 className="CVLD-h1">Applicant Details</h1>
                    </div>

                    <div className="CVLD-MainDiv-ContainDiv-Content">
                        <div>
                            <img
                                className="CVLD-profile-img"
                                src={`${imgurl}/${user?.userid?.userPicture?.originalname}`}
                                alt="PROFILE"
                            />
                            <h1 className="CVLD-h3">{user?.userid?.username}</h1>

                        </div>

                        <div>
                            <Row className="justify-content-center">
                                <Col md={8} className="text-center">
                                    <div className="UCADcirclecontainer">
                                        <div className="UCADcirclecontainer-1">
                                            <div className="circlecontainerdiv">
                                                <div className="UCADcircle active">
                                                    <img src={checkmark} alt="checkmark" />
                                                </div>
                                                <span className="UCAD-progress-text">Apply</span>
                                            </div>
                                        </div>

                                        {user?.loanverification ? (
                                            <>
                                                <div className="UCAD-profildetaildline active" />
                                                <div className="UCADcirclecontainer-2">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle active">
                                                            <img src={checkmark} alt="checkmark" />
                                                        </div>
                                                        <span className="UCAD-progress-text">Clerk Verify</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="UCAD-profildetaildline" />
                                                <div className="UCADcirclecontainer-2">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle"></div>
                                                        <span className="UCAD-progress-text">Clerk Verify</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {user?.loanapproval === "Approved" ? (
                                            <>
                                                <div className="UCAD-profildetaildline active" />
                                                <div className="UCADcirclecontainer-3">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle active">
                                                            <img src={checkmark} alt="checkmark" />
                                                        </div>
                                                        <span className="UCAD-progress-text">Manager Approval</span>
                                                    </div>
                                                </div>

                                                <div className="UCAD-profildetaildline active" />
                                                <div className="UCADcirclecontainer-4">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle active">
                                                            <img src={checkmark} alt="checkmark" />
                                                        </div>
                                                        <span className="UCAD-progress-text">Loan Approved</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : user?.loanapproval === "Rejected" ? (
                                            <>
                                                <div className="UCAD-profildetaildline active" />
                                                <div className="UCADcirclecontainer-3">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle">
                                                            <img src={checkmark} alt="checkmark" />
                                                        </div>
                                                        <span className="UCAD-progress-text">Manager Approval</span>
                                                    </div>
                                                </div>

                                                <div className="UCAD-profildetaildline active" />
                                                <div className="UCADcirclecontainer-4">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle reject">
                                                            {/* Add a reject icon or text here */}
                                                            <span className="reject-text">Rejected</span>
                                                        </div>
                                                        <span className="UCAD-progress-text">Loan Rejected</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="UCAD-profildetaildline" />
                                                <div className="UCADcirclecontainer-3">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle"></div>
                                                        <span className="UCAD-progress-text">Manager Approval</span>
                                                    </div>
                                                </div>

                                                <div className="UCAD-profildetaildline" />
                                                <div className="UCADcirclecontainer-4">
                                                    <div className="circlecontainerdiv">
                                                        <div className="UCADcircle"></div>
                                                        <span className="UCAD-progress-text">Loan Approved</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Upper">
                            {/* Personal Details */}
                            <div className="CVLD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVLD-h5">Personal Details</h1>
                                <div className="CVLD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">E-mail</label>
                                            <h1 className="CVLD-h4">{user?.userid?.userMail}</h1>
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Date Of Birth</label>
                                            <h1 className="CVLD-h4">
                                                {new Date(user?.userid?.userDate).toLocaleDateString("en-GB")}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Contact</label>
                                            <h1 className="CVLD-h4">{user?.userid?.userContact}</h1>
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Address</label>
                                            <h1 className="CVLD-h4">{user?.userid?.userAddress}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Identity Details */}
                            <div className="CVLD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVLD-h5">Identity</h1>
                                <div className="CVLD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">PAN Card Number</label>
                                            <h1 className="CVLD-h4">{user?.pancardnumber}</h1>
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">PAN Card</label>
                                            {user?.pancardimage?.filename ? (
                                                <h1
                                                    className="CVLD-h4-img text-decoration-underline"
                                                    onClick={() => openFileInNewTab(user?.pancardimage?.filename)}
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1 className="CVLD-h4" style={{ color: "gray" }}>
                                                    No file found
                                                </h1>
                                            )}
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Aadhaar Number</label>
                                            <h1 className="CVLD-h4">{user?.aadharnumber}</h1>
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Aadhaar Card</label>
                                            {user?.aadharimage?.filename ? (
                                                <h1
                                                    className="CVLD-h4-img text-decoration-underline"
                                                    onClick={() => openFileInNewTab(user?.aadharimage?.filename)}
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1 className="CVLD-h4" style={{ color: "gray" }}>
                                                    No file found
                                                </h1>
                                            )}
                                        </div>
                                    </div>

                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Voter's ID</label>
                                            {user?.votersidfile?.filename ? (
                                                <h1
                                                    className="CVLD-h4-img"
                                                    onClick={() => openFileInNewTab(user?.votersidfile?.filename)}
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1 className="CVLD-h4" style={{ color: "gray" }}>
                                                    No file found
                                                </h1>
                                            )}
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Driving License</label>
                                            {user?.drivinglicensefile?.filename ? (
                                                <h1
                                                    className="CVLD-h4-img"
                                                    onClick={() => openFileInNewTab(user?.drivinglicensefile?.filename)}
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1 className="CVLD-h4" style={{ color: "gray" }}>
                                                    No file found
                                                </h1>
                                            )}
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Passport</label>
                                            {user?.passportfile?.filename ? (
                                                <h1
                                                    className="CVLD-h4-img"
                                                    onClick={() => openFileInNewTab(user?.passportfile?.filename)}
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1 className="CVLD-h4" style={{ color: "gray" }}>
                                                    No file found
                                                </h1>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Employment Details */}
                        <div className="CVLD-MainDiv-ContainDiv-Content-Card-Lower">
                            <div className="CVLD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVLD-h5">Employment Details</h1>
                                <div className="CVLD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Name Of Employer</label>
                                            <h1 className="CVLD-h4">{user?.nameofemployer}</h1>
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Work Experience</label>
                                            <h1 className="CVLD-h4">{user?.workexp} Years</h1>
                                        </div>
                                    </div>

                                    <div className="CVLD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Designation</label>
                                            <h1 className="CVLD-h4">{user?.designation}</h1>
                                        </div>
                                        <div className="CVLD-textcontain">
                                            <label className="CVLD-label">Monthly Income</label>
                                            <h1 className="CVLD-h4">{user?.monthlyincome}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}

                    </div>
                </div>
            </div>

            <LandingFooter />
        </div>
    );
}

export default CustomerViewLoanDetails;
