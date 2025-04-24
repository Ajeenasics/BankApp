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

function CustomerOnlineTransaction() {
  const [isChecked, setIsChecked] = useState(false);
  const [payslip, setPayslip] = useState({});
  const [formData, setFormData] = useState({
    payeename: "",
    payamount: "",
    ifsccode: "",
    accountnumber: "",
    chequeimage: null,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errors, setErrors] = useState({});
  const userid = localStorage.getItem("userid");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear the error for the current field
  };
  const navigate = useNavigate();
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.payeename.trim()) {
      newErrors.payeename = "Payee name is required.";
    }
    if (!formData.payamount || formData.payamount <= 0) {
      newErrors.payamount = "Amount must be greater than 0.";
    }
    if (!formData.accountnumber || formData.accountnumber.length !== 15) {
      newErrors.accountnumber = "Account number must be 15 characters long.";
    }
    if (!formData.ifsccode || formData.ifsccode.length !== 11) {
      newErrors.ifsccode = "IFSC code must be 11 characters long.";
    }
    if (!formData.chequeimage) {
      newErrors.chequeimage = "Cheque image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  const handleDownload = () => {
    const modalContent = `
    <html>
    <head>
      <title>Online Transaction</title>
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
        <h2>Online Transaction</h2>
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
              <td>Online Transaction</td>
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
    a.download = "onlinetransactionslip.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !isChecked) return;
    const data = new FormData();
    data.append("payeename", formData.payeename);
    data.append("payamount", formData.payamount);
    data.append("ifsccode", formData.ifsccode);
    data.append("accountnumber", formData.accountnumber);
    data.append("chequeimage", formData.chequeimage);
    data.append("userid", userid);
    setIsChecked(false);
    try {
      const response = await axiosInstance.post("/onlinetransaction", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
            alert("Transaction request sended to bank")

      // alert(response.data.message);

      console.log(response.data, "o");
      axiosInstance
        .post(`/getTransactionById/${response.data.data._id}`)
        .then((result) => {
          console.log(result);
        });

      setPayslip(response.data.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      alert("Failed to fetch transaction details.");
    }
    setFormData({
      payeename: "",
      payamount: "",
      ifsccode: "",
      accountnumber: "",
      chequeimage: null,
    });
  };

  return (
    <div>
      <UserNavbar />
      <div className="onlinetransaction">
        <div className="container">
          <div className="d-flex justify-content-start">
            <button
              className="btn btn-light"
              type="button"
              onClick={UserbackButton}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="text-center">
            <h3 className="fw-bold mb-5 online-bill pt-5">
              Online Cheque Transaction
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Payee Name</label>
                <input
                  type="text"
                  name="payeename"
                  className="form-control"
                  placeholder="Enter Name"
                  value={formData.payeename}
                  onChange={handleChange}
                  required
                />
                {errors.payeename && (
                  <span className="text-danger">{errors.payeename}</span>
                )}
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
                  required
                />
                {errors.payamount && (
                  <span className="text-danger">{errors.payamount}</span>
                )}
              </div>
            </div>
            <div className="row mb-3 d-flex justify-content-center gap-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">
                  Payee Account Number
                </label>
                <input
                  type="text"
                  name="accountnumber"
                  className="form-control"
                  placeholder="Enter Account number"
                  value={formData.accountnumber}
                  onChange={handleChange}
                  required
                />
                {errors.accountnumber && (
                  <span className="text-danger">{errors.accountnumber}</span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Cheque Image</label>
                <input
                  type="file"
                  name="chequeimage"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
                {errors.chequeimage && (
                  <span className="text-danger">{errors.chequeimage}</span>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">IFSC Code</label>
                <input
                  type="text"
                  name="ifsccode"
                  className="form-control"
                  placeholder="Enter IFSC Code"
                  value={formData.ifsccode}
                  onChange={handleChange}
                  required
                />
                {errors.ifsccode && (
                  <span className="text-danger">{errors.ifsccode}</span>
                )}
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
            <div className="text-center pb-5">
              <button
                disabled={!isChecked}
                type="submit"
                className="btn paynow-btn rounded-pill mt-4"
              >
                Pay now ₹{formData.payamount || 0}/-
              </button>
            </div>
          </form>
          {/*<Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>View Payment Slip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <h4>Online Transaction</h4>
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
                      <td>Online Transaction</td>
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
          </Modal>*/}
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default CustomerOnlineTransaction;
