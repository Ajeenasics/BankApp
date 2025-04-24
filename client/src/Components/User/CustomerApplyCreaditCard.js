import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { GoDotFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import UserNavbar from "./UserNavbar";
import creditcardgirl from "../../Asserts/images/creditcard.png";
import Applaynow from "../../Asserts/images/ApplyNowBTN.png";
import "../../Asserts/Styles/creaditcardapply.css"
import axiosInstance from "../../apis/axiosinstance";
import { useNavigate } from "react-router-dom";
import LandingFooter from "../Main/LandingFooter";
import { FaArrowLeft } from "react-icons/fa6";

function CustomerApplyCreditCard() {
    const UserbackButton = () => {
        if (window.location.pathname === "/bank_app/user/homepage") {
          navigate("/user/homepage");
        } else {
          navigate(-1);
        }
      };
    const applayref = useRef();

    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const GetUserData = async () => {

        const data = localStorage.getItem("userid");

        try {
            const response = await axiosInstance.post(`/viewausercreditapplication/${data}`);
            console.log('resp-resp', response);
            if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                setUser(response.data.data);
            } else {
                console.error("Unexpected API response structure.");
                setUser(null)
            }
            console.log('API resp', response.data.data)
        }
        catch (error) {
            console.error('Error fetching user data', error);
        }

    }

    useEffect(() => {
        GetUserData();
    }, []);


    const handleLoanApply = () => {
        applayref.current?.scrollIntoView({ behavior: "smooth" });
    };


    return (

        <div className="CACC-MainDiv">
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
                                    Easy online application with
                                    <br />
                                    quick processing!
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
                                <label>&nbsp;Earn rewards on every spend</label>
                                <br />
                                <GoDotFill className="custloanapplysection1radiobtn" />
                                <label>&nbsp; Save with cashback on daily purchases </label>
                                <br />
                                <GoDotFill className="custloanapplysection1radiobtn" />
                                <label>&nbsp;Affordable rates on outstanding balances</label>
                                <br />
                                <GoDotFill className="custloanapplysection1radiobtn" />
                                <label>&nbsp;Adjust limits to match your spending needs </label>
                                <br />
                                <GoDotFill className="custloanapplysection1radiobtn" />
                                <label>&nbsp; Secure transactions with real-time alerts </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* section2 start 
      <div ref={applayref} className="custloanapplysection2">
        <br />
        <br />
        <div className="custloanapplysection2pt2">
          <br />
          <br />
          <center>
            <h3 id="custloanapplysection2pt2h3">Apply Now</h3>
          </center>
          </div>*/}
            {/* Section 1 */}

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
                                                    Email
                                                </label>
                                            </th>
                                            <th className="custcreditstatussect2formth">
                                                <label className="custcreditstatussect2datalabel">
                                                    Card Type
                                                </label>
                                            </th>
                                            <th className="custcreditstatussect2formth">
                                                <label className="custcreditstatussect2datalabel">
                                                    Credit Card Limit
                                                </label>
                                            </th>


                                        </tr>

                                        {user?.length > 0 ? (
                                            user?.map((data, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="custcreditstatussect2formtd">
                                                            {data.userid.username}
                                                        </td>
                                                        <td className="custcreditstatussect2formtd">
                                                            {data.userid.userContact}
                                                        </td>
                                                        <td className="custcreditstatussect2formtd">
                                                            {data.userid.userMail}
                                                        </td>
                                                        <td className="custcreditstatussect2formtd">
                                                            {data.cardtype}
                                                        </td>
                                                        <td className="custcreditstatussect2formtd">
                                                            {data.creditcardlimit}
                                                        </td>
                                                        <td className="custcreditstatussect2formthonerow">

                                                            <p className="CACC-p"><GoDotFill className="custcreditstatusradiobtn" />{data.approvalstatus}</p>

                                                        </td>
                                                        <td className="custcreditstatussect2formthonerow">

                                                            <p className="CACC-p-link" onClick={() => navigate(`/user/creditcarddetails/${data._id}`)}>View More</p>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td><p className=' text-center text-danger'>No Data Found</p></td>
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

            {/* Section 2 */}

            <div className="custcreditstatussect3">
                <br />
                <br />
                <div className="custcreditstatussect3pt3">
                    <br />
                    <center>
                        <h4>CREDIT CARD</h4>
                        <br />
                        <br />
                        <h3 id="custcreditstatussect3h3">
                            "Empower Your Spending with the Perfect Card!"
                        </h3>
                    </center>
                    <br />
                    <div className="custcreditstatussect3pt3details">
                        <p>
                            Unlock exclusive rewards, cashback, and unbeatable benefits
                            tailored to your lifestyle. Enjoy secure and convenient
                            transactions worldwide with our diverse range of credit cards.
                            Whether it’s shopping, travel, or everyday expenses, find the card
                            that matches your needs perfectly.
                        </p>
                        <br />
                        <center>
                            <div onClick={() => { navigate("/user/personaldetails") }} style={{ cursor: "pointer" }}>
                                <img src={Applaynow} alt="Apply Now Button" />
                            </div>
                        </center>
                        <br />
                        <br />
                    </div>
                </div>
                <br />
                <br />
            </div>
            <LandingFooter/>
        </div>
    );

}

export default CustomerApplyCreditCard;
