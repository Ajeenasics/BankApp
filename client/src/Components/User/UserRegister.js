import React, { useState } from "react";
import "../../Asserts/Styles/user.css";
import Registr from "../../Asserts/images/userregister.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LandingNav from "../Main/LandingNav";
import LandingFooter from "../Main/LandingFooter";
import axiosinstance from "../../apis/axiosinstance";
import { useNavigate, Link } from "react-router-dom";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";

function UserRegister() {
  const [form, setForm] = useState({
    username: "",
    userContact: "",
    userAddress: "",
    userCode: "UNICREDIT01",
    userPassword: "",
    userMail: "",
    userDate: "",
    userNumber: "",
    userPicture: null,
    userConfirmpass: "",
  });

  const [errors, setErrors] = useState({});
  const [profileFileName, setProfileFileName] = useState({});
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const userPicture = e.target.files[0];
    if (userPicture && !userPicture.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userPicture: "Only JPG, JPEG, PNG, and GIF files are allowed",
      }));
      return;
    }
    setErrors((prevErrors) => ({ ...prevErrors, userPicture: "" }));
    setForm({ ...form, userPicture });
    setProfileFileName(userPicture?.name || "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "userDate") {
      const selectedDate = new Date(value);
      const cutoffDate = new Date("2015-01-01");

      if (selectedDate >= cutoffDate) {
        newErrors.userDate =
          "Invalid date of birth. Select a date before 2015.";
      } else {
        delete newErrors.userDate;
      }
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: value });
  };

  const [showCPassword, setShowCPassword] = useState(false);
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let formValid = true;
    let newErrors = {};

    if (!form.username.trim()) {
      formValid = false;
      newErrors.username = "Name is required";
    }
    if (!form.userMail.trim()) {
      formValid = false;
      newErrors.userMail = "Email is required";
    } else if (!form.userMail.endsWith("@gmail.com")) {
      formValid = false;
      newErrors.userMail = "Email must be a valid Gmail address";
    }
    if (!form.userContact.trim()) {
      formValid = false;
      newErrors.userContact = "Contact number is required";
    } else if (!/^\d{10}$/.test(form.userContact)) {
      formValid = false;
      newErrors.userContact = "Enter a valid 10-digit contact number";
    }
    if (!form.userPassword.trim()) {
      formValid = false;
      newErrors.userPassword = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        form.userPassword
      )
    ) {
      formValid = false;
      newErrors.userPassword =
        "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    if (!form.userAddress.trim()) {
      formValid = false;
      newErrors.userAddress = "Address is required";
    }
    if (!form.userCode.trim()) {
      formValid = false;
      newErrors.userCode = "IFSC Code is required";
    } else if (form.userCode.trim().length !== 11) {
      formValid = false;
      newErrors.userCode = "IFSC Code must be exactly 11 characters";
    }
    if (!form.userDate.trim()) {
      formValid = false;
      newErrors.userDate = "Date of Birth is required";
    } else {
      const selectedDate = new Date(form.userDate);
      const cutoffDate = new Date("2015-01-01");

      if (selectedDate >= cutoffDate) {
        formValid = false;
        newErrors.userDate =
          "Invalid date of birth. Select a date before 2015.";
      }
    }

    if (!form.userNumber.trim()) {
      formValid = false;
      newErrors.userNumber = "Account Number is required";
    } else if (form.userNumber.trim().length !== 15) {
      formValid = false;
      newErrors.userNumber = "Account Number must be exactly 15 characters";
    }
    if (!form.userPicture) {
      formValid = false;
      newErrors.userPicture = "Profile picture is required";
    }
    if (form.userConfirmpass !== form.userPassword) {
      formValid = false;
      newErrors.userConfirmpass = "Passwords do not match";
    }

    setErrors(newErrors);
    return formValid;
  };

  const update = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("userMail", form.userMail);
      formData.append("userContact", form.userContact);
      formData.append("userPassword", form.userPassword);
      formData.append("userAddress", form.userAddress);
      formData.append("userCode", form.userCode);
      formData.append("userDate", form.userDate);
      formData.append("userNumber", form.userNumber);
      formData.append("userPicture", form.userPicture);

      try {
        const response = await axiosMultipartInstance.post(
          "/userRegister",
          formData
        );
        if (response.status === 200) {
          alert(response.data.msg);
          navigate("/user/login");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error?.response?.data?.msg || "Error occurred");
      }
    }
  };

  return (
    <div className="customerform">
      <LandingNav />
      <div className="container1">
        <Row>
          <Col>
            <div className="formstyle">
              <center>
                <h4 id="regheading">Register Now</h4>
              </center>
              <Container className="container2">
                <Row>
                  <Col>
                    <label>Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="error">{errors.username}</div>
                    )}

                    <label>Contact</label>
                    <input
                      type="number"
                      name="userContact"
                      value={form.userContact}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.userContact && (
                      <div className="error">{errors.userContact}</div>
                    )}

                    <label>Address</label>
                    <input
                      type="text"
                      name="userAddress"
                      value={form.userAddress}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.userAddress && (
                      <div className="error">{errors.userAddress}</div>
                    )}

                    <label>IFSC Code</label>
                    <input
                      type="number"
                      name="userCode"
                      placeholder={form.userCode}
                      value={form.userCode}
                      onChange={handleChange}
                      className="form-control"
                      disabled
                    />
                    {errors.userCode && (
                      <div className="error">{errors.userCode}</div>
                    )}

                    <label>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="userPassword"
                      value={form.userPassword}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <label
                      className=" Customerpswrd"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FiEyeOff /> : <FaEye />}
                    </label>
                    {errors.userPassword && (
                      <div className="error">{errors.userPassword}</div>
                    )}
                  </Col>

                  <Col>
                    <label>E-mail</label>
                    <input
                      type="email"
                      name="userMail"
                      value={form.userMail}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.userMail && (
                      <div className="error">{errors.userMail}</div>
                    )}

                    <label>Date Of Birth</label>
                    <input
                      type="date"
                      name="userDate"
                      value={form.userDate}
                      onChange={handleChange}
                      className="form-control"
                      max="2014-12-31"
                    />
                    {errors.userDate && (
                      <div className="error">{errors.userDate}</div>
                    )}

                    <label>Account Number</label>
                    <input
                      type="text"
                      name="userNumber"
                      value={form.userNumber}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.userNumber && (
                      <div className="error">{errors.userNumber}</div>
                    )}

                    <label>Profile Picture</label>
                    <input
                      type="file"
                      name="userPicture"
                      onChange={handleFileChange}
                      className="form-control"
                    />
                    {errors.userPicture && (
                      <div className="error">{errors.userPicture}</div>
                    )}

                    <label>Confirm Password</label>
                    <input
                      type={showCPassword ? "text" : "password"}
                      name="userConfirmpass"
                      value={form.userConfirmpass}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <label
                      className="Customerpswrd"
                      onClick={toggleCPasswordVisibility}
                    >
                      {showCPassword ? <FiEyeOff /> : <FaEye />}
                    </label>
                    {errors.userConfirmpass && (
                      <div className="error">{errors.userConfirmpass}</div>
                    )}
                  </Col>
                </Row>
              </Container>
              <center className="mt-3">
                <button onClick={update} id="regbutton">
                  Register
                </button>
                <p id="foot">
                  Already have an account?{" "}
                  <Link to="/user/login" id="linkstyle">
                    <b>Sign In</b>
                  </Link>
                </p>
              </center>
            </div>
          </Col>
          <Col>
            <div id="imgstyle">
              <img src={Registr} alt="User Registration" />
            </div>
          </Col>
        </Row>
      </div>
      <LandingFooter />
    </div>
  );
}

export default UserRegister;
