import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";
import imgurl from "../../apis/imgURL";
import axiosInstance from "../../apis/axiosinstance";
import "../../Asserts/Styles/managerviewuserdetails.css";
import transaction from "../../Asserts/images/transactionbutton.png";
import AdminSidebar from "./AdminSidebar";
import { FaArrowLeft } from "react-icons/fa6";
function AdminviewUserDetails() {
  const [user, setUser] = useState({});
  const [creditcard, setCreditcard] = useState([]);
  const [loan, setLoan] = useState([]);
  const [lifeinsurance, setLifeinsurance] = useState([]);

  const { userid } = useParams();

  const getAData = () => {
    axiosInstance
      .get(`/view_a_user/${userid}`)
      .then((res) => {
        setUser(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {});
  };
  const getLoanData = () => {
    axiosInstance
      .get(`/viewloanbyuser/${userid}`)
      .then((res) => {
        setLoan(res.data.data);
        console.log(res.data.data);
      })
      .catch(() => {});
  };
  const getCreaditcardData = () => {
    axiosInstance
      .post(`/viewusercreditapplication/${userid}`)
      .then((res) => {
        setCreditcard(res.data.data);
        console.log(res.data.data, "creadit");
      })
      .catch(() => {});
  };

  const getLifeInsuranceData = () => {
    axiosInstance
      .post(`/viewapplyinsuranceapplicationbyuserid/${userid}`)
      .then((res) => {
        setLifeinsurance(res.data.data);
        console.log(res.data.data,"insurance");
      })
      .catch(() => {});
  };

  const openFileInNewTab = (filePath) => {
    window.open(`${imgurl}/${filePath}`, "_blank");
  };

  useEffect(() => {
    getAData();
    getLoanData();
    getCreaditcardData();
    getLifeInsuranceData();
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin") == null) {
      navigate("/adminlogin");
    }
  }, []);

  const moveToTransaction = (userid) => {
    navigate(`/admin/transactionhistory/${userid}`);
  };

  return (
    <div className="row">
      <div className="col-3">
        <AdminSidebar />
      </div>
      <div className="col-9">
        <div>
          <h3 className="ms-4">
          
            <span class="userdetailsview">VIEW</span>USER
          </h3>
          <div id="fullbody">
            <center>
              <img
                src={`${imgurl}/${user?.userPicture?.originalname}`}
                alt="PROFILE PIC"
                id="usedetailsprofilepic"
              />
              <h5 class="userdetailsview">{user?.username} </h5>
            </center>

            <div className="row">
              <div className="col-6 ms-4">
                {" "}
                <Card
                  style={{ width: "27rem" }}
                  id="personalDetails"
                  className="eachcard"
                >
                  <Card.Body>
                    <h5 className="cardlinks ">Personal Details</h5>
                    <div className="row">
                      <Card.Text className="col">
                        <label className="cardlabels">E-mail</label>
                        <p classname="carddetails">{user.userMail}</p>
                      </Card.Text>
                      <Card.Text className="col">
                        <label className="cardlabels">Contact</label>
                        <p className="carddetails">{user.userContact}</p>
                      </Card.Text>
                    </div>
                    <div className="row">
                      <Card.Text className="col">
                        <label className="cardlabels">Date od Birth </label>
                        <p className="carddetails">
                          {" "}
                          {new Date(user.userDate).toLocaleDateString("en-GB")}
                        </p>
                      </Card.Text>
                      <Card.Text className="col">
                        <label className="cardlabels">Address</label>
                        <p className="carddetails">{user.userAddress}</p>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-3">
                {creditcard?.length > 0 ? (
                  <Card style={{ width: "27rem" }} className="eachcard">
                    <Card.Body>
                      <Card.Title className=" userdetailsview cardtitle">
                        Creadit Card Details
                      </Card.Title>
                      <div className="row">
                        <Card.Text className="col">
                          <label className="cardlabels">Card Type</label>
                        </Card.Text>
                        <Card.Text className="col">
                          <label className="cardlabels">
                            Employment status{" "}
                          </label>
                        </Card.Text>
                        <Card.Text className="col">
                          <label className="cardlabels ms-5">
                            Creaditcard Limit
                          </label>
                        </Card.Text>
                        <Card.Text className="col">
                          <label className="cardlabels ms-5">
                            Income Proof
                          </label>
                        </Card.Text>
                      </div>
                      { creditcard?.map((data) => (
                        <div className="row">
                          <Card.Text className="col">
                            <p className="carddetails">{data?.cardtype}</p>
                          </Card.Text>
                          <Card.Text className="col">
                            <p className="carddetails">
                              {data?.employmentstatus}
                            </p>
                          </Card.Text>
                          <Card.Text className="col">
                            <p className="carddetails">
                              {data?.creditcardlimit}
                            </p>
                          </Card.Text>
                          <Card.Text className="col">
                            <p className="carddetails">
                              {data?.incomeproof?.filename ? (
                                <h1
                                  name="dl"
                                  className="CVCD-h4 text-decoration-underline"
                                  onClick={() =>
                                    openFileInNewTab(
                                      data?.incomeproof?.filename
                                    )
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
                            </p>
                          </Card.Text>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                ) : (
                  <div> No Credit Card </div>
                )}{" "}
              </div>
            </div>

            <div id="cardfullbody">
              <div className="row">
                <div className="col">
                  <div className="col"></div>
                </div>

                <div className="row py-5 ">
                  <div className="col-6 ms-3">
                    {loan?.length > 0 ? (
                      <Card style={{ width: "27rem" }} className="eachcard">
                        <Card.Body>
                          <Card.Title className=" userdetailsview cardtitle">
                            Loan Details
                          </Card.Title>
                          <div className="row">
                            <Card.Text className="col">
                              <label className="cardlabels">Loan Type</label>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels">
                                Purpose of Loan{" "}
                              </label>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels ms-5">
                                Amount Sanctioned
                              </label>
                            </Card.Text>
                          </div>

                          {loan?.map((data) => (
                            <div className="row">
                              <Card.Text className="col">
                                <p className="carddetails">{data?.loantype}</p>
                              </Card.Text>
                              <Card.Text className="col">
                                <p className="carddetails">
                                  {data?.loanpurpose}
                                </p>
                              </Card.Text>
                              <Card.Text className="col">
                                <p className="carddetails">
                                  {data?.loanamount}
                                </p>
                              </Card.Text>
                            </div>
                          ))}
                        </Card.Body>
                      </Card>
                    ) : (
                      <div>No Loan You Have</div>
                    )}
                  </div>
                  <div className="col-3">
                    {lifeinsurance?.length > 0 ? (
                      <Card style={{ width: "27rem" }} className="eachcard">
                        <Card.Body>
                          <Card.Title className=" userdetailsview cardtitle">
                            Life Insurance Details
                          </Card.Title>
                          <div className="row">
                            <Card.Text className="col">
                              <label className="cardlabels">Insurance Plan</label>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels">
                                Coverage amount
                              </label>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels ms-5">
                               Policy Term
                              </label>
                            </Card.Text>
                            <Card.Text className="col">
                              <label className="cardlabels ms-5">
                               Payment Frequency
                              </label>
                            </Card.Text>
                          </div>
                          {lifeinsurance?.map((data) => (
                            <div className="row">
                              <Card.Text className="col">
                                <p className="carddetails">{data?.planid?.planname}</p>
                              </Card.Text>
                              <Card.Text className="col">
                                <p className="carddetails">
                                  {data?.planid?.coverageamount}
                                </p>
                              </Card.Text>
                              <Card.Text className="col">
                                <p className="carddetails">
                                  {data?.planid?.policyterm}
                                </p>
                              </Card.Text>
                              <Card.Text className="col">
                                <p className="carddetails">
                                 {data?.planid?.paymentfrequency}
                                </p>
                              </Card.Text>
                            </div>
                          ))}
                        </Card.Body>
                      </Card>
                    ) : (
                      <div> No insurance available </div>
                    )}{" "}
                  </div>
                </div>
                <div
                  className="text-center p-4"
                  onClick={() => moveToTransaction(user._id)}
                >
                  <img src={transaction}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminviewUserDetails;
