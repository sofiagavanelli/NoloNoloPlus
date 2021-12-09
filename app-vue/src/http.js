import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "dataType":'jsonp'
    }
});