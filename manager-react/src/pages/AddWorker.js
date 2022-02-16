import React from "react";
import { Button, Form, Card, FormGroup } from 'react-bootstrap';
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

    const addWorker = () => {
      const flag=controlData();
        newWorker.password=newWorker.surname + newWorker.name + newWorker.year;
        if(flag){
          console.log(JSON.stringify(newWorker));
          fetch('https://site202133.tw.cs.unibo.it/new-worker', {  // Enter your IP address here
              method: 'POST', 
              mode: 'cors', 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newWorker) // body data type must match "Content-Type" header

          })
          getWorkerInfo();
        }else{
          alert("la data inserita non è corretta, riprovare");
        }
        
    };

    function getWorkerInfo(){
      fetch('https://site202133.tw.cs.unibo.it/allWorker')
        .then(results => results.json())
        .then(workers => {
          console.log(workers);
        });
    }

    function setManager(isManager){
      if(isManager==="true"){
        newWorker.manager=true;
      }else{
        newWorker.manager=false;
      }
    }
    function controlData(){
      let app= new Date(newWorker.year).getFullYear();
      console.log(app);
      newWorker.year=app.toString();
      if(isNaN(newWorker.year)){
        newWorker.year='';
        return false;
      }else{
        return true;
      }
    }

    return(
        <div id="addworker">
          <h1 id="arcobaleno" >Aggiungi un nuovo impiegato</h1>
          <hr  style={{
            color: 'red',
            backgroundColor: 'red',
            height: 5
          }}/>
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
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Mario" 
                          value={newWorker.name}
                          onChange={(e) => updateData(e, 'name')}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Rossi" 
                          value={newWorker.surname}
                          onChange={(e) => updateData(e, 'surname')}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Id dipendente</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="mario_rossi"
                          value={newWorker.user_id}
                          onChange={(e) => updateData(e, 'user_id')}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Anno di nascita</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="1980"
                          value={newWorker.year}
                          onChange={(e) => updateData(e, 'year')}
                        />
                      </Form.Group>
                      <FormGroup>
                        <Form.Label>Manager </Form.Label>
                        <Form.Select 
                          aria-label="Manager"
                          onChange={(isManager) => {setManager(isManager);}}
                        >
                          <option value="false">No</option>
                          <option value="true">SI</option>
                        </Form.Select>
                      </FormGroup>
                      <br/>
                      <Button variant="flat" onClick={addWorker}>Add</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </>
          </div>
        </div>
    );
}

export default AddWorker;