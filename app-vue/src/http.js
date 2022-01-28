import axios from "axios";

/*export default axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "dataType":'jsonp'
    }
});*/

export default axios.create({
  baseURL: "https://site202133.tw.cs.unibo.it/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "dataType":'jsonp'
    }
});