import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios with `npm install axios`
import axiosInstance from "../../apis/axiosinstance";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function CustomerElectricityBill() {
  const [isChecked, setIsChecked] = useState();
  const [payslip, setPayslip] = useState({});
  const [formData, setFormData] = useState({
    billNumber: "",
    accountNumber: "",
    amount: "",
  });
  const navigate = useNavigate();
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState({
    billNumber: "",
    accountNumber: "",
    amount: "",
  });
  const today = new Date();

  let userid = localStorage.getItem("userid");
  const [loading, setLoading] = useState(false); // To show loading state
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownload = () => {
    const modalContent = `
    <html>
    <head>
      <title>Electricity Bill</title>
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
        <h2>Kerala Electricity</h2>
        <h4>Online Electricity Bill</h4>
        <div class="details">
          <div>
            <p><b>Customer Name:</b> ${payslip?.userid?.username || "N/A"}</p>
            <p><b>Bill ID:</b> ${payslip?.billnumber || "N/A"}</p>
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
              <td>Electricity Bill</td>
              <td>₹${payslip?.amount || 0}/-</td>
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
    a.download = "electricity_bill.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "billNumber") {
      if (!value || value.length !== 8) {
        error = "Bill Number must be exactly 8 characters.";
      }
    } else if (name === "accountNumber") {
      if (!value || value.length !== 15) {
        error = "Account Number must be exactly 15 digits.";
      }
    } else if (name === "amount") {
      if (!value || value <= 0) {
        error = "Amount must be greater than 0.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the field and update errors
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      billNumber: validateField("billNumber", formData.billNumber),
      accountNumber: validateField("accountNumber", formData.accountNumber),
      amount: validateField("amount", formData.amount),
    };

    setErrors(newErrors);

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      try {
        // Replace with your backend API URL
        const response = await axiosInstance.post("/payElectricBill", {
          userid: userid,
          billnumber: formData.billNumber,
          accountnumber: formData.accountNumber,
          amount: Number(formData.amount),
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        });

        setSuccessMessage(response.data.msg);
        const billid = response.data.data.bill._id;

        setFormData({
          billNumber: "",
          accountNumber: "",
          amount: "",
        });
        axiosInstance.get("/electric-bill/" + billid).then((result) => {
          setPayslip(result.data.data);
        });
        console.log(payslip, "m");

        setTimeout(() => {
          handleShow();
        }, 3000);
      } catch (error) {
        console.error("Error submitting the form:", error);
        setErrorMessage(
          error.response?.data?.msg || "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h3 className="fw-bold mb-4 electricity-bill">Electricity Bill</h3>
      </div>
      <div className="text-center">
        <h3 className="fw-bold mb-5 electricity-bill">Enter Account Details</h3>
      </div>

      <div className="row mb-4">
        <div className="col-md-12 electricity-number text-center">
          <label className="form-label fw-bold">Bill Number</label>
          <input
            type="text"
            className={`form-control ${errors.billNumber ? "is-invalid" : ""}`}
            placeholder="Enter bill number (8 characters)"
            name="billNumber"
            value={formData.billNumber}
            onChange={handleChange}
          />
          {errors.billNumber && (
            <div className="invalid-feedback">{errors.billNumber}</div>
          )}
        </div>
      </div>

      <div className="row mb-3 d-flex justify-content-center">
        <div className="col-md-4">
          <label className="form-label fw-bold">Account Number</label>
          <input
            type="number"
            className={`form-control ${
              errors.accountNumber ? "is-invalid" : ""
            }`}
            placeholder="Enter Account number (15 digits)"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
          {errors.accountNumber && (
            <div className="invalid-feedback">{errors.accountNumber}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label fw-bold">Amount to be paid</label>
          <input
            type="number"
            className={`form-control ${errors.amount ? "is-invalid" : ""}`}
            placeholder="₹"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          {errors.amount && (
            <div className="invalid-feedback">{errors.amount}</div>
          )}
        </div>
      </div>

      <p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        ></input>{" "}
        &nbsp;I have read and agree to the Terms and Conditions of Unicredit,
        including the payment policies and dispute resolution terms.
        <Link to="/user/termsandcondition" target="_blank">
          terms & conditions.
        </Link>{" "}
      </p>
      <div className="text-center">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn electricity-paybutton rounded-pill mt-4"
          onClick={handleSubmit}
          disabled={!isChecked}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success mt-3 text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3 text-center">
          {errorMessage}
        </div>
      )}

      <>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Details</Modal.Title>
          </Modal.Header>
          <div className="text-center mt-4">
            {" "}
            <h4>Kerala Electricity</h4>
            <h5>ONLINE BILL</h5>
          </div>

          <Modal.Body>
            <div className="container m-5">
              {" "}
              <div className="row">
                <div className="col">
                  <b>Customer Name :</b>{" "}
                  <label>{payslip?.userid?.username}</label>
                  <br />
                  <b>Bill ID :</b>
                  <label>{payslip.billnumber}</label>
                </div>
                <div className="col">
                  <b>Receipt Date : </b>
                  <label>
                    {new Date(payslip.date).getDate()}/
                    {new Date(payslip.date).getMonth() + 1}/
                    {new Date(payslip.date).getFullYear()}
                  </label>
                  <br /> <b>Time : </b> {payslip.time}{" "}
                </div>
              </div>
              <div>
                <Table bordered className="w-75  mt-4">
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
                      <td>Electricity Bill</td>
                      <td>{payslip.amount}/-</td>
                    </tr>
                  </tbody>
                </Table>
                <b>Amount Paid : ₹{payslip.amount}/-</b>{" "}
              </div>
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
      </>
    </div>
  );
}

export default CustomerElectricityBill;
