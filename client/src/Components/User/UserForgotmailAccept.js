import React, { useState,useEffect } from "react";
import "../../Asserts/Styles/manager.css";
import fmang from "../../Asserts/images/changfrgtpswd.png";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LandingFooter from "../Main/LandingFooter";
import LandingNav from "../Main/LandingNav";
import axiosinstance from "../../apis/axiosinstance";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserForgotmailAccept() {
  const [log, setLog] = useState({
    userConfirmpass: "",
    userPassword: "",
  });
  const [errors, setErrors] = useState({});

  const {id}=useParams()

  const onchg = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const validateForm = () => {
    let formValid = true;
    let newErrors = {};

    if (!log.userPassword.trim()) {
        formValid = false;
        newErrors.userPassword = "Password is required";
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
          log.userPassword
        )
      ) {
        formValid = false;
        newErrors.userPassword =
          "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
      }
    if (log.userConfirmpass !== log.userPassword) {
      formValid = false;
      newErrors.userConfirmpass = "Passwords do not match";
    }
    setErrors(newErrors);
    return formValid;
  };

  const navigate=useNavigate()

  const onclk = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axiosinstance.post("/resetPassword/"+id,{password:log.userPassword});
        if (response.status === 200) {
          alert(response.data.msg);
          setTimeout(()=>{
            navigate("/user/login")

          },1000)
          // Navigate to a different page if needed
        }
      } catch (error) {
        alert(error.response?.data?.msg || "Please try again.");
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showCPassword, setshowCPassword] = useState(false);
  const toggleCPasswordVisibility = () => {
    setshowCPassword(!showCPassword);
  };

  
  useEffect(()=>{
    if(localStorage.getItem("userid")==null){
      navigate("/manager/login")
    }

  },[])
  return (
    <div>
      <LandingNav />
      <div id="bd">
        <div className="row1">
          <Row>
            <div className="col-6">
              <div className="box1">
                <center>
                  <label className="loglab">
                    <b>Reset Password!</b>
                  </label>
                  <p>Enter your new password to reset.</p>
                </center>
                <br />
                <div className="logcont">
                  <label>
                    <b>Password</b>
                  </label>
                  <br />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="userPassword"
                    className="form-control loginput"
                    value={log.userPassword}
                    onChange={onchg}
                  />
                  <div
                    className=" Customerforget-pswd-eyeicon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FaEye />}
                  </div>
                  {errors.userPassword && (
                    <div className="error">{errors.userPassword}</div>
                  )}
                  <br />

                  <label><b>Confirm Password</b></label>
                  <input
                    type={showCPassword ? "text" : "password"}
                    name="userConfirmpass"
                    value={log.userConfirmpass}
                    onChange={onchg}
                    className="form-control"
                  />
                  <label
                    className="Customerforget-pswd-eyeicon"
                    onClick={toggleCPasswordVisibility}
                  >
                    {showCPassword ? <FiEyeOff /> : <FaEye />}
                  </label>
                  {errors.userConfirmpass && (
                    <div className="error">{errors.userConfirmpass}</div>
                  )}
                  <div className="text-center">
                    <button name="submit" id="submit" onClick={onclk}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div id="imgstyle">
                <img src={fmang} alt="User Login" />
              </div>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default UserForgotmailAccept;
