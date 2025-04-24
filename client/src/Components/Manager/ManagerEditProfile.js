import ManagerSidebar from "./ManagerSidebar";
import addbtn from "../../Asserts/images/login button.png";
import React, { useEffect, useState } from "react";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { FaCamera } from "react-icons/fa"; // Import a camera icon from react-icons
import LandingFooter from "../Main/LandingFooter";

function ManagerEditProfile() {
  const navigate = useNavigate();
  const managerid = localStorage.getItem("managerid");

  // State for manager data
  const [managerdata, setManagerdata] = useState({
    name: "",
    email: "",
    contact: "",
    qualification: "",
    dob: "",
    address: "",
    destination: "",
    profile: null,
    dateofjoining: "",
  });

  const [errors, setErrors] = useState({});
  const [profilePreview, setProfilePreview] = useState(""); // To show the image preview
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch manager data
  const getAData = () => {
    axiosInstance
      .get(`/view_a_manager/${managerid}`)
      .then((res) => {
        const data = res.data.data;
        console.log(data,"mangerdata");
        
        setManagerdata({
          ...data,
          dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
          dateofjoining: data.dateofjoining
            ? new Date(data.dateofjoining).toISOString().split("T")[0]
            : "",
        });
        setProfilePreview(data.profile?.filename ? `${imgurl}/${data.profile.filename}` : "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching manager data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!managerid) {
      navigate("/manager/login");
    } else {
      getAData();
    }
  }, [managerid]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManagerdata({ ...managerdata, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const profile = e.target.files[0];
    if (profile && !profile.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
      setErrors({
        ...errors,
        profile: "Only JPG, JPEG, PNG, and GIF files are allowed",
      });
      return;
    }
    setErrors({ ...errors, profile: "" });
    setManagerdata({ ...managerdata, profile });
    setProfilePreview(URL.createObjectURL(profile)); // Show preview of selected image
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    let formValid = true;

    if (!managerdata.name.trim()) {
      newErrors.name = "Name is required";
      formValid = false;
    }
    if (!managerdata.email.trim() || !/\S+@\S+\.\S+/.test(managerdata.email)) {
      newErrors.email = "Valid email is required";
      formValid = false;
    }
    if (!managerdata.contact || !/^\d{10}$/.test(managerdata.contact)) {
      newErrors.contact = "Valid 10-digit contact number is required";
      formValid = false;
    }
    if (!managerdata.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
      formValid = false;
    }
    if (!managerdata.dob) {
      newErrors.dob = "Date of birth is required";
      formValid = false;
    }
    if (!managerdata.dateofjoining) {
      newErrors.dateofjoining = "Date of joining is required";
      formValid = false;
    }
    if (!managerdata.destination.trim()) {
      newErrors.destination = "Destination is required";
      formValid = false;
    }
    if (!managerdata.address.trim()) {
      newErrors.address = "Address is required";
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", managerdata.name);
      formData.append("email", managerdata.email);
      formData.append("contact", managerdata.contact);
      formData.append("qualification", managerdata.qualification);
      formData.append("dob", managerdata.dob);
      formData.append("destination", managerdata.destination);
      formData.append("address", managerdata.address);
      formData.append("dateofjoining", managerdata.dateofjoining);
      if (managerdata.profile) {
        formData.append("files", managerdata.profile);
      }

      try {
        const response = await axiosMultipartInstance.post(
          `/editManagerById/${managerid}`,
          formData
        );
        if (response.status === 200) {
          alert(response.data.msg);
          navigate("/manager/profile");
        }
      } catch (error) {
        console.error("Error:", error);
        let msg = error?.response?.data?.msg || "Error occurred";
        alert(msg);
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <ManagerSidebar />
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4 mb-4">
            <span className="dashboardheadcolor">Edit </span> MANAGER
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-3 w-25">
                <img
                  className="editprofileimhg rounded-circle"
                  src={profilePreview}
                  alt="Profile Preview"
                  style={{ width: "150px", height: "150px" }}
                />
                <div className="camera-icon">
                  <FaCamera
                    onClick={() => document.getElementById("fileInput").click()} // Trigger click on hidden file input
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      marginTop: "10px",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    id="fileInput"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }} // Hide the input
                  />
                  {errors.profile && (
                    <span className="text-danger">{errors.profile}</span>
                  )}
                </div>
              </div>
              <div className="col-3"></div>
            </div>
            <div className="row">
              <div className="col-5">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={managerdata.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact"
                    value={managerdata.contact}
                    onChange={handleInputChange}
                  />
                  {errors.contact && (
                    <span className="text-danger">{errors.contact}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    name="qualification"
                    value={managerdata.qualification}
                    onChange={handleInputChange}
                  />
                  {errors.qualification && (
                    <span className="text-danger">{errors.qualification}</span>
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
                    value={managerdata.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={managerdata.dob}
                    onChange={handleInputChange}
                  />
                  {errors.dob && (
                    <span className="text-danger">{errors.dob}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    name="destination"
                    value={managerdata.destination}
                    onChange={handleInputChange}
                  />
                  {errors.destination && (
                    <span className="text-danger">{errors.destination}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <div className="mb-3">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={managerdata.address}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.address && (
                    <span className="text-danger">{errors.address}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-3">
                <button type="submit"  className="managersavebtn text-light ">
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManagerEditProfile;
