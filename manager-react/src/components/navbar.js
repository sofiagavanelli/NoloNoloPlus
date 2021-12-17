import {  Link } from "react-router-dom";
import "./navbar.css";
import { Container, Row, Col } from 'react-grid-system';



/* export function Navbar() {
  return (
      <div className="mid">
      <ul className="navbar">
          <li>
            <Link to="/">Dipendenti</Link>
          </li>
          <li>
            <Link to="/clienti">Clienti</Link>
          </li>
          <li>
            <Link to="/inventario">Inventario</Link>
          </li>
          <li>
            <Link to="/noleggi">Noleggi</Link>
          </li>
      </ul>
      </div>
    );
} */


export function Navbar() {
  return (
    <div className="mid">
      <Container fluid className="navbar">
        <Row>
          <Col sm={3}><Link to="/">Dipendenti</Link></Col>
          <Col sm={3}><Link to="/clienti">Clienti</Link></Col>
          <Col sm={3}><Link to="/inventario">Inventario</Link></Col>
          <Col sm={3}><Link to="/noleggi">Noleggi</Link></Col>
        </Row>
      </Container>
    </div>
  );
}

