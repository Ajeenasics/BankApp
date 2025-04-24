import React, { useEffect, useState } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/axiosinstance";
import AdminSidebar from "./AdminSidebar";
import profiletop from "../../Asserts/images/Rectangle 158.png";
import "../../Asserts/Styles/admindashboard.css";
import imgurl from "../../apis/imgURL";
import { FaArrowLeft } from "react-icons/fa6";
function AdminViewAManager() {
  const [manager, setManager] = useState({});
  const { managerid } = useParams();

  const getAData = () => {
    axiosInstance
      .get(`/view_a_manager/${managerid}`)
      .then((res) => {
        setManager(res.data.data);
      })
      .catch(() => {});
  };
  const navigate=useNavigate()
  
  useEffect(()=>{
    if(localStorage.getItem("admin")==null){
      navigate("/adminlogin")
    }

  },[])
  useEffect(() => {
    getAData();
  },[]);

  return (
    <div className="row">
      <div className="col-2">
        <AdminSidebar />
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
                    <Link to={`/admin/edit_a_managers/${manager._id}`}>Edit</Link>

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
                <b>{new Date(manager.dob).toLocaleDateString('en-GB')}                   
</b>
              </p>{" "}
              <p>
                <div className="text-secondary">Qualification</div>
                <b>{manager.qualification}</b>
              </p>
              <p>
                <div className="text-secondary">Password</div>
                <b className="text-dark">{manager.password}</b>
              </p>
            </div>
            <div className="col-3 ms-5">
              <p>
                <div className="text-secondary">Contact</div>
                <b className="text-dark">{manager.contact}</b>
              </p>
              <p>
                <div className="text-secondary">Date Of Joining</div>
                <b className="text-dark" >                  {new Date(manager.dateofjoining).toLocaleDateString('en-GB')}                   
</b>              </p>
              <p>
                <div className="text-secondary">Address</div>
                <b className="text-dark">{manager.address}</b>
              </p>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AdminViewAManager;
