import React, { useEffect, useState } from "react";
import "../../Asserts/Styles/ManagerManageLoan.css";
import img2 from "../../Asserts/images/carbon_view-filled.png";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminViewAllApprovedLoan() {
  const [DbData, setDbData] = useState([]);
  const navigate = useNavigate();

  const VerifiedApplicationData = async () => {
    try {
      const response = await axiosInstance.get("/approvedloan");
      console.log("user list", response.data);

      setDbData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // for button css and switching the table

  useEffect(() => {
    VerifiedApplicationData();
  }, []);

  return (
    <div className="MML-MainDiv">
      <div className="MML-MainDiv-ContainDiv">
        <div>
          <AdminSidebar />
        </div>

        <div className="MML-MainDiv-ContainDiv-ContentDiv">
          <div className="MML-MainDiv-ContainDiv-HeaderDiv">
            <h1 className="MML-h1">MANAGE </h1>
            <h1 className="MML-h2">LOAN</h1>
          </div>

          <div className="MML-MainDiv-ContainDiv-Content">
            <div>
              <h3 className="MML-h3">View Request</h3>
            </div>
            <div className="MML-Table-Contain-Shadow">
              <table className="MML-Table">
                <thead className="MML-Table-thead ">
                  <tr className="MML-Table-thead-tr ">
                    <th className="MML-Table-thead-th-center ">S No</th>
                    <th className="MML-Table-thead-th-center">Profile</th>
                    <th className="MML-Table-thead-th">Name</th>
                    <th className="MML-Table-thead-th">Phone No</th>
                    <th className="MML-Table-thead-th">Address</th>
                    <th className="MML-Table-thead-th">DOB</th>
                    <th className="MML-Table-thead-th">Loan Type</th>
                    <th className="MML-Table-thead-th-center">Loan Amount</th>
                    <th className="MML-Table-thead-th-center">Action</th>
                  </tr>
                </thead>

                <tbody className="MML-Table-tbody">
                  {DbData?.length > 0 ? (
                    DbData?.map((data, index) => {
                      return (
                        <tr className="MML-Table-tbody-tr" key={index}>
                          <td className="MML-Table-td-center">{index + 1}.</td>
                          <td className="MML-Table-td-center">
                            <img
                              src={`${imgurl}/${data?.userid?.userPicture?.originalname}`}
                              alt="Profile"
                              className="MML-img"
                            />
                          </td>
                          {/* profile img */}
                          <td className="MML-Table-td">
                            {data?.userid?.username}
                          </td>
                          <td className="MML-Table-td">
                            {data?.userid?.userContact}
                          </td>
                          <td className="MML-Table-td">
                            <p className="MML-Table-p">
                              {data?.userid?.userAddress}
                            </p>
                          </td>
                          <td className="MML-Table-td">
                            {new Date(
                              data?.userid?.userDate
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td className="MML-Table-td">{data?.loantype}</td>
                          <td className="MML-Table-td-center">
                            ₹{data?.loanamount}
                          </td>
                          <td className="MML-Table-td-center">
                            <button
                              className="MML-Button3"
                              onClick={() =>
                                navigate(`/admin/viewaloandetails/${data._id}`)
                              }
                            >
                              <img src={img2} alt="View Details" />
                            </button>
                          </td>
                          {/* eye icon */}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>
                        <p className=" text-center text-danger">
                          No Data Found
                        </p>
                      </td>
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

export default AdminViewAllApprovedLoan;
