import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "../../Asserts/Styles/admindashboard.css";
import axiosInstance from "../../apis/axiosinstance";
import { Link, useNavigate } from "react-router-dom";
import imgURL from "../../apis/imgURL";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
function AdminviewManagers() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get("/viewallmangers")
      .then((res) => {
        setManagers(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const togglemanagersStatus = (id, currentStatus) => {
    console.log(currentStatus);
    const endpoint =
      currentStatus == true ? "/deactivate_a_manger/" : "/activate_a_manger/";
    axiosInstance
      .post(endpoint + id)
      .then((res) => {
        if (res.status === 200) {
          let msg =
            res?.data?.message ||
            `managers is now ${currentStatus ? "Inactive" : "Active"}`;
          alert(msg);
          getData();
          setManagers((prevState) =>
            prevState.map((manager) =>
              manager._id === id
                ? { ...manager, ActiveStatus: !currentStatus }
                : manager
            )
          );
        } else {
          console.log("Error on status change");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin") == null) {
      navigate("/adminlogin");
    }
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <AdminSidebar />
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4 mb-3"> 
            <span className="dashboardheadcolor mt-5">VIEW</span> MANAGERS
          </h3>{" "}
         
          <br />
          <div className="container">
            <div className="row">
              {managers.length > 0 ? (
                managers.map((manager, index) => (
                  <div key={manager._id} className="col-md-6 mb-4">
                    <div className="card bg-light" id="card1">
                      <div className="row no-gutters" id="c1">
                        <div className="col-4">
                          <img
                            src={`${imgURL}/${manager.profile.filename}`}
                            width="100%"
                            height="200px"
                            className="img"
                            alt="Manager"
                          />
                          {manager.ActiveStatus == true ? (
                            <button
                              className="btn btn-success rounded-circle"
                              id="positioningbtn"
                              onClick={() =>
                                togglemanagersStatus(
                                  manager._id,
                                  manager.ActiveStatus
                                )
                              }
                            >
                              <IoMdCheckmark />
                            </button>
                          ) : (
                            <button
                              className="btn btn-danger rounded-circle"
                              id="positioningbtn"
                              onClick={() =>
                                togglemanagersStatus(
                                  manager._id,
                                  manager.ActiveStatus
                                )
                              }
                            >
                              <FaXmark />
                            </button>
                          )}
                        </div>
                        <div className="col-8 pt-4 pd-3">
                          <h6>{manager.name}</h6>
                          <h5 className="text-secondary">
                            {manager.destination}
                          </h5>
                          <hr className="horisontal"></hr>
                          <div>{manager.email}</div>
                          <div>+{manager.contact}</div>
                          <small>
                            <Link
                              to={`/admin/view_a_managers/${manager._id}`}
                              id="details"
                            >
                              View details
                            </Link>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center fs-3 mt-5">
                  Please add a manager...
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminviewManagers;
