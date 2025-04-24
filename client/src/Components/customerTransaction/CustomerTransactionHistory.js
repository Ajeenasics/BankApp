import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/manager.css";
import eye from "../../Asserts/images/eyebutton.png";
import active from "../../Asserts/images/Choose Mode.png";
import deactive from "../../Asserts/images/Choose Mode (1).png";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";
import { FaArrowLeft } from "react-icons/fa6";

function CustomerTransactionHistory() {
  const [users, setUsers] = useState([]);
  const [auser, setAUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const userid=localStorage.getItem("userid")
  useEffect(() => {
    getData();
  }, []);

  // Fetch users from the backend
  const getData = async () => {
    try {
      const res = await axiosInstance.post(`/findbillbyuserid/${userid}`);
      console.log(res,"o");
      
      setUsers(res.data.data);
      setFilteredUsers(res.data.data); // Initialize filteredUsers with the full user list
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const getAuserData = async () => {
    try {
      const res = await axiosInstance.get(`/view_a_user/${userid}`);
      
      setAUser(res.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };

  // Toggle user status between active and inactive

  // Handle search functionality
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      setFilteredUsers(users); // Reset to full list if search is cleared
      return;
    }
    const filtered = users.filter((user) =>
      user.type.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAuserData()
    if (localStorage.getItem("userid") == null) {
      navigate("/user/login");
    }
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="container main-content col-lg-9 col-md-8 col-sm-12">
      <div className="d-flex justify-content-start"><button
                className="btn btn-light"
                type="button"
                onClick={UserbackButton}
              >
                <FaArrowLeft />
              </button></div>
        <h3 className="my-4 text-center">
          <span id="view">Transaction History </span> 
        </h3>

        <div className="row" >
        <div className="col-3">
          <Form className="searchbar1 ">
            <Form.Control
              type="search"
              placeholder="Search Here..."
              className="searchbar"
              aria-label="Search"
              onChange={handleSearch}
            />
          </Form>
        </div>
        <div className="col-7 text-center"><h4>{auser.username}</h4>
        <b className="text-secondary">Acco.No:{auser.userNumber}</b></div>
        <b style={{"color":" rgba(191, 93, 255, 1)"}} className="col-2"> Balance {auser.userBalance} /-</b>
        </div>
        {/* Search Bar */}
        

        {/* Table */}
        <div className="mt-4" style={{minHeight:"80vh"}}>
          <Table striped bordered hover className="user-table">
            <thead>
              <tr>
                <th id="th">S/No</th>
                <th id="th">Beneficiary Name</th>
                <th id="th">Beneficiary Acc No</th>
                <th id="th">Transaction ID</th>
                <th id="th">Transaction Type</th>
                <th id="th">Date & Time</th>
                <th id="th">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((data, index) => (
                <tr key={data?._id}>
                  <td>{indexOfFirstRow + index + 1}</td>
                  <td>{data?.payeename?data?.payeename :"------"}</td>
                  <td>{data?.accountnumber?data?.accountnumber :"------"}</td>
                  <td>{data?._id}</td>
                  <td>{data?.type}</td>
                  <td> {new Date(data?.date).getDate()}/{new Date(data?.date).getMonth() + 1}/{new Date(data?.date).getFullYear()} {data?.time}</td>
                  <td>{data?.amount?data?.amount :data?.payamount}/-</td>                
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example" className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                key={i}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <LandingFooter/>
    </div>
  );
}

export default CustomerTransactionHistory;
