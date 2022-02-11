import React from "react";
import { Button, Form } from 'react-bootstrap';
function AddWorker(){
  const [newWorker, setWorker] = React.useState({
    name: '',
    surname: '',
    password: '',
    manager: false,
    user_id: '',
    year: ''
  })
  
  const updateData = (event, property) => {
    const target = event.target
    console.log(target)

    event.preventDefault()
    setWorker((prevState) => ({
      ...prevState,
      [property]: event.target.value,
    }))
  }

    let jsonData={
        name: 'pippo',
        surname: 'val',
        password: 'treasf',
        manager: true,
        user_id: 'pippo_val',
        year: '2000'
    }



    const addWorker = () => {
        console.log(JSON.stringify(jsonData));
        fetch('https://site202133.tw.cs.unibo.it/new-worker', {  // Enter your IP address here

            method: 'POST', 
            mode: 'cors', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

        })
        getWorkerInfo();
    };

    function getWorkerInfo(){
      fetch('https://site202133.tw.cs.unibo.it/allWorker')
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
                  <Form.Control 
                  type="text" placeholder="Mario" 
                  value={newWorker.name}
                  onChange={(e) => updateData(e, 'name')}
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="text" placeholder="Rossi" />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Id dipendente</Form.Label>
                  <Form.Control type="text" placeholder="mario_rossi" />
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