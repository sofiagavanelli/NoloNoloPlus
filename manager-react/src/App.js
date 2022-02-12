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


function App(){
  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD Clienti
  }
  return(
    <Router >
      <Header />
      <Routes >
        <Route index path='/manager' element={<StartPage />} />
        <Route path='/manager/impiegati' element={<Dipendenti />} />
        <Route path='/manager/clienti' element={<Clienti  func={pull_data} />} />
        <Route path='/manager/inventario' element={<Inventario />} />
        <Route path='/manager/noleggi' element={<Noleggi />} />
        <Route path='/manager/aggiungiImpiegato' element={<AddWorker />} />
      </Routes>
    </Router>
  );
}

export default App;
