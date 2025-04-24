import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ManagerSidebar from "./ManagerSidebar";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/manager.css";
import eye from "../../Asserts/images/eyebutton.png";
import active from "../../Asserts/images/Choose Mode.png";
import deactive from "../../Asserts/images/Choose Mode (1).png";
import { Link, useNavigate } from "react-router-dom";
import imgurl from "../../apis/imgURL";
import Modal from "react-bootstrap/Modal";
import addclerk from "../../Asserts/images/addclerkbtn.png";
import editbtn from "../../Asserts/images/notepad-edit.png";

function ManagerViewClerks() {
  const [clerks, setClerks] = useState([]);
  const [filteredclerks, setFilteredclerks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getData();
  }, []);

  // Fetch clerks from the backend
  const getData = async () => {
    try {
      const res = await axiosInstance.get("/viewallclerks");
      setClerks(res.data.data);
      setFilteredclerks(res.data.data); // Initialize filteredclerks with the full user list
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // Toggle user status between active and inactive
  const toggleclerkstatus = async (id, currentStatus) => {
    const endpoint = currentStatus
      ? "/deactivate_a_user/"
      : "/activate_a_user/";
    try {
      const res = await axiosInstance.post(`${endpoint}${id}`);
      if (res.status === 200) {
        alert(
          res?.data?.message ||
            `User is now ${currentStatus ? "Inactive" : "Active"}`
        );
        // Update local state
        setClerks((prevState) =>
          prevState.map((user) =>
            user._id === id ? { ...user, ActiveStatus: !currentStatus } : user
          )
        );
        setFilteredclerks((prevState) =>
          prevState.map((user) =>
            user._id === id ? { ...user, ActiveStatus: !currentStatus } : user
          )
        );
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      setFilteredclerks(clerks); // Reset to full list if search is cleared
      return;
    }
    const filtered = clerks.filter((clerk) =>
      clerk.name.toLowerCase().includes(searchTerm)
    );
    setFilteredclerks(filtered);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredclerks.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredclerks.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("managerid") == null) {
      navigate("/manager/login");
    }
  }, []);

  return (
    <div className="d-flex w-100">
      {/* Sidebar */}
      <div className="sidebar col-lg-3 col-md-4 col-sm-12">
        <ManagerSidebar />
      </div>

      {/* Main Content */}
      <div className="main-content col-lg-9 col-md-8 col-sm-12">
        <h3 className="mt-4">
          <span id="view">VIEW</span> clerks
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
          <Link to="/manager/addclerk">
            <img className="ms-3" src={addclerk}></img>
          </Link>
        </div>

        {/* Table */}
        <div className="mt-4">
          <Table striped bordered hover className="user-table">
            <thead>
              <tr>
                <th id="th">S/No</th>
                <th id="th">Profile</th>
                <th id="th">Name</th>
                <th id="th">Phone Number</th>
                <th id="th">Address</th>
                <th id="th">qualification</th>
                <th id="th">DOB</th>
                <th id="th">ID proof</th>
                <th id="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((data, index) => (
                  <tr key={data._id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>
                      <img
                        src={`${imgurl}/${data?.profile?.filename}`}
                        className={"clerkprofileimg"}
                      ></img>
                    </td>
                    <td>{data.name}</td>
                    <td>{data.contact}</td>
                    <td>{data.address}</td>
                    <td>{data.qualification}</td>
                    <td>{new Date(data.dob).toLocaleDateString("en-GB")}</td>
                    <td>
                      <div className="text-decoration-underline" onClick={handleShow}>
                        View file
                      </div>
                    </td>

                    <Modal show={show} onHide={handleClose}>
                      <img
                        src={`${imgurl}/${data?.idproof?.filename}`}
                        className={"clerkidproofimg"}
                      ></img>
                    </Modal>
                    <td>
                      <Link to={`/manager/editclerk/${data._id}`}>
                        {" "}
                        <img src={editbtn}></img>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <h4 className="w-100 m-5">Please Add A Clerk</h4>
              )}
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
    </div>
  );
}

export default ManagerViewClerks;
