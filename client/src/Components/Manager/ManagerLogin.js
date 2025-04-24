import React, { useState ,useEffect} from "react";
import "../../Asserts/Styles/manager.css";
import fmang from "../../Asserts/images/managerlogin.png";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LandingNav from "../Main/LandingNav";
import LandingFooter from "../Main/LandingFooter";
import axiosinstance from "../../apis/axiosinstance";
import { useNavigate } from "react-router-dom";

function ManagerLogin() {
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
      newErrors.email = "Invalid email address";
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
        const response = await axiosinstance.post("/managerlogin", log);
        if (response.status === 200) {
          console.log(response.data);
  
          const { msg, ActiveStatus, data } = response.data;
          
          if (msg === "Login successfully") {
            if (!ActiveStatus) {
              alert("Your account has been deactivated. Please contact the admin.");
            } else {
              localStorage.setItem("managerid", data._id);           
                navigate("/manager/home");
            }
          } else {
            alert("Login failed. Please check your credentials.");
            navigate("/manager/login");
          }
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed. Please try again.");
      }
    }
  };
  
  

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
useEffect(()=>{
    if(localStorage.getItem("managerid")!==null){
      navigate("/manager/home")
    }else{
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
                  {errors.email && <div className="error">{errors.email}</div>}
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
                  <br />
                  <br />
                  <div className="text-center">
                    <button name="submit" id="submit" type="button" onClick={onclk}>
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div id="imgstyle">
                <img src={fmang} alt="Manager Login" />
              </div>
            </div>
          </Row>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default ManagerLogin;
