<template>
  <div>

    <div id="main_page" class="flex-container">
      
        <!--proviamo il vfor -- cos'è la key? -->
        <div class="card" v-for="item in prodInfo" :key="item.prod_id">
          <img class="post_image" :src="item.image" alt="Card image cap">
          <div class="card-body">
            <h3 class="title"> {{item.name}} </h3>
            <h4 class="title"> {{item.brand}} </h4>
            <div class="details">
              <ul class="d-flex flex-wrap pl-0">
                <li class="title">Potenza:<h5 class="data"> {{item.power}} </h5> </li>
                <li class="title">Lunghezza:<h5 class="data"> {{item.length}} </h5> </li>
                <li class="title">Ospiti:<h5 class="data"> {{item.guests}} </h5> </li>
                <li class="title">Anno:<h5 class="data"> {{item.year}} </h5> </li>
                <div class="price_data"> <li class="title"> Prezzo: 
                  <h5 class="data"> {{item.price}} </h5> </li> 
                </div>
              </ul>
            </div>
          </div>

          <div class="card-footer">
            <b-button type="button" class="noleggioBtn" id="problem">
              NOLEGGIA
            </b-button>
          </div>

        </div>


    </div>

    
  </div>
</template>

<script>
import axios from '../http'

export default {
  name: 'IntroPage',
  data() {
    return {
      prodInfo: [],
    };
  },

mounted: function() {
  
  axios.get('/prods', {
      
  })
  
    .then((response) => {
      this.prodInfo = response;
      console.log(response);
          //this.sortArray();
          //this.loading = false;
          //document.getElementById('ricerca').value = '';
    })
    .catch((error) => {
      //this.loading = false;
      console.log(error);
    });


}


//chiude l'export
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card-footer {
    justify-content: center;
}

/**** gestisce i div con le immagini e i dati degli yacht *****/
.boat-images, .card, .carousel-item {
    /*background-color: lightgrey;*/
    float: left;
    border: 1px solid #86B3D1;
    /*border-radius: 1rem;*/
    margin: 4% 2% 0 2%; /*(up-right-down-left)*/
    /*padding: 1rem;*/
    width: 20%;
    overflow: auto;
    height: 70vh;

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
    height: 20vh;
}

.price_data  {
    /*visibility: hidden;*/
    display: none;
}




</style>
