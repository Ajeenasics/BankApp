import React, { useEffect, useState } from "react";
import "../../Asserts/Styles/CustomerBillPayment.css";
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import axiosInstance from "../../apis/axiosinstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function CustomerMobileRecharge() {
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [rechargePlans, setRechargePlans] = useState([]);
  const [operators, setOperators] = useState([]);
  const [numberdata, setNumberdata] = useState("");
  const [isChecked,setIsChecked]=useState()
  const [error, setError] = useState("");
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();

  // Validation for mobile number
  const validateMobileNumber = (value) => {
    if (!value || value.length !== 10 || isNaN(value)) {
      return "Mobile number must be exactly 10 numeric digits.";
    }
    return "";
  };
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  // Fetch recharge plans
  const fetchMobileRechargePlans = () => {
    axiosInstance
      .post("/mobilerechargeplanview")
      .then((response) => {
        const plans = response.data.data;
        setRechargePlans(plans);

        // Extract unique operators
        const uniqueOperators = [
          ...new Set(plans.map((plan) => plan.operator)),
        ];
        setOperators(uniqueOperators);
      })
      .catch((err) => {
        console.error("Error fetching recharge plans:", err);
      });
  };

  useEffect(() => {
    fetchMobileRechargePlans();
  }, []);

  const handleOperatorChange = (e) => {
    setSelectedOperator(e.target.value);
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumberdata(value);
    setError(validateMobileNumber(value));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = () => {
    if (!selectedOperator || !numberdata || error) {
      alert("Please ensure all fields are correctly filled.");
      return;
    }

    const today = new Date();
    const paymentData = {
      mobileNumber: numberdata,
      operator: selectedOperator,
      planId: selectedPlan._id,
      amount: selectedPlan.planamount,
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      userid: userid,
    };

    axiosInstance
      .post("/mobileRechargePayment", paymentData)
      .then((response) => {
        alert(response.data.msg);
        navigate("/user/billpayment");
      })
      .catch((error) => {
        console.error("Error during payment:", error);
        alert(
          error.response?.data?.msg ||
            "Failed to process payment. Please try again."
        );
      });
  };

  const filteredPlans = rechargePlans.filter(
    (plan) => plan.operator === selectedOperator
  );

  return (
    <div style={{ minHeight: "50vh" }}>
      {!selectedPlan ? (
        <>
          <h4 className="text-center text-purple mb-4">Mobile Recharge</h4>

          <div className="row mt-3 d-flex justify-content-center">
            <div className="col-md-4">
              <label className="fw-bold">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                className={`form-control ${error ? "is-invalid" : ""}`}
                placeholder="Enter Mobile Number"
                value={numberdata}
                onChange={handleNumberChange}
              />
              {error && <div className="text-danger mt-1">{error}</div>}
            </div>

            <div className="col-md-4">
              <label className="fw-bold">Select Operator</label>
              <select
                className="form-control"
                value={selectedOperator}
                onChange={handleOperatorChange}
              >
                <option value="">Select Operator</option>
                {operators.map((operator, index) => (
                  <option key={index} value={operator}>
                    {operator}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedOperator && (
            <div className="container py-5">
              <div className="row justify-content-center">
                {filteredPlans.map((plan, index) => (
                  <div key={index} className="col-md-6 col-lg-4 m-2">
                    <div className="plan-card p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <div className="price fw-bold">
                            ₹{plan.planamount}
                          </div>
                          <div className="feature">Unlimited Calls</div>
                        </div>
                        <div>
                          <div className="price fw-bold">{plan.plandata}</div>
                          <div className="feature">Per Day</div>
                        </div>
                        <div>
                          <div className="price fw-bold">
                            {plan.planvalidity}
                          </div>
                          <div className="feature">Validity</div>
                        </div>
                      </div>
                      <div
                        className="unlimited card-footer d-flex justify-content-between mt-4 text-muted"
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {plan.operator}
                        <div className="text-dark">
                          <IoIosArrowForward />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="pay-now-container">
          <h4 className="text-center text-purple">Pay Now</h4>
          <div className="card pay-now-card m-auto rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-bold">{numberdata}</div>
                  <p>Prepaid | {selectedOperator}</p>
                </div>
                <div>
                  <div className="fw-bold">₹{selectedPlan.planamount}/-</div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="text-muted mt-2">
                  <div>{selectedPlan.planvalidity} validity</div>
                  <p>Unlimited Calls • {selectedPlan.plandata}</p>
                </div>
                <div className="text-muted mt-2">{selectedPlan.benefits}</div>
              </div>
              <hr />
              <div className="text-muted mt-2">
                Amount Payable: ₹{selectedPlan.planamount}/-
              </div>
              <p>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              ></input>{" "}
              &nbsp;I have read and agree to the Terms and Conditions of
              Unicredit, including the payment policies and dispute resolution
              terms.
              <Link to="/user/termsandcondition" target="_blank">
                terms & conditions.
              </Link>{" "}
            </p>
              <button
                className="btn paynow-button mt-3 rounded-pill"
                onClick={handlePayment}
                disabled={!isChecked}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerMobileRecharge;
