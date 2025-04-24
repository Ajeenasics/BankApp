import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Asserts/images/Logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import login from "../../Asserts/images/login.png"
import { Link } from "react-router-dom";

function LandingNav() {
  return (
    <div>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand>
          <Link to="/">
            <img src={logo}></img></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to="/" className="me-5 text-light text-decoration-none">Home</Link>
              <Link to="/about" className="me-5 text-light text-decoration-none">About Us</Link>
              <a className="text-light text-decoration-none"></a>
              
             
              <Dropdown className="d-inline bg-dark me-5 btn-outline-dark">
                <Dropdown.Toggle variant="bg-dark text-dark"> <a className="text-light text-decoration-none">
                <img src={login}></img>
               </a></Dropdown.Toggle>
                <Dropdown.Menu className="mt-2">
                  <Dropdown.Item ><Link to="/user/login"  className="text-decoration-none text-dark">User</Link></Dropdown.Item>
                  <Dropdown.Item>
                  <Link to="/manager/login"  className="text-decoration-none text-dark " >Manager</Link>
                   
                  </Dropdown.Item>
                  <Dropdown.Item >
                  <Link to="/clerk/login"  className="text-decoration-none text-dark" >Clerk</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default LandingNav;
