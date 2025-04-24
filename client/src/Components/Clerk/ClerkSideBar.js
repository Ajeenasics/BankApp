import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import home from "../../Asserts/images/Home.png";
import loan from "../../Asserts/images/managerloan.png";
import credit from "../../Asserts/images/managercredit.png";
import insurance from "../../Asserts/images/streamline_insurance-hand.png";
import transaction from "../../Asserts/images/managertransaction.png";
import logout from "../../Asserts/images/managerlogout.png";
import clerkimg from "../../Asserts/images/managerviewuser.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../Asserts/images/Logo.png";
import Navbar from "react-bootstrap/Navbar";
import profile from "../../Asserts/images/Customer Service.png";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import { FaCamera } from "react-icons/fa";
import watch from "../../Asserts/images/watch.png";
import { FaArrowLeft } from "react-icons/fa6";

function ClerkSideBar() {
  const navigate = useNavigate();
  const [tooglebtn, setTooglebtn] = useState(false);

  const togglemangerbtn = () => {
    setTooglebtn(true);
  };

  const [show, setShow] = useState(false);
  const [clerk, setclerk] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [clerkdata, setclerkdata] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    dob: "",
    qualification: "",
    chooseid: "",
    address: "",
    dateofjoining: "",
    profile: null,
  });

  const [errors, setErrors] = useState({});
  const [profilePreview, setProfilePreview] = useState("");
  console.log(profilePreview, "changable image");
  console.log(clerk, "view clerk");
  console.log(clerkdata, "send data");

  const clerkid = localStorage.getItem("clerkid");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const fetchclerkDetails = async () => {
    try {
      const res = await axiosInstance.get(`/view_a_clerk/${clerkid}`);
      const data = res.data.data;
      setclerk(data);
      setclerkdata({
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
      });
      setProfilePreview(`${imgurl}/${data?.profile?.filename}`);
    } catch (error) {
      console.error("Error fetching clerk details", error);
    }
  };

  const AdminbackButton = () => {
    if (window.location.pathname === "/bank_app/clerk/homepage") {
      navigate("/clerk/homepage");
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setclerkdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "after changing");

    if (file) {
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setErrors((prev) => ({
          ...prev,
          profile: "Only JPG, JPEG, PNG, and GIF files are allowed",
        }));
        return;
      }
      setErrors((prev) => ({ ...prev, profile: "" }));
      setclerkdata((prev) => ({ ...prev, profile: file }));
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let formValid = true;
    let validationErrors = {};

    if (!clerkdata.name.trim()) {
      formValid = false;
      validationErrors.name = "Name is required";
    }
    if (!clerkdata.email.trim()) {
      formValid = false;
      validationErrors.email = "Email is required";
    } else if (!clerkdata.email.endsWith("@gmail.com")) {
      formValid = false;
      validationErrors.email = "Email must be a valid Gmail address";
    }

    setErrors(validationErrors);
    return formValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    // Append only non-null fields to FormData
    Object.entries(clerkdata).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Append the file directly for profile
        if (key === "profilePreview" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    console.log("FormData content:", formData);
    console.log("FormData Content:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    try {
      const response = await axiosMultipartInstance.post(
        `/edit_a_clerk/${clerkid}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert(response.data.msg);
        fetchclerkDetails(); // Reload clerk details after successful update
        handleModalClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error updating clerk", error);
      alert(error?.response?.data?.msg || "Error updating clerk details");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("clerkid");
    alert("Do You Want To Logout");
    navigate("/clerk/login");
  };

  useEffect(() => {
    fetchclerkDetails();

    if (localStorage.getItem("clerkid") == null) {
      navigate("/clerk/login");
    }
  }, [clerkid]);

  return (
    <div>
      <div className="main-container">
        <div className="side-nav">
          <div className="profile"></div>
          <Nav className="flex-column ">
            <div className="col-11 d-flex justify-content-end">
              <Link to="/clerk/homepage">
                <img src={logo} alt="Logo" />
              </Link>
              <div onClick={handleShow}>
                {" "}
                <img src={profile} alt="Logo" />
              </div>
              <div className="row">
                <div className="col-6"></div>
                <div className=" col-6 d-flex ">
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={AdminbackButton}
                  >
                    <FaArrowLeft />
                  </button>
                </div>
              </div>
            </div>
            <Nav.Item className="nav-link mt-3">
              <Link
                to="/clerk/homepage"
                className="text-decoration-none text-light ms-3"
              >
                <img src={home}></img> Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/clerk/manageloan"
                className="text-decoration-none text-light ms-3"
              >
                <img src={loan}></img> Manage Loan
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/clerk/managecreditcard"
                className="text-decoration-none text-light ms-3 "
              >
                <img src={credit}></img> Credit Card
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/clerk/onlinetransaction"
                className="text-decoration-none text-light ms-3 "
              >
                <img src={transaction}></img> Manage Cheque
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/clerk/alltransactions"
                className="text-decoration-none text-light ms-3 "
              >
                <img src={watch}></img> Transaction
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link">
              <Link
                to="/clerk/clerkviewuserlist"
                onClick={togglemangerbtn}
                className="text-decoration-none text-light ms-3 "
              >
                <img src={clerkimg}></img> View Users
              </Link>
            </Nav.Item>

            <Nav.Item className="nav-link ">
              <Link
                to="/clerk/clerkviewinsurance"
                className="text-decoration-none text-light ms-3"
              >
                <img src={insurance}></img> Manage Insurance
              </Link>
            </Nav.Item>
            <Nav.Item className="mt-3 ms-3">
              <Nav.Link onClick={handleLogout}>
                <img src={logout}></img> Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header
          className="profileheader"
          closeButton
        ></Offcanvas.Header>
        <div>
          <div>
            {" "}
            <img
              src={`${imgurl}/${clerk?.profile?.filename}`}
              className="userprofileimhg rounded-circle"
            ></img>
            <div className="row">
              <div className="col-2 "></div>
              <div className="col-2 "></div>
              <div className="col-2 my-3 text-center">
                <h4 className="profileusername">{clerk?.name}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-4 ms-5">
                <p>
                  <div className="text-secondary">Email</div>
                  <b className="text-dark">{clerk.email}</b>
                </p>
                <p>
                  <div className="text-secondary">Contact</div>
                  <b className="text-dark">{clerk.contact}</b>
                </p>
              </div>

              <div className="text-center text-light">
                <button onClick={handleModalShow} className="profileedit ">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  {errors.clerkPicture && (
                    <span className="text-danger">{errors.clerkPicture}</span>
                  )}
                </div>
              </div>
              <div className="col-3"></div>
            </div>
            <div className="row">
              <div className="">
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
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={clerkdata.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && (
                    <span className="text-danger">{errors.address}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact"
                    value={clerkdata.contact}
                    onChange={handleInputChange}
                  />
                  {errors.contact && (
                    <span className="text-danger">{errors.contact}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                {" "}
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="managersavebtn ms-2 mt-3"
                >
                  Cancel
                </button>
              </div>
              <div className="col-5">
                <button type="submit" className="managersavebtn ms-2 mt-3">
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ClerkSideBar;
