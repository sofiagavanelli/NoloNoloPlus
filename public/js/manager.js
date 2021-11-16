
var ReactDOM = require('react-dom');
//import 'bootstrap/dist/css/bootstrap.min.css'
var Navbar = require('./include/Navbar');

var React = require('react');

ReactDOM.render(
    //colsole.log("hi") 
    <React.StrictMode>
    <Navbar/>
    </React.StrictMode>,
    document.getElementById('root'));