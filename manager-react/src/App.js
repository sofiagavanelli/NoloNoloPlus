//pagina che serve per mettere insieme tutti i componenti
import { Header } from './components/sidebar';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dipendenti from "./pages/Dipendenti";
import Clienti from "./pages/Clienti";
import Inventario from "./pages/Inventario";
import StartPage from './pages/startPage';
import Noleggi from "./pages/Noleggi";
import AddWorker from "./pages/AddWorker";


/*export function Sidebar() {
  return (
    <div className="mid">
      <Container fluid className="sidebar">
        <Row>
          <Col sm={3}><Link to="/">Dipendenti</Link></Col>
          <Col sm={3}><Link to="/clienti">Clienti</Link></Col>
          <Col sm={3}><Link to="/inventario">Inventario</Link></Col>
          <Col sm={3}><Link to="/noleggi">Noleggi</Link></Col>
        </Row>
      </Container>
    </div>
  );
} */

function App(){
  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD Clienti
  }
  return(
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact element={<StartPage />} />
        <Route path='/impiegati' exact element={<Dipendenti />} />
        <Route path='/clienti' element={<Clienti  func={pull_data} />} />
        <Route path='/inventario' element={<Inventario />} />
        <Route path='/noleggi' element={<Noleggi />} />
        <Route path='/aggiungiImpiegato' element={<AddWorker />} />
      </Routes>
    </Router>
  );
}

export default App;
