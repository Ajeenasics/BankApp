import React, { useEffect, useState } from "react";
import { useParams,Link ,useNavigate} from "react-router-dom";
import axiosInstance from "../../apis/axiosinstance";
import ManagerSidebar from "./ManagerSidebar";
import profiletop from "../../Asserts/images/Rectangle 158.png";
import "../../Asserts/Styles/admindashboard.css";
import imgurl from "../../apis/imgURL";
import editbtn from "../../Asserts/images/editbtn.png";
import LandingFooter from "../Main/LandingFooter";

function ManagerProfile() {
  const [manager, setManager] = useState({});
  const  managerid=localStorage.getItem("managerid")

  const getAData = () => {
    axiosInstance
      .get(`/view_a_manager/${managerid}`)
      .then((res) => {
        setManager(res.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAData();
  },[]);

  const navigate=useNavigate()
  
  useEffect(()=>{
    if(localStorage.getItem("managerid")==null){
      navigate("/manager/login")
    }

  },[])
  return (
    <div className="row">
      <div className="col-2">
        <ManagerSidebar />
      </div>
      <div className="col-10">
        <img src={profiletop} className="profiletop"></img>
        <div>
          {" "}
          <img
            src={`${imgurl}/${manager?.profile?.filename}`}
            className="profileimhg rounded-circle"
          ></img>
          <div className="row ms-5">
            <div className="col-2 "></div>
            <div className="col-2 "></div>
            <div className="col-2 ms-5 mt-3 text-center">
              <h4>{manager?.name}</h4>
              <h5 className="text-secondary">{manager.destination}</h5>

            </div>
          </div>
          <div className="row ms-5">
            <div className="col-3 "></div>
            <div className="col-3 ms-5">
              <p>
                <div className="text-secondary">Email</div>
                <b className="text-dark">{manager.email}</b>
              </p>
              <p>
                <div className="text-secondary">Date of birth</div>
                <b  >                  {new Date(manager.dob).toLocaleDateString('en-GB')}                   
</b>
              </p>{" "}
              <p>
                <div className="text-secondary">Qualification</div>
                <b>{manager.qualification}</b>
              </p>
              
            </div>
            <div className="col-3 ms-5">
              <p>
                <div className="text-secondary">Contact</div>
                <b className="text-dark">{manager.contact}</b>
              </p>
              <p>
                <div className="text-secondary">Date Of Joining</div>
                <b className="text-dark">                  {new Date(manager.dateofjoining).toLocaleDateString('en-GB')}                   
</b>
              </p>
              <p>
                <div className="text-secondary">Address</div>
                <b className="text-dark">{manager.address}</b>
              </p>
            </div>                             
            <div className="text-center"><Link to="/manager/editprofile"><img src={editbtn}></img></Link></div> 

            
          </div>

        </div>
      </div>
    </div>
  );
}

export default ManagerProfile;
