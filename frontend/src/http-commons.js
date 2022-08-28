import axios from "axios";

export default axios.create({
  baseURL: "/api/v1/download",
  headers: {
    "Content-type": "application/json",
  }
});