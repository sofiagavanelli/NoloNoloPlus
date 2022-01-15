<template>
  <div>


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
                <div class="price_data"> <li class="title"> Prezzo: 
                  <h5 class="data"> {{this.parentData.price}} </h5> </li> 
                </div>
              </ul>
            </div>
          </b-card-body>

          <div id="calculate" class="flex-container">
            <label for="start-datepicker">Inizio noleggio</label>
            <b-form-datepicker id="start-datepicker" v-model="startD" class="mb-2"></b-form-datepicker>
            <label for="end-datepicker">Fine noleggio</label>
            <b-form-datepicker :min="startD" id="end-datepicker" v-model="endD" class="mb-2"></b-form-datepicker>
          </div>

      </b-card>

    <!-- scelte multiple per scegliere e calcolare il rent -->

      

    </div>

    
  </div>
</template>

<script>
import axios from '../http'

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

    };
  },

mounted() {

  scroll(0, 0);

},

methods: {

  emitToParent (event) {
    this.$emit('childToParent')
  }

}


//chiude l'export
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#rent_page {
  padding-top: 4em;
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
