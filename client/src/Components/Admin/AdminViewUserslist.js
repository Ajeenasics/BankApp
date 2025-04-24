import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/manager.css";
import eye from "../../Asserts/images/eyebutton.png";
import active from "../../Asserts/images/Choose Mode.png";
import deactive from "../../Asserts/images/Choose Mode (1).png";
import { Link,useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { FaArrowLeft } from "react-icons/fa6";
function AdminViewUserslist() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getData();
  }, []);

  // Fetch users from the backend
  const getData = async () => {
    try {
      const res = await axiosInstance.get("/viewusers");
      setUsers(res.data.data);
      setFilteredUsers(res.data.data); // Initialize filteredUsers with the full user list
    } catch (err) {
      console.error("Error fetching user data:", err);
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
      user.username.toLowerCase().includes(searchTerm)
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

  const navigate=useNavigate()
  
  useEffect(()=>{
    if(localStorage.getItem("admin")==null){
      navigate("/adminlogin")
    }
  },[])
  
  return (
    <div className="d-flex w-100">
      {/* Sidebar */}
      <div className="sidebar col-lg-3 col-md-4 col-sm-12">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="main-content col-lg-9 col-md-8 col-sm-12">
        <h3 className="mt-4">
        
          <span id="view">VIEW </span> USERS
        </h3>

        {/* Search Bar */}
        <div className="d-flex justify-content-end mt-3">
          <Form className="searchbar1 w-25">
            <Form.Control
              type="search"
              placeholder="Search Here..."
              className="me-2 searchbar"
              aria-label="Search"
              onChange={handleSearch}
            />
          </Form>
        </div>

        {/* Table */}
        <div className="mt-4">
          <Table striped bordered hover className="user-table">
            <thead>
              <tr>
                <th id="th">S/No</th>
                <th id="th">Name</th>
                <th id="th">Phone Number</th>
                <th id="th">Account No</th>
                <th id="th">IFSC Code</th>
                <th id="th">Balance</th>
                <th id="th">Transaction History</th>
                <th id="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((data, index) => (
                <tr key={data._id}>
                  <td>{indexOfFirstRow + index + 1}</td>
                  <td>{data.username}</td>
                  <td>{data.userContact}</td>
                  <td>{data.userNumber}</td>
                  <td>{data.userCode}</td>
                  <td>{data.userBalance}</td>
                  <td><Link to={`/admin/transactionhistory/${data._id}`}>View Details</Link></td>
                  <td>
                  <Link to={`/admin/viewuserdetails/${data._id}`}><img src={eye} alt="View Details" ></img></Link>
                    
                  </td>

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
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
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
    </div>
  );
}

export default AdminViewUserslist;
