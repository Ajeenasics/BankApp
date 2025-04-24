import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imgurl from "../../apis/imgURL";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/ClerkViewCardDetails.css";
import LandingFooter from "../Main/LandingFooter";
import ClerkSideBar from "./ClerkSideBar";

function ClerkViewCardDetails() {
  const [user, setUser] = useState(null);
  const { data } = useParams();

  const navigate = useNavigate();

  const openFileInNewTab = (filePath) => {
    window.open(`${imgurl}/${filePath}`, "_blank");
  };

  const CancelbuttonOnClick = () => {
    navigate("/clerk/managecreditcard");
  };

  const VerifybuttonOnClick = async () => {
    try {
      await axiosInstance.post(`/verifyingcreditapplication/${user._id}`);
      alert("Application Verified Successfully");
      navigate("/clerk/managecreditcard");
    } catch (error) {
      console.error("Error verifying Application:", error);
    }
  };

  const GetUserData = async () => {
    try {
      const response = await axiosInstance.post(
        `/viewonecreditapplication/${data}`
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

  useEffect(() => {
    GetUserData();
  }, []);

  return (
    <div className="CVCD-MainDiv">
      {console.log("user", user)}
      <div>
        <ClerkSideBar />
      </div>
      <div className="CVCD-MainDiv-ContainDiv">
        <div className="CVCD-MainDiv-ContainDiv-ContentDiv">
          <div className="CMCC-MainDiv-ContainDiv-HeaderDiv">
            <h1 className="CMCC-h1">View </h1>
            <h1 className="CMCC-h2">Details</h1>
          </div>

          <div className="CVCD-MainDiv-ContainDiv-Content">
            <div>
              <img
                className="CVCD-profile-img"
                src={`${imgurl}/${user?.userid?.userPicture?.originalname}`}
                alt="PROFILE"
              />
            </div>

            <div>
              <h1 className="CVCD-h3">{user?.userid?.username}</h1>
            </div>

            <div className="CVCD-MainDiv-ContainDiv-Content-Card-Upper">
              {/* Personal Details */}
              <div className="CVCD-MainDiv-ContainDiv-Content-Card">
                <h1 className="CVCD-h5">Personal Details</h1>

                <div className="CVCD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div className="CVCD-textcontain">
                        <label for="email" className="CVCD-label">
                          E-mail
                        </label>
                        <h1 name="email" className="CVCD-h4">
                          {user?.userid?.userMail}
                        </h1>
                      </div>

                      <div className="CVCD-textcontain">
                        <label for="DOB" className="CVCD-label">
                          Date Of Birth
                        </label>
                        <h1 name="DOB" className="CVCD-h4">
                          {new Date(user?.userid?.userDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </h1>
                      </div>

                      <div className="CVCD-textcontain">
                        <label for="email" className="CVCD-label">
                          PAN Card Number
                        </label>
                        <h1 name="email" className="CVCD-h4">
                          {user?.pancardnumber}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="CVCD-MainDiv-ContainDiv-Content-Card-Right">
                    <div className="CVCD-textcontain">
                      <label for="Contact" className="CVCD-label">
                        Contact
                      </label>
                      <h1 name="Contact" className="CVCD-h4">
                        {user?.userid?.userContact}
                      </h1>
                    </div>

                    <div className="CVCD-textcontain">
                      <label for="address" className="CVCD-label">
                        Address
                      </label>
                      <h1 name="address" className="CVCD-h4">
                        {user?.userid?.userAddress}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Detail */}
              <div className="CVCD-MainDiv-ContainDiv-Content-Card">
                <h1 className="CVCD-h5">Card Details</h1>

                <div className="CVCD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="CVCD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div className="CVCD-textcontain">
                        <label for="email" className="CVCD-label">
                          Card Type
                        </label>
                        <h1 name="email" className="CVCD-h4">
                          {user?.cardtype}
                        </h1>
                      </div>

                      <div className="CVCD-textcontain">
                        <label for="email" className="CVCD-label">
                          Salary
                        </label>
                        <h1 name="email" className="CVCD-h4">
                          ₹{user?.salary}/-
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="CVCD-MainDiv-ContainDiv-Content-Card-Right">
                    <div className="CVCD-textcontain">
                      <label for="email" className="CVCD-label">
                        Credit Card Limit
                      </label>
                      <h1 name="email" className="CVCD-h4">
                        ₹{user?.creditcardlimit}/-
                      </h1>
                    </div>

                    <div className="CVCD-textcontain">
                      <label htmlFor="dl" className="CVCD-label">
                        ID Proof
                      </label>
                      {user?.idproof?.filename ? (
                        <h1
                          name="dl"
                          className="CVCD-h4"
                          onClick={() =>
                            openFileInNewTab(user?.idproof?.filename)
                          }
                        >
                          View File
                        </h1>
                      ) : (
                        <h1
                          name="dl"
                          className="CVCD-h4"
                          style={{ color: "gray" }}
                        >
                          No file found
                        </h1>
                      )}
                    </div>

                    <div className="CVCD-textcontain">
                      <label for="incomeproof" className="CVCD-label">
                        Income Proof
                      </label>
                      {user?.incomeproof?.filename ? (
                        <h1
                          name="incomeproof"
                          className="CVCD-h4"
                          onClick={() =>
                            openFileInNewTab(user?.incomeproof?.filename)
                          }
                        >
                          View File
                        </h1>
                      ) : (
                        <h1
                          name="passport"
                          className="CVCD-h4"
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

            {!user?.verificationstatus && (
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

export default ClerkViewCardDetails;
