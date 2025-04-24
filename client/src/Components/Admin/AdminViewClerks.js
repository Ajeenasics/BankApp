import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/manager.css";
import eye from "../../Asserts/images/eyebutton.png";
import active from "../../Asserts/images/Choose Mode.png";
import deactive from "../../Asserts/images/Choose Mode (1).png";
import AdminSidebar from "./AdminSidebar";
import imgurl from "../../apis/imgURL";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaArrowLeft } from "react-icons/fa6";
function AdminViewClerks() {
  const [clerks, setClerks] = useState([]);
  const [filteredClerks, setFilteredClerks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [idshow, setidShow] = useState(false);

  const handleClose = () => setidShow(false);
  const handleShow = () => setidShow(true);

  useEffect(() => {
    getData();
  }, []);
  
  const navigate=useNavigate()

  // Fetch clerks from the backend
  const getData = async () => {
    try {
      const res = await axiosInstance.get("/viewallclerks");
      setClerks(res.data.data);
      setFilteredClerks(res.data.data); // Initialize filteredClerks with the full clerk list
    } catch (err) {
      console.error("Error fetching clerk data:", err);
    }
  };

  // Toggle clerk status between active and inactive
  const toggleClerkStatus = async (id, currentStatus) => {
    const endpoint = currentStatus
      ? "/deactivate_a_clerk/"
      : "/activate_a_clerk/";
    try {
      const res = await axiosInstance.post(`${endpoint}${id}`);
      if (res.status === 200) {
        alert(
          res?.data?.message ||
            `Clerk is now ${currentStatus ? "Inactive" : "Active"}`
        );
        // Update local state
        setClerks((prevState) =>
          prevState.map((clerk) =>
            clerk._id === id
              ? { ...clerk, ActiveStatus: !currentStatus }
              : clerk
          )
        );
        setFilteredClerks((prevState) =>
          prevState.map((clerk) =>
            clerk._id === id
              ? { ...clerk, ActiveStatus: !currentStatus }
              : clerk
          )
        );
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Error updating clerk status:", err);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      setFilteredClerks(clerks); // Reset to full list if search is cleared
      return;
    }
    const filtered = clerks.filter((clerk) =>
      clerk.name.toLowerCase().includes(searchTerm)
    );
    setFilteredClerks(filtered);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredClerks.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredClerks.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
       
          <span id="view">VIEW</span> CLERKS
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
          <Table striped bordered hover className="clerk-table">
            <thead>
              <tr>
                <th id="th">Profile</th>
                <th id="th">Name</th>
                <th id="th">Phone Number</th>
                <th id="th">Address</th>
                <th id="th">Qualification</th>
                <th id="th">DOB</th>
                <th id="th">D O Joining</th>
                <th id="th">ID Proof</th>
                <th id="th">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((data, index) => (
                <tr key={data._id}>
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
                    {" "}
                    {new Date(data.dateofjoining).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <Link to={""} onClick={handleShow}>
                      View file
                    </Link>
                  </td>

                  
                  <td>
                    {data.ActiveStatus ? (
                      <div
                        onClick={() =>
                          toggleClerkStatus(data._id, data.ActiveStatus)
                        }
                      >
                        <img src={active} alt="Deactivate" />
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          toggleClerkStatus(data._id, data.ActiveStatus)
                        }
                      >
                        <img src={deactive} alt="Activate" />
                      </div>
                    )}
                  </td>
                  <Modal show={idshow} onHide={handleClose}>
                    <img
                      src={`${imgurl}/${data.idproof.filename}`}
                      className={"clerkidproofimg"}
                    ></img>
                  </Modal>
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
    </div>
  );
}

export default AdminViewClerks;
