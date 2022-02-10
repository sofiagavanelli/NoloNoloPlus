<template>
<div id="contedit" class="flex-container">

  <div id="edit_rent" class="flex-container">

  <!--div> {{rentToEdit}} </div-->

      <img class="post_image" :src="this.url + 'prodotti/' + rentToEdit.prod_id + this.ex" alt="Card image cap">

      <h3 class="title"> PRODOTTO: {{rentToEdit.prod_id}} </h3> 
      <div class="details">
        <ul class="d-flex flex-wrap pl-0" >
          <li class="title"> DATA INIZIO: <h5 class="data"> {{rentToEdit.start_date.slice(0,10)}} </h5> 
            <b-form-input v-model="newInfo[0]" placeholder="Modifica Inizio"></b-form-input> </li>
          <li class="title"> DATA FINE: <h5 class="data"> {{rentToEdit.end_date.slice(0,10)}} </h5> 
            <b-form-input v-model="newInfo[1]" placeholder="Modifica Fine"></b-form-input> </li>
          <li class="title"> PREZZO: <h5 class="data"> {{rentToEdit.price}}€ </h5> </li>
            <!--b-form-input v-model="newInfo[0]" placeholder="Modifica Prodotto"></b-form-input-->
          <li class="title"> METODO DI PAGAMENTO: <h5 class="data"> {{rentToEdit.paymethod}} </h5> 
            <b-form-input v-model="newInfo[2]" placeholder="Modifica Metodo di Pagamento"></b-form-input> </li>
          <li class="title"> APPROVAZIONE: <h5 class="data"> {{rentToEdit.approved}} </h5> </li>
            <!--b-form-input v-model="newInfo[0]" placeholder="Modifica Prodotto"></b-form-input-->
        </ul>
      </div>

      <div class="flex-container"> 
        <b-button v-on:click="saveRent()"> salva </b-button>

        <router-link id="toProfile" tag="b-button" aria-labelledby="profileLabel" to="/profile">
          INDIETRO
        </router-link>
      </div>

  </div>

</div>
</template>

<script>
import axios from '../http'

export default {
  name: 'EditRent',
  data() {
    return {
      newInfo: [],
      product: [],

      url: "https://site202133.tw.cs.unibo.it/img/",
      ex: ".jpg",
    };
  },
  components: {
  },
  props: ['rentToEdit'],

  mounted() {

    /*axios.get('/prods/' + this.rentToEdit.prod_id)
      .then((response) => {
        this.product = response.data;

        console.log(this.product);

        //TODO: SECONDO ME SI PUO CARICARE NEL DB DIRETTAMENTE COSI FIN DALL'INIZIO: SI GENERA L'URL
        this.product[0].image = this.url + this.product[0].category + '/' + this.product[0].prod_id + this.ex;

      })
      .catch((error) => {
        //this.loading = false;
        console.log(error);
      });*/

  },

  methods: {

    saveRent() {

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
