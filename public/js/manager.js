import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './include/Navbar';


ReactDOM.render(
    //colsole.log("hi") 
    <React.StrictMode>
    <Navbar/>
    </React.StrictMode>,
    document.getElementById('root'));