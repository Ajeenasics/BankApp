import React, { useState ,useEffect} from "react";
import logo from "../../Asserts/images/Adminprofile.png";
import loginbtn from "../../Asserts/images/login.png";
import "../../Asserts/Styles/AdminLogn.css";
import { Link, useNavigate } from "react-router-dom";
import { FiEyeOff } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa6';

function AdminLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  let mail = "admin@gmail.com";
  let pass = "Admin@123";

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const formValidating = (fieldName, value) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }

    if (fieldName === "Email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address";
    }

    if (fieldName === "Password") {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(value)) {
        return "Password must contain at least one number, one special character, and one capital letter";
      }
    }

    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    errors.email = formValidating("Email", data.email);
    errors.password = formValidating("Password", data.password);
    setErrors(errors);

    if (!errors.email && !errors.password) {
      const values = { email: data.email, password: data.password };
      console.log(values);
      if (mail == data.email && pass == data.password) {
        // alert("Loggedin Successfully");
        localStorage.setItem("admin", 1);
        Navigate("/admin/dashboard");
      } else {
        alert("Email or Password is incorrect");
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate=useNavigate()

  useEffect(()=>{
      if(localStorage.getItem("admin")!==null){
        navigate("/admin/dashboard")
      }else{
        navigate("/adminlogin")
  
      }
  
    },[])
  return (
    <div className="loginbackground">
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="a col-6">
            <div className="image">
              <img src={logo}></img>
            </div>

            <div className="mb-3 mt-5">
              <input
                type="email"
                className="form-control form-input"
                id="inputusername"
                placeholder="Email"
                required=""
                onChange={handleInputChange}
                name="email"
                value={data.email}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>

            <div className="mb-4">
              <input
              type={showPassword ? "text" : "password"}
              className="form-control form-input"
                id="textbox"
                placeholder="Password"
                required=""
                name="password"
                onChange={handleInputChange}
                value={data.password}
              />
              <div className="adminlogineye" onClick={togglePasswordVisibility}>
              {showPassword ? <FiEyeOff /> : <FaEye/>}
        </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="text-center" onClick={handleSubmit}>
              <img src={loginbtn}></img>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
