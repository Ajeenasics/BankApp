import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import home from "../../Asserts/images/Home.png";
import loan from "../../Asserts/images/managerloan.png";
import credit from "../../Asserts/images/managercredit.png";
import clerk from "../../Asserts/images/clerkmanager.png";
import transaction from "../../Asserts/images/managertransaction.png";
import logout from "../../Asserts/images/managerlogout.png";
import user from "../../Asserts/images/managerviewuser.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Asserts/images/Logo.png";
import Navbar from "react-bootstrap/Navbar";
import profile from "../../Asserts/images/Customer Service.png";
import insurance from "../../Asserts/images/streamline_insurance-hand.png";
import { FaArrowLeft } from "react-icons/fa6";

function ManagerSidebar() {
  const navigate = useNavigate();
  const [tooglebtn, setTooglebtn] = useState(false);

  const togglemangerbtn = () => {
    setTooglebtn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("managerid");
    alert("Do You Want To Logout");
    navigate("/manager/login");
  };

  const AdminbackButton = () => {
    if (window.location.pathname === "/bank_app/manager/home") {
      navigate("/manager/home");
    } else {
      navigate(-1);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("managerid") == null) {
      navigate("/manager/login");
    }
  }, []);
  return (
    <div>
      <div className="main-container">
        <div className="side-nav">
          <div className="profile"></div>
          <Nav className="flex-column ">
          <div className="col-11 d-flex justify-content-end">
              <Link to="/manager/home">
                <img src={logo} alt="Logo" />
              </Link>
              <Link to={"/manager/profile"}>
                {" "}
                <img src={profile} alt="Logo" />
              </Link>
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
                to="/manager/home"
                className="text-decoration-none text-light ms-3"
              >
                <img src={home}></img> Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/manager/managermanageloan"
                className="text-decoration-none text-light ms-3"
              >
                <img src={loan}></img> Manage Loan
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/manager/managermanagecreditcard"
                className="text-decoration-none text-light ms-3 "
              >
                <img src={credit}></img> Credit Card
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/manager/managerviewinsurance"
                className="text-decoration-none text-light ms-3"
              >
                <img src={insurance}></img> Manage Insurance
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link">
              <Link
                to="/manager/viewclerks"
                className="text-decoration-none text-light ms-3 "
              >
                <img src={clerk}></img> Clerk Management
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/manager/onlinetransaction"
                className="text-decoration-none text-light ms-3 "
              >
                <img src={transaction}></img> Manage Cheque
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/manager/alltransactions"
                className="text-decoration-none text-light ms-3 "
              >
                <img src={transaction}></img> Transaction
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link ">
              <Link
                to="/manager/viewusers"
                className="text-decoration-none text-light ms-3"
              >
                <img src={user}></img> View Users
              </Link>
            </Nav.Item>
            <Nav.Item className=" ms-3">
              <Nav.Link onClick={handleLogout}>
                <img src={logout}></img> Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default ManagerSidebar;
