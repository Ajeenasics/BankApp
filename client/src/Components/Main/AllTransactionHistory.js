import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/manager.css";
import eye from "../../Asserts/images/eyebutton.png";
import active from "../../Asserts/images/Choose Mode.png";
import deactive from "../../Asserts/images/Choose Mode (1).png";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../User/UserNavbar";
import LandingFooter from "../Main/LandingFooter";

function AllTransactionHistory() {
  const [users, setUsers] = useState([]);
  const [auser, setAUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { userid } = useParams();

  useEffect(() => {
    getData();
  }, []);

  // Fetch users from the backend
  const getData = async () => {
    try {
      const res = await axiosInstance.post(`/findallbill`);
      console.log(res, "o");

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



  return (
    <div className="d-flex w-100">
      <div>
        <div>
          <h3 className="my-4 text-center">
          View<span id="view"> Transactions</span>
          </h3>

          <div className="row">
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
          </div>

          {/* Table */}
          <div className="mt-4" style={{ minHeight: "80vh" }}>
            <Table striped bordered hover className="user-table">
              <thead>
                <tr>
                  <th id="th">S/No</th>
                  <th id="th">Name</th>
                  <th id="th">Date</th>
                  <th id="th">Transaction Type</th>
                  <th id="th">Payee</th>
                  <th id="th">Payee Acc No</th>
                  <th id="th">IFSC</th>
                  <th id="th">Time</th>
                  <th id="th">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((data, index) => (
                  <tr key={data?._id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{data?.userid?.username?data?.userid?.username:"------"}<br/>
                    <small className="text-secondary">{data?.userid?.userNumber}</small></td>
                    <td>
                    {new Date(data?.date).toLocaleDateString("en-GB")}
                      
                    </td>
                    <td>{data?.type}</td>
                    <td><p>{data?.payeename ? data?.payeename : "------"}</p></td>
                    <td><p>{data?.accountnumber ? data?.accountnumber : "------"}</p></td>
                    <td><p>{data?.ifsccode ? data?.ifsccode : "------"}</p></td>
                    <td><p>{data?.time}</p></td>
                    <td>{data?.amount ? data?.amount : data?.payamount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation example" className="mt-3">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
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
    </div>
  );
}

export default AllTransactionHistory;
