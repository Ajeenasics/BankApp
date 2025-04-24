import React from "react";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";
import section1 from "../../Asserts/images/landingsection1.png";
import section2img1 from "../../Asserts/images/Send icon.png";
import section2img2 from "../../Asserts/images/Bank icon.png";
import section2img3 from "../../Asserts/images/Spend icon.png";
import section3img3 from "../../Asserts/images/image (2).png";
import checkimg from "../../Asserts/images/Check Mark.png";
import bank from "../../Asserts/images/Mortgage.png";
import insurance from "../../Asserts/images/insurance image.png";
import mobile from "../../Asserts/images/Mobile Payment.png";
import card from "../../Asserts/images/Card Payment.png";
import carousal1 from "../../Asserts/images/Component 1 (1).png";
import carousal2 from "../../Asserts/images/frame 2.png";
import carousal3 from "../../Asserts/images/frame 3 (1).png";
import flowchart from "../../Asserts/images/Flow diagram.png";
import profile from "../../Asserts/images/profile.png";
import star from "../../Asserts/images/Star (1).png";
function LandingPage() {
  return (
    <div>
      <LandingNav />
      <div className="landmainsec">
        {" "}
        <section>
          <img className="sectionimg" src={section1}></img>
        </section>
        <section className="container section2nd p-3">
          <h3>
            Financial Freedom With{" "}
            <span className="section2ndspan">UniCredit</span>
          </h3>
          <p className="mt-4">
            Unicredit delivers the convenience of local credit union banking to
            its members, wherever they are. With personalized terms and
            cutting-edge technology, we put your financial needs first for a
            better banking experience.
          </p>
        </section>
        <section className="container p-3">
          <div className="row text-center">
            <div className="col">
              <img src={section2img1}></img>
              <label className="maincolor">Send</label>
              <p>
                Send and receive money <br></br>globally in seconds
              </p>
            </div>
            <div className="col">
              <img src={section2img2}></img>
              <label className="maincolor">Spend</label>
              <p>
                A virtual matercard that hots<br></br> your own lifestyle
              </p>
            </div>
            <div className="col">
              <img src={section2img3}></img>
              <label className="maincolor">Bank</label>
              <p>
                Own multiple global accounts<br></br> in your name
              </p>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="row">
            <div className="col">
              <img className="section3img" src={section3img3}></img>
            </div>
            <div className="col">
              <h5 className="maincolor text-center mt-4">
                The Perfect Financial Trio- Tailored for<br></br> client success
              </h5>
              <p className="ms-5 mt-4">
                We ensure a seamless and empowering banking experience that{" "}
                <br></br> drives financial growth and satisfaction by focusing
                on the key <br></br>elements .
              </p>
              <div className="ms-5">
                <img src={checkimg}></img>
                <label className="checkbox ms-1">Fast Repayment Option</label>
                <br></br>
                <img src={checkimg}></img>
                <label className="checkbox ms-1">Easy Loan Application</label>
                <br></br>
                <img src={checkimg}></img>
                <label className="checkbox ms-1">Low Interest Rates</label>
              </div>
              <div>
                <button className="explorebtn">Explore</button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="text-center mt-3">
            {" "}
            <label className="section4head">W</label>
            <span className="section4head2">E</span>{" "}
            <label className="section4head">P</label>
            <span className="section4head2">ROVIDE</span>
          </div>
          <div className="container text-center p-5">
            <div className="row">
              <div className="col">
                <img src={bank}></img>{" "}
                <p className="maincolor">Loans and Savings</p>
                <p>
                  Achieve your financial goals with <br></br>our personalized
                  loans and<br></br>
                  savings solutions.
                </p>
              </div>
              <div className="col">
                <img src={insurance}></img>{" "}
                <p className="maincolor">Insurance</p>
                <p>
                  It reduce financial uncertainty <br></br> and make accidental
                  loss <br></br>
                  manageable.
                </p>
              </div>{" "}
              <div className="col">
                <img src={mobile}></img>{" "}
                <p className="maincolor">Bill Payment</p>
                <p>
                  Paying bills on time can help<br></br> you Reduce stress, Save
                  <br></br> money.
                </p>
              </div>{" "}
              <div className="col">
                <img src={card}></img> <p className="maincolor">Credit Card</p>
                <p>
                  Credit cards can help you build <br></br> credit, which can be
                  useful for <br></br> future goals.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="slider">
            <img src={carousal1} class="slider-image" alt="Image 1"></img>
            <img src={carousal2} class="slider-image" alt="Image 2"></img>
            <img src={carousal3} class="slider-image" alt="Image 3"></img>
          </div>
        </section>
        <section>
          <div className="text-center mt-3">
            {" "}
            <label className="section4head">H</label>
            <span className="section4head2">OW</span>{" "}
            <label className="section4head">I</label>
            <span className="section4head2">T</span>{" "}
            <label className="section4head">W</label>
            <span className="section4head2">ORKS</span>
            <div className="maincolor fs-4 ">Standard Work Process</div>
            <img src={flowchart}></img>
          </div>
        </section>
        <section className="container ">
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
      </div>

      <LandingFooter />
    </div>
  );
}

export default LandingPage;
