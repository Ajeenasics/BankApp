import React, { useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/CustomerTransaction.css";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function NormalTransaction() {
  const [isChecked, setIsChecked] = useState(false);
    const [payslip, setPayslip] = useState({});
  const [formData, setFormData] = useState({
    payeename: "",
    payamount: "",
    ifsccode: "",
    accountnumber: "",
    transactiontype: "",
  });
  const [errors, setErrors] = useState({});
  const [dailyTotal, setDailyTotal] = useState(0);
  const userid = localStorage.getItem("userid");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // List of 10 predefined IFSC codes for external transactions
  const externalIfscCodes = [
    "HDFC0001234",
    "ICIC0005678",
    "SBIN0009876",
    "AXIS0004321",
    "PUNB0001111",
    "IDFC0002222",
    "KOTK0003333",
    "YESB0004444",
    "BDBL0005555",
    "CITI0006666",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // Set IFSC Code for internal transactions
    if (name === "transactiontype") {
      if (value === "internal") {
        updatedFormData.ifsccode = "UNICREDIT01";
      } else {
        updatedFormData.ifsccode = ""; // Reset IFSC code for external transactions
      }
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: "" });
  };
  const navigate=useNavigate()
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  const handleDownload = () => {
    const modalContent = `
    <html>
    <head>
      <title>Normal Transaction</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          padding: 0;
          background-color: #f8f9fa;
        }
        .container {
          width: 80%;
          margin: auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        h2, h4 {
          text-align: center;
        }
        .details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Normal Transaction</h2>
        <div class="details">
          <div>
            <p><b>Payee Name:</b> ${payslip?.payeename || "N/A"}</p>
            <p><b>Transaction ID:</b> ${payslip?._id || "N/A"}</p>
          </div>
          <div>
            <p><b>Date:</b> ${new Date(payslip?.date).getDate()}/${
      new Date(payslip?.date).getMonth() + 1
    }/${new Date(payslip?.date).getFullYear()}</p>
            <p><b>Time:</b> ${payslip?.time || "N/A"}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>S No</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Normal Transaction</td>
              <td>₹${payslip?.payamount || 0}/-</td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <p>Thank you for your payment!</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const blob = new Blob([modalContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactionslip.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.transactiontype) {
      newErrors.transactiontype = "Transaction type is required.";
    }
    if (!formData.payeename.trim()) {
      newErrors.payeename = "Payee name is required.";
    }
    if (!formData.payamount || formData.payamount <= 0) {
      newErrors.payamount = "Amount must be greater than 0.";
    } else if (formData.payamount > 20000) {
      newErrors.payamount = "Amount cannot exceed ₹20,000 for a single transaction.";
    } else if (dailyTotal + Number(formData.payamount) > 100000) {
      newErrors.payamount = "Daily transaction limit of ₹1,00,000 exceeded.";
    }
    if (!formData.accountnumber || formData.accountnumber.length !== 15) {
      newErrors.accountnumber = "Account number must be 15 characters long.";
    }
    if (!formData.ifsccode) { 
      newErrors.ifsccode = "IFSC code is required.";
  } else if (formData.ifsccode.length !== 11) {
      newErrors.ifsccode = "IFSC code must be exactly 11 characters long.";
  } else if (formData.transactiontype === "internal" && formData.ifsccode !== "UNICREDIT01") {
      newErrors.ifsccode = "Invalid IFSC Code for internal transactions.";
  }
  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || !isChecked) return;
    const data = {
      ...formData,
      userid,
    };

    try {
      const response = await axiosInstance.post("/normaltransaction", data);
      alert(response.data.message);
      axiosInstance
        .post(`/getTransactionById/${response.data.data._id}`)
        .then((result) => {
          console.log(result);
        });

      setPayslip(response.data.data);
      setShow(true)
      setDailyTotal((prevTotal) => prevTotal + Number(formData.payamount));
      setFormData({
        payeename: "",
        payamount: "",
        ifsccode: "",
        accountnumber: "",
        transactiontype: "",
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="onlinetransaction">
        <div className="container">
        <div className="d-flex justify-content-start"><button
                  className="btn btn-light"
                  type="button"
                  onClick={UserbackButton}
                >
                  <FaArrowLeft />
                </button></div>
          <div className="text-center">
            <h3 className="fw-bold mb-5 online-bill pt-5">Make a Transaction</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="col-md-4 m-auto mb-4">
              <label className="fw-bold">Transaction Type</label>
              <select
                name="transactiontype"
                className="form-control transaction-select"
                value={formData.transactiontype}
                onChange={handleChange}
              >
                <option value="">Choose Transaction Type</option>
                <option value="internal">Within the Bank</option>
                <option value="external">Other Bank</option>
              </select>
              {errors.transactiontype && (
                <span className="text-danger">{errors.transactiontype}</span>
              )}
            </div>

            <div className="row mb-4 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">IFSC Code</label>
                {formData.transactiontype === "external" ? (
                  <select
                    name="ifsccode"
                    className="form-control"
                    value={formData.ifsccode}
                    onChange={handleChange}
                  >
                    <option value="">Select IFSC Code</option>
                    {externalIfscCodes.map((code, index) => (
                      <option key={index} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="ifsccode"
                    className="form-control"
                    value={formData.ifsccode}
                    readOnly={formData.transactiontype === "internal"}
                  />
                )}
                {errors.ifsccode && <span className="text-danger">{errors.ifsccode}</span>}
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold">Payee Name</label>
                <input
                  type="text"
                  name="payeename"
                  className="form-control"
                  placeholder="Enter Name"
                  value={formData.payeename}
                  onChange={handleChange}
                />
                {errors.payeename && <span className="text-danger">{errors.payeename}</span>}
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Payee Account Number</label>
                <input
                  type="text"
                  name="accountnumber"
                  className="form-control"
                  placeholder="Enter Account number"
                  value={formData.accountnumber}
                  onChange={handleChange}
                />
                {errors.accountnumber && <span className="text-danger">{errors.accountnumber}</span>}
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold">Amount</label>
                <input
                  type="number"
                  name="payamount"
                  className="form-control"
                  placeholder="₹0/-"
                  value={formData.payamount}
                  onChange={handleChange}
                />
                {errors.payamount && <span className="text-danger">{errors.payamount}</span>}
              </div>
            </div>
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
            <div className="text-center">
              <button type="submit" disabled={!isChecked} className="btn paynow-btn rounded-pill mt-4">
                Pay now ₹{formData.payamount || 0}/-
              </button>
            </div>
          </form>
        </div>
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>View Payment Slip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <h4>Normal Transaction</h4>
              </div>
              <div className="container m-5">
                <div className="row">
                  <div className="col-7">
                    <b>Transaction ID : </b> {payslip?._id}
                    <br />
                                        <b>Account Number : </b> {payslip?.accountnumber}
                                        <br/>

                    <b>IFSC Code : </b> {payslip?.ifsccode}
                   
                    <br />
                  </div>
                  <div className="col-4">
                    <b>Date : </b>{" "}
                    {new Date(payslip?.date).toLocaleDateString("en-GB")}
                    <br/>
                    <b>Time : </b> {payslip?.time}
                  </div>
                </div>
                <Table bordered className="w-75  mt-5">
                  <thead>
                    <tr>
                      <th>S No</th>
                      <th>Payee Name </th>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{payslip?.payeename}</td>
                      <td>Normal Transaction</td>
                      <td>₹{payslip?.payamount}/-</td>
                    </tr>
                  </tbody>
                </Table>
                <b>Amount Paid : ₹{payslip?.payamount}/-</b>{" "}
              </div>
            </Modal.Body>
            <Modal.Footer>
                         <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDownload}>
              Download
            </Button>
            </Modal.Footer>
          </Modal>
      </div>
      <LandingFooter />
    </div>
  );
}

export default NormalTransaction;
