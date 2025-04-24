import React, { useState } from "react";
import logo from "../../Asserts/images/Logo.png";
import home from "../../Asserts/images/Home.png";
import manage from "../../Asserts/images/Management.png";
import customer from "../../Asserts/images/Customer Insight.png";
import manager from "../../Asserts/images/Project Manager.png";
import logout from "../../Asserts/images/managerlogout.png";
import loan from "../../Asserts/images/managerloan.png";
import credit from "../../Asserts/images/managercredit.png";
import Nav from "react-bootstrap/Nav";
import transaction from "../../Asserts/images/managertransaction.png";
import { FaArrowLeft } from "react-icons/fa6";

import "../../Asserts/Styles/admindashboard.css";
import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const [tooglebtn, setTooglebtn] = useState(false);
  const navigate = useNavigate();

  const togglemangerbtn = () => {
    setTooglebtn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    alert("Do You Want To Logout");
    navigate("/adminlogin");
  };
  const AdminbackButton = () => {
    if (window.location.pathname === "/bank_app/admin/dashboard") {
      navigate("/admin/dashboard");
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="main-container">
      <div className="side-nav">
        <div className="profile"></div>
        <Nav className="flex-column ">
          <div className="col-11 d-flex justify-content-end">
            <Link to="/admin/dashboard">
              <img src={logo} alt="Logo" />
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
          <Nav.Item className="nav-link">
            <Link
              to="/admin/dashboard"
              className="text-decoration-none text-light ms-3"
            >
              <img src={home}></img> Dashboard
            </Link>
          </Nav.Item>
          <Nav.Item className="nav-link">
            <Link
              to="/admin/viewusers"
              onClick={togglemangerbtn}
              className="text-decoration-none text-light ms-3 "
            >
              <img src={customer}></img> Customer management
            </Link>
          </Nav.Item>
          <Nav.Item className="nav-link ">
            <Link
              to="/admin/viewclerks"
              className="text-decoration-none text-light ms-3 "
            >
              <img src={credit}></img> Clerk Management
            </Link>
          </Nav.Item>
          <Nav.Item className=" ms-3">
            <Nav.Link>
              <img src={manage}></img>{" "}
              <label onClick={togglemangerbtn}>Manager Management</label>
              {tooglebtn == true ? (
                <div className="managermainbtn mt-1">
                  <Link
                    to="/admin/addmanagers"
                    className="managerbtn text-light btn"
                  >
                    Add A Manager
                  </Link>
                  <Link
                    to="/admin/viewmanages"
                    className="managerbtn text-light btn mt-1"
                  >
                    {" "}
                    View All Managers
                  </Link>
                </div>
              ) : (
                ""
              )}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav-link ">
            <Link
              to="/admin/viewallapprovedloans"
              className="text-decoration-none text-light ms-3"
            >
              <img src={loan}></img> Manage Loan
            </Link>
          </Nav.Item>
          
          <Nav.Item className="nav-link ">
            <Link
              to="/admin/viewallapprovedcreadits"
              className="text-decoration-none text-light ms-3 "
            >
              <img src={credit}></img> Credit Card
            </Link>
          </Nav.Item>
          
          
          

          <Nav.Item className="nav-link ">
            <Link
              to="/admin/Viewllifeinsurancepolicy"
              className="text-decoration-none text-light ms-3"
            >
              <img src={manage}></img> Manage Insurance
            </Link>
          </Nav.Item>
          <Nav.Item className="nav-link ">
            <Link
              to="/admin/viewtransactions"
              className="text-decoration-none text-light ms-3 "
            >
              <img src={manager}></img> Transaction
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

    //   <div className="row mt-3 hover">
    //     <div className="col-1"></div>
    //     <div className="col-1">
    //       <img src={customer}></img>
    //     </div>
    //     <div className="col-9">
    //       <Link
    //         to="/admin/viewusers"
    //         className="col-3 text-decoration-none text-light"
    //       >
    //         {" "}
    //         Customer Management{" "}
    //       </Link>
    //     </div>
    //   </div>

    //   <Link
    //     to="/admin/viewmanages"
    //     className="text-decoration-none text-light"
    //   ></Link>
    //   <div className="row mt-3 hover">
    //     <div className="col-1"></div>
    //     <div className="col-1">
    //       <img src={manage}></img>
    //     </div>
    //
    //     <div className="text-decoration-none text-light">
    //       <div className="row mt-3 hover">
    //         <div className="col-1"></div>
    //         <div className="col-1">
    //           <img src={manager}></img>
    //         </div>
    //         </div>
    //         <div className="row mt-3 hover">
    //           <div className="col-1"></div>
    //           <div className="col-1">
    //             <img src={transaction}></img>
    //           </div>
    //           <div className="col-9">
    //             <Link
    //               to="/admin/viewtransactions"
    //               className="col-3 text-decoration-none text-light"
    //             >
    //               {" "}
    //               Transaction
    //             </Link>
    //           </div>
    //         </div>
    //         <div className="row mt-3 hover" onClick={handleLogout}>
    //           <div className="col-1"></div>
    //           <div className="col-1">
    //             <img src={logout}></img>
    //           </div>
    //           <div className="col-9">Logout</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
   // <Nav.Item className="nav-link ">
          //   <Link
          //     to="/clerk/onlinetransaction"
          //     className="text-decoration-none text-light ms-3 "
          //   >
          //     <img src={transaction}></img> Manage Cheque
          //   </Link>
          // </Nav.Item>
          // 
  );
}

export default AdminSidebar;
