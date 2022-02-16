//pagina che serve per mettere insieme tutti i componenti
import { Header } from './components/sidebar';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom';
import Dipendenti from "./pages/Dipendenti";
import Clienti from "./pages/Clienti";
import Inventario from "./pages/Inventario";
import StartPage from './pages/StartPage';
import Login from './pages/Login';
import Noleggi from "./pages/Noleggi";
import AddWorker from "./pages/AddWorker";
import useToken from './components/useToken';
import clearToken from './components/clearToken';


function App(){
  const { token, setToken } = useToken();

  if(!token){
    return <Login setToken={setToken} />
  }

    return(
      <Router >
        { token ? <Header setToken={setToken} /> : ""}
        <Routes >
          <Route index path='/manager' element={<StartPage />} />
          <Route path='/manager/impiegati' element={<Dipendenti />} />
          <Route path='/manager/clienti' element={<Clienti />} />
          <Route path='/manager/inventario' element={<Inventario />} />
          <Route path='/manager/noleggi' element={<Noleggi />} />
          <Route path='/manager/login' element={<Login />} />
          <Route path='/manager/aggiungiImpiegato' element={<AddWorker />} />
        </Routes>
      </Router>
    );
}


export default App;
