import AdminSidebar from "./AdminSidebar";
import addbtn from "../../Asserts/images/login button.png";
import React, { useState,useEffect } from "react";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import { useNavigate, Link } from "react-router-dom";
import { FiEyeOff } from 'react-icons/fi';
import { FaEye } from 'react-icons/fa6';
import { FaArrowLeft } from "react-icons/fa6";
function AdminAddManagers() {
  const navigate = useNavigate();

  const [managerdata, setManagerdata] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    qualification: "",
    dob: "",
    address: "",
    destination: "",
    idproof: null, 
    profile: null, 
    dateofjoining: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    qualification: "",
    dob: "",
    address: "",
    destination: "",
    idproof: "",
    profile: "",
    dateofjoining: "",
  });

  const [profileFileName, setProfileFileName] = useState("");
  const [idproofFileName, setIdproofFileName] = useState("");

  const [error, setError] = useState(null);
  const [errorVideo, setErrorVideo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManagerdata({ ...managerdata, [name]: value });
  };

  const handleFileChange = (e) => {
    const profile = e.target.files[0];
    if (!profile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setError("Only JPG, JPEG, PNG, and GIF files are allowed");
      return;
    }
    setError(null);
    setManagerdata({ ...managerdata, profile });
    setProfileFileName(profile.name);
  };

  const handleidproofChange = (e) => {
    const idproof = e.target.files[0];
    if (!idproof.name.match(/\.(pdf|jpg|jpeg|png)$/i)) {
      setErrorVideo("Only PDF, JPG, JPEG, and PNG files are allowed");
      return;
    }
    setErrorVideo(null); // Clear any previous errors if the file is valid
    setManagerdata({ ...managerdata, idproof });
    setIdproofFileName(idproof.name);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    let errors = {};

    if (!managerdata.name.trim()) {
      formValid = false;
      errors.name = "Name is required";
    }
    if (!managerdata.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    } else if (!managerdata.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
    }
    if (!managerdata.contact.trim()) {
      formValid = false;
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(managerdata.contact)) {
      formValid = false;
      errors.contact = "Enter a valid 10-digit contact number";
    }
    if (!managerdata.password.trim()) {
      formValid = false;
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{6,}/.test(
        managerdata.password
      )
    ) {
      formValid = false;
      errors.password =
        "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    if (!managerdata.qualification.trim()) {
      formValid = false;
      errors.qualification = "qualification is required";
    }

    if (!managerdata.dob.trim()) {
      formValid = false;
      errors.dob = "Date of birth is required";
    }
    if (!managerdata.dateofjoining.trim()) {
      formValid = false;
      errors.dateofjoining = "Date of joining is required";
    }
    if (!managerdata.destination.trim()) {
      formValid = false;
      errors.destination = "Destination is required";
    }
    if (!managerdata.address.trim()) {
      formValid = false;
      errors.address = "Address is required";
    }
    if (!managerdata.profile) {
      formValid = false;
      errors.profile = "Profile picture is required";
    }
    if (!managerdata.idproof) {
      formValid = false;
      errors.idproof = "ID proof is required";
    }

    setErrors(errors);

    if (formValid) {
      const formData = new FormData();
      formData.append("name", managerdata.name);
      formData.append("email", managerdata.email);
      formData.append("contact", managerdata.contact);
      formData.append("password", managerdata.password);
      formData.append("qualification", managerdata.qualification);
      formData.append("dob", managerdata.dob);
      formData.append("destination", managerdata.destination);
      formData.append("address", managerdata.address);
      formData.append("dateofjoining", managerdata.dateofjoining);
      formData.append("files", managerdata.idproof);
      formData.append("files", managerdata.profile);

      try {
        const response = await axiosMultipartInstance.post(
          "/addmanger",
          formData
        );
        if (response.status === 200) {
          alert(response.data.msg);
          navigate("/admin/viewmanages"); // Navigate to the managers list page after adding
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    } else {
      console.log("Form is not valid", formValid);
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("admin")==null){
      navigate("/adminlogin")
    }

  },[])
 
  
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <AdminSidebar />
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4 mb-4">

            <span className="dashboardheadcolor">Add </span> MANAGERS
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-5">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Contact</label>
                  <input
                    type="number"
                    className="form-control"
                    name="contact"
                    onChange={handleInputChange}
                  />
                  {errors.contact && (
                    <div className="text-danger">{errors.contact}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qualification"
                    onChange={handleInputChange}
                  />
                  {errors.qualification && (
                    <div className="text-danger">{errors.qualification}</div>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {errors.dob && (
                    <div className="text-danger">{errors.dob}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>designation</label>
                  <input
                    type="text"
                    className="form-control"
                    name="destination"
                    onChange={handleInputChange}
                  />
                  {errors.destination && (
                    <div className="text-danger">{errors.destination}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label>Address</label>
              <div className="row">
                <div className="col-10">
                  {" "}
                  <textarea
                    className="form-control"
                    name="address"
                    onChange={handleInputChange}
                  />
                  {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <div className="mb-3">
                  <label>ID Proof</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleidproofChange}
                  />
                  {errors.idproof && (
                    <div className="text-danger">{errors.idproof}</div>
                  )}
                  {errorVideo && (
                    <div className="text-danger">{errorVideo}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {errors.profile && (
                    <div className="text-danger">{errors.profile}</div>
                  )}
                  {error && <div className="text-danger">{error}</div>}
                </div>
              </div>
              <div className="col-5">
                <div className="mb-3">
                  <label>Date of Joining</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateofjoining"
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {errors.dateofjoining && (
                    <div className="text-danger">{errors.dateofjoining}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                  type={showPassword ? "text" : "password"}                    className="form-control"
                    name="password"
                    onChange={handleInputChange}
                  />
                  <label className=" Customerpswrd" onClick={togglePasswordVisibility}>
                    {showPassword ? <FiEyeOff /> : <FaEye/>}
              </label>
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center mt-4 me-5 ">
              <button type="submit" className="btn me-5 ">
                <img src={addbtn}></img>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddManagers;
