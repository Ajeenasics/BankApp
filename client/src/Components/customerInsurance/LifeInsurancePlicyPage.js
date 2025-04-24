import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../../Asserts/Styles/Loan.css";
import axiosInstance from "../../apis/axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";
import { FaArrowLeft } from "react-icons/fa6";

function LifeInsurancePlicyPage() {
  const [plandata, setPlanData] = useState({});
  const [formState, setFormState] = useState({
    nomineename: "",
    nomineecontactnumber: "",
    nomineerelationship: "",
    nomineeaddress: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const location = useLocation();
  const insuranceDetails = location.state;

  useEffect(() => {
    handleViewAplan();
  }, []);

  const handleViewAplan = async () => {
    try {
      const response = await axiosInstance.post(
        `/viewoneinsuranceapplication/${insuranceDetails.planid}`
      );
      setPlanData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching insurance plan data:", error);
    }
  };

  const navigate = useNavigate();
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    const isValid =
      formState.nomineename.trim() !== "" &&
      formState.nomineecontactnumber.trim() !== "" &&
      formState.nomineerelationship.trim() !== "" &&
      formState.nomineeaddress.trim() !== "";
    setIsFormValid(isValid);
  }, [formState]);

  const update = () => {
    if (isFormValid) {
      navigate("/user/applyllifeinsurancepolicylast", {
        state: { insuranceDetails, formState },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="CustLoanPersonalDetails">
      <UserNavbar />
      <Container className="my-5">
      <button
          className="btn btn-light"
          type="button"
          onClick={UserbackButton}
        >
          <FaArrowLeft />
        </button>
        <Card className="CustLoanPersonalDetailshorizontal-card mx-auto" style={{ maxWidth: "900px" }}>
          <Card.Body>
            <h5 className="text-center" style={{ color: "#9A00FF" }}>Policy Details</h5>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <label>Payment Frequency</label>
                  <input className="form-control" type="text" placeholder={plandata?.paymentfrequency} readOnly />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Policy Term</label>
                  <input className="form-control" type="text" placeholder={plandata?.policyterm} readOnly />
                </div>
              </Col>
            </Row>

            <h5 className="text-center" style={{ color: "#9A00FF" }}>Nominee Information</h5>
            <Row>
              <Col md={6}>
                <div className="mb-4">
                  <label>Nominee Name</label>
                  <input className="form-control" type="text" name="nomineename" value={formState.nomineename} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label>Nominee Relationship</label>
                  <input className="form-control" type="text" name="nomineerelationship" value={formState.nomineerelationship} onChange={handleChange} required />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-4">
                  <label>Contact Number</label>
                  <input className="form-control" type="number" name="nomineecontactnumber" value={formState.nomineecontactnumber} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                  <label>Address</label>
                  <input className="form-control" type="text" name="nomineeaddress" value={formState.nomineeaddress} onChange={handleChange} required />
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button id="CustLoanPersonalDetailsButton" className="d-inline-flex align-items-center" onClick={update} disabled={!isFormValid}>
                Continue <FaLongArrowAltRight className="ms-2" />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <LandingFooter />
    </div>
  );
}

export default LifeInsurancePlicyPage;
