import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function CustomerLoanEmployeDetails() {
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const combinedData = location.state?.combinedData;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nameofemployer: "",
    employercontact: "",
    workexp: "",
    salary: "",
    position: "",
    salaryslip: null,
  });

  const [errors, setErrors] = useState({});
  const userid = localStorage.getItem("userid");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setForm((prevForm) => ({ ...prevForm, [name]: file }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.nameofemployer.trim())
      newErrors.nameofemployer = "Employer name is required.";
    if (!form.employercontact.trim()) {
      newErrors.employercontact = "Employer contact is required.";
    } else if (!/^\d{10}$/.test(form.employercontact)) {
      newErrors.employercontact = "Employer contact must be 10 digits.";
    }
    if (!form.workexp.trim()) {
      newErrors.workexp = "Work experience is required.";
    } else if (Number(form.workexp) <= 0) {
      newErrors.workexp = "Work experience must be greater than 0.";
    }
    if (!form.salary || Number(form.salary) <= 10000) {
      newErrors.salary = "Your salary must be greater than 10000.";
    }

    if (!form.position.trim()) newErrors.position = "Position is required.";
    if (!form.salaryslip) newErrors.salaryslip = "Salary slip is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const formData = new FormData();
    formData.append("nameofemployer", form.nameofemployer);
    formData.append("employercontact", form.employercontact);
    formData.append("workexp", form.workexp);
    formData.append("salary", form.salary);
    formData.append("position", form.position);
    if (form.salaryslip) formData.append("salaryslipimg", form.salaryslip);

    // Append previously received data
    if (combinedData) {
      Object.entries(combinedData).forEach(([key, value]) => {
        if (key === "files") {
          Object.entries(combinedData.files).forEach(([skey, svalue]) => {
            formData.append(skey, svalue);
          });
        } else {
          formData.append(key, value);
        }
      });
    }

    try {
      const response = await axiosMultipartInstance.post(
        `/saveloandata/${userid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);
      if (response.data.status == 400) {
        alert(response.data.msg);
      } else {
        alert(response.data.msg);
        navigate("/user/applyloan");
      }
    } catch (error) {
      console.error("Error:", error.response || error);
      alert("Failed to submit the application. Please try again.");
    }
  };

  useEffect(() => {
    console.log(combinedData);
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="CustLoanEmplDetails" style={{ minHeight: "150vh" }}>
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
              <div className="progress-bar-container">
                <div>
                  <div className="circle active">1</div>
                  <span className="progress-text">Personal Details</span>
                </div>
                <div className="profildetaildline"></div>
                <div>
                  <div className="circle active">2</div>
                  <span className="progress-text">Identity</span>
                </div>
                <div className="profildetaildline"></div>
                <div>
                  <div className="circle active">3</div>
                  <span className="progress-text">Employment Details</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <center>
          <Card
            className="CustLoanEmplDetailshorizontalcard"
            style={{ width: "900px", height: "500px" }}
          >
            <Card.Body>
              <div className="CustLoanEmplDetailscustomerform">
                <Container className="CustLoanEmplDetailsCustcontainer1">
                  <h5 style={{ color: "#9A00FF" }}>Employment Details</h5>
                  <Row>
                    <Col>
                      <div className="CustLoanEmplDetailsformstyle">
                        <Container className="CustLoanEmplDetailscontainer2">
                          <Row>
                            <Col>
                              <label>Name Of Employer</label>
                              <input
                                className="CustLoanEmplDetailsformcontrol"
                                type="text"
                                name="nameofemployer"
                                value={form.nameofemployer}
                                onChange={handleChange}
                              />
                              {errors.nameofemployer && (
                                <div style={{ color: "red" }}>
                                  {errors.nameofemployer}
                                </div>
                              )}
                              <label>Work Experience</label>
                              <input
                                type="number"
                                name="workexp"
                                value={form.workexp}
                                onChange={handleChange}
                                className="CustLoanEmplDetailsformcontrol"
                              />
                              {errors.workexp && (
                                <div style={{ color: "red" }}>
                                  {errors.workexp}
                                </div>
                              )}
                              <label>Position</label>
                              <input
                                type="text"
                                name="position"
                                value={form.position}
                                onChange={handleChange}
                                className="CustLoanEmplDetailsformcontrol"
                              />
                              {errors.position && (
                                <div style={{ color: "red" }}>
                                  {errors.position}
                                </div>
                              )}
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Container className="container2">
                          <Row>
                            <Col>
                              <label>Employer Contact Number</label>
                              <input
                                type="number"
                                name="employercontact"
                                value={form.employercontact}
                                onChange={handleChange}
                                className="CustLoanEmplDetailsformcontrol"
                              />
                              {errors.employercontact && (
                                <div style={{ color: "red" }}>
                                  {errors.employercontact}
                                </div>
                              )}
                              <label>Salary</label>
                              <input
                                type="number"
                                name="salary"
                                value={form.salary}
                                onChange={handleChange}
                                className="CustLoanEmplDetailsformcontrol"
                              />
                              {errors.salary && (
                                <div style={{ color: "red" }}>
                                  {errors.salary}
                                </div>
                              )}
                              <label>Salary Slip</label>
                              <input
                                type="file"
                                name="salaryslip"
                                onChange={handleFileChange}
                                className="CustLoanEmplDetailsformcontrol"
                              />
                              {errors.salaryslip && (
                                <div style={{ color: "red" }}>
                                  {errors.salaryslip}
                                </div>
                              )}
                              <div className="CustLoanEmplDetailsCustIcon">
                                <MdOutlineFileUpload />
                              </div>
                            </Col>
                            <div >
                            <p>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              ></input>{" "}
              &nbsp;I have read and agree to the Terms and Conditions of
              Unicredit, including the payment policies and dispute resolution
              terms.
              <Link to="/user/termsandcondition" target="_blank">
                terms & conditions.
              </Link>{" "}
            </p>
                            </div>

                            <center>
                              <button id="Employ"  disabled={!isChecked}
                              type="submit"  onClick={handleSubmit}>
                                Confirm
                              </button>
                            </center>
                          </Row>
                        </Container>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Card.Body>
          </Card>
        </center>
      </div>
      <LandingFooter />
    </div>
  );
}

export default CustomerLoanEmployeDetails;
