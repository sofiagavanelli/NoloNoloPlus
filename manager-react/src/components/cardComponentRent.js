import React from "react";
import DatePicker from "react-datepicker";
import { Card, ListGroup, ListGroupItem, Row, Col, Stack, Tooltip, OverlayTrigger } from 'react-bootstrap';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
var _ = require('lodash');

 
export function CardComponentRent(props){
    const [dateRange, setDateRange] = React.useState([new Date(), null]);
    const [startDate, endDate] = dateRange;
    const [isShow, setIsShow] = React.useState(false);
    const [filteredInfo, setFiltered]= React.useState([]);
    const [showNull, setShowN]=React.useState(false);
    
    function show(update){
        if(update[0]===null || update[1]===null){//caso in cui non è selezionata nessuna data
            setIsShow(false);
        }else{                                  //caso in cui la data è stata selezionata
            filter(update);
            setIsShow(true);
        }
    }

    function filter(data){
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
            setShowN(true);
        }
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          I noleggi vengono filtrati in base alla data di fine noleggio
        </Tooltip>
      );
    //Card key indica la chiave per identificare ogni singola card
    return(
        <div>
        <Stack direction="horizontal" gap={3} className="col-md-2 mx-auto">
            <div >
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <DatePicker
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
            </OverlayTrigger>

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