import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { GoDotFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import UserNavbar from "../User/UserNavbar";
import creditcardgirl from "../../Asserts/images/image 56.png";
import Applaynow from "../../Asserts/images/ApplyNowBTN.png";
import "../../Asserts/Styles/creaditcardapply.css";
import LandingFooter from "../Main/LandingFooter";
import "../../Asserts/Styles/customerLifeinsurance.css";
import applyinsurance from "../../Asserts/images/applybtnlifecard.png";
import axiosInstance from "../../apis/axiosinstance";
import imgurl from "../../apis/imgURL";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function CustomerApplyLifeInsurance() {
  const [insurance, setInsurance] = useState([]);

  const applayref = useRef();

  const handleLoanApply = () => {
    applayref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  const ApplicationData = async () => {
    try {
      const response = await axiosInstance.post("/viewallinsuranceapplication");
      const allPlans = response.data.data;

      // Fetch applied insurance plans
      const userDataResponse = await axiosInstance.post(
        `/viewapplyinsuranceapplicationbyuserid/${localStorage.getItem(
          "userid"
        )}`
      );
      const appliedPlans = userDataResponse.data.data || [];

      // Extract applied plan IDs
      const appliedPlanIds = new Set(
        appliedPlans.map((plan) => plan.planid?._id)
      );

      // Filter out applied plans
      const availablePlans = allPlans.filter(
        (plan) => !appliedPlanIds.has(plan._id)
      );

      setInsurance(availablePlans);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const navigate = useNavigate();

  const handleApplyAPlan = (planid) => {
    navigate("/user/applyllifeinsurancedetails/"+planid);
  };
  
  const [user, setUser] = useState(null);
  const GetUserData = async () => {
    const data = localStorage.getItem("userid");

    try {
      const response = await axiosInstance.post(
        `/viewapplyinsuranceapplicationbyuserid/${data}`
      );
      console.log("resp-resp", response);
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setUser(response.data.data);
      } else {
        console.error("Unexpected API response structure.");
        setUser(null);
      }
      console.log("API resp", response.data.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    ApplicationData();
    GetUserData();
  }, [insurance]);


  return (
    <div>
      <UserNavbar />
      <div className="custloanapplysection1">
        <div className="custloanapplysection1pt1">
        <button
          className="btn btn-light"
          type="button"
          onClick={UserbackButton}
        >
          <FaArrowLeft />
        </button>
          <div className="row">
            <div className="col-4">
              <div className="custloanapplysection1pt1col1">
                <br />
                <br />
                <br />
                <br />
                <br />
                <p id="custloanapplysection1pt1col1p1">
                  Start Your Application Today:
                </p>
                <p id="custloanapplysection1pt1col1p2">
                  Apply in just a few <br />
                  minutes and enjoy peace <br />
                  of mind!
                </p>
                <div onClick={handleLoanApply} style={{ cursor: "pointer" }}>
                  <img src={Applaynow} alt="Apply Now Button" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <img src={creditcardgirl} id="custloanapplyimg" alt="Customer" />
            </div>

            <div className="col-4">
              <div className="custloanapplysection1pt1col2">
                <br />
                <br />
                <br />
                <GoDotFill className="custloanapplysection1radiobtn" />
                <label>&nbsp;Affordable Premiums</label>
                <br />
                <GoDotFill className="custloanapplysection1radiobtn" />
                <label>&nbsp; Flexible Coverage </label>
                <br />
                <GoDotFill className="custloanapplysection1radiobtn" />
                <label>&nbsp;Secure transactions</label>
                <br />
                <GoDotFill className="custloanapplysection1radiobtn" />
                <label>&nbsp;Affordable Tax Benefits </label>
                <br />
                <GoDotFill className="custloanapplysection1radiobtn" />
                <label>&nbsp; Match your spending needs </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section2 start */}

      <div
        className="custcreditstatussect3 mb-5"
        style={{ backgroundColor: "#f5f2f7" }}
      >
        <br />
        <br />
        {user && (
          <div className="custcreditstatussect2">
            <br />
            <br />
            <div className="custcreditstatussect2pt2">
              <br />
              <center>
                <h3 id="custcreditstatussect2h3">Application Status</h3>
              </center>
              <br />
              <br />
              <div className="custcreditstatussect2formborder1">
                <div className="custcreditstatussect2formpt1">
                  <table>
                    <tbody>
                      <tr>
                        <th className="custcreditstatussect2formth">
                          <label className="custcreditstatussect2datalabel">
                            Name
                          </label>
                        </th>
                        <th className="custcreditstatussect2formth">
                          <label className="custcreditstatussect2datalabel">
                            Contact
                          </label>
                        </th>
                        <th className="custcreditstatussect2formth">
                          <label className="custcreditstatussect2datalabel">
                            planid
                          </label>
                        </th>
                        <th className="custcreditstatussect2formth">
                          <label className="custcreditstatussect2datalabel">
                            Coverage Amount
                          </label>
                        </th>
                        <th className="custcreditstatussect2formth">
                          <label className="custcreditstatussect2datalabel">
                            Policy Term
                          </label>
                        </th>
                        <th className="custcreditstatussect2formth">
                          <label className="custcreditstatussect2datalabel">
                            Payment Frequency
                          </label>
                        </th>
                      </tr>

                      {user?.length > 0 ? (
                        user?.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td className="custcreditstatussect2formtd">
                                {data?.userid?.username}
                              </td>
                              <td className="custcreditstatussect2formtd">
                                {data?.userid?.userContact}
                              </td>
                              <td className="custcreditstatussect2formtd">
                                {data?.planid?.planname}
                              </td>
                              <td className="custcreditstatussect2formtd">
                                {data?.planid?.coverageamount}
                              </td>
                              <td className="custcreditstatussect2formtd">
                                {data?.planid?.policyterm}
                              </td>
                              <td className="custcreditstatussect2formthonerow">
                                <p className="CACC-p">
                                  <GoDotFill className="custcreditstatusradiobtn" />
                                  {data.approvalstatus}
                                </p>
                              </td>

                              <td className="custcreditstatussect2formthonerow">
                                <p
                                  className="CACC-p-link"
                                  onClick={() =>
                                    navigate(
                                      `/user/applyedllifeinsurancedetails/${data?._id}`
                                    )
                                  }
                                >
                                  View More
                                </p>
                              </td>
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
              <br />
            </div>
            <br />
          </div>
        )}
        <div className="custcreditstatussect3pt3">
          <br />
          <center>
            <h4>LIFE INSURANCE</h4>
            <br />
            <br />
            <h3 id="custcreditstatussect3h3">
              "Secure Your Future with Our Life Insurance Plans”
            </h3>
          </center>
          <br />
          <div className="custcreditstatussect3pt3details">
            <p>
              Apply for life insurance effortlessly and secure your loved ones'
              future. Our simple, step-by-step process ensures quick application
              and transparent policy options. Start today and gain peace of mind
              for tomorrow.
            </p>
            <br />
            <center>
              <div
                ref={applayref}
                onClick={handleLoanApply}
                style={{ cursor: "pointer" }}
              >
                <img src={Applaynow} alt="Apply Now Button" />
              </div>
            </center>
            <br />
            <br />
          </div>
        </div>
        <br />
        <br />
        <div className="container">
          <div className="row">
            {insurance.length>0 ? insurance.map((data, index) => (
              <div className="col-md-4 mb-5" key={index}>
                <div className="lifeinsuarancecard">
                  <div className="details">
                    <div className="row">
                      <div className="col-6">
                        {" "}
                        <GoDotFill className="custloanapplysection1radiobtn" />
                        <span id="custcreditstatussect3h3">
                          &nbsp; Coverage Amount{" "}
                          <div className="ms-4">₹{data?.coverageamount}/-</div>
                        </span>
                        <div className="mt-3">
                          <GoDotFill className="custloanapplysection1radiobtn" />
                          <span id="custcreditstatussect3h3">
                            {" "}
                            &nbsp; {data?.policyterm} /{" "}
                            <div className="ms-4">{data?.paymentfrequency}</div>
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <img
                          style={{ width: "130px", height: "100px" }}
                          src={`${imgurl}/${data?.planimage?.filename}`}
                        ></img>
                      </div>
                    </div>
                  </div>

                  <h2 id="custcreditstatussect3h3" className="mt-3 ms-3">
                    {data.planname}
                  </h2>

                  <p className="amount ms-3" id="custcreditstatussect3h3">
                    Amount to be paid: ₹{data?.amounttobepaid}/-
                  </p>
                  <p className="description ms-3">{data?.description}</p>
                  <button type="button"
                    onClick={() => {
                      handleApplyAPlan(data._id);
                    }}
                  >
                    <img src={applyinsurance}></img>
                  </button>
                </div>
                <div></div>
              </div>
            )):<h6 classname="text-center"> Currently No Insurance Available</h6>}
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}

export default CustomerApplyLifeInsurance;
