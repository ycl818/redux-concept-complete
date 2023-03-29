import axios from "axios";

const intstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default intstance;
