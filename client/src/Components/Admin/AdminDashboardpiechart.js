import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axiosInstance from "../../apis/axiosinstance";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { IoEye } from "react-icons/io5";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardCharts = () => {
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(0);
  const [managersCount, setManagersCount] = useState(0);
  const [clerksCount, setClerksCount] = useState(0);
  const [loanData, setLoanData] = useState({
    total: 0,
    rejected: 0,
    pending: 0,
  });
  const [creditData, setCreditData] = useState({
    total: 0,
    rejected: 0,
    pending: 0,
  });
  const [insuranceData, setInsuranceData] = useState({
    total: 0,
    rejected: 0,
    pending: 0,
  });
  const [activeChart, setActiveChart] = useState("loan"); // Track active chart
 

  useEffect(() => {
    // if (!localStorage.getItem("admin")) {
    //   navigate("/adminlogin");
    // }

    const fetchData = async () => {
      try {
        const usersRes = await axiosInstance.get("/viewusers");
        setUsersCount(usersRes.data.data.length);

        const managersRes = await axiosInstance.get("/viewallmangers");
        setManagersCount(managersRes.data.data.length);

        const clerksRes = await axiosInstance.get("/viewallclerks");
        setClerksCount(clerksRes.data.data.length);

        const loanRes = await axiosInstance.get("/viewallloan");
        setLoanData({
          total: loanRes.data.data.length,
          rejected: loanRes.data.data.filter(
            (l) => l.loanapproval === "Rejected"
          ).length,
          pending: loanRes.data.data.filter((l) => l.loanapproval === "Pending")
            .length,
        });

        const creditRes = await axiosInstance.post("/viewallcreditapplication");
        setCreditData({
          total: creditRes.data.data.length,
          rejected: creditRes.data.data.filter(
            (c) => c.approvalstatus === "Rejected"
          ).length,
          pending: creditRes.data.data.filter(
            (c) => c.approvalstatus === "Pending"
          ).length,
        });

        const insuranceRes = await axiosInstance.post("/viewallinsurances");
        setInsuranceData({
          total: insuranceRes.data.data.length,
          rejected: insuranceRes.data.data.filter(
            (i) => i.approvalstatus === "Rejected"
          ).length,
          pending: insuranceRes.data.data.filter(
            (i) => i.approvalstatus === "Pending"
          ).length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const usersReviewData = {
    labels: ["Total Users", "Total Clerks", "Total Managers"],
    datasets: [
      {
        data: [usersCount, clerksCount, managersCount],
        backgroundColor: ["#9b59b6", "#3498db", "#1abc9c"],
        borderWidth: 1,
      },
    ],
  };

  const loanDataChart = {
    labels: ["Total Loan ", "Rejected Loan ", "Pending Loan "],
    datasets: [
      {
        data: [loanData.total, loanData.rejected, loanData.pending],
        backgroundColor: ["#27ae60", "#e74c3c", "#f1c40f"],
        borderWidth: 1,
      },
    ],
  };

  const creditDataChart = {
    labels: ["Total CreditCard", "Rejected CreditCard", "Pending CreditCard"],
    datasets: [
      {
        data: [creditData.total, creditData.rejected, creditData.pending],
        backgroundColor: ["#8adaee", "#35996f", "#ec64af"],
        borderWidth: 1,
      },
    ],
  };

  const insuranceDataChart = {
    labels: ["Total Insurances", "Rejected Insurances", "Pending Insurances"],
    datasets: [
      {
        data: [
          insuranceData.total,
          insuranceData.rejected,
          insuranceData.pending,
        ],
        backgroundColor: ["#ee998a", "#d5b1ec", "#f1c40f"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="row ms-5 mt-5">
        <div className="col-5 managerDashboardpiechart py-4">
          <h3>Users Review</h3>
          <Pie data={usersReviewData} />
        </div>

        <div className="col-5 ms-5 managerDashboardpiechart1">
          <div className="row mb-3">
            <div className="col-3">
              <button
                id="managerDashboardLoanButton"
                className={`btn ms-4 ${
                  activeChart === "loan" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setActiveChart("loan")}
              >
                Loan
              </button>
            </div>
            <div className="col-4">
              <button
                id="managerDashboardLoanButton"
                className={`btn ${
                  activeChart === "credit" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setActiveChart("credit")}
              >
                Credit Card
              </button>
            </div>
            <div className="col-5">
              <button
                id="managerDashboardLoanButton"
                className={`btn ${
                  activeChart === "insurance" ? "btn-primary" : "btn-light"
                }`}
                onClick={() => setActiveChart("insurance")}
              >
                Life Insurance
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col">
              {activeChart === "loan" && <Pie data={loanDataChart} />}
              {activeChart === "credit" && <Pie data={creditDataChart} />}
              {activeChart === "insurance" && <Pie data={insuranceDataChart} />}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default DashboardCharts;
