import React from "react";
import { Button, Form } from 'react-bootstrap';
function AddWorker(){

    let jsonData={
        name: 'pippo',
        surname: 'val',
        password: 'treasf',
        manager: true,
        user_id: 'pippo_val',
        year: '2000'
    }

    /* function prova(){//richiesta per aggiunta worker
        // Send data to the backend via POST
        console.log(JSON.stringify(jsonData));
        fetch('http://localhost:8000/new-worker', {  // Enter your IP address here

            method: 'POST', 
            mode: 'cors', 
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

        })
        getWorkerInfo();
    } */

    const addWorker = () => {
        console.log(JSON.stringify(jsonData));
        fetch('http://localhost:8000/new-worker', {  // Enter your IP address here

            method: 'POST', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

        })
        getWorkerInfo();
    };

    function getWorkerInfo(){
      fetch('http://localhost:8000/allWorker')
        .then(results => results.json())
        .then(workers => {
          console.log(workers);
        });
    }

    return(
        <div id="buttonShow">
            <>
              <style type="text/css">
                {`
                .btn-flat {
                  display: flex;
                  justify-content: center;
                  background-color: #edb5c0;
                  color: white;
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
              <Form>
                <Form.Group className="mb-3" >
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="textarea" placeholder="Mario" />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="textarea" placeholder="Rossi" />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Id dipendente</Form.Label>
                  <Form.Control type="textarea" placeholder="mario_rossi" />
                </Form.Group>
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                  label="Manager"
                />
                <br/>
                <Button variant="flat" onClick={addWorker}>Add</Button>
              </Form>
            </>
        </div>
       
    );
}

export default AddWorker;