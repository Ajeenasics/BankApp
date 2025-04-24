import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoEye } from "react-icons/io5";
import ClerkSideBar from "./ClerkSideBar";
import "../../Asserts/Styles/clerkdashboard.css";
import axiosInstance from "../../apis/axiosinstance";
import { Link } from "react-router-dom";
import AdminDashboardpiecharts from "../Admin/AdminDashboardpiechart"
function ClerkDashboard() {
  const [userdata,setuserData]=useState([])

  useEffect(() => {
    axiosInstance.get("/viewusers").then((res) => {
      setuserData(res.data.data,"ppppp");
    });
  },[]);
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <ClerkSideBar />
        </div>
        <div className="col-9">
          {" "}
          <div className="clerkDashboardfullbody">
            <h3 className="clerkdashboard">
              <span id="clerkDashboardclerkcolor">CLERK </span>DASHBOARD
            </h3>
            <AdminDashboardpiecharts/>
              <div className="col clerkDashboardviewuser">
                <h4>View Users</h4>
              </div>
              {/* table start */}
              <div>
                <table id="clerkDashBoardTable">
                  <tr>
                    <th className="clerkDashboardTableHead">S No</th>
                    <th className="clerkDashboardTableHead">Name</th>
                    <th className="clerkDashboardTableHead">Phone Number</th>
                    <th className="clerkDashboardTableHead">Account No</th>
                    <th className="clerkDashboardTableHead">IFSC Code</th>
                    <th className="clerkDashboardTableHead">Balance</th>
                    <th className="clerkDashboardTableHead">
                      Transaction History
                    </th>
                    <th className="clerkDashboardTableHead">Action</th>
                  </tr>
                  {userdata.map((data,index)=>(
                  <tr key={index}>
                    <td className="clerkDashboardTableData text-center">{index+1}</td>
                    <td className="clerkDashboardTableData">
                     {data.username} <br />{" "}
                      <span className="clerkDashboardsubline">
                       {data.userMail}
                      </span>
                    </td>
                    <td className="clerkDashboardTableData">{data.userContact}</td>
                    <td className="clerkDashboardTableData">{data.userNumber}</td>
                    <td className="clerkDashboardTableData">{data.userCode}</td>
                    <td className="clerkDashboardTableData">{data.userBalance}</td>
                    <td>
                      <Link
                        to={`/clerk/transactionhistory/${data._id}`}
                        className="clerkDashboardTableDataviewDetails "
                      >
                        View Details
                      </Link>{" "}
                    </td>
                    <td  className="clerkDashboardTableData">
                      <Link to={`/clerk/viewuserdetails/${data._id}`}  id="clerkDashboardeyeicon">
                        <IoEye />
                      </Link>
                    </td>
                  </tr>))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ClerkDashboard;
