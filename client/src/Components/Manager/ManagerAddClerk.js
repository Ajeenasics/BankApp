import addbtn from "../../Asserts/images/login button.png";
import React, { useState, useEffect } from "react";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import { useNavigate, Link } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
import ManagerSidebar from "./ManagerSidebar";
import { FaCamera } from "react-icons/fa";
import profile from "../../Asserts/images/Adminprofile.png";
function ManagerAddClerk() {
  const navigate = useNavigate();

  const [clerkdata, setClerkdata] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    qualification: "",
    dob: "",
    address: "",
    chooseid: "",
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
    chooseid: "",
    idproof: null,
    profile: null,
    dateofjoining: "",
  });

  const [profileFileName, setProfileFileName] = useState("");
  const [idproofFileName, setIdproofFileName] = useState("");

  const [error, setError] = useState(null);
  
  const [errorVideo, setErrorVideo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClerkdata({ ...clerkdata, [name]: value });
  };

  const handleFileChange = (e) => {
    const profile = e.target.files[0];
    if (!profile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setError("Only JPG, JPEG, PNG, and GIF files are allowed");
      return;
    }
    setError(null);
    setClerkdata({ ...clerkdata, profile });
    setProfileFileName(profile.name);
  };

  const handleidproofChange = (e) => {
    const idproof = e.target.files[0];
    if (!idproof.name.match(/\.(pdf|jpg|jpeg|png)$/i)) {
      setErrorVideo("Only PDF, JPG, JPEG, and PNG files are allowed");
      return;
    }
    setErrorVideo(null); // Clear any previous errors if the file is valid
    setClerkdata({ ...clerkdata, idproof });
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

    if (!clerkdata.name.trim()) {
      formValid = false;
      errors.name = "Name is required";
    }
    if (!clerkdata.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    } else if (!clerkdata.email.endsWith("@gmail.com")) {
      formValid = false;
      errors.email = "Email must be a valid Gmail address";
    }
    if (!clerkdata.contact.trim()) {
      formValid = false;
      errors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(clerkdata.contact)) {
      formValid = false;
      errors.contact = "Enter a valid 10-digit contact number";
    }
    if (!clerkdata.password.trim()) {
      formValid = false;
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{6,}/.test(
        clerkdata.password
      )
    ) {
      formValid = false;
      errors.password =
        "Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character";
    }
    if (!clerkdata.qualification.trim()) {
      formValid = false;
      errors.qualification = "qualification is required";
    }

    if (!clerkdata.dob.trim()) {
      formValid = false;
      errors.dob = "Date of birth is required";
    }
    if (!clerkdata.dateofjoining.trim()) {
      formValid = false;
      errors.dateofjoining = "Date of joining is required";
    }
    if (!clerkdata.chooseid.trim()) {
      formValid = false;
      errors.chooseid = "choose a id is required";
    }
    if (!clerkdata.address.trim()) {
      formValid = false;
      errors.address = "Address is required";
    }
    if (!clerkdata.profile) {
      formValid = false;
      errors.profile = "Profile picture is required";
    }
    if (!clerkdata.idproof) {
      formValid = false;
      errors.idproof = "ID proof is required";
    }

    setErrors(errors);

    if (formValid) {
      const formData = new FormData();
      formData.append("name", clerkdata.name);
      formData.append("email", clerkdata.email);
      formData.append("contact", clerkdata.contact);
      formData.append("password", clerkdata.password);
      formData.append("qualification", clerkdata.qualification);
      formData.append("dob", clerkdata.dob);
      formData.append("chooseid", clerkdata.chooseid);
      formData.append("address", clerkdata.address);
      formData.append("dateofjoining", clerkdata.dateofjoining);
      formData.append("files", clerkdata.idproof);
      formData.append("files", clerkdata.profile);

      try {
        const response = await axiosMultipartInstance.post(
          "/addClerk",
          formData
        );
        if (response.status === 200) {
          alert(response.data.msg);
          navigate("/manager/viewclerks");
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
  useEffect(() => {
    if (localStorage.getItem("managerid") == null) {
      navigate("/manager/login");
    }
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <ManagerSidebar />
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4 mb-4">
            <span className="dashboardheadcolor">Add </span> CLERK
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4 w-25">
                  <img
                    className="editprofileimhg rounded-circle"
                    src={
                      clerkdata.profile
                        ? URL.createObjectURL(clerkdata.profile)
                        : profile
                    }
                    alt="Profile Preview"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <div className="camera-icon">
                    <FaCamera
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="d-none" // Hide the input
                    onChange={handleFileChange}
                  />
                  {errors.profile && (
                    <div className="text-danger">{errors.profile}</div>
                  )}
                  {error && <div className="text-danger">{error}</div>}
                </div>

                <div className="col-4"></div>
              </div>
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
                  <label>Choose ID Proof</label>
                  <select
                    className="form-control"
                    name="chooseid"
                    value={clerkdata.chooseid}
                    onChange={handleInputChange}
                  >
                    <option value="">Select ID Proof</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="PAN Card">PAN Card</option>
                  </select>
                  {errors.chooseid && (
                    <div className="text-danger">{errors.chooseid}</div>
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
                  <label>Address</label>

                  <div className="">
                    {" "}
                    <input
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
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    onChange={handleInputChange}
                  />
                  <label
                    className=" Customerpswrd"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FaEye />}
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

export default ManagerAddClerk;
