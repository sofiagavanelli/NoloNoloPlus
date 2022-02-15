<template>
<div id="contedit" class="flex-container">

  <div id="edit_rent" class="flex-container">

  <!--div> {{rentToEdit}} </div-->

      <img class="post_image" :src="this.url + 'prodotti/' + rentToEdit.prod_id + this.ex" alt="Card image cap">

      <h3 class="title"> PRODOTTO: {{rentToEdit.prod_id}} </h3> 
      <div class="details">
        <ul class="d-flex flex-wrap pl-0" >
          <li class="title"> DATA INIZIO: <h5 class="data"> {{rentToEdit.start_date.slice(0,10)}} </h5> 
            <!--b-form-input v-model="newInfo[0]" placeholder="Modifica Inizio"></b-form-input-->
            <b-form-datepicker :min="new Date()" id="start-datepicker" v-model="newInfo[0]" class="mb-2"></b-form-datepicker> 
          </li>
          <li class="title"> DATA FINE: <h5 class="data"> {{rentToEdit.end_date.slice(0,10)}} </h5> 
            <b-form-datepicker :min="newInfo[0]" id="end-datepicker" v-model="newInfo[1]" class="mb-2"></b-form-datepicker>
            <!--b-form-input v-model="newInfo[1]" placeholder="Modifica Fine"></b-form-input--> 
          </li>
          <li class="title"> PREZZO: <h5 class="data"> {{rentToEdit.price}}€ </h5> </li>
            <!--b-form-input v-model="newInfo[0]" placeholder="Modifica Prodotto"></b-form-input-->

          <li class="title"> METODO DI PAGAMENTO: <h5 class="data"> {{rentToEdit.paymethod}} </h5> 
          <b-dropdown text="Pagamento" variant='none'> 
            <b-form-checkbox-group v-model="newInfo[2]" :options="type"> {{type.text}} </b-form-checkbox-group> 
          </b-dropdown>

            <!--b-form-input v-model="newInfo[2]" placeholder="Modifica Metodo di Pagamento"></b-form-input> </li-->
          <li class="title"> APPROVAZIONE: <h5 class="data"> {{rentToEdit.approved}} </h5> </li>
            <!--b-form-input v-model="newInfo[0]" placeholder="Modifica Prodotto"></b-form-input-->
        </ul>
      </div>

      <div class="flex-container"> 
        <b-button id="saveBtn" v-on:click="saveRent()"> salva </b-button>

        <router-link id="toProfile" tag="b-button" aria-labelledby="profileLabel" to="/profile">
          INDIETRO
        </router-link>

        <div>
          <h5 id="response"> {{response}} </h5>
        </div>
      </div>

  </div>

</div>
</template>

<script>
import axios from '../http'

import {calc} from '../utils'

export default {
  name: 'EditRent',
  data() {
    return {

      response: '',
      
      /*newstartD: '',
      newendD: '',*/

      newInfo: [],
      product: {},

      url: "https://site202133.tw.cs.unibo.it/img/",
      ex: ".jpg",

      noleggi: [],

      //checked: '',
        type: [ 
          { value: null, text: 'Lascia invariato' },
          { value: 'paypal', text: 'PayPal' },
          { value: 'carta', text: 'Carta di credito' },
          { value: 'satispay', text: 'Satispay' },
          { value: 'bonifico', text: 'Bonifico' } ],
    };
  },
  components: {
  },
  props: ['rentToEdit'],

  mounted() {

    axios.get('/rentByProd/' + this.rentToEdit.prod_id)
    .then((response) => {
        this.noleggi = response.data;
    });

    axios.get('/prods/' + this.rentToEdit.prod_id)
    .then((response) => {
        this.product = response.data[0];
    });


  },

  methods: {

    saveRent() {

      var update = {_id: this.rentToEdit._id, start: this.rentToEdit.start_date, end: this.rentToEdit.end_date, price: this.rentToEdit.price, paymethod: this.rentToEdit.paymethod};

      var changed = [];

        for(let i=0; i<8; i++) {
          if(this.newInfo[i] && this.newInfo[i].length > 3)
            changed[i] = true;
        }

        if(changed[0]) update.start = this.newInfo[0];
        if(changed[1]) update.end = this.newInfo[1];

        if(changed[0] || changed[1]) {

          var result = calc(update.start, update.end, this.product, true, this.noleggi);

          this.response = result.err || result.total;

          //console.log(result);

          if(changed[2]) update.paymethod = this.newInfo[2];

          if(!result.err) {

            update.price = result.total;

            console.log(update);

            axios.post('/update-rent', update)
              .then((response) => {
                
              })
              .catch((error) => {
                //this.loading = false;
                console.log(error);
              });

          }

        }

    }

  }

}

</script>

<style scoped>

/*#disclaimer {
  background-color: rgb(252, 191, 191);
  border-radius: 4px;
  padding: 0.5em;
  margin: 1em;

  font-size: 12px;
}*/

#response {
  padding: 0.5em;
}

.b-dropdown {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: #6c757d;
}

.button {
  margin: 0.5em !important;
} 

.post_image {
    border-radius: 4px;

    width: 100%;
    /*padding-bottom: 0.2rem;*/
    /*border-radius: 0.2rem;*/
    object-fit: cover;
    height: 30vh;

    margin-bottom: 1em;
}

#edit_rent {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2em;

  width: 50%;

  padding: 2em;

  border: 1px solid /*#4D6D9A*/ #86B3D1;
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
    border-top: 1px solid /*#4D6D9A*/ #86B3D1;
}

#saveBtn {
  margin-right: 1em !important;
}

@media screen and (max-width: 800px) {

  #edit_rent {
    width: auto;
  }

}

@media screen and (max-width: 500px) {

  #edit_rent {
    width: auto;

    margin-top: 1em;

  }

}

</style>
