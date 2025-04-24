import React, { useState,useEffect } from "react";
import "../../Asserts/Styles/user.css";
import Registr from "../../Asserts/images/frgtpswdsent.png";
import Row from "react-bootstrap/Row";
import LandingNav from "../Main/LandingNav";
import LandingFooter from "../Main/LandingFooter";
import axiosinstance from "../../apis/axiosinstance";
import { useNavigate } from "react-router-dom";

function UserSentForgotpswd() {
  const [log, setLog] = useState({
    userMail: "",
  });
  const [errors, setErrors] = useState({});

  const onchg = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const validateForm = () => {
    let formValid = true;
    let newErrors = {};

    if (!log.userMail.trim()) {
      formValid = false;
      newErrors.userMail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(log.userMail)) {
      formValid = false;
      newErrors.userMail = "Email address is invalid";
    }
    
    setErrors(newErrors); // Set errors to update the UI
    return formValid; // Return formValid to indicate if the form is valid
  };

  const onclk = async (e) => {
    console.log("ss",log.userMail)
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axiosinstance.post("/forgotPWDsentMail", { email: log.userMail });
        if (response.data.status === 200) { 
          alert(response.data.msg);
        } else {
          alert(response.data.msg);
        }
      } catch (error) {
        console.error("Request Error:", error);
        alert(error.response?.data?.msg);
      }
    }
  };

  const navigate=useNavigate()
  
  // useEffect(()=>{
  //   if(localStorage.getItem("managerid")==null){
  //     navigate("/manager/login")
  //   }

  // },[])

  return (
    <div className="customerform">
      <LandingNav />
      <div className="container1">
        <Row>
          <div className="col-6">
            <div className="box1">
              <center>
                <label className="loglab">
                  <b>Forget Password?</b>
                </label>
                <p className="mt-3">
                  Enter your E-mail below to receive your Password Reset Instruction
                </p>
              </center>
              <br />
              <div className="logcont">
                <label>
                  <b>E-mail</b>
                </label>
                <br />
                <input
                  type="email"
                  name="userMail"
                  className="form-control loginput"
                  value={log.userMail}
                  onChange={onchg}
                />
                {errors.userMail && (
                  <div className="error">{errors.userMail}</div>
                )}

                <div className="text-center mt-5">
                  <button name="submit" id="submit" onClick={onclk}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div id="imgstyle">
              <img src={Registr} alt="User Registration" />
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default UserSentForgotpswd;
