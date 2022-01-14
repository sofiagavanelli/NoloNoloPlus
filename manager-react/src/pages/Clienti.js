import "../App.css";
import {BarChartClient} from '../components/barChartClient';
import {CardClienti} from '../components/cardClienti';

function Clienti() {
    return (
      <div id="clienti">
        <h1>Customers Statistics</h1>
        <BarChartClient></BarChartClient>
        <h1>Customers </h1>
        <CardClienti></CardClienti>
      </div>
      );
}


export default Clienti;
