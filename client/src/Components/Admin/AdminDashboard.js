import React,{useEffect,useState} from "react";
import AdminSidebar from "./AdminSidebar";
import "../../Asserts/Styles/LandingPage.css";
import DashboardCharts from "./AdminDashboardpiechart"
import axiosInstance from "../../apis/axiosinstance";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { IoEye } from "react-icons/io5";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/viewusers");
      setUsers(res.data.data);
      setFilteredUsers(res.data.data); // Initialize filteredUsers with the full user list
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };


  const navigate=useNavigate()
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
    // Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  useEffect(()=>{
    if(localStorage.getItem("admin")==null){
      navigate("/adminlogin")
    }
getData()
  },[])
  return (
    <div>
      <div className="row">
        <div className="col-3  ">
          <AdminSidebar />{" "}
        </div>
        <div className="col-9" id="common">
          <h3 className="mt-4">
            <span className="dashboardheadcolor">ADMIN </span> DASHBOARD
          </h3>
          <DashboardCharts/>
          <div>
          <div className="mt-4">
            <table id="clerkDashBoardTable">
              <tr>
                 <th className="clerkDashboardTableHead">S/No</th>
                <th className="clerkDashboardTableHead">Name</th>
                <th className="clerkDashboardTableHead">Phone Number</th>
                <th className="clerkDashboardTableHead">Account No</th>
                <th className="clerkDashboardTableHead">IFSC Code</th>
                <th className="clerkDashboardTableHead">Balance</th>
                <th className="clerkDashboardTableHead">Transaction History</th>
                <th className="clerkDashboardTableHead">Action</th>
              </tr>
              {users.map((data, index) => (
                <tr key={index}>
                  <td className="clerkDashboardTableData text-center">
                    {index + 1}
                  </td>
                  <td className="clerkDashboardTableData">
                    {data.username} <br />{" "}
                    <span className="clerkDashboardsubline">{data.userMail}</span>
                  </td>
                  <td className="clerkDashboardTableData">{data.userContact}</td>
                  <td className="clerkDashboardTableData">{data.userNumber}</td>
                  <td className="clerkDashboardTableData">{data.userCode}</td>
                  <td className="clerkDashboardTableData">{data.userBalance}</td>
                  <td>
                    <Link
                      to={`/admin/transactionhistory/${data._id}`}
                      className="clerkDashboardTableDataviewDetails "
                    >
                      View Details
                    </Link>{" "}
                  </td>
                  <td className="clerkDashboardTableData">
                    <Link
                      to={`/admin/viewuserdetails/${data._id}`}
                      id="clerkDashboardeyeicon"
                    >
                      <IoEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </table>{" "}
          </div>
  
          {/* Pagination */}
          <div className="pagination mt-3">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              className={`btn ${currentPage === number + 1 ? "btn-primary" : "btn-light"} mx-1`}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </button>
          ))}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
