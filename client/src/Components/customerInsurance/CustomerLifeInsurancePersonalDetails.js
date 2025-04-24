import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../../Asserts/Styles/Loan.css";
import axiosInstance from "../../apis/axiosinstance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";
import { FaArrowLeft } from "react-icons/fa6";

function CustomerLifeInsurancePersonalDetails() {
  const [data, setData] = useState({});
  // const location = useLocation();
  // const loanDetails = location.state;

  const { planid } = useParams();

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userid");

      const response = await axiosInstance.get(`/view_a_user/${userId}`);
      console.log("User Data:", response.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    // console.log("Received Loan Details:", loanDetails)
    fetchUserData();
  }, [data]);

  const navigate = useNavigate();
  const update = (userId) => {
    // navigate("/user/applyllifeinsurancepolicy", { state: { loanDetails } });
    console.log(userId, planid, "oo");

    navigate("/user/applyllifeinsurancepolicy", { state: { userId, planid } });
  };

  return (
    <div className="CustLoanPersonalDetails ">
      <UserNavbar />
      {/* Progress Bar */}
      <Container>
      <button
          className="btn btn-light"
          type="button"
          onClick={UserbackButton}
        >
          <FaArrowLeft />
        </button>
        <Row className="justify-content-center ">
          <Col md={6} className="text-center">
            <div className="progress-bar-container">
              <div>
                {" "}
                <div className="circle active">1</div>
                <span className="progress-text">Personal Details</span>
              </div>

              <div className="profildetaildline"></div>
              <div>
                {" "}
                <div className="circle ">2</div>
                <span className="progress-text">Policy & Nominee</span>
              </div>

              <div className="profildetaildline"></div>

              <div>
                {" "}
                <div className="circle">3</div>
                <span className="progress-text">Health & Document</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Form Section */}
      <Container className="pb-5 mt-5">
        <Card
          className="CustLoanPersonalDetailshorizontal-card mx-auto"
          style={{ maxWidth: "900px" }}
        >
          <Card.Body>
            <h5 className="text-center" style={{ color: "#9A00FF" }}>
              Personal Details
            </h5>
            <Row>
              {/* Left Column */}
              <Col md={6}>
                <div className="mb-4">
                  <label>Name</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    name="Name"
                    placeholder={data?.username}
                  />
                </div>

                <div className="mb-4">
                  <label>Date of Birth</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="date"
                    name="DateOfBirth"
                    value={
                      data?.userDate
                        ? new Date(data?.userDate).toISOString().split("T")[0]
                        : ""
                    }
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Contact Number</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    name="Contact"
                    placeholder={data?.userContact}
                  />
                </div>
                <div className="mb-4">
                  <label>Address</label>
                  <input
                    className="form-control CustLoanPersonalDetailsformcontrol"
                    type="text"
                    name="Address"
                    placeholder={data?.userAddress}
                  />
                </div>
                <div className="mb-4">
                  <label>Profile Picture</label>
                  <div className="d-flex align-items-center">
                    <input
                      className="form-control CustLoanPersonalDetailsformcontrol"
                      type="text"
                      name="ProfilePicture"
                      placeholder={data?.userPicture?.filename}
                    />
                    <MdOutlineFileUpload className="ms-2" size={24} />
                  </div>
                </div>
              </Col>
            </Row>
            {/* Continue Button */}
            <div className="text-center">
              <Button
                id="CustLoanPersonalDetailsButton"
                className="d-inline-flex align-items-center"
                onClick={() => update(data?._id)}
              >
                Continue
                <FaLongArrowAltRight className="ms-2" />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <LandingFooter />
    </div>
  );
}

export default CustomerLifeInsurancePersonalDetails;
// <div className="mb-4">
//                   <label>Gender</label>
//                   <div>
//                     <label className="me-4">
//                       <input type="radio" name="Gender" value="Male"  /> Male
//                     </label>
//                     <label className="me-4">
//                       <input type="radio" name="Gender" value="Female"  /> Female
//                     </label>
//                     <label>
//                       <input type="radio" name="Gender" value="Others"  /> Others
//                     </label>
//                   </div>
//                 </div>
