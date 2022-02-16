<template>

    <div id="rent_page" class="flex-container">

    <router-link id="toHome" tag="nav-item" aria-labelledby="homeLabel" to="/home">
      <b-button id="backBtn">
       PRODOTTI
      </b-button>
    </router-link>

      <!-- cambiare estetica? -->
      <b-card class="boat-images" >

          <img class="post_image" :src="this.parentData.image" alt="Card image cap">
          <b-card-body>
            <h3 class="title"> {{this.parentData.name}} </h3>
            <h4 class="title"> {{this.parentData.brand}} </h4>
            <div class="details">
              <ul class="d-flex flex-wrap pl-0" >
                <li class="title">Velocità:<h5 class="data"> {{this.parentData.speed}} </h5> </li>
                <li class="title">Lunghezza:<h5 class="data"> {{this.parentData.length}} </h5> </li>
                <li class="title">Ospiti:<h5 class="data"> {{this.parentData.guests}} </h5> </li>
                <li class="title">Anno:<h5 class="data"> {{this.parentData.year}} </h5> </li>
                <!--template v-if="this.$store.state.username"-->
                  <!--li class="title"> Prezzo: <h5 class="data"> {{this.parentData.price}} </h5> </li--> 
                <!--/template-->
                <li class="title">Due parole:<h5 class="data"> {{this.parentData.summary}} </h5> </li>
              </ul>
            </div>
          </b-card-body>

          <div id="calculate" class="flex-container">
            <label for="start-datepicker" style="padding-right:0.2em;">Inizio noleggio</label>
            <font-awesome-icon icon="question-circle" title="RICORDA: un noleggio che ha inizio nel mese del proprio compleanno fa guadagnare uno sconto del 15%!" />
            <b-form-datepicker :min="new Date()" id="start-datepicker" v-model="startD" class="mb-2"></b-form-datepicker>
            <label for="end-datepicker">Fine noleggio</label>
            <b-form-datepicker :min="startD" id="end-datepicker" v-model="endD" class="mb-2"></b-form-datepicker>

            <div>
              <template v-if="this.$store.state.discount && this.$store.state.username">
                <div id="discountTab">
                  <h5> <input type="checkbox" v-model="sconto" v-on:change="useDiscount()"> 
                    voglio usare il mio sconto </h5>
                </div>
              </template>

              <div id="priceTab" class="flex-container">
                <b-button v-on:click="calc()">TOTALE: </b-button>
                <div id="total-price">
                  <h5> {{total}}{{euro}} </h5>
                </div>
              </div>
            </div>

              <template v-if="this.payment">
                <div id="payTab">
                  <!--b-button id="payBtn" v-on:click="pay()">scegli metodo di pagamento</b-button  toggle-class='customDropdown'   variant='none'-->
                  <b-form-group  label="METODO DI PAGAMENTO"> 
                    <!--b-form-checkbox-group v-on:click="pay()" v-model="selected" :options="type"></b-form-checkbox-group
                    v-for="item in this.type" :key="item.value" -->
                    <b-form-checkbox-group v-model="checked" :options="type" v-on:change="pay(checked)"> {{type.text}} </b-form-checkbox-group> 
                  </b-form-group>
                </div>
              </template>

          </div>


      </b-card>

      <template v-if="!this.$store.state.username">
            <!-- TODO: CAPIRE COSA FARE DEL DISCLAIMER SE LOGIN FATTO -->
            <div id="disclaimer" class="flex-container">
              <font-awesome-icon icon="exclamation-circle" />
              <h6> Avvisiamo che il prezzo calcolato è indicativo e non tiene conto delle
                disponibilià del prodotto. 
                Necessario fare login per controllare.</h6>
            </div>
      </template>

      <!-- The modal -->
      <div id="modal-container" class="flex-container">
        <b-modal ok-title="Conferma" id="recapModal" v-on:ok="createRent()">
          <h2> Il tuo noleggio </h2>

              <div class="details">
                <ul class="d-flex flex-wrap pl-0" >
                  <li class="title">Imbarcazione:<h5 class="data"> {{this.parentData.name}} </h5> </li>
                  <li class="title">Data di inizio:<h5 class="data"> {{this.startD}} </h5> </li>
                  <li class="title">Data di fine:<h5 class="data"> {{this.endD}} </h5> </li>
                  <li class="title">Prezzo:<h5 class="data"> {{this.total}} </h5> </li>
                  <li class="title">Metodo di pagamento:<h5 class="data"> {{this.paymethod}} </h5> </li>
                </ul>
              </div>
        
        </b-modal> 
      </div>


    <!-- scelte multiple per scegliere e calcolare il rent -->

    </div>

