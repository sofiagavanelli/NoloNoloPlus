<template>
  <div>

    <p> PROVA  </p>

    <div id="rent_page" class="flex-container">

    <b-card class="boat-images" v-for="item in prodInfo" :key="item.prod_id">
          <img class="post_image" :src="item.image" alt="Card image cap">
          <b-card-body>
            <h3 class="title"> {{item.name}} </h3>
            <h4 class="title"> {{item.brand}} </h4>
            <div class="details">
              <ul class="d-flex flex-wrap pl-0" >
                <li class="title">Potenza:<h5 class="data"> {{item.power}} </h5> </li>
                <li class="title">Lunghezza:<h5 class="data"> {{item.length}} </h5> </li>
                <li class="title">Ospiti:<h5 class="data"> {{item.guests}} </h5> </li>
                <li class="title">Anno:<h5 class="data"> {{item.year}} </h5> </li>
                <div class="price_data"> <li class="title"> Prezzo: 
                  <h5 class="data"> {{item.price}} </h5> </li> 
                </div>
              </ul>
            </div>
          </b-card-body>

        </b-card>

        <!--b-card class="boat-images">
          <img class="post_image" :src="prodInfo.image" alt="Card image cap">
          <b-card-body>
            <h3 class="title"> {{prodInfo.name}} </h3>
            <h4 class="title"> {{prodInfo.brand}} </h4>
            <div class="details">
              <ul class="d-flex flex-wrap pl-0" >
                <li class="title">Potenza:<h5 class="data"> {{prodInfo.power}} </h5> </li>
                <li class="title">Lunghezza:<h5 class="data"> {{prodInfo.length}} </h5> </li>
                <li class="title">Ospiti:<h5 class="data"> {{prodInfo.guests}} </h5> </li>
                <li class="title">Anno:<h5 class="data"> {{prodInfo.year}} </h5> </li>
                <div class="price_data"> <li class="title"> Prezzo: 
                  <h5 class="data"> {{prodInfo.price}} </h5> </li> 
                </div>
              </ul>
            </div>
          </b-card-body>

        </b-card-->
    </div>

    
  </div>
</template>

<script>
import axios from '../http'

export default {
  name: 'RentPage',
  data() {
    return {
      prodInfo: [],
      tryID: "PROD003",
      //idForRent: Number
      //slide: 0,
      //sliding: null,

      //isHidden:true
    };
  },

mounted() {
  
  axios.get('/prod/' + this.tryID)
  
    .then((response) => {
      this.prodInfo = response.data;
      console.log(this.prodInfo);
          //this.sortArray();
          //this.loading = false;
          //document.getElementById('ricerca').value = '';
    })
    .catch((error) => {
      //this.loading = false;
      console.log(error);
    });


},

methods: {


}


//chiude l'export
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

    z-index: -1;
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
