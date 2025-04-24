import addbtn from "../../Asserts/images/login button.png";
import React, { useState, useEffect } from "react";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
import ManagerSidebar from "./ManagerSidebar";
import { FaCamera } from "react-icons/fa";
import profile from "../../Asserts/images/Adminprofile.png";
import imgurl from "../../apis/imgURL";

function ManagerEditClerk() {
    const navigate = useNavigate();
    const { clerkid } = useParams(); // Extract clerkid from URL
  
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
  
    const [errors, setErrors] = useState({});
    const [profilePreview, setProfilePreview] = useState(""); // To show the image preview
    const [idproofFileName, setIdproofFileName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [errorVideo, setErrorVideo] = useState(null);
  
    useEffect(() => {
      if (!localStorage.getItem("managerid")) {
        navigate("/manager/login");
        return;
      }
  
      const getAData = () => {
          axiosMultipartInstance
            .get(`/view_a_clerk/${clerkid}`)
            .then((res) => {
              const data = res.data.data;
              setClerkdata({
                ...data,
                dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
                dateofjoining: data.dateofjoining
                  ? new Date(data.dateofjoining).toISOString().split("T")[0]
                  : "",
              });
              setProfilePreview(data.profile?.filename ? `${imgurl}/${data.profile.filename}` : "");
            })
            .catch((err) => {
              console.error("Error fetching manager data:", err);
            });
        };
  
      // Fetch clerk data on component mount
      // const fetchClerkData = async () => {
      //   try {
      //     const response = await axiosMultipartInstance.get(
      //       `/view_a_clerk/${clerkid}`
      //     );
      //     if (response.status === 200) {
      //       setClerkdata(response.data.data);
      //       setProfileFileName(response.data.profile?.name || "");
      //       setIdproofFileName(response.data.idproof?.name || "");
      //     }
      //   } catch (error) {
      //     console.error("Error fetching clerk data:", error);
      //     alert("Failed to fetch clerk data");
      //   }
      // };
  
      getAData();
    }, [clerkid, navigate]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setClerkdata({ ...clerkdata, [name]: value });
    };
  
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
      setClerkdata({ ...clerkdata, profile });
      setProfilePreview(URL.createObjectURL(profile)); // Show preview of selected image
    };
  
  //   const handleFileChange = (e) => {
  //     const profile = e.target.files[0];
  //     if (!profile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
  //       setError("Only JPG, JPEG, PNG, and GIF files are allowed");
  //       return;
  //     }
  //     setError(null);
  //     setClerkdata({ ...clerkdata, profile });
  //     setProfileFileName(profile.name);
  //   };
  
    // const handleidproofChange = (e) => {
    //   const idproof = e.target.files[0];
    //   if (!idproof.name.match(/\.(pdf|jpg|jpeg|png)$/i)) {
    //     setErrorVideo("Only PDF, JPG, JPEG, and PNG files are allowed");
    //     return;
    //   }
    //   setErrorVideo(null);
    //   setClerkdata({ ...clerkdata, idproof });
    //   setIdproofFileName(idproof.name);
    // };
  
    const handleidproofChange = (e) => {
        const idproof = e.target.files[0];
        if (!idproof.name.match(/\.(pdf|jpg|jpeg|png)$/i)) {
          setErrorVideo("Only PDF, JPG, JPEG, and PNG files are allowed");
          return;
        }
        setErrorVideo(null);
        setClerkdata({ ...clerkdata, idproof });
        setIdproofFileName(idproof.name);
      };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      let formValid = true;
      let errors = {};
  
      // Validation
      if (!clerkdata.name) {
        formValid = false;
        errors.name = "Name is required";
      }
      if (!clerkdata.email) {
        formValid = false;
        errors.email = "Email is required";
      } else if (!clerkdata.email.endsWith("@gmail.com")) {
        formValid = false;
        errors.email = "Email must be a valid Gmail address";
      }
      if (!clerkdata.contact) {
        formValid = false;
        errors.contact = "Contact number is required";
      } else if (!/^\d{10}$/.test(clerkdata.contact)) {
        formValid = false;
        errors.contact = "Enter a valid 10-digit contact number";
      }
      if (!clerkdata.password) {
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
      if (!clerkdata.qualification) {
        formValid = false;
        errors.qualification = "Qualification is required";
      }
      if (!clerkdata.dob) {
        formValid = false;
        errors.dob = "Date of birth is required";
      }
      if (!clerkdata.dateofjoining) {
        formValid = false;
        errors.dateofjoining = "Date of joining is required";
      }
      if (!clerkdata.chooseid) {
        formValid = false;
        errors.chooseid = "Choose an ID is required";
      }
      if (!clerkdata.address) {
        formValid = false;
        errors.address = "Address is required";
      }
  
      setErrors(errors);
  
      if (formValid) {
        const formData = new FormData();
        // for (const key in clerkdata) {
        //   formData.append(key, clerkdata[key]);
        // }
   for (const key in clerkdata) {
      if (clerkdata[key] instanceof File) {
        // Append idproof file as binary
        // formData.append("idproof", clerkdata[key]);
      } else {
        formData.append(key, clerkdata[key]);
      }
    }

      formData.append("profile", clerkdata.profile);
      formData.append("idproof", clerkdata.idproof);

        try {
          const response = await axiosMultipartInstance.post(
            `/edit_a_clerk/${clerkid}`,
            formData, {
                headers: {
                  "Content-Type": "multipart/form-data", // This is important for binary files
                },
              }
          );
          if (response.status === 200) {
            alert(response.data.msg);
            // navigate("/manager/viewclerks");
          }
        } catch (error) {
          console.error("Error:", error);
          alert(error?.response?.data?.msg || "Error occurred");
        }
      } else {
        console.log("Form is not valid", formValid);
      }
    };
  
    useEffect(() => {
      return () => {
        if (clerkdata.profile instanceof File) {
          URL.revokeObjectURL(clerkdata.profile);
        }
      };
    }, [clerkdata.profile]);

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <ManagerSidebar />
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4 mb-4">
            <span className="dashboardheadcolor">EDIT </span> CLERK
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
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
                    onClick={() => document.getElementById("fileInput").click()} 
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

                <div className="col-4"></div>
              </div>
              <div className="col-5">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={clerkdata.name}
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
                    value={clerkdata.contact}
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
                    value={clerkdata.qualification}
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
                    value={clerkdata.email}
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
                    value={clerkdata.dob}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {errors.dob && (
                    <div className="text-danger">{errors.dob}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Choose Id Proof</label>
                  <input
                    type="text"
                    className="form-control"
                    name="chooseid"
                    value={clerkdata.chooseid}
                    onChange={handleInputChange}
                  />
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
                      value={clerkdata.address}
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
                  value={clerkdata.dateofjoining}
                  onChange={handleInputChange}
                  maxDate={new Date().toISOString().split("T")[0]}
                />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={clerkdata.password}
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

export default ManagerEditClerk;
