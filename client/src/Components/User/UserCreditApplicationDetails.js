
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import imgurl from '../../apis/imgURL';
import axiosInstance from '../../apis/axiosinstance';
import '../../Asserts/Styles/UserCreditApplicationDetails.css'
import LandingFooter from '../Main/LandingFooter';
import checkmark from '../../Asserts/images/Vector.png';
import UserNavbar from './UserNavbar';
import { Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa6";

function UserCreditApplicationDetails() {
  const [user, setUser] = useState({});
  const { data } = useParams();

  const openFileInNewTab = (filePath) => {
    window.open(`${imgurl}/${filePath}`, "_blank");
  };

  const GetUserData = async () => {
    try {
      const response = await axiosInstance.post(
        `/viewonecreditapplication/${data}`
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
  const navigate=useNavigate()
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    GetUserData();
  }, []);

  

  
    return (
      <div className="UCAD-MainDiv">
      <UserNavbar />    
     
      
    
          <div className="UCAD-MainDiv-ContainDiv-Content-Card-Right">
          <div className='d-flex justify-content-start'><button
          className="btn btn-light"
          type="button"
          onClick={UserbackButton}
        >
          <FaArrowLeft />
        </button></div>
          
            <div className="UCAD-MainDiv-ContainDiv-Content">
            
              <div>
                <img
                  className="UCAD-profile-img"
                  src={`${imgurl}/${user?.userid?.userPicture?.originalname}`}
                  alt="PROFILE"
                />
              </div>
    
              <div>
                <h1 className="UCAD-h3">{user?.userid?.username}</h1>
              </div>
    
              <div>
                {/* Progress Bar */}
                <Container>
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
    
                        {user?.verificationstatus ? (
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
    
                        {user?.approvalstatus === "Approved" ? (
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
                                <span className="UCAD-progress-text">Card Approved</span>
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
                                <span className="UCAD-progress-text">Card Approved</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <div className="CVCD-MainDiv-ContainDiv-Content-Card-Upper">

                            {/* Personal Details */}
                            <div className="CVCD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVCD-h5">Personal Details</h1>

                                <div className="CVCD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left-Details">
                                            <div className="CVCD-textcontain">
                                                <label for="email" className="CVCD-label">
                                                    E-mail
                                                </label>
                                                <h1 name="email" className="CVCD-h4">
                                                    {user?.userid?.userMail}
                                                </h1>
                                            </div>

                                            <div className="CVCD-textcontain">
                                                <label for="DOB" className="CVCD-label">
                                                    Date Of Birth
                                                </label>
                                                <h1 name="DOB" className="CVCD-h4">
                                                    {new Date(user?.userid?.userDate).toLocaleDateString(
                                                        "en-GB"
                                                    )}
                                                </h1>
                                            </div>

                                            <div className="CVCD-textcontain">
                                                <label for="email" className="CVCD-label">
                                                    PAN Card Number
                                                </label>
                                                <h1 name="email" className="CVCD-h4">
                                                    {user?.pancardnumber}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="CVCD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVCD-textcontain">
                                            <label for="Contact" className="CVCD-label">
                                                Contact
                                            </label>
                                            <h1 name="Contact" className="CVCD-h4">
                                                {user?.userid?.userContact}
                                            </h1>
                                        </div>

                                        <div className="CVCD-textcontain">
                                            <label for="address" className="CVCD-label">
                                                Address
                                            </label>
                                            <h1 name="address" className="CVCD-h4">
                                                {user?.userid?.userAddress}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Detail */}
                            <div className="CVCD-MainDiv-ContainDiv-Content-Card">
                                <h1 className="CVCD-h5">Card Details</h1>

                                <div className="CVCD-MainDiv-ContainDiv-Content-Card-Contain">
                                    <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left">
                                        <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left-Details">

                                            <div className="CVCD-textcontain">
                                                <label for="email" className="CVCD-label">
                                                    Card Type
                                                </label>
                                                <h1 name="email" className="CVCD-h4">
                                                    {user?.cardtype}
                                                </h1>
                                            </div>

                                            <div className="CVCD-textcontain">
                                                <label for="email" className="CVCD-label">
                                                    Salary
                                                </label>
                                                <h1 name="email" className="CVCD-h4">
                                                    ₹{user?.salary}/-
                                                </h1>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="CVCD-MainDiv-ContainDiv-Content-Card-Right">
                                        <div className="CVCD-textcontain">
                                            <label for="email" className="CVCD-label">
                                                Credit Card Limit
                                            </label>
                                            <h1 name="email" className="CVCD-h4">
                                                ₹{user?.creditcardlimit}/-
                                            </h1>
                                        </div>

                                        <div className="CVCD-textcontain">
                                            <label htmlFor="dl" className="CVCD-label">
                                                ID Proof
                                            </label>
                                            {user?.idproof?.filename ? (
                                                <h1
                                                    name="dl"
                                                    className="CVCD-h4"
                                                    onClick={() =>
                                                        openFileInNewTab(user?.idproof?.filename)
                                                    }
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1
                                                    name="dl"
                                                    className="CVCD-h4"
                                                    style={{ color: "gray" }}
                                                >
                                                    No file found
                                                </h1>
                                            )}
                                        </div>

                                        <div className="CVCD-textcontain">
                                            <label for="passport" className="CVCD-label">
                                                Income Proof
                                            </label>
                                            {user?.incomeproof?.filename ? (
                                                <h1
                                                    name="incomeproof"
                                                    className="CVCD-h4"
                                                    onClick={() =>
                                                        openFileInNewTab(user?.incomeproof?.filename)
                                                    }
                                                >
                                                    View File
                                                </h1>
                                            ) : (
                                                <h1
                                                    name="passport"
                                                    className="CVCD-h4"
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
                </Container>
              </div>
            </div>
    
           
           
      </div>
    
      <LandingFooter />
    </div>
    
  );
}

export default UserCreditApplicationDetails;
