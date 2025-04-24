import React, { useEffect, useState } from "react";
import "../../Asserts/Styles/ClerkManageLoan.css";
import img2 from "../../Asserts/images/carbon_view-filled.png";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate } from "react-router-dom";
import verify from "../../Asserts/images/toverify.png";
import reject from "../../Asserts/images/reject.png";
import ManagerSidebar from "./ManagerSidebar";

function ManagerChequeTransaction() {
  const [DbData, setDbData] = useState([]);
  const [vDbData, setVDbData] = useState([]);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    ApplicationData();
    VerifiedApplicationData();
  }, []);

  const ApplicationData = async () => {
    try {
      const response = await axiosInstance.post("/viewNonApprovedTransactions");
      setDbData(response.data.data);
    } catch (error) {
      console.error("Error fetching non-verified transactions:", error);
    }
  };

  const VerifiedApplicationData = async () => {
    try {
      const response = await axiosInstance.post("/ViewApprovedtransaction");
      setVDbData(response.data.data);
    } catch (error) {
      console.error("Error fetching verified transactions:", error);
    }
  };

  const ToVerify = async (transactionId) => {
    try {
      const response = await axiosInstance.post(`/toApproveTransactions/${transactionId}`);
      alert(response.data.message);
      
      // Refresh data after approval
      await ApplicationData();
      await VerifiedApplicationData();
      
      setVerified(true); // Switch to verified applications
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Transaction verification failed.");
    }
  };
  
  const ToReject = async (transactionId) => {
    try {
      const response = await axiosInstance.post(`/toRejectTransactions/${transactionId}`);
      alert(response.data.message);
      
      // Refresh data after rejection
      await ApplicationData();
      await VerifiedApplicationData();
    } catch (error) {
      console.error("Rejection failed:", error);
      alert("Transaction rejection failed.");
    }
  };
  
  

  const openFileInNewTab = (filePath) => {
    window.open(`${imgurl}/${filePath}`, "_blank");
  };

  const currentData = verified ? vDbData : DbData;

  return (
    <div className="CML-MainDiv">
      <div className="CML-MainDiv-ContainDiv">
        <ManagerSidebar />

        <div className="CML-MainDiv-ContainDiv-ContentDiv">
          <div className="CML-MainDiv-ContainDiv-HeaderDiv">
            <h1 className="CML-h1">MANAGE </h1>
            <h1 className="CML-h2">Online Cheque Transaction</h1>
          </div>

          <div className="CML-MainDiv-ContainDiv-ButtonDiv">
            <button
              className={!verified ? "CML-Button1" : "CML-Button2"}
              onClick={() => setVerified(false)}
            >
              Application
            </button>
            <button
              className={verified ? "CML-Button1" : "CML-Button2"}
              onClick={() => setVerified(true)}
            >
              Verified Application
            </button>
          </div>

          <div className="CML-MainDiv-ContainDiv-Content">
            <h3 className="CML-h3">View Request</h3>
            <div className="CML-Table-Contain-Shadow">
              <table className="CML-Table">
                <thead className="CML-Table-thead">
                  <tr className="CML-Table-thead-tr">
                    <th className="CML-Table-thead-th-center">S No</th>
                    <th className="CML-Table-thead-th">Name</th>
                    <th className="CML-Table-thead-th">Date</th>
                    <th className="CML-Table-thead-th">Payee</th>
                    <th className="CML-Table-thead-th">Payee Acc No</th>
                    <th className="CML-Table-thead-th">Amount</th>
                    <th className="CML-Table-thead-th-center">Cheque Image</th>
                    <th className="CML-Table-thead-th-center">{!verified ? (
                      <th className="CML-Table-thead-th-center">
                      Action
                      </th>
                    ) : ""}</th>
                  </tr>
                </thead>
                <tbody className="CML-Table-tbody">
                  {currentData.length > 0 ? (
                    currentData.map((data, index) => (
                      <tr className="CML-Table-tbody-tr" key={data._id}>
                        <td className="CML-Table-td-center">{index + 1}.</td>
                        <td className="CML-Table-td">{data?.userid?.username}</td>
                        <td className="CML-Table-td">{new Date(data?.date).toLocaleDateString("en-GB")}</td>
                        <td className="CML-Table-td">{data?.payeename}</td>
                        <td className="CML-Table-td">{data?.accountnumber}</td>
                        <td className="CML-Table-td-center">₹{data?.payamount}/-</td>
                        <td className="CML-Table-td-center">
                          {data?.chequeimage?.filename ? (
                            <h1 className="CVCD-h4" onClick={() => openFileInNewTab(data?.chequeimage?.filename)}>
                              View File
                            </h1>
                          ) : (
                            <h1 className="CVCD-h4" style={{ color: "gray" }}>
                              No file found
                            </h1>
                          )}
                        </td>
                        <td className="CML-Table-td-center">
                          {!verified ? (
                            <>
                              <img src={verify} alt="Verify" onClick={() => ToVerify(data._id)} />
                              <img src={reject} alt="Reject" onClick={() => ToReject(data._id)} />
                            </>
                          ) : (
""                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-danger">No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerChequeTransaction;
