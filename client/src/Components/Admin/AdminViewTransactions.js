import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import AdminSidebar from "../Admin/AdminSidebar";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/manager.css";
import imgurl from "../../apis/imgURL";
import { useNavigate } from "react-router-dom";

function AdminViewTransactions() {
  const [normalTransactions, setNormalTransactions] = useState([]);
  const [onlineTransactions, setOnlineTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlineTransactions, setShowOnlineTransactions] = useState(false); // Default to Normal Transactions

  const rowsPerPage = 10;
  const navigate = useNavigate();

  // Fetch Normal Transactions (API: /ViewAllTransactions)
  const fetchNormalTransactions = async () => {
    try {
      const response = await axiosInstance.post("/viewnormaltransaction");
      console.log("Normal Transactions:", response.data.data);
      setNormalTransactions(response.data.data);
      if (!showOnlineTransactions) setFilteredTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching normal transactions:", error);
    }
  };

  // Fetch Online Transactions (Cheque Transactions) (API: /viewnormaltransaction)
  const fetchOnlineTransactions = async () => {
    try {
      const response = await axiosInstance.post("/ViewAllTransactions");
      console.log("Online (Cheque) Transactions:", response.data.data);
      setOnlineTransactions(response.data.data);
      if (showOnlineTransactions) setFilteredTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching online transactions:", error);
    }
  };

  // Handle Search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const transactions = showOnlineTransactions
      ? onlineTransactions
      : normalTransactions;

    if (!searchTerm) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter((item) =>
      item.planname?.toLowerCase().includes(searchTerm)
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  // Handle Page Change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Switch to Normal Transactions
  const showNormal = () => {
    setShowOnlineTransactions(false);
    setFilteredTransactions(normalTransactions);
  };

  // Switch to Online Transactions (Cheque Transactions)
  const showOnline = () => {
    setShowOnlineTransactions(true);
    setFilteredTransactions(onlineTransactions);
  };

  // Fetch Data on Mount
  useEffect(() => {
    fetchNormalTransactions();
    fetchOnlineTransactions();
    if (!localStorage.getItem("admin")) {
      navigate("/adminlogin");
    }
  }, []);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTransactions.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  return (
    <div className="d-flex w-100">
      <div className="sidebar col-lg-3 col-md-4">
        <AdminSidebar />
      </div>
      <div className="main-content col-lg-9 col-md-8">
        <h3 className="mt-4" id="view">
          View Transactions
        </h3>

        {/* Buttons for switching between transaction types */}
        <div className="text-center my-5">
          <button
            className={!showOnlineTransactions ? "MML-Button1" : "MML-Button2"}
            onClick={showNormal}
          >
            Normal Transactions
          </button>
          <button
            className={showOnlineTransactions ? "MML-Button1" : "MML-Button2"}
            onClick={showOnline}
          >
            Cheque Transactions
          </button>
        </div>

        {/* Search Bar */}
        <div className="d-flex justify-content-end mt-3">
          <Form className="searchbar1 w-25">
            <Form.Control
              type="search"
              placeholder="Search Here..."
              onChange={handleSearch}
            />
          </Form>
        </div>

        {/* Transactions Table */}
        <div className="mt-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sl/No</th>
                <th>Name</th>
                <th>Date</th>
                <th>Payee Name</th>
                <th>Transaction Type</th>
                <th>IFSC Code</th>
                <th>Account Number</th>
                <th>Time</th>
                <th>Amount</th>
                {showOnlineTransactions && <th>Cheque Image</th>}
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((data, index) => (
                  <tr key={data?._id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>
                      {data.userid?.username}
                      <br />
                      <small className="text-secondary">
                        Acc No: {data.userid?.userNumber}
                      </small>
                    </td>
                    <td>{new Date(data?.date).toLocaleDateString("en-GB")}</td>
                    <td>{data?.payeename}</td>
                    <td>
                      {data?.transactiontype
                        ? data?.transactiontype
                        : "----------"}
                    </td>
                    <td>{data?.ifsccode}</td>
                    <td>{data?.accountnumber}</td>
                    <td>{data?.time}</td>
                    <td>{data?.payamount}/-</td>
                    {showOnlineTransactions && (
                      <td>
                        <img
                          src={`${imgurl}/${data?.chequeimage?.filename}`}
                          alt="Cheque"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={showOnlineTransactions ? "9" : "8"}
                    className="text-center"
                  >
                    No Transactions Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-3">
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
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
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
        )}
      </div>
    </div>
  );
}

export default AdminViewTransactions;
