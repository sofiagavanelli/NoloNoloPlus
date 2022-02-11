import React from "react";
import DatePicker from "react-datepicker";
import { Card, ListGroup, ListGroupItem, Row, Col, Stack } from 'react-bootstrap';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
var _ = require('lodash');

 
export function CardComponentRent(props){
    const [dateRange, setDateRange] = React.useState([new Date(), null]);
    const [startDate, endDate] = dateRange;
    const [isShow, setIsShow] = React.useState(false);
    const [filteredInfo, setFiltered]= React.useState([]);
    
    function show(update){
        if(update[0]===null || update[1]===null){//caso in cui non è selezionata nessuna data
            setIsShow(false);
        }else{                                  //caso in cui la data è stata selezionata
            filter(update);
            setIsShow(true);
        }
    }

    function filter(data){
        console.log(data);
        let i;
        let dataStartSelected= new Date(data[0]);
        let dataEndSelected=new Date(data[1]);
        let filteredRent=[];
        for(i in props.info){//calcolo se la data di fine del noleggio è compresa nella data selezionata
            let dataStartRent= new Date(props.info[i].start_date);
            let dataEndRent= new Date(props.info[i].end_date);
            const difStart= dataStartSelected - dataEndRent;
            const difEnd= dataEndSelected - dataEndRent;
            if(difEnd>0 && difStart<0){
                filteredRent.push(props.info[i]);
            }
        }
        setFiltered(filteredRent);
        if(_.isEmpty(filteredRent)){
            console.log("è vuoto");
            return(
                <h1>Non ci sono noleggi che vanno da {data[0].toDateString()} a {data[1].toDateString()}</h1>
            )
        }
    }
    //Card key indica la chiave per identificare ogni singola card
    return(
        <div>
        <Stack direction="horizontal" gap={3}>
            <div ><h5>Selezionare una data per filtrare i noleggi in base alla data di conclusione:</h5> </div>
            <div ><DatePicker
                dateFormat="yyyy-MM-dd"
                placeholderText="Clicca per selezionare una data "
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                    show(update);
                }}
                
            />
            </div>

        </Stack>

            {isShow
                ?   <div key={props.keyDiv} className={props.divName}>
                    <Row xs={1} md={4} className="g-7" >
                    {
                        filteredInfo.map(prodotto =>(
                            <Col key={prodotto._id}>
                                <Card  style={{ margin: '10px' }}> 
                                <Card.Body>
                                    <Card.Title>{prodotto._id}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><h6>Id prodotto: </h6> {prodotto.prod_id}</ListGroupItem>
                                    <ListGroupItem><h6>Id cliente: </h6> {prodotto.client_id}</ListGroupItem>
                                    <ListGroupItem><h6>Id impiegato: </h6> {prodotto.worker_id}</ListGroupItem>
                                    {prodotto.approved       
                                        ? <ListGroupItem><h6>Approvato: </h6> Si</ListGroupItem>
                                        :  <ListGroupItem><h6>Approvato: </h6> No</ListGroupItem>      
                                    }
                                    <ListGroupItem><h6>Inizio noleggio:</h6> {prodotto.start_date.substr(0, 10)}</ListGroupItem>
                                    <ListGroupItem><h6>Fine noleggio:</h6> {prodotto.end_date.substr(0, 10)}</ListGroupItem>
                                    <ListGroupItem><h6>Prezzo:</h6> {prodotto.price}</ListGroupItem>
                                    <ListGroupItem><h6>Metodo di pagamento:</h6> {prodotto.payment}</ListGroupItem>
                                </ListGroup>
                                </Card>
                            </Col>
                        ))
                    }
                    </Row>
                 </div>

                : <div key={props.keyDiv} className={props.divName}>
                    <Row xs={1} md={4} className="g-7" >
                    {
                        props.info.map(prodotto =>(
                            <Col key={prodotto._id}>
                                <Card  style={{ margin: '10px' }}> 
                                <Card.Body>
                                    <Card.Title>{prodotto._id}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><h6>Id prodotto: </h6> {prodotto.prod_id}</ListGroupItem>
                                    <ListGroupItem><h6>Id cliente: </h6> {prodotto.client_id}</ListGroupItem>
                                    <ListGroupItem><h6>Id impiegato: </h6> {prodotto.worker_id}</ListGroupItem>
                                    {prodotto.approved       
                                        ? <ListGroupItem><h6>Approvato: </h6> Si</ListGroupItem>
                                        :  <ListGroupItem><h6>Approvato: </h6> No</ListGroupItem>      
                                    }
                                    <ListGroupItem><h6>Inizio noleggio:</h6> {prodotto.start_date.substr(0, 10)}</ListGroupItem>
                                    <ListGroupItem><h6>Fine noleggio:</h6> {prodotto.end_date.substr(0, 10)}</ListGroupItem>
                                    <ListGroupItem><h6>Prezzo:</h6> {prodotto.price}</ListGroupItem>
                                </ListGroup>
                                </Card>
                            </Col>
                        ))
                    }
                    </Row>
                 </div>
            }
            
       </div>
    );
}