import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import AdminSidebar from "../Admin/AdminSidebar";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import "../../Asserts/Styles/manager.css";
import addclerk from "../../Asserts/images/Frame 1000001036.png";
import editbtn from "../../Asserts/images/notepad-edit.png";
import deletebtn from "../../Asserts/images/hugeicons_delete-02.png";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import addbtn from "../../Asserts/images/login button.png";
import edit from "../../Asserts/images/editbtn.png";

function AdminViewPlan() {
  const [insurance, setInsurance] = useState([]);
  const [filteredclerks, setFilteredclerks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Verified, setverified] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [planbuttonState, setPlanButtonState] = useState(false);
  const [singleinsurance, setSingleInsurance] = useState({});

  const [addplandata, setAddPlanData] = useState({
    planname: "",
    description: "",
    coverageamount: "",
    amounttobepaid: "",
    policyterm: "",
    paymentfrequency: "",
    files: null,
  });

  const [editplandata, setEditPlanData] = useState({
    planname: "",
    description: "",
    coverageamount: "",
    amounttobepaid: "",
    policyterm: "",
    paymentfrequency: "",
    files: null,
  });

  const [profileFileName, setProfileFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const ApplicationData = async () => {
    try {
      const response = await axiosInstance.post("/viewallinsuranceapplication");
      console.log("user list", response.data.data);
      setInsurance(response.data.data);
      setFilteredclerks(response.data.data);
    } catch (error) {
      console.error("error fetching user data?:", error);
    }
  };
  const rowsPerPage = 10;
  const navigate = useNavigate();

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredclerks.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredclerks.length / rowsPerPage);
  console.log(filteredclerks, "filter");
  console.log(currentRows, "map");

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      setFilteredclerks(insurance);
      return;
    }
    const filtered = insurance.filter((clerk) =>
      clerk.planname.toLowerCase().includes(searchTerm)
    );
    setFilteredclerks(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddPlanData({ ...addplandata, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setErrors((prev) => ({
        ...prev,
        files: "Only JPG, JPEG, PNG, and GIF files are allowed",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, files: null }));
    setAddPlanData({ ...addplandata, files: file });
    setProfileFileName(file.name);
  };

  const handleDelete = (id) => {
    axiosInstance.post("/rejectinsurance/" + id).then((result) => {
      alert("Insurance Plan Deactivated");
      ApplicationData()
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errorObj = {};

    if (!addplandata.planname.trim()) {
      isValid = false;
      errorObj.planname = "Plan name is required";
    }
    if (!addplandata.description.trim()) {
      isValid = false;
      errorObj.description = "Description is required";
    }
    if (!addplandata.coverageamount.trim()) {
      isValid = false;
      errorObj.coverageamount = "Coverage amount is required";
    }
    if (!addplandata.amounttobepaid.trim()) {
      isValid = false;
      errorObj.amounttobepaid = "Amount to be paid is required";
    }
    if (!addplandata.policyterm.trim()) {
      isValid = false;
      errorObj.policyterm = "Policy term is required";
    }
    if (!addplandata.paymentfrequency.trim()) {
      isValid = false;
      errorObj.paymentfrequency = "payment frequency is required";
    }
    if (!addplandata.files) {
      isValid = false;
      errorObj.files = "Plan image is required";
    }

    setErrors(errorObj);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addplandata, "p");

    if (!validateForm()) return;

    const formData = new FormData();
    Object.keys(addplandata).forEach((key) => {
      formData.append(key, addplandata[key]);
    });

    try {
      const response = await axiosMultipartInstance.post(
        "/addInsurance",
        formData
      );
      if (response.status === 200) {
        alert(response.data.msg);
        window.location.reload();
        setShowAddModal(false);
        ApplicationData(); // Refresh the list
      }
    } catch (error) {
      console.error("Error:", error);
      let msg = error?.response?.data?.msg || "Error occurred";
      alert(msg);
    }
  };

  const ApplicationState = () => {
    setverified(false);
    setButtonState(false);
  };
  const VerifiedApplicationState = () => {
    setverified(true);
    setButtonState(true);
  };

  const PlanButtonState = () => {
    setPlanButtonState(true);
    // setButtonState(true);
  };
  const handleEdit = async (planid) => {
    try {
      const response = await axiosInstance.post(
        `/viewoneinsuranceapplication/${planid}`
      );
      console.log("Fetched plan data:", response.data.data[0]);
      const insuranceData = response.data.data[0];
      setEditPlanData({
        planname: insuranceData?.planname || "",
        description: insuranceData?.description || "",
        coverageamount: insuranceData?.coverageamount || "",
        amounttobepaid: insuranceData?.amounttobepaid || "",
        policyterm: insuranceData?.policyterm || "",
        paymentfrequency: insuranceData?.paymentfrequency || "",
        files: null, // File inputs cannot be prefilled
      });
      setSingleInsurance(insuranceData); // Set the singleinsurance state
      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching insurance plan data:", error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditPlanData({ ...editplandata, [name]: value });
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setErrors((prev) => ({
        ...prev,
        files: "Only JPG, JPEG, PNG, and GIF files are allowed",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, files: null }));
    setEditPlanData({ ...editplandata, files: file });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!singleinsurance?._id) {
      alert("Plan ID is not defined");
      return;
    }

    const formData = new FormData();
    Object.keys(editplandata).forEach((key) => {
      if (editplandata[key]) {
        formData.append(key, editplandata[key]);
      }
    });

    try {
      const response = await axiosMultipartInstance.post(
        `/editinsuranceapplication/${singleinsurance._id}`,
        formData
      );
      if (response.status === 200) {
        console.log("Edit successful:", response.data);
        alert(response.data.msg);
        setShowEditModal(false);
        ApplicationData(); // Refresh the list
      }
    } catch (error) {
      console.error("Error editing plan:", error);
      let msg = error?.response?.data?.msg || "Error occurred";
      alert(msg);
    }
  };

  useEffect(() => {
    ApplicationData();
    // handleEdit();
    if (!localStorage.getItem("admin")) {
      navigate("/adminlogin");
    }
  }, []);

  return (
    <div className="d-flex w-100">
      <div className="sidebar col-lg-3 col-md-4">
        <AdminSidebar />
      </div>
      <div className="main-content col-lg-9 col-md-8">
        <h3 className="mt-4" id="view">
          View Insurance Plans
        </h3>

        <div className="text-center my-5">
          <button
            className={buttonState == false ? "MML-Button1" : "MML-Button2"}
            id="appbutton"
            onClick={ApplicationState}
          >
            Application
          </button>
          <button
            className={buttonState == false ? "MML-Button2" : "MML-Button1"}
            id="verifiedappbutton"
            onClick={VerifiedApplicationState}
          >
            Approved Application
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
          <img
            className="ms-3 cursor-pointer"
            src={addclerk}
            alt="Add Plan"
            onClick={() => setShowAddModal(true)}
          />
        </div>

        {/* Plans Table */}
        <div className="mt-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th id="th">sl/no</th>
                <th id="th">Plan Name</th>
                <th id="th">Description</th>
                <th id="th">Coverage Amount</th>
                <th id="th">Amount to be Paid</th>
                <th id="th">Policy Term</th>
                <th id="th">Image</th>
                <th id="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((data, index) => (
                  <tr key={data?._id}>
                    <td>{indexOfFirstRow + index + 1}</td>
                    <td>{data?.planname}</td>
                    <td>{data?.description}</td>
                    <td>{data?.coverageamount}</td>
                    <td>{data?.amounttobepaid}</td>
                    <td>{data?.policyterm}</td>
                    <td>
                      <img
                        src={`${imgurl}/${data?.planimage?.filename}`}
                        alt="Plan"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <img
                        src={editbtn}
                        alt="Edit"
                        onClick={() => {
                          setShowEditModal(true);
                          handleEdit(data?._id);
                        }}
                      />
                      <img
                        src={deletebtn}
                        alt="Edit"
                        onClick={() => {
                          handleDelete(data?._id);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Plans Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &laquo;
              </button>
            </li>
            {Array?.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
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

        {/* Add Plan Modal */}
        <Modal
          show={showAddModal}
          style={{ width: "50%" }}
          onHide={() => setShowAddModal(false)}
        >
          <Modal.Header closeButton>
            <h3 className="mt-4 mb-4">
              <span className="dashboardheadcolor">Add </span> Plan
            </h3>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label>Plan Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="planname"
                      onChange={handleInputChange}
                    />
                    {errors?.planname && (
                      <small className="text-danger">{errors?.planname}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    {errors?.files && (
                      <small className="text-danger">{errors?.files}</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Amount to be Paid</label>
                    <input
                      type="text"
                      className="form-control"
                      name="amounttobepaid"
                      onChange={handleInputChange}
                    />
                    {errors?.amounttobepaid && (
                      <small className="text-danger">
                        {errors?.amounttobepaid}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      onChange={handleInputChange}
                    />
                    {errors?.description && (
                      <small className="text-danger">
                        {errors?.description}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Coverage Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="coverageamount"
                      onChange={handleInputChange}
                    />
                    {errors?.coverageamount && (
                      <small className="text-danger">
                        {errors?.coverageamount}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Policy Term</label>
                    <select
                      className="form-control"
                      name="policyterm"
                      onChange={handleInputChange}
                    >
                      <option>Select Policy Term</option>
                      <option value="10year">10 Year</option>
                      <option value="20year">20 Year</option>
                      <option value="30year">30 Year</option>
                    </select>
                    {errors?.policyterm && (
                      <small className="text-danger">
                        {errors?.policyterm}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label>Payment Frequency</label>
                    <select
                      className="form-control"
                      name="paymentfrequency"
                      onChange={handleInputChange}
                    >
                      <option>Select Payment Frequency</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                    {errors?.paymentfrequency && (
                      <small className="text-danger">
                        {errors?.paymentfrequency}
                      </small>
                    )}
                  </div>
                </div>
                <button className="text-center" type="submit">
                  <img src={addbtn}></img>
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        {/* Edit Plan Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <h3 className="mt-4 mb-4">
              <span className="dashboardheadcolor">Edit </span> Plan
            </h3>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => handleEditSubmit(e)}>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label>Plan Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="planname"
                      value={editplandata.planname}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleEditFileChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={editplandata.description}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label>Policy Term</label>
                    <select
                      className="form-control"
                      name="policyterm"
                      value={editplandata.policyterm}
                      onChange={handleEditInputChange}
                    >
                      <option value="" disabled>
                        Select Policy Term
                      </option>
                      <option value="10year">10 Year</option>
                      <option value="20year">20 Year</option>
                      <option value="30year">30 Year</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Coverage Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      name="coverageamount"
                      value={editplandata.coverageamount}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Payment Frequency</label>
                    <select
                      className="form-control"
                      name="paymentfrequency"
                      value={editplandata.paymentfrequency}
                      onChange={handleEditInputChange}
                    >
                      <option value="" disabled>
                        Select Payment Frequency
                      </option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Amount to be paid</label>
                    <input
                      type="text"
                      className="form-control"
                      name="amounttobepaid"
                      value={editplandata.amounttobepaid}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Update Plan
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default AdminViewPlan;
