import React from "react";
import logo from "../../Asserts/images/Logo.png";
import "../../Asserts/Styles/LandingPage.css";
function LandingFooter() {
  return (
    <div className="bg-dark">
      <div className="row p-5">
        <div className="col">
          <img src={logo}></img>
        </div>
        <div className="col ">
          <div className="maincolor">Bank Accounts</div>
          <div className="text-light mt-3">Service Quality Information</div>
          <div className="text-light mt-3">About Us</div>
        </div>
        <div className="col">
          {" "}
          <div className="maincolor">More Product</div>
          <div className="text-light mt-3">Loan and Savings</div>
          <div className="text-light mt-3">Insurance</div>
          <div className="text-light mt-3">Bill Payment</div>
          <div className="text-light mt-3">Credit Cards</div>
        </div>
        <div className="col">
          <div className="maincolor">Customer Service</div>{" "}
          <div className="text-light mt-3">FAQ</div>
          <div className="text-light mt-3">Feedback</div>
          <div className="text-light mt-3">Complaints</div>
        </div>
        <div className="col">
          <div className="maincolor ">Contact Us</div>{" "}
          <div className="text-light mt-3">Need Help?</div>
          <div className="text-light mt-3">+91 8765454323</div>
          <div className="text-light mt-3">
            John Doe, 456 Elm Street,<br></br> Suite 3, Los Angeles, CA{" "}
            <br></br>90001.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingFooter;
