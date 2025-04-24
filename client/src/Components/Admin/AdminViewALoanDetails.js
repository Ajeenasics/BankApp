import React, { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate, useParams } from "react-router-dom";
import "../../Asserts/Styles/ManagerViewLoanDetails.css";
import AdminSidebar from "./AdminSidebar";

function AdminViewALoanDetails() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { data } = useParams();

  const GetUserData = async () => {
    try {
      const response = await axiosInstance.post(
        `/viewonenonapprovedloan/${data}`
      );
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setUser(response.data.data[0]);
      } else {
        console.error("Unexpected API response structure.");
      }
      console.log("API Response:", response.data.data);
    } catch (error) {
      // alert("Failed to fetch user details. Please try again.");
      console.error("Error fetching user data:", error);
    }
  };



  const openFileInNewTab = (filePath) => {
    window.open(`${imgurl}/${filePath}`, "_blank");
  };


  useEffect(() => {
    GetUserData();
  }, [data]);


  return (
    <div className="MVLD-MainDiv">
     

      <div className="MVLD-MainDiv-ContainDiv">
        <div>
          <AdminSidebar />
        </div>

        <div className="MVLD-MainDiv-ContainDiv-ContentDiv">
          <div className="MVLD-MainDiv-ContainDiv-HeaderDiv">
            <h1 className="MVLD-h1">View</h1>
            <h1 className="MVLD-h2">Details</h1>
          </div>

          <div className="MVLD-MainDiv-ContainDiv-Content">
            <div>
              <img
                className="MVLD-profile-img"
                src={`${imgurl}/${user?.userid?.userPicture?.originalname}`}
                alt="PROFILE"
              />
            </div>

            <div>
              <h1 className="MVLD-h3">{user?.userid?.username}</h1>
            </div>

            <div className="MVLD-MainDiv-ContainDiv-Content-Card-Upper">
              {/* Personal Details */}
              <div className="MVLD-MainDiv-ContainDiv-Content-Card">
                <h1 className="MVLD-h5">Personal Details</h1>

                <div className="MVLD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="MVLD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="MVLD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div classname="MVLD-txt-contain">
                        <label for="email" className="MVLD-label">
                          E-mail
                        </label>
                        <h1 name="email" className="MVLD-h4">
                          {user?.userid?.userMail}
                        </h1>
                      </div>

                      <div classname="MVLD-txt-contain">
                        <label for="DOB" className="MVLD-label">
                          Date Of Birth
                        </label>
                        <h1 name="DOB" className="MVLD-h4">
                          {new Date(user?.userid?.userDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="MVLD-MainDiv-ContainDiv-Content-Card-Right">
                    <div classname="MVLD-txt-contain">
                      <label for="Contact" className="MVLD-label">
                        Contact
                      </label>
                      <h1 name="Contact" className="MVLD-h4">
                        {user?.userid?.userContact}
                      </h1>
                    </div>

                    <div classname="MVLD-txt-contain">
                      <label for="address" className="MVLD-label">
                        Address
                      </label>
                      <h1 name="address" className="MVLD-h4">
                        {user?.userid?.userAddress}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity */}
              <div className="MVLD-MainDiv-ContainDiv-Content-Card">
                <h1 className="MVLD-h5">Identity</h1>

                <div className="MVLD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="MVLD-MainDiv-ContainDiv-Content-Card-Left">
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
                          className="CVD-h4 text-decoration-underline
"
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

            <div className="MVLD-MainDiv-ContainDiv-Content-Card-Lower">
              {/* Employment Details */}
              <div className="MVLD-MainDiv-ContainDiv-Content-Card">
                <h1 className="MVLD-h5">Employment Details</h1>

                <div className="MVLD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="MVLD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="MVLD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div classname="MVLD-txt-contain">
                        <label for="empname" className="MVLD-label">
                          Name Of Employer
                        </label>
                        <h1 name="empname" className="MVLD-h4">
                          {user?.nameofemployer}
                        </h1>
                      </div>

                      <div classname="MVLD-txt-contain">
                        <label for="workexp" className="MVLD-label">
                          Work Experience
                        </label>
                        <h1 name="workexp" className="MVLD-h4">
                          {user?.workexp} Years
                        </h1>
                      </div>

                      <div classname="MVLD-txt-contain">
                        <label for="Position" className="MVLD-label">
                          Position
                        </label>
                        <h1 name="Position" className="MVLD-h4">
                          {user?.position}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="MVLD-MainDiv-ContainDiv-Content-Card-Right">
                    <div classname="MVLD-txt-contain">
                      <label for="Contact" className="MVLD-label">
                        Contact
                      </label>
                      <h1 name="Contact" className="MVLD-h4">
                        {user?.employercontact}
                      </h1>
                    </div>

                    <div classname="MVLD-txt-contain">
                      <label for="address" className="MVLD-label">
                        Salary
                      </label>
                      <h1 name="address" className="MVLD-h4">
                        ₹{user?.salary}/-
                      </h1>
                    </div>

                    <div classname="MVLD-txt-contain">
                      <label for="salslip" className="MVLD-label">
                        Salary Slip
                      </label>
                      <h1 name="salslip" className="MVLD-h4 text-decoration-underline">
                        View File
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="MVLD-MainDiv-ContainDiv-Content-Card">
                <h1 className="MVLD-h5">Loan Details</h1>

                <div className="MVLD-MainDiv-ContainDiv-Content-Card-Contain">
                  <div className="MVLD-MainDiv-ContainDiv-Content-Card-Left">
                    <div className="MVLD-MainDiv-ContainDiv-Content-Card-Left-Details">
                      <div classname="MVLD-txt-contain">
                        <label for="loantype" className="MVLD-label">
                          Loan Type
                        </label>
                        <h1 name="loantype" className="MVLD-h4">
                          {user?.loantype}
                        </h1>
                      </div>

                      <div classname="MVLD-txt-contain">
                        <label for="loanpurpose" className="MVLD-label">
                          Purpose Of Loan
                        </label>
                        <h1 name="loanpurpose" className="MVLD-h4">
                          {user?.loanpurpose}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="MVLD-MainDiv-ContainDiv-Content-Card-Right">
                    <div classname="MVLD-txt-contain">
                      <label for="loanamount" className="MVLD-label">
                        Amount Required
                      </label>
                      <h1 name="loanamount" className="MVLD-h4">
                        ₹{user?.loanamount}/-
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );

}
export default AdminViewALoanDetails;