</template>

<script>
import axios from '../http'

import client from '../user-data'

import {calc} from '../utils'


export default {
  name: 'RentPage',
  /*props: {
    parentData: '',
  },*/
  props: ['parentData'],
  data() {
    return {
      euro: '',

      sconto: null,

      loading: true,

      startD: '',
      endD: '',

      home: true,

      total: '',

      payment: false,

      //disponibile: true,

      //foundRents: [],
      rentDiscount: 0,

      userInfo: {},
      birthMonth: null,

      noleggi: [],

      newRent: {},
      paymethod: null,

      checked: '',
        type: [ 
          //{ value: null, text: 'Please select an option' },
          { value: 'paypal', text: 'PayPal' },
          { value: 'carta', text: 'Carta di credito' },
          { value: 'satispay', text: 'Satispay' },
          { value: 'bonifico', text: 'Bonifico' } ],
    };
  },

mounted() {

  scroll(0, 0);

  axios.get('/rentByProd/' + this.parentData.prod_id)
    .then((response) => {
        this.noleggi = response.data;
  });

  
    if(this.$store.state.username) {

      axios.get('/allClients/' + this.$store.state.username)
        .then((response) => {
          
          this.userInfo = response.data[0];

          let birth = null;
          birth = new Date(this.userInfo.birth);

          this.birthMonth = birth.getMonth();

        })
        .catch((error) => {
          //this.loading = false;
          console.log(error);
        });


    }

},

methods: {

  /*controlDate() {

        console.log("sono dentro controldate");

        var noleggi = this.noleggi;

        var myrent_sdate = new Date(this.startD);
        var myrent_edate = new Date(this.endD);

        var disponibile = true;

        noleggi.forEach(item => {

          if(!item.deleted) { //se il noleggio che si sta guardando è stato eliminato allora le sue date NON vanno considerate come occupate

            var checked_start = new Date(item.start_date);
            var checked_end = new Date(item.end_date);

            if((myrent_sdate >= checked_start && myrent_sdate <= checked_end) ||
              (myrent_edate >= checked_start&& myrent_edate <= checked_end) || 
              (myrent_sdate <= checked_start && myrent_edate >= checked_start) ) {

                disponibile = false;
            }

          }

        })

        console.log("dentro è:" + disponibile);

        return(disponibile);
      
  },*/

  calc() {

    if(new Date(this.endD) < new Date(this.startD)) {
      this.total = "la data di fine deve essere successiva a quella d'inizio";
    }
    else {

      //export function calc(start, end, product, logged, noleggi) {
      var result = calc(this.startD, this.endD, this.parentData, this.$store.state.username, this.noleggi, this.birthMonth);

      this.total = result.err || result.total;

      this.rentDiscount = result.discount || 0;

      this.payment = result.pay;

      if(this.payment) this.euro = '€';

    }

      /*const diffInMs   = new Date(this.endD) - new Date(this.startD);
      const diffInDays = (diffInMs / (1000 * 60 * 60 * 24)) + 1; //+1 perché conto la data di partenza

      let highDays = highSeason_days(this.startD, diffInDays);

      let temp = (this.parentData.high_season * (highDays)) + (this.parentData.low_season * (diffInDays - highDays));

      if(this.$store.state.username) {


        //TODO AGGIUNGERE QUESTIONE DEL MESE DI NASCITA CON LO SCONTO 
         data di nascita = new Date(data del cliente --> come la ottengo? faccio la get? aggiungo a vuex la data?)
          var start_date = new Date(this.startD);
          var start_month = start_date.getMonth();
          var birth_month = birth_date.getMonth();

          if (start_month == birth_month) {
            temp = temp - (temp*15/100);
          }

        

            if(this.parentData.status != "rotto" && controlDate(this.noleggi, this.startD, this.endD)) {

              if(this.parentData.status == "buono") {
                temp = temp - (temp*5/100);
              }
              else if(this.parentData.status == "rovinato") {
                temp = temp - (temp*10/100);
              }
              
              this.total = temp;
              this.euro = '€';
              this.payment = true;
            }
            else {
              if(this.parentData.status == "rotto")
                this.total = "imbarcazione non disponibile";
              else
                this.total = "date già occupate";
            //console.log("PRODOTTO NOLEGGIATO IN QUESTE DATE: CHE FARE?");
            }
          //})

      }
      else {
        this.total = temp;
        this.euro = '€';
      }
    }*/

  },

  /*defineSeason(i) {

    let Hdays = 0;
    var date = new Date(this.startD);

    while (i>0) {

      if (date.getMonth() >= 5 && date.getMonth() <= 9) { 
        //NOTA BENE: I MESI PARTONO DA 0 QUINDI MAGGIO=4 E SETTEMBRE=8
        Hdays = Hdays + 1;
      }

      date.setDate(date.getDate() + 1);

      i--;

    }

    return(Hdays);

  },*/

  useDiscount() {

    var temp = 0;

    if(this.sconto) {

      temp = this.total - (this.total*this.$store.state.discount/100);

      this.total = temp;
      this.rentDiscount = this.rentDiscount + this.$store.state.discount;
    }

  },

  pay(tipo) {
    
    if(tipo) {
      this.paymethod = tipo;

      this.$bvModal.show("recapModal");
    }

  },

  createRent() {
    console.log("ciao");

    this.newRent = { product: this.parentData.prod_id, client: this.$store.state.username, worker: false, start: this.startD, 
      end: this.endD, price: this.total, pay: this.paymethod, approved: false, discount: this.rentDiscount };

    //console.log(this.newRent);

    axios.post('/new-rent', this.newRent)
      .then(() => {
                  
      })
      .catch((error) => {
        //this.loading = false;
        console.log(error);
      });

    if(this.sconto) {

      //bisogna rimuovere lo sconto dal db e da localStorage!!
      axios.post('/remove-discount', {clientID: this.$store.state.username})
          .then((response) => {
            //console.log(response.data);
            console.log(response);

            this.$store.state.discount = null;

          })
          .catch((error) => {
            
            console.log(error);
          });


          localStorage.setItem('CurrentUser', JSON.stringify(this.$store.state.username));

    }

      this.$router.push({
          path: '/profile',
        });

  }

  /*check(noleggi) {

    var myrent_sdate = new Date(this.startD);
    var myrent_edate = new Date(this.endD);

    var disponibile = true;

    noleggi.forEach(item => {

      if((myrent_sdate >= item.start_date && myrent_sdate <= item.end_date) ||
        (myrent_edate >= item.start_date && myrent_edate <= item.end_date) ) {

          disponibile = false;
      }

    })

    console.log("dentro è:" + disponibile);

    return(disponibile);

  }*/

}


//chiude l'export
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*#rent_page {
  padding-top: 4em;
}*/

