import React, { useEffect, useState } from "react";
import ClerkSideBar from "./ClerkSideBar";
import "../../Asserts/Styles/ClerkManageLoan.css";
import img2 from "../../Asserts/images/carbon_view-filled.png";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate, useParams } from "react-router-dom";

function ClerkManageLoan() {
  const [DbData, setDbData] = useState([]);
  const [verified, setverified] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [vDbData, setVDbData] = useState([]);
  const navigate = useNavigate();

  const ApplicationData = async () => {
    try {
      const response = await axiosInstance.get("/nonverifiedloan");
      console.log("user list", response.data);
      setDbData(response.data.data);
    } catch (error) {
      console.error("error fetching user data?:", error);
    }
  };

  const VerifiedApplicationData = async () => {
    try {
      const response = await axiosInstance.get("/verifiedloan");
      console.log("userlist", `response.data`);
      setVDbData(response.data.data);
    } catch (error) {
      console.error("error fetching user data?:", error);
    }
  };

  // for button css and switching the table
  const ApplicationState = () => {
    setverified(false);
    setButtonState(false);
  };

  // for button css and switching the table
  const VerifiedApplicationState = () => {
    setverified(true);
    setButtonState(true);
  };

  useEffect(() => {
    ApplicationData();
  }, []);
  useEffect(() => {
    VerifiedApplicationData();
  }, []);

  return (
    <div className="CML-MainDiv">
      <div className="CML-MainDiv-ContainDiv">
        <div>
          <ClerkSideBar />
        </div>

        <div className="CML-MainDiv-ContainDiv-ContentDiv">
          <div className="CML-MainDiv-ContainDiv-HeaderDiv">
            <h1 className="CML-h1">MANAGE </h1>
            <h1 className="CML-h2">LOAN</h1>
          </div>

          <div className="CML-MainDiv-ContainDiv-ButtonDiv">
            <button
              className={buttonState == false ? "CML-Button1" : "CML-Button2"}
              id="appbutton"
              onClick={ApplicationState}
            >
              Application
            </button>
            <button
              className={buttonState == false ? "CML-Button2" : "CML-Button1"}
              id="verifiedappbutton"
              onClick={VerifiedApplicationState}
            >
              Verified Application
            </button>
          </div>

          <div className="CML-MainDiv-ContainDiv-Content">
            <div>
              <h3 className="CML-h3">View Request</h3>
            </div>
            <div className="CML-Table-Contain-Shadow">
              <table className="CML-Table">
                <thead className="CML-Table-thead ">
                  <tr className="CML-Table-thead-tr ">
                    <th className="CML-Table-thead-th-center ">S No</th>
                    <th className="CML-Table-thead-th-center">Profile</th>
                    <th className="CML-Table-thead-th">Name</th>
                    <th className="CML-Table-thead-th">Phone No</th>
                    <th className="CML-Table-thead-th">Address</th>
                    <th className="CML-Table-thead-th">DOB</th>
                    <th className="CML-Table-thead-th">Loan Type</th>
                    <th className="CML-Table-thead-th-center">Loan Amount</th>
                    <th className="CML-Table-thead-th-center">Action</th>
                  </tr>
                </thead>

                <tbody className="CML-Table-tbody">
                  {verified == false ? (
                    DbData?.length > 0 ? (
                      DbData?.map((data, index) => {
                        return (
                          <tr className="CML-Table-tbody-tr" key={index}>
                            <td className="CML-Table-td-center">
                              {index + 1}.
                            </td>
                            <td className="CML-Table-td-center">
                              <img
                                src={`${imgurl}/${data?.userid?.userPicture?.originalname}`}
                                alt="Profile"
                                className="CML-img"
                              />
                            </td>
                            {/* profile img */}
                            <td className="CML-Table-td">
                              {data?.userid?.username}
                            </td>
                            <td className="CML-Table-td">
                              {data?.userid?.userContact}
                            </td>
                            <td className="CML-Table-td">
                              <p className="CML-Table-p">
                                {data?.userid?.userAddress}
                              </p>
                            </td>
                            <td className="CML-Table-td">
                              {new Date(
                                data?.userid?.userDate
                              ).toLocaleDateString("en-GB")}
                            </td>
                            <td className="CML-Table-td">{data?.loantype}</td>
                            <td className="CML-Table-td-center">
                              ₹{data?.loanamount}
                            </td>
                            <td className="CML-Table-td-center">
                              <button
                                className="CML-Button3"
                                onClick={() =>
                                  navigate(`/clerk/viewloandetails/${data._id}`)
                                }
                              >
                                <img src={img2} alt="View Details" />
                              </button>
                            </td>
                            {/* eye icon */}
                            {console.log("data-data", data)}
                            {console.log("data-data-data", data._id)}
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
                    )
                  ) : //if the verified status is true

                  vDbData?.length > 0 ? (
                    vDbData.map((data, index) => {
                      return (
                        <tr className="CML-Table-tbody-tr" key={index}>
                          <td className="CML-Table-td-center">{index + 1}.</td>
                          <td className="CML-Table-td-center">
                            <img
                              src={`${imgurl}/${data?.userid?.userPicture?.originalname}`}
                              alt="Profile"
                              className="CML-img"
                            />
                          </td>
                          {/* profile img */}
                          <td className="CML-Table-td">
                            {data?.userid?.username}
                          </td>
                          <td className="CML-Table-td">
                            {data?.userid?.userContact}
                          </td>
                          <td className="CML-Table-td">
                            <p className="CML-Table-p">
                              {data?.userid?.userAddress}
                            </p>
                           
                          </td>
                          <td className="CML-Table-td">
                            {new Date(
                              data?.userid?.userDate
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td className="CML-Table-td">{data?.loantype}</td>
                          <td className="CML-Table-td-center">
                            ₹{data?.loanamount}
                          </td>
                          <td className="CML-Table-td-center">
                            <button
                              className="CML-Button3"
                              onClick={() =>
                                navigate(`/clerk/viewloandetails/${data._id}`)
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

export default ClerkManageLoan;

// <p className='CML-Table-p-2'>{data?.userid?.userNumber}</p>
