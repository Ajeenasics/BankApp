import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../../Asserts/Styles/CustomerCreditCardApply.css";
import axiosInstance from "../../apis/axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../User/UserNavbar";
import { FaArrowLeft } from "react-icons/fa6";

function CustomerCreditCardApply() {
  const [data, setData] = useState({});
  const location = useLocation();
  const [panCN, setPanCN] = useState("");
  const [errors, setErrors] = useState({});

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

  const navigate = useNavigate();
  const update = () => {
    let isValid = true;
    const newErrors = {};
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panCN) {
      newErrors.panCN = "PAN Card Number is mandatory.";
      isValid = false;
    } else if (!panCN) {
      newErrors.panCN = "PAN Card Number is mandatory.";
      isValid = false;
    } else if (!panRegex.test(panCN)) {
      newErrors.panCN =
        "Invalid PAN format. Example: ABCDE1234F (all uppercase, no special characters).";
      isValid = false;
    } else {
      navigate(`/user/carddetails/${panCN}`);
      console.log("pan-pan-pan", panCN);
    }
    setErrors(newErrors);
  };
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="CCCA">
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
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <div className="CCCAcirclecontainer">
              <div className="CCCAcirclecontainer-1">
                {" "}
                <div className="CCCAcircle active">1</div>
                <span className="progress-text">Personal Details</span>
              </div>

              <div className="CCCA-profildetaildline"></div>
              <div className="CCCAcirclecontainer-2">
                {" "}
                <div className="circle">2</div>
                <span className="progress-text">Identity</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Form Section */}
      <Container>
        <Card
          className="CCCAhorizontal-card mx-auto"
          style={{ maxWidth: "900px", margin: "60px", marginTop: "10px" }}
        >
          <Card.Body style={{ backgroundColor: "#F5F2F7", padding: "60px" }}>
            <h5
              className="text-center"
              style={{
                color: "#9A00FF",
                marginBottom: "60px",
                fontSize: "24px",
              }}
            >
              Personal Details
            </h5>
            <Row>
              {/* Left Column */}
              <Col md={6}>
                <div className="mb-4">
                  <label>Name</label>
                  <input
                    className=" CCCAformcontrol"
                    type="text"
                    name="Name"
                    placeholder={data?.username}
                  />
                </div>

                <div className="mb-4">
                  <label>Email ID</label>
                  <input
                    className=" CCCAformcontrol"
                    type="text"
                    name="EmailID"
                    placeholder={data?.userMail}
                  />
                </div>

                <div className="mb-4">
                  <label>Date of Birth</label>
                  <input
                    className=" CCCAformcontrol"
                    type="date"
                    name="DateOfBirth"
                    value={
                      data?.userDate
                        ? new Date(data?.userDate).toISOString().split("T")[0]
                        : ""
                    }
                  />
                </div>

                <div className="mb-4">
                  <label>PAN Card Number</label>
                  <input
                    className=" CCCAformcontrol"
                    type="text"
                    name="PanCardNumber"
                    placeholder="Enter your PanCard Number"
                    value={panCN}
                    onChange={(e) => setPanCN(e.target.value)}
                  />
                  {errors.panCN && (
                    <span className="text-danger">{errors.panCN}</span>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Contact Number</label>
                  <input
                    className="CCCAformcontrol"
                    type="text"
                    name="Contact"
                    placeholder={data?.userContact}
                  />
                </div>
                <div className="mb-4">
                  <label>Address</label>
                  <input
                    className="CCCAformcontrol"
                    type="text"
                    name="Address"
                    placeholder={data?.userAddress}
                  />
                </div>
                <div className="mb-4">
                  <label>Profile Picture</label>
                  <div className="d-flex align-items-center">
                    <input
                      className="CCCAformcontrol"
                      type="text"
                      name="ProfilePicture"
                      placeholder={data?.userPicture?.filename}
                    />
                    <MdOutlineFileUpload
                      size={24}
                      style={{ marginLeft: "-40px" }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            {/* Continue Button */}
            <div className="text-center">
              <Button
                id="CCCAButton"
                className="d-inline-flex align-items-center"
                onClick={update}
              >
                Continue
                <FaLongArrowAltRight className="ms-2" />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CustomerCreditCardApply;
