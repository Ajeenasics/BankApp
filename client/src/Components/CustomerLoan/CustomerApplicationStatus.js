// Customer-Loan-Application Details.jsx
import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import green from '../Assert/green.png';
// import cust from '../Assert/profile.png';
import '../../Asserts/Styles/Loan.css';
import LandingFooter from '../Main/LandingFooter';
import { FaArrowLeft } from "react-icons/fa6";

function CustomerApplicationStatus() {
  return (
    <div className="cust-loan-app">
      <center>
        <h5 className='cust-app-main-heading'>Application Details</h5>
        {/* profil-photo */}
        <Card body className="app-main-card">
          <div className="cust-profile-img">
            <div className="profile-img-grp">
              <img className="cust-profile-img" alt="Customer Profile" />
            </div>
            <h6 className='cust-app-card-heading'>Name</h6>
          </div>
          {/* progress-circles */}
    <div className="profile-progress-container">
      <div className="profile-progress-step">
        <div className="profile-progress-circle.completed">
          <i className="progress-check-icon">✓</i>
        </div>
        <h6 className="cust-app-card-heading">Apply</h6>
        <p>Applied On 12/11/2024</p>
      </div>
      <div className="progress-line-completed"></div>
      <div className="profile-progress-step">
        <div className="profile-progress-circle.completed">
          <i className="progress-check-icon">✓</i>
        </div>
        <h6 className="cust-app-card-heading">Clerk Verify</h6>
        <p>Verified On 12/11/2024</p>
      </div>
      <div className="progress-line"></div>
      <div className="profile-progress-step">
        <div className="profile-progress-circle">
          <i></i>
        </div>
        <h6 className="cust-app-card-heading">Manager Approval</h6>
        <p>Working In Progress</p>
      </div>
      <div className="progress-line"></div>
      <div className="profile-progress-step">
        <div className="profile-progress-circle">
          <i></i>
        </div>
        <h6 className="cust-app-card-heading">Loan Approved</h6>
        <p>Working In Progress</p>
      </div>
    </div>
    {/* Personal Details */}
          <Container>
            <Row>
              <Col lg={6} className="cust-app-card-personal-details">
                <h6 className='cust-app-card-heading'>Personal Details</h6>
                <Row>
                  <Col md={6}>
                    <label className="cust-app-labeltag">E-mail</label>
                    <input type="text" id="email"  className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Contact</label>
                    <input type="number" id="contact"   className="cust-app-inputtag"/>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label className="cust-app-labeltag">Gender</label>
                    <input type="text" id="gender" className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Address</label>
                    <input type="text" id="address" className="cust-app-inputtag"/>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label className="cust-app-labeltag">Date Of Birth</label>
                    <input type="date" id="dob" className="cust-app-inputtag"/>
                  </Col>
                </Row>
              </Col>
              {/* Identity */}
              <Col lg={6} className="cust-app-card-identity">
                <h6 className='cust-app-card-heading'>Identity</h6>
                <Row>
                  <Col md={6}>
                    <label className="cust-app-labeltag">Pan Card Number</label>
                    <input type="text" id="pan" className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label className="cust-app-labeltag">Voter's ID</label><br/>
                    <a href="link" className="form-control-link">View File</a>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label className="cust-app-labeltag">Pan Card</label><br/>
                    <a href="link" className="form-control-link">View File</a>
                  </Col>
                  <Col md={6}>
                    <label className="cust-app-labeltag">Driving License</label><br/>
                    <a href="link" className="form-control-link">View File</a>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Aadhaar Number</label>
                    <input type="number" id="aadhar" className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label className="cust-app-labeltag">Passport</label><br/>
                    <a href="link" className="form-control-link">View File</a>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label className="cust-app-labeltag">Aadhaar Card</label>
                    <a href="link" className="form-control-link">View File</a>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* Employment Details */}
            <Row className="cust-app-card-tex2">
              <Col lg={6} className="cust-app-card-emp-details">
                <h6 className='cust-app-card-heading'>Employment Details</h6>
                <Row>
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Name Of Employer</label>
                    <input type="text" id="employer" className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Contact</label>
                    <input type="number" id="emp-contact" className="cust-app-inputtag"/>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Work Experience</label>
                    <input type="text" id="experience" className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Salary</label>
                    <input type="number" id="salary" className="cust-app-inputtag"/>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Position</label>
                    <input type="text" id="position" className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label className="cust-app-labeltag">Salary Slip</label>
                    <a href="link" className="form-control-link">View File</a>
                  </Col>
                </Row>
              </Col>
              {/* Loan Details */}
              <Col lg={6} className="cust-app-card-loan-details">
                <h6 className='cust-app-card-heading'>Loan Details</h6>
                <Row>
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Loan Type</label>
                    <input type="text" id="loan-type" className="cust-app-inputtag"/>
                  </Col>
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Amount Required</label>
                    <input type="number" id="amount" className="cust-app-inputtag"/>
                  </Col>
                </Row>
                <Row className="cust-app-card-text1">
                  <Col md={6}>
                    <label  className="cust-app-labeltag">Purpose Of Loan</label>
                    <input type="text" id="purpose" className="cust-app-inputtag"/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card>
      </center>
      <LandingFooter/>
    </div>
  );
}

export default CustomerApplicationStatus;
            //   <img src={green} className="cust-profile-green-img" alt="Status Indicator" />
