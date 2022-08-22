import axios from "axios";

export default axios.create({
  baseURL: "http://137.184.242.44:5000/api/v1/download",
  headers: {
    "Content-type": "application/json",
  }
});