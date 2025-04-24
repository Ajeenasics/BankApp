import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../apis/axiosinstance";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
import fmang from "../../Asserts/images/managerlogin.png";
import LandingNav from "../Main/LandingNav";
import LandingFooter from "../Main/LandingFooter";

function ClerkLogin() {
  const [log, setLog] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const onchg = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const validateForm = () => {
    let formValid = true;
    let newErrors = {};

    if (!log.email.trim()) {
      formValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(log.email)) {
      formValid = false;
      newErrors.email = "Email address is invalid";
    }

    if (!log.password.trim()) {
      formValid = false;
      newErrors.password = "Password is required";
    } else if (log.password.length < 6) {
      formValid = false;
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return formValid;
  };

  const navigate = useNavigate();

  const onclk = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axiosInstance.post("/clerklogin", log);
        if (response.status === 200) {
          const { msg, data } = response.data;
  
          if (msg === "login successfully") {
            if (data.ActiveStatus) {
              localStorage.setItem("clerkid", data._id);
              navigate("/clerk/homepage");
            } else {
              alert("You are deactivated by admin. Please wait until admin activates your account.");
            }
          } else {
            alert(msg);
            navigate("/clerk/login");
          }
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert(error.response?.data?.msg || "Login failed. Please try again.");
      }
    }
  };
  

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 useEffect(()=>{
    if(localStorage.getItem("clerkid")!==null){
      navigate("/clerk/homepage")
    }else{
      navigate("/clerk/login")

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
                    <b>Login Now</b>
                  </label>
                </center>
                <br />
                <div className="logcont">
                  <label>
                    <b>Email</b>
                  </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    className="form-control loginput"
                    value={log.email}
                    onChange={onchg}
                  />
                  {errors.email && (
                    <div className="error">{errors.email}</div>
                  )}
                  <br />
                  <label>
                    <b>Password</b>
                  </label>
                  <br />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control loginput"
                    value={log.password}
                    onChange={onchg}
                  />
                  <div
                    className=" Customerforget-pswd-eyeicon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FaEye />}
                  </div>
                  {errors.password && (
                    <div className="error">{errors.password}</div>
                  )}
                  <Link
                    to="/clerk/forgot"
                    className="d-flex justify-content-end"
                    id="linkstyle"
                  >
                    forgot password
                  </Link>
                  <div className="text-center">
                    <button name="submit" id="submit" onClick={onclk}>
                      Sign In
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div id="imgstyle">
                <img src={fmang} alt="clerk Login" />
              </div>
            </div>
          </Row>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default ClerkLogin;
