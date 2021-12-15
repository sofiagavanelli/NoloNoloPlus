<template>
  <div>

    <div id="main_page" class="flex-container">

      <!-- con schermo cellulare --
      <template v-if="$mq === 'mobile'">
        
        <-- simple carousel "#ababab"--
        <b-carousel id="smallboat" controls no-animation :interval="0" background-color="green">
        <!- v-model="slide" :interval="0" controls indicators--

          <b-carousel-item >
                <b-carousel-slide v-for="item in prodInfo" :key="item.index">
                  <b-card>
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
                  </b-card>
                </b-carousel-slide>

          </b-carousel-item>

        </b-carousel>

        <p class="mt-4">
        Slide #: {{ slide }}<br>
        Sliding: {{ sliding }}
        </p>

        <!-b-card v-for="item in prodInfo" :key="item.prod_id">
          <img class="post_image" :src="item.image" alt="Card image cap">

          <div class="card-body">
            <h3 class="title"> PROVA </h3>
            <h4 class="title"> {PROVA2} </h4>
          </div>

        </b-card->

      </template-->  
      
      <!-- a schermo normale v-else-->
      <template v-if="toggle">
        <!--proviamo il vfor -- cos'è la key? -->
        <b-card v-for="(item, index) in prodInfo" :key="item.prod_id">
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

          <b-card-footer >
            <b-button v-on:click="getID(index)" type="button" class="noleggioBtn" :id="index">
              NOLEGGIA {{index}}
            </b-button>
          </b-card-footer>

        </b-card>
      </template>

      <template v-else-if="!toggle">
        <p> prova </p>
      </template>


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
      //slide: 0,
      //sliding: null,
      selectedID: null,
      toggle: true,
    };
  },

mounted: function() {

  //this.sendClickedId();

  
  axios.get('/prods', {
      
  })
  
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

  getID(__id) {
    console.log("sono dentro getID in intropage");
    this.selectedID = __id;
    console.log( __id);

    //this.sendClickedId();

    toggle=!toggle;

  },

  change() {

    toggle=!toggle;

  }

  /*sendClickedId() {
    console.log("sono dentro clicked id di intropage");
    this.$emit("id-to-rent", this.selectedID);

    console.log("sono ANCORA dentro clicked id di intropage");

  }*/

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


@media screen and (max-width: 900px) {

    * {
        font-size: 20px;
    }

    #calcBtn {
        float: right;
        position: fixed;
        left: 80vw;
        right: 10vw ! important;
        /*margin-bottom: 2rem;*/
        width: 5rem;
        height: 5rem;
    }

    .boat-images, .b-card {
        background-color: red;
        float: left;
        border: 1px solid #86B3D1;
        /*border-radius: 1rem;*/
        /*margin: 4% 0 0 4%;*/
        align-self: center;
        /*padding: 1rem;*/
        width: 40%;
        overflow: auto; 
        height: 70vh;
    }
}


/*mobile first*/
#smallboat {
  width: 80vw;
}

.b-carousel-slide {
  width: 100%;
}

.carousel-item {
  display: block;
  height: 70vh;
}



</style>
