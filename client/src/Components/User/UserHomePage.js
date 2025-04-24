import React, { useEffect } from "react";
import "../../Asserts/Styles/user.css";
import userhome from "../../Asserts/images/userhome.png";
import img1 from "../../Asserts/images/image 10 (1).png";
import img2 from "../../Asserts/images/image 8.png";
import img3 from "../../Asserts/images/image 11 (1).png";
import img4 from "../../Asserts/images/image 9.png";
import carousal1 from "../../Asserts/images/Component 1 (1).png";
import carousal2 from "../../Asserts/images/frame 2.png";
import carousal3 from "../../Asserts/images/frame 3 (1).png";
import flowchart from "../../Asserts/images/Flow diagram.png";
import profile from "../../Asserts/images/profile.png";
import star from "../../Asserts/images/Star (1).png";
import LandingFooter from "../Main/LandingFooter";
import UserNavbar from "./UserNavbar";
import arrowimg from "../../Asserts/images/basil_arrow-up-outline.png";
import { Link, useNavigate } from "react-router-dom";
import gold from "../../Asserts/images/goldcredit.png"
import platinum from "../../Asserts/images/platinumcred.png"

function UserHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userid") == null) {
      navigate("/user/login");
    }
  }, []);
  const UserbackButton = () => {
    if (window.location.pathname === "/bank_app/user/homepage") {
      navigate("/user/homepage");
    } else {
      navigate(-1);
    }
  };
  return (
    <div>
      <UserNavbar />
      <div className="userHome">
        <img className="userHomeimg" src={userhome}></img>
      </div>
      <section className="container mt-5">
        <div className="row mt-5">
          <div className="col-6">
            <img src={img1}></img>
          </div>
          <div className="col-6">
            <p className="mt-4">Loans and Savings</p>
            <h5 className="userhomeclr">
              "Turn Your Dreams into Reality with Easy Loans – Car, Home,
              Personal!"
            </h5>
            <p className="mt-5">
              We offer a variety of loans tailored to your needs, including Car
              Loans, Home Loans, and Personal Loans. Whether you're financing a
              dream car, purchasing a new home, or needing personal funding, our
              flexible terms and competitive interest rates ensure you get the
              best deal. Manage your loan easily with online tracking, quick
              approvals, and convenient repayment options.
            </p>
            <Link to={"/user/applyloan"} className="userhomeclr mt-3">
              Apply Now{" "}
              <span>
                <img src={arrowimg}></img>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mt-5">
        <div className="row mt-5">
          <div className="col-6">
            <p className="mt-4">Insurance</p>
            <h5 className="userhomeclr">
              "Protect Your Future Today – Health & Life Insurance Made Simple!"
            </h5>
            <p className="mt-5">
              Protect what matters most with our comprehensive Health and Life
              Insurance plans. Our health insurance covers medical expenses,
              hospitalization, and preventive care, while life insurance ensures
              financial security for your loved ones. Enjoy peace of mind with
              affordable premiums and customizable coverage options, designed to
              keep you and your family protected.
            </p>
            <Link to="/user/applyllifeinsurance" className="userhomeclr mt-3">
              View Plan
              <span>
                <img src={arrowimg}></img>
              </span>
            </Link>
          </div>
          <div className="col-5 ms-5">
            <img className="ms-5" src={img2}></img>
          </div>
        </div>
      </section>
      <section className="container mt-5">
        <div className="row mt-5">
          <div className="col-6">
            <img src={img3}></img>
          </div>
          <div className="col-6">
            <p className="mt-4">Bill Payment</p>
            <h5 className="userhomeclr">
              "Stay Powered, Stay Connected – Hassle-Free Bill Payments in
              Seconds!"
            </h5>
            <p className="mt-5">
              Pay your electricity, water, and mobile recharge bills hassle-free
              with our streamlined bill payment services. Make instant payments
              securely from anywhere, ensuring you're never late on essential
              utilities. Set up automatic payments or receive reminders to stay
              on top of your bills effortlessly.
            </p>
            <Link to={"/user/billpayment"} className="userhomeclr mt-3">
              Pay Now{" "}
              <span>
                <img src={arrowimg}></img>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mt-5">
        <div className="row mt-5">
          <div className="col-6">
            <p className="mt-4">Credit Card</p>
            <h5 className="userhomeclr">
              "Swipe, Save, and Earn – Get the Perfect Credit Card for Your
              Lifestyle!"
            </h5>
            <p className="mt-5">
              Explore our specialized credit card options for travel, petrol,
              and food purchases. Enjoy rewards and cashback benefits on every
              transaction, whether you're filling up your tank, dining out, or
              booking flights. Choose the card that suits your lifestyle and
              manage your credit conveniently through our user-friendly portal.
            </p>
            <Link to={"/user/applylcreaditcard"} className="userhomeclr mt-3">
              Apply Now
              <span>
                <img src={arrowimg}></img>
              </span>
            </Link>
          </div>
          <div className="col-5 ms-5">
            <img className="ms-5" src={img4}></img>
          </div>
        </div>
      </section>
      <section>
  <div className="container">
    <h4>Credit Cards</h4>
      <div className="row text-center">
        <div className="col-6 d-flex flex-column align-items-center">
          <img className="card w-75 h-75 mx-auto d-block" src={gold} alt="Gold Card" />
          <h3>Gold</h3>
        </div>
        <div className="col-6 d-flex flex-column align-items-center">
          <img className="card w-75 h-75 mx-auto d-block" src={platinum} alt="Platinum Card" />
          <h3>Platinum</h3>
        </div>
      </div>
    </div>
</section>
{/*<section className="container">
<h4>Types of Loan</h4>
<div className="row p-3">
<div className="col card p-5 text-center">Home Loan</div>
<div className="col card  p-5 text-center">Car Loan</div>
<div className="col card  p-5 text-center">Personal Loan</div>
</div></section>
*/}

      <section>
        <div class="slider">
          <img src={carousal1} class="slider-image" alt="Image 1"></img>
          <img src={carousal2} class="slider-image" alt="Image 2"></img>
          <img src={carousal3} class="slider-image" alt="Image 3"></img>
        </div>
      </section>

      <section className="container mt-5">
        <div class="slider2">
          <label class="slider-content">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-1">
                {" "}
                <img src={profile}></img>
              </div>
              <div className="col-5">
                <h3>Kavin Kirshana</h3>
                <small>
                  <p>1 review</p>
                </small>
                <img src={star}></img> <small>2 months ago</small>
              </div>
              <p className="">
                "I've been banking with UniCredit for years now, and their
                online platform has consistently exceeded my expectations! The
                user interface is intuitive, navigation is seamless, and
                features like mobile banking, instant transfers, and
                personalized financial insights make managing my finances a
                breeze{" "}
              </p>
            </div>{" "}
          </label>
          <label class="slider-content">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-1">
                {" "}
                <img src={profile}></img>
              </div>
              <div className="col-5">
                <h3>Samuel Sam</h3>
                <small>
                  <p>1 review</p>
                </small>
                <img src={star}></img> <small>2 months ago</small>
              </div>
              <p>
                "I've been banking with UniCredit for years now, and their
                online platform has consistently exceeded my expectations! The
                user interface is intuitive, navigation is seamless, and
                features like mobile banking, instant transfers, and
                personalized financial insights make managing my finances a
                breeze{" "}
              </p>
            </div>{" "}
          </label>
          <label class="slider-content">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-1">
                {" "}
                <img src={profile}></img>
              </div>
              <div className="col-5">
                <h3>Manu Satheesh</h3>
                <small>
                  <p>1 review</p>
                </small>
                <img src={star}></img> <small>2 months ago</small>
              </div>
              <p>
                "I've been banking with UniCredit for years now, and their
                online platform has consistently exceeded my expectations! The
                user interface is intuitive, navigation is seamless, and
                features like mobile banking, instant transfers, and
                personalized financial insights make managing my finances a
                breeze{" "}
              </p>
            </div>{" "}
          </label>
        </div>
      </section>
      <LandingFooter />
    </div>
  );
}

export default UserHomePage;
