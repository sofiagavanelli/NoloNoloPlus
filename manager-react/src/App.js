//pagina che serve per mettere insieme tutti i componenti
//import { Prova } from './components/prova';
import { Navbar } from './components/navbar';
//import {ChartProva} from './components/provaChart'

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dipendenti from "./pages/Dipendenti"
import Clienti from "./pages/Clienti"
import Inventario from "./pages/Inventario"
import Noleggi from "./pages/Noleggi"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Dipendenti />} />
        <Route path='/clienti' element={<Clienti />} />
        <Route path='/inventario' element={<Inventario />} />
        <Route path='/noleggi' element={<Noleggi />} />
      </Routes>
    </Router>
  );
}

export default App;