#discountTab {
  padding: 1em;
}

#backBtn {
  height: 3em;
  width: 7em;
  padding: 0.5em;
}

#payBtn {
  width: 100%;
  margin: 1em;

  background-color: transparent !important;
  color: black !important;
  /*border: none !important;
  border-color: transparent !important;*/
}

#payBtn:hover {
  background-color: lightgray !important;
}

#total-price {
  padding: 0.5em;
  padding-left: 1.5em;
}

#payTab {
  padding: 1em;
  margin-top: 1em;
  background-color: rgb(252, 191, 191);
  border-radius: 4px;
}

#disclaimer {
  background-color: rgb(252, 191, 191);
  border-radius: 4px;
  padding: 0.5em;
  margin: 1em;

  font-size: 12px;
}

#calculate {
  padding: 0.5em;
}

.b-card-footer {
    justify-content: center;
}

/**** gestisce i div con le immagini e i dati degli yacht *****/
.boat-images {
    /*background-color: lightgrey;*/
    float: left;
    border: 1px solid #86B3D1;
    /*border-radius: 1rem;*/
    margin: 2% 2% 0 2%; /*(up-right-down-left)*/
    /*padding: 1rem;*/
    /*width: 20%;*/
    overflow: auto;
    /*height: 70vh;*/

    width: 50%;

    /*z-index: -1;*/
}

.data, .title{
    font-family: "Dejavu Sans", Tahoma, Geneva, Verdana, sans-serif;
    color: #5F6366;
    padding-left: 1rem;
}

.data {
    font-weight: normal;
}

.d-flex {
    list-style: none;
    display: flex;
    border-top: 1px solid #86B3D1;
}

.post_image {
    width: 100%;
    padding-bottom: 0.2rem;
    /*border-radius: 0.2rem;*/
    object-fit: cover;
    height: 30vh;
}

.price_data  {
    /*visibility: hidden;*/
    display: none;
}

#priceTab {
  height: 3em;
  vertical-align: center;
}

.b-modal {
    background: #EDB5BF !important;
    color: #000 !important;
    /*width: 20em;*/
    /*margin: 20vw;*/
    border-radius: 5% !important;
}

#modal-container {
  justify-content: center;
}

#rent_page {
  flex-direction: column;
  align-items: center;

  margin-bottom: 3em;
}

@media screen and (max-width: 800px) {

  .boat-images {
    width: auto;
  }

}

@media screen and (max-width: 500px) {

  .boat-images {
    width: auto;
  }

}


</style>
