import React from "react";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";
import aboutfirst from "../../Asserts/images/aboutfirst.png";
import aboutsecond from "../../Asserts/images/aboutsecond.png";
import aboutthird from "../../Asserts/images/aboutthird.png";
import aboutfourth from "../../Asserts/images/aboutfourth.png";

function AboutPage() {
  return (
    <div>
      <LandingNav />
      <div>
        <div>
          <img src={aboutfirst}></img>
        </div>
        <div className="container-fluid">
          <section className="ms-5 my-5">
            {" "}
            <img src={aboutsecond}></img>
          </section>
          <section  className="ms-5 my-5">
            <img src={aboutthird}></img>
          </section>
          <section  className="ms-5 my-5">
            {" "}
            <img src={aboutfourth}></img>
          </section>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default AboutPage;
