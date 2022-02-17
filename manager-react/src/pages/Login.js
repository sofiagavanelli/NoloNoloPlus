import React from "react";
import { BrowserRouter as  Redirect} from 'react-router-dom';
import "../App.css";
import { Button, Form, Card, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
  return fetch('https://site202133.tw.cs.unibo.it/loginManager', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}



function Login({ setToken }){

    const [username, setUserName] = React.useState();
    const [password, setPassword] = React.useState();

    const handleSubmit = async e => {
      const app = await controlloDati();
      e.preventDefault();
      if(app){
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
        window.location = '/manager';
      }else{
        alert("i dati inseriti non sono corretti")
      }
      
    }
  

    async function controlloDati (){
        let trovato=false;
        var i=0;
        if(username !== '' && password!== ''){
            let res = await fetch('https://site202133.tw.cs.unibo.it/allWorker')
            let info = await res.json()
            while(!trovato && i<info.length){
              if(username === info[i].user_id && password===info[i].password && info[i].manager===true){
                  trovato=true;
              }
              i++;
          }
        }else{
            alert("inserire prima i dati");
        }
        return trovato;
    } 

    return (
        <div id="login">
            <h1 id="arcobaleno" >Login</h1>
          <div id="buttonShow">
          <>
                <style type="text/css">
                  {`
                  .btn-flat {
                    display: flex;
                    justify-content: center;
                    background-color: #edb5c0;
                    color: white;
                    width: 20%;
                  }
                  .btn-flat:hover{
                    color: white;
                  }
                  .btn-flat:active{
                    border-color: #edb5c0;
                  }
                  .btn-check:focus + .btn, .btn:focus{
                    box-shadow: 0 0 0 .20rem rgba(237, 181, 192, 0.51);
                  }
                  `}
                </style>
                 <Card style={{ width: '50%' }}>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3" >
                        <Form.Label>Worker Id</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="mario_rossi" 
                          value={username}
                          onChange={e => setUserName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          placeholder="*********" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <br/>
                      <Button variant="flat" onClick={handleSubmit} >login</Button>
                    </Form>
                  </Card.Body>
                </Card>
                </>
          </div>
        </div>
    );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}


export default Login