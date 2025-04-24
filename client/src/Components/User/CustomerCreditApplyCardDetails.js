import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import { useLocation, useNavigate, useParams ,Link} from "react-router-dom";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import UserNavbar from "../User/UserNavbar";
import '../../Asserts/Styles/CustomerCreditApplyCardDetails.css';
import { FaArrowLeft } from "react-icons/fa6";

function CustomerCreditApplyCardDetails() {
    const location = useLocation();
    const combinedData = location.state?.combinedData;
    const navigate = useNavigate()
    const { data } = useParams();
    console.log("pan-pan", data);
    const [isChecked, setIsChecked] = useState(false);


    const [form, setForm] = useState({
        cardtype: "",
        employmentstatus: "",
        salary: "",
        creditcardlimit: "",
        idproof: null,
        incomeproof: null,
    });

    const [errors, setErrors] = useState({});
    const userid = localStorage.getItem("userid");

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
    
        setForm((prevForm) => {
            const updatedForm = {
                ...prevForm,
                [name]: type === "file" ? files[0] : value,
            };
    
            // Automatically update credit card limit based on salary
            if (name === "salary") {
                const salaryValue = Number(value);
                if (!isNaN(salaryValue) && salaryValue > 0) {
                    updatedForm.creditcardlimit = (salaryValue * 3).toString();
                } else {
                    updatedForm.creditcardlimit = "";
                }
            }
    
            return updatedForm;
        });
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
        let isValid = true;
        let newErrors = {};
        if (!form.cardtype.trim()) newErrors.cardtype = "Select the card type.";
        if (!form.employmentstatus.trim()) newErrors.employmentstatus = "Employment status is required.";
        if (!form.salary || Number(form.salary) <= 10000) {
            newErrors.salary = "Your salary must be greater than 10000.";
            isValid = false;
          }
                if (!form.creditcardlimit.trim()) newErrors.creditcardlimit = "Enter your credit card limit.";
        if (!form.idproof) newErrors.idproof = "ID Proof is required.";
        if (!form.incomeproof) newErrors.incomeproof = "Income proof is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const formData = new FormData();
        formData.append("cardtype", form.cardtype);
        formData.append("employmentstatus", form.employmentstatus);
        formData.append("salary", form.salary);
        formData.append("creditcardlimit", form.creditcardlimit);
        if (form.idproof) formData.append("idproof", form.idproof);
        if (form.incomeproof) formData.append("incomeproof", form.incomeproof);

        // Append previously received data
        if (combinedData) {
            Object.entries(combinedData).forEach(([key, value]) => {
                if (key === "files" && value) {
                    Object.entries(combinedData.files).forEach(([skey, svalue]) => {
                        formData.append(skey, svalue);
                    });
                } else {
                    formData.append(key, value);
                }
            });
        }

        try {
            const response = await axiosMultipartInstance.post(`/carduser/${userid}/${data}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Success:", response.data);
            if(response.data.status==400){
                alert(response.data.msg)
                navigate('/user/applylcreaditcard');
            }else{
                alert(response.data.msg)
                navigate('/user/applylcreaditcard');
            }
            // alert("Application submitted successfully.");
        } catch (error) {
            console.error("Error:", error.response || error);
            alert("Failed to submit the application. Please try again.");
        }


    };

    useEffect(() => {
        console.log(combinedData);
    }, []);

    return (
        <div className="CCACD-MainDiv">
            <UserNavbar />
            <div className="CustLoanEmplDetails">
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
                                    <span className="CCACD-progress-text">Personal Details</span>
                                </div>

                                <div className="CCCA-profildetaildline"></div>
                                <div className="CCCAcirclecontainer-2">
                                    {" "}
                                    <div className="CCCAcircle active">2</div>
                                    <span className="CCACD-progress-text">Identity</span>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
                <center>
                    <Card style={{ maxWidth: "900px", margin: "60px", marginTop: "10px" }}>
                        <Card.Body style={{ backgroundColor: "#F5F2F7", padding: "60px" }}>
                            <div className="CustLoanEmplDetailscustomerform">
                                <Container className="CustLoanEmplDetailsCustcontainer1">
                                    <h5 style={{ color: "#9A00FF", marginBottom: "40px",fontSize:"24px" }}>Card Details</h5>
                                    <Row>
                                        <Col>
                                            <div className="CustLoanEmplDetailsformstyle">
                                                <Container className="CustLoanEmplDetailscontainer2">
                                                    <Row>
                                                        <Col style={{ textAlign: 'left' }}>
                                                            <label>Card Type</label>
                                                            <div className="CCACD-cardtype">
                                                                <input
                                                                    className="CCACD-cardtype-radio"
                                                                    type="radio"
                                                                    name="cardtype"
                                                                    value="Platinum"
                                                                    checked={form.cardtype === "Platinum"}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="Platinum" className="CCACD-cardtype-label">Platinum</label>
                                                                <input
                                                                    className="CCACD-cardtype-radio"
                                                                    type="radio"
                                                                    name="cardtype"
                                                                    value="Gold"
                                                                    checked={form.cardtype === "Gold"}
                                                                    onChange={handleChange}
                                                                />
                                                                <label htmlFor="Gold" className="CCACD-cardtype-label">Gold</label>
                                                            </div>
                                                            {errors.cardtype && <p style={{ color: "red" }}>{errors.cardtype}</p>}
                                                            <br />
                                                            <label>Employment Status</label>
                                                            <select
                                                                name="employmentstatus"
                                                                value={form.employmentstatus}
                                                                onChange={handleChange}
                                                                className="CustLoanEmplDetailsformcontrol"
                                                            >
                                                                <option value="">Select Employment Status</option>
                                                                <option value="Salaried">Salaried</option>
                                                                <option value="Self-Employed">Self-Employed</option>
                                                                <option value="Retired">Retired</option>
                                                            </select>
                                                            {errors.employmentstatus && <p style={{ color: "red" }}>{errors.employmentstatus}</p>}
                                                            
                                                            <label>Salary(Monthly)</label>
                                                            <input
                                                              type="number"
                                                              name="salary"
                                                              value={form.salary}
                                                              className="CustLoanEmplDetailsformcontrol"
                                                              onChange={handleChange}
                                                            />
                                                            {errors.salary && <p style={{ color: "red" }}>{errors.salary}</p>}
                                                                                                                    </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div>
                                                <Container className="container2">
                                                    <Row>
                                                        <Col style={{ textAlign: 'left', textWeight: 'bold' }}>
                                                            <label>Credit Card Limit</label>
                                                            <input
                                                                type="number"
                                                                name="creditcardlimit"
                                                                value={form.creditcardlimit}
                                                                onChange={handleChange}
                                                                className="CustLoanEmplDetailsformcontrol"
                                                                disabled
                                                            />
                                                            {errors.creditcardlimit && <p style={{ color: "red" }}>{errors.creditcardlimit}</p>}
                                                            <br />
                                                            <label>ID Proof</label>
                                                            <input
                                                                type="file"
                                                                name="idproof"
                                                                onChange={handleFileChange}
                                                                className="CCACD-CustLoanEmplDetailsformcontrol"
                                                            />
                                                            {errors.idproof && <p style={{ color: "red" }}>{errors.idproof}</p>}
                                                            <div className="CustLoanEmplDetailsCustIcon">
                                                                <MdOutlineFileUpload />
                                                            </div>
                                                            <label>Income Proof</label>
                                                            <input
                                                                type="file"
                                                                name="incomeproof"
                                                                onChange={handleFileChange}
                                                                className="CCACD-CustLoanEmplDetailsformcontrol"
                                                            />
                                                            {errors.incomeproof && <p style={{ color: "red" }}>{errors.incomeproof}</p>}
                                                            <div className="CustLoanEmplDetailsCustIcon">
                                                                <MdOutlineFileUpload />
                                                            </div>
                                                        </Col>
                                                        <center>
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
                                                            <button   disabled={!isChecked}
                                                            type="submit" id="Employ" onClick={handleSubmit}>
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
                </center>
            </div>
        </div>
    );
}

export default CustomerCreditApplyCardDetails