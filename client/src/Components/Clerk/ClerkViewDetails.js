import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate, useParams } from "react-router-dom";
import "../../Asserts/Styles/ClerkViewDetails.css";
import ClerkSideBar from "./ClerkSideBar";
import LandingFooter from "../Main/LandingFooter";
import UserNavbar from "../User/UserNavbar";

function ClerkViewDetails() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { data } = useParams();

  const openFileInNewTab = (filePath) => {
    window.open(`${imgurl}/${filePath}`, "_blank");
  };

  const GetUserData = async () => {
    try {
      const response = await axiosInstance.post(
        `/viewonenonverifiedloan/${data}`
      );
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        console.log("response-response", response);
        setUser(response.data.data[0]);
      } else {
        console.error("Unexpected API response structure.");
      }
      console.log("API Response:", response.data.data);
    } catch (error) {
      alert("Failed to fetch user details. Please try again.");
      console.error("Error fetching user data:", error);
    }
  };

  const CancelbuttonOnClick = () => {
    navigate("/clerk/manageloan");
  };

  const VerifybuttonOnClick = async () => {
    try {
      await axiosInstance.post(`/verifyloan/${user._id}`);
      alert("Loan Verified Successfully");
      navigate("/clerk/manageloan");
    } catch (error) {
      console.error("Error verifying loan:", error);
    }
  };

  useEffect(() => {
    GetUserData();
  }, [data]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="CVD-MainDiv">
      {console.log("user", user)}
      {console.log("id", user._id)}
      {console.log("data-data", data)}

      <div className="CVD-MainDiv-ContainDiv">
        <div>
          <ClerkSideBar />
        </div>

        <div className="CVD-MainDiv-ContainDiv-ContentDiv">
          <div className="CVD-MainDiv-ContainDiv-HeaderDiv ms-3">
            <h1 className="CVD-h1">View</h1>
            <h1 className="CVD-h2">Details</h1>
          </div>

          <div className="CVD-MainDiv-ContainDiv-Content">
            <div>
              <img
                className="CVD-profile-img"
                src={`${imgurl}/${user?.userid?.userPicture?.originalname}`}
                alt="PROFILE"
              />
            </div>

            <div>
              <h1 className="CVD-h3">{user?.userid?.username}</h1>
            </div>

            <div className="CVD-MainDiv-ContainDiv-Content-Card-Upper">
              {/* Personal Details */}
              <div className="CVD-MainDiv-ContainDiv-Content-Card">
                <h1 className="CVD-h5">Personal Details</h1>

                <div className="CVD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="CVD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div className="CVD-textcontain">
                        <label for="email" className="CVD-label">
                          E-mail
                        </label>
                        <h1 name="email" className="CVD-h4">
                          {user?.userid?.userMail}
                        </h1>
                      </div>

                      <div className="CVD-textcontain">
                        <label for="DOB" className="CVD-label">
                          Date Of Birth
                        </label>
                        <h1 name="DOB" className="CVD-h4">
                          {new Date(user?.userid?.userDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Right">
                    <div className="CVD-textcontain">
                      <label for="Contact" className="CVD-label">
                        Contact
                      </label>
                      <h1 name="Contact" className="CVD-h4">
                        {user?.userid?.userContact}
                      </h1>
                    </div>

                    <div className="CVD-textcontain">
                      <label for="address" className="CVD-label">
                        Address
                      </label>
                      <h1 name="address" className="CVD-h4">
                        {user?.userid?.userAddress}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity */}
              <div className="CVD-MainDiv-ContainDiv-Content-Card">
                <h1 className="CVD-h5">Identity</h1>

                <div className="CVD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="CVD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div className="CVD-textcontain">
                        <label for="email" className="CVD-label">
                          PAN Card Number
                        </label>
                        <h1 name="email" className="CVD-h4">
                          {user?.pancardnumber}
                        </h1>
                      </div>

                      <div className="CVD-textcontain">
                        <label for="pancard" className="CVD-label">
                          PAN Card
                        </label>
                        <h1
                          name="pancard"
                          className="CVD-h4 text-decoration-underline"
                          onClick={() =>
                            user?.pancardimage == null
                              ? "no pancard image"
                              : openFileInNewTab(user?.pancardimage?.filename)
                          }
                        >
                          View File
                        </h1>
                      </div>

                      <div className="CVD-textcontain">
                        <label for="aadhaarnum" className="CVD-label">
                          Aadhaar Number
                        </label>
                        <h1 name="aadhaarnum" className="CVD-h4">
                          {user?.aadharnumber}
                        </h1>
                      </div>

                      <div className="CVD-textcontain">
                        <label htmlFor="aadhaarcard" className="CVD-label">
                          Aadhaar Card
                        </label>
                        {user?.aadharimage?.filename ? (
                          <h1
                            name="aadhaarcard"
                            className="CVD-h4 text-decoration-underline"
                            onClick={() =>
                              openFileInNewTab(user?.aadharimage?.filename)
                            }
                          >
                            View File
                          </h1>
                        ) : (
                          <h1
                            name="aadhaarcard"
                            className="CVD-h4"
                            style={{ color: "gray" }}
                          >
                            No file found
                          </h1>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Right">
                    <div className="CVD-textcontain">
                      <label htmlFor="votersid" className="CVD-label">
                        Voter's ID
                      </label>
                      {user?.votersidfile?.filename ? (
                        <h1
                          name="votersid"
                          className="CVD-h4 text-decoration-underline"
                          onClick={() =>
                            openFileInNewTab(user?.votersidfile?.filename)
                          }
                        >
                          View File
                        </h1>
                      ) : (
                        <h1
                          name="votersid"
                          className="CVD-h4"
                          style={{ color: "gray" }}
                        >
                          No file found
                        </h1>
                      )}
                    </div>

                    <div className="CVD-textcontain">
                      <label htmlFor="dl" className="CVD-label">
                        Driving License
                      </label>
                      {user?.drivinglicensefile?.filename ? (
                        <h1
                          name="dl"
                          className="CVD-h4 text-decoration-underline"
                          onClick={() =>
                            openFileInNewTab(user?.drivinglicensefile?.filename)
                          }
                        >
                          View File
                        </h1>
                      ) : (
                        <h1
                          name="dl"
                          className="CVD-h4"
                          style={{ color: "gray" }}
                        >
                          No file found
                        </h1>
                      )}
                    </div>

                    <div className="CVD-textcontain">
                      <label for="passport" className="CVD-label">
                        Passport
                      </label>
                      {user?.passportfile?.filename ? (
                        <h1
                          name="passport"
                          className="CVD-h4 text-decoration-underline"
                          onClick={() =>
                            openFileInNewTab(user?.passportfile?.filename)
                          }
                        >
                          View File
                        </h1>
                      ) : (
                        <h1
                          name="passport"
                          className="CVD-h4"
                          style={{ color: "gray" }}
                        >
                          No file found
                        </h1>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="CVD-MainDiv-ContainDiv-Content-Card-Lower">
              {/* Employment Details */}
              <div className="CVD-MainDiv-ContainDiv-Content-Card">
                <h1 className="CVD-h5">Employment Details</h1>

                <div className="CVD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="CVD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div className="CVD-textcontain">
                        <label for="empname" className="CVD-label">
                          Name Of Employer
                        </label>
                        <h1 name="empname" className="CVD-h4">
                          {user?.nameofemployer}
                        </h1>
                      </div>

                      <div className="CVD-textcontain">
                        <label for="workexp" className="CVD-label">
                          Work Experience
                        </label>
                        <h1 name="workexp" className="CVD-h4">
                          {user?.workexp} Years
                        </h1>
                      </div>

                      <div className="CVD-textcontain">
                        <label for="Position" className="CVD-label">
                          Position
                        </label>
                        <h1 name="Position" className="CVD-h4">
                          {user?.position}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Right">
                    <div className="CVD-textcontain">
                      <label for="Contact" className="CVD-label">
                        Contact
                      </label>
                      <h1 name="Contact" className="CVD-h4">
                        {user?.employercontact}
                      </h1>
                    </div>

                    <div className="CVD-textcontain">
                      <label for="address" className="CVD-label">
                        Salary
                      </label>
                      <h1 name="address" className="CVD-h4">
                        ₹{user?.salary}/-
                      </h1>
                    </div>

                    <div className="CVD-textcontain">
                      <label for="salslip" className="CVD-label">
                        Salary Slip
                      </label>
                      <h1
                        name="salslip"
                        className="CVD-h4 text-decoration-underline"
                        onClick={() =>
                          user?.salaryslipimg == null
                            ? "no salaryslipimg image"
                            : openFileInNewTab(user?.salaryslipimg?.filename)
                        }
                      >
                        View File
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="CVD-MainDiv-ContainDiv-Content-Card">
                <h1 className="CVD-h5">Loan Details</h1>

                <div className="CVD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="CVD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div className="CVD-textcontain">
                        <label for="loantype" className="CVD-label">
                          Loan Type
                        </label>
                        <h1 name="loantype" className="CVD-h4">
                          {user.loantype}
                        </h1>
                      </div>

                      <div className="CVD-textcontain">
                        <label for="loanpurpose" className="CVD-label">
                          Purpose Of Loan
                        </label>
                        <h1 name="loanpurpose" className="CVD-h4">
                          {user.loanpurpose}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="CVD-MainDiv-ContainDiv-Content-Card-Right">
                    <div className="CVD-textcontain">
                      <label for="loanamount" className="CVD-label">
                        Amount Required
                      </label>
                      <h1 name="loanamount" className="CVD-h4">
                        ₹{user.loanamount}/-
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!user.loanverification && (
              <div className="CVD-MainDiv-ContainDiv-Content-Card-Button">
                <button className="CVD-button1" onClick={CancelbuttonOnClick}>
                  Cancel
                </button>
                <button className="CVD-button2" onClick={VerifybuttonOnClick}>
                  Verify
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClerkViewDetails;
