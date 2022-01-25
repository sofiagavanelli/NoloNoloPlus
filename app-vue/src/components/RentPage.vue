<template>

    <div id="rent_page" class="flex-container">

      <b-button v-on:click="emitToParent">
        <font-awesome-icon icon="arrow-left" /> PRODOTTI
      </b-button>

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
            <label for="start-datepicker">Inizio noleggio</label>
            <b-form-datepicker :min="new Date()" id="start-datepicker" v-model="startD" class="mb-2"></b-form-datepicker>
            <label for="end-datepicker">Fine noleggio</label>
            <b-form-datepicker :min="startD" id="end-datepicker" v-model="endD" class="mb-2"></b-form-datepicker>

            <div id="priceTab" class="flex-container">
              <b-button v-on:click="calc()">TOTALE: </b-button>
              <div id="total-price">
                <h5> {{total}} € </h5>
              </div>

              <template v-if="this.payment">
                <!--b-button id="payBtn" v-on:click="pay()">scegli metodo di pagamento</b-button-->
                <b-dropdown toggle-class='customDropdown' text="metodo di pagamento" variant='none'> 
                  <!--b-form-checkbox-group v-on:click="pay()" v-model="selected" :options="type"></b-form-checkbox-group-->
                  <b-dropdown-item-button v-for="item in this.type" :key="item.value" v-on:click="pay(item.value)"> {{item.text}} </b-dropdown-item-button> 
                </b-dropdown>

              </template>
            </div>

            

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


    <!-- scelte multiple per scegliere e calcolare il rent -->

    </div>

</template>

<script>
import axios from '../http'

import client from '../user-data'


export default {
  name: 'RentPage',
  props: {
    parentData: '',
  },
  data() {
    return {
      loading: true,

      startD: '',
      endD: '',

      home: true,

      total: '//',

      payment: false,

      //disponibile: true,

      foundRents: [],

      newRent: [],

      selected: '',
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

},

methods: {

  controlDate() {

    var prova

    axios.get('/rentByProd/' + this.parentData.prod_id)
      .then((response) => {
        //this.foundRents = response.data;
        var noleggi = response.data;

        //return(this.check(this.foundRents));
        //return(this.check(this.foundRents));

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
      });
      /*.catch((error) => {
            //this.loading = false;
        console.log(error);
      })

    /*console.log("fuori dalla get il valore è:" + prova);

    return prova;*/

  },

  calc() {

      const diffInMs   = new Date(this.endD) - new Date(this.startD);
      const diffInDays = (diffInMs / (1000 * 60 * 60 * 24)) + 1; //+1 perché conto la data di partenza

      let highDays = this.defineSeason(diffInDays);

      let temp = (this.parentData.high_season * (highDays)) + (this.parentData.low_season * (diffInDays - highDays));

      if(this.$store.state.username) {

        if(this.parentData.discount) {
          temp = temp - (temp*this.parentData.discount/100);
        }

        /*if(this.controlDate()) { 
          this.total = temp;
          this.payment = true;
          else {
          this.total = "non disponibile";
          //console.log("PRODOTTO NOLEGGIATO IN QUESTE DATE: CHE FARE?");
        }
          */

          /*.then((valid) => {
                if (valid) // do something
              // other validations here
              //  save
            })*/

        this.controlDate()
          .then((valid) => {
            if(valid) {
              this.total = temp;
              this.payment = true;
            }
            else {
              this.total = "non disponibile";
            //console.log("PRODOTTO NOLEGGIATO IN QUESTE DATE: CHE FARE?");
            }
          })

      }
      else {
        this.total = temp;
      }

  },

  defineSeason(i) {

    let Hdays = 0;
    var date = new Date(this.startD);

    while (i>0) {

      if (date.getMonth() >= 4 && date.getMonth() <= 8) { 
        /*NOTA BENE: I MESI PARTONO DA 0 QUINDI MAGGIO=4 E SETTEMBRE=8*/
        Hdays = Hdays + 1;
      }

      date.setDate(date.getDate() + 1);

      i--;

    }

    return(Hdays);

  },

  emitToParent (event) {
    this.$emit('childToParent')
  },

  pay(tipo) {
    console.log("inside pay: " + tipo);

    /*const client = req.body.client;
      const prod = req.body.product; 
      const startdate= req.body.start;
      const enddate= req.body.end; */

    this.newRent = [ { prod: this.parentData.prod_id, client: this.$store.state.username, start: this.startD, end: this.endD, pay: tipo}];

    //TODO CREARE NOLEGGIO
    axios.post('/new-rent', this.newRent)
      .then(() => {

        this.$router.push({
          path: '/profile',
        });
                  
      })
      .catch((error) => {
                //this.loading = false;
        console.log(error);
      });


  },

  check(noleggi) {

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

  }

}


//chiude l'export
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*#rent_page {
  padding-top: 4em;
}*/

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
    margin: 4% 2% 0 2%; /*(up-right-down-left)*/
    /*padding: 1rem;*/
    /*width: 20%;*/
    overflow: auto;
    /*height: 70vh;*/

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


</style>
