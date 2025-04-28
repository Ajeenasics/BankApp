import axios from "axios";

const axiosMultipartInstance = axios.create({

     baseURL:"https://hybrid.srishticampus.in/bank_app_api/",

  // baseURL:  "http://localhost:4051/bank_app_api/",

  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosMultipartInstance;