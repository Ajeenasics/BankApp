import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Asserts/images/Logo.png";
import login from "../../Asserts/images/Customer Service.png";
import logo2 from "../../Asserts/images/Menu (1).png";
import logo3 from "../../Asserts/images/Menu (2).png";
import axiosInstance from "../../apis/axiosinstance";
import profiletop from "../../Asserts/images/Rectangle 158.png";
import imgurl from "../../apis/imgURL";
import Modal from "react-bootstrap/Modal";
import { FaCamera } from "react-icons/fa";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";

function UserNavbar() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [userdata, setUserdata] = useState({
    username: "",
    userContact: "",
    userAddress: "",
    userCode: "",
    userPassword: "",
    userMail: "",
    userDate: "",
    userNumber: "",
    userPicture: null,
  });
  const [errors, setErrors] = useState({});
  const [profilePreview, setProfilePreview] = useState("");
  console.log(profilePreview, "changable image");
  console.log(user, "view user");
  console.log(userdata, "send data");

  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await axiosInstance.get(`/view_a_user/${userid}`);
      const data = res.data.data;
      setUser(data);
      setUserdata({
        ...data,
        userDate: data.userDate
          ? new Date(data.userDate).toISOString().split("T")[0]
          : "",
      });
      setProfilePreview(`${imgurl}/${data.userPicture?.filename}`);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "after changing");

    if (file) {
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setErrors((prev) => ({
          ...prev,
          userPicture: "Only JPG, JPEG, PNG, and GIF files are allowed",
        }));
        return;
      }
      setErrors((prev) => ({ ...prev, userPicture: "" }));
      setUserdata((prev) => ({ ...prev, userPicture: file }));
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let formValid = true;
    let validationErrors = {};

    if (!userdata.username.trim()) {
      formValid = false;
      validationErrors.username = "Name is required";
    }
    if (!userdata.userMail.trim()) {
      formValid = false;
      validationErrors.userMail = "Email is required";
    } else if (!userdata.userMail.endsWith("@gmail.com")) {
      formValid = false;
      validationErrors.userMail = "Email must be a valid Gmail address";
    }

    setErrors(validationErrors);
    return formValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    // Append all form data, including the image
    Object.entries(userdata).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Handle the userPicture (image file) separately to ensure it's appended correctly
        if (key === "userPicture" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }
    });

    console.log("FormData Content:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    try {
      const response = await axiosMultipartInstance.post(
        `/edit_a_user/${userid}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert(response.data.msg);
        fetchUserDetails(); // Reload user details after successful update
        handleModalClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error updating user", error);
      alert(error?.response?.data?.msg || "Error updating user details");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userid");
    alert("Do You Want To Logout");
    navigate("/user/login");
  };

  useEffect(() => {
    if (localStorage.getItem("userid") == null) {
      navigate("/user/login");
    }
  }, []);

  return (
    <Navbar className="usernavbar">
      <Container>
        <div className="col-2 d-flex align-items-center">
          <Link to="/user/homepage">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="col-9 d-flex justify-content-center">
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text>
              <Link
                to="/user/homepage"
                className="me-5 text-light text-decoration-none"
              >
                Home
              </Link>
              <Link
                to="/user/applyloan"
                className="me-5 text-light text-decoration-none"
              >
                Loan
              </Link>
              <Link
                to="/user/applylcreaditcard"
                className="me-5 text-light text-decoration-none"
              >
                Credit Card
              </Link>
              <Link
                to="/user/applyllifeinsurance"
                className="me-5 text-light text-decoration-none"
              >
                Life Insurance
              </Link>

              <Dropdown className="d-inline me-5 btn-outline-dark">
                <Dropdown.Toggle variant="outline-dark text-light">
                  Transaction
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="px-2 py-2 ">
                    {" "}
                    <Link to="/user/onlinetransaction" className="text-decoration-none">
                      Online Cheque Transaction
                    </Link>
                  </div>
                  <div className="px-2 py-2 ">
                    {" "}
                    <Link to="/user/normaltransaction" className="text-decoration-none">
                      Normal Transaction
                    </Link>
                  </div>
                  <div className="px-2 py-2  ">
                    {" "}
                    <Link to="/user/transactionhistory" className="text-decoration-none">
                      Transaction History
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Link
                to="/user/billpayment"
                className="me-5 text-light text-decoration-none"
              >
                Bill Payment
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </div>

        <div className="col d-flex justify-content-end align-items-center">
          <Link to="#login" className="text-light text-decoration-none">
            <Dropdown className="d-inline me-5 btn-outline-dark">
              <Dropdown.Toggle variant="outline-dark text-dark">
                <img src={login} alt="Login Icon" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow} className="text-dark">
                  <img className="text-dark" src={logo2} alt="Login Icon" />
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  <img className="text-dark" src={logo3} alt="Login Icon" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Link>
        </div>
      </Container>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header
          className="profileheader"
          closeButton
        ></Offcanvas.Header>
        <div>
          <div>
            {" "}
            <img
              src={`${imgurl}/${user?.userPicture?.filename}`}
              className="userprofileimhg rounded-circle"
            ></img>
            <div className="row">
              <div className="col-2 "></div>
              <div className="col-2 "></div>
              <div className="col-2 my-3 text-center">
                <h4 className="profileusername">{user?.username}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-6 ms-2">
                <p>
                  <div className="text-secondary">Email</div>
                  <b className="text-dark">{user?.userMail}</b>
                </p>
                <p>
                  <div className="text-secondary">Date of birth</div>
                  <b>{new Date(user?.userDate).toLocaleDateString("en-GB")}</b>
                </p>{" "}
                <p>
                  <div className="text-secondary">IFSC Code</div>
                  <b>{user?.userCode}</b>
                </p>
              </div>
              <div className="col-5 ms-4">
                <p>
                  <div className="text-secondary ms-3">Contact</div>
                  <b className="text-dark">{user?.userContact}</b>
                </p>
                <p>
                  <div className="text-secondary">Account Number</div>
                  <b
                    className="text-dark"
                    max={new Date().toISOString().split("T")[0]}
                  >
                    {user?.userNumber}
                  </b>
                </p>
                <p>
                  <div className="text-secondary">Address</div>
                  <b className="text-dark">{user?.userAddress}</b>
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
                    name="userPicture"
                  />
                  {errors.userPicture && (
                    <span className="text-danger">{errors.userPicture}</span>
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
                    name="userMail"
                    value={userdata.userMail}
                    onChange={handleInputChange}
                  />
                  {errors.userMail && (
                    <span className="text-danger">{errors.userMail}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userAddress"
                    value={userdata.userAddress}
                    onChange={handleInputChange}
                  />
                  {errors.userAddress && (
                    <span className="text-danger">{errors.userAddress}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label>Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    name="userContact"
                    value={userdata.userContact}
                    onChange={handleInputChange}
                  />
                  {errors.userContact && (
                    <span className="text-danger">{errors.userContact}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4"></div>
              <div className="col-5">
                <button type="submit" className="managersavebtn ms-2 mt-3">
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

export default UserNavbar;
