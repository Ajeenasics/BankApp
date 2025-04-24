import React, { useEffect, useState } from "react";
import ClerkSideBar from "./ClerkSideBar";
import "../../Asserts/Styles/ClerkManageCreditCard.css";
import img2 from "../../Asserts/images/carbon_view-filled.png";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate, useParams } from "react-router-dom";
import LandingFooter from "../Main/LandingFooter";

function ClerkviewInsurance() {
  const [DbData, setDbData] = useState([]);
  const [verified, setverified] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [planbuttonState, setPlanButtonState] = useState(false);
  const [vDbData, setVDbData] = useState([]);
  const [plansList, setPlansList] = useState([]);

  const navigate = useNavigate();

  const ApplicationData = async () => {
    try {
      const response = await axiosInstance.post(
        "/nonverifiedinsuranceapplication"
      );
      console.log("user list", response.data);
      setDbData(response.data.data);
    } catch (error) {
      console.error("error fetching user data?:", error);
    }
  };

  const PlansData = async () => {
    try {
      const response = await axiosInstance.post("/viewallinsuranceapplication");
      console.log("user list", response.data);
      setPlansList(response.data.data);
    } catch (error) {
      console.error("error fetching user data?:", error);
    }
  };

  const VerifiedApplicationData = async () => {
    try {
      const response = await axiosInstance.post(
        "/verifiedinsuranceapplication"
      );
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
    setPlanButtonState(false);
  };

  // for button css and switching the table
  const VerifiedApplicationState = () => {
    setverified(true);
    setButtonState(true);
    setPlanButtonState(false);
  };

  const ViewplanApplicationState = () => {
    setButtonState(true);
    setPlanButtonState(true);
    setverified(false);
  };

  useEffect(() => {
    ApplicationData();
    VerifiedApplicationData();
    PlansData();
  }, []);

  return (
    <div className="CMCC-MainDiv">
      <div className="CMCC-MainDiv-ContainDiv">
        <div>
          <ClerkSideBar />
        </div>

        <div className="CMCC-MainDiv-ContainDiv-ContentDiv">
          <div className="CMCC-MainDiv-ContainDiv-HeaderDiv">
            <h1 className="CMCC-h1">MANAGE </h1>
            <h1 className="CMCC-h2">Insurance</h1>
          </div>

          <div className="CMCC-MainDiv-ContainDiv-ButtonDiv">
            <button
              className={buttonState == false ? "CMCC-Button1" : "CMCC-Button2"}
              id="appbutton"
              onClick={ApplicationState}
            >
              Application
            </button>
            <button
              className={verified == false ? "CMCC-Button2" : "CMCC-Button1"}
              id="verifiedappbutton"
              onClick={VerifiedApplicationState}
            >
              Verified Application
            </button>
            <button
              className={
                planbuttonState == false ? "CMCC-Button2" : "CMCC-Button1"
              }
              id="verifiedappbutton"
              onClick={ViewplanApplicationState}
            >
              Insurance Plans
            </button>
          </div>

          <div className="CMCC-MainDiv-ContainDiv-Content">
            <div>
              <h3 className="CMCC-h3">View Request</h3>
            </div>
            {planbuttonState == false ? (
              <div className="CMCC-Table-Contain-Shadow">
                <table className="CMCC-Table">
                  <thead className="CMCC-Table-thead ">
                    <tr className="CMCC-Table-thead-tr ">
                      <th className="CMCC-Table-thead-th-center ">S No</th>
                      <th className="CMCC-Table-thead-th-center">Profile</th>
                      <th className="CMCC-Table-thead-th">Name</th>
                      <th className="CMCC-Table-thead-th">Phone No</th>
                      <th className="CMCC-Table-thead-th">Address</th>
                      <th className="CMCC-Table-thead-th">Plan</th>
                      <th className="CMCC-Table-thead-th">Coverage Amount</th>
                      <th className="CMCC-Table-thead-th-center">
                        Policy Term
                      </th>
                      <th className="CMCC-Table-thead-th-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="CMCC-Table-tbody">
                    {verified == false ? (
                      DbData?.length > 0 ? (
                        DbData?.map((data, index) => {
                          return (
                            <tr className="CMCC-Table-tbody-tr" key={index}>
                              <td className="CMCC-Table-td-center">
                                {index + 1}.
                              </td>
                              <td className="CMCC-Table-td-center">
                                <img
                                  src={`${imgurl}/${data?.userid?.userPicture?.originalname}`}
                                  alt="Profile"
                                  className="CMCC-img"
                                />
                              </td>
                              {/* profile img */}
                              <td className="CMCC-Table-td">
                                {data?.userid?.username}
                              </td>
                              <td className="CMCC-Table-td">
                                {data?.userid?.userContact}
                              </td>
                              <td className="CMCC-Table-td">
                                <p className="CMCC-Table-p">
                                  {data?.userid?.userAddress}
                                </p>
                                <p className="CMCC-Table-p-2">
                                  {data?.userid?.userNumber}
                                </p>
                              </td>
                              <td className="CMCC-Table-td">
                                {data?.planid?.planname}
                              </td>
                              <td className="CMCC-Table-td">
                                {data?.planid?.coverageamount}
                              </td>
                              <td className="CMCC-Table-td-center">
                                {data?.planid?.policyterm}
                              </td>
                              <td className="CMCC-Table-td-center">
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/clerk/clerkviewinsurancedetailstoverify/${data._id}`
                                    )
                                  }
                                >
                                  <img src={img2} alt="View Details" />
                                </div>
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
                          <tr className="CMCC-Table-tbody-tr" key={index}>
                            <td className="CMCC-Table-td-center">
                              {index + 1}.
                            </td>
                            <td className="CMCC-Table-td-center">
                              <img
                                src={`${imgurl}/${data?.userid?.userPicture?.originalname}`}
                                alt="Profile"
                                className="CMCC-img"
                              />
                            </td>
                            {/* profile img */}
                            <td className="CMCC-Table-td">
                              {data?.userid?.username}
                            </td>
                            <td className="CMCC-Table-td">
                              {data?.userid?.userContact}
                            </td>
                            <td className="CMCC-Table-td">
                              {data?.userid?.userAddress}
                            </td>
                            <td className="CMCC-Table-td">
                              {" "}
                              {data?.planid?.planname}
                            </td>
                            <td className="CMCC-Table-td">
                              {data?.planid?.coverageamount}
                            </td>
                            <td className="CMCC-Table-td-center">
                              <h6>{data?.planid?.paymentfrequency}</h6>
                              {data?.planid?.policyterm}
                            </td>
                            <td className="CMCC-Table-td-center">
                              <div
                                onClick={() =>
                                  navigate(`/clerk/clerkviewinsurancedetailstoverify/${data._id}`)
                                }
                              >
                                <img src={img2} alt="View Details" />
                              </div>
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
            ) : (
              " "
            )}
            {planbuttonState == true ? (
              <div className="CMCC-Table-Contain-Shadow">
                <table className="CMCC-Table">
                  <thead className="CMCC-Table-thead ">
                    <tr className="CMCC-Table-thead-tr ">
                      <th className="CMCC-Table-thead-th-center ">S No</th>
                      <th className="CMCC-Table-thead-th">Plan Name</th>
                      <th className="CMCC-Table-thead-th">Description</th>
                      <th className="CMCC-Table-thead-th">Coverage Amount</th>
                      <th className="CMCC-Table-thead-th">Amount to be Paid</th>
                      <th className="CMCC-Table-thead-th">Payment Frequency</th>
                      <th className="CMCC-Table-thead-th-center">
                        Policy Term
                      </th>
                      <th className="CMCC-Table-thead-th-center">Image</th>
                    </tr>
                  </thead>
                  <tbody className="CMCC-Table-tbody">
                    {plansList.length > 0 ? 
                      plansList.map((data, index) => {
                        return (
                          <tr className="CMCC-Table-tbody-tr" key={index}>
                            <td className="CMCC-Table-td-center">
                              {index + 1}.
                            </td>
                            
                            {/* profile img */}
                            <td className="CMCC-Table-td">
                              {data?.planname}
                            </td>
                            <td className="CMCC-Table-td">
                              {data?.description}
                            </td>
                            <td className="CMCC-Table-td">
                              {data?.coverageamount}
                            </td>
                            <td className="CMCC-Table-td">
                              {" "}
                              {data?.amounttobepaid}
                            </td>
                            <td className="CMCC-Table-td">
                              {data?.paymentfrequency}
                            </td>
                            <td className="CMCC-Table-td-center">
                              <h6>{data?.planid?.paymentfrequency}</h6>
                              {data?.policyterm}
                            </td>
                            <td className="CMCC-Table-td-center">
                              <img
                                src={`${imgurl}/${data?.planimage?.originalname}`}
                                alt="Profile"
                                className="CMCC-img"
                              />
                            </td>
                            {/* eye icon */}
                          </tr>
                        );
                      })
                     : (
                      <tr>
                        <td>
                          <p className=" text-center text-danger">
                            No Data Founded
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClerkviewInsurance;
