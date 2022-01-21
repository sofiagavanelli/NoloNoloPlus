<template>
  <div>

      <template v-if="normal">

        <div id="introduzione" class="flex-container"><!--QUESTO LO VEDE -->
          <br>
          NoloNoloPlus, fondata nel 2021 a Bologna, è specializzata nel noleggio di imbarcazioni nel Mediterraneo. Sfogliate la nostra ampia selezione di barche a noleggio per 
          tutti i portafogli. Contattateci per qualsiasi richiesta - vi garantiamo la risposta più veloce del settore.
        </div>

        <div> 
          <SearchBar />
        </div>

        <div id="main_page" class="flex-container">
          
            <b-card v-for="(item, index) in prodInfo" :key="item.prod_id" class="boat-images">
              <img class="post_image" :src="item.image" alt="Card image cap">
              <b-card-body>
                <h3 class="title"> {{item.name}} </h3>
                <h4 class="title"> {{item.brand}} </h4>
                <div class="details">
                  <ul class="d-flex flex-wrap pl-0" >
                    <li class="title">Velocità:<h5 class="data"> {{item.speed}} </h5> </li>
                    <li class="title">Lunghezza:<h5 class="data"> {{item.length}} </h5> </li>
                    <li class="title">Ospiti:<h5 class="data"> {{item.guests}} </h5> </li>
                    <li class="title">Anno:<h5 class="data"> {{item.year}} </h5> </li>
                    <!--template v-if="this.$store.state.username"-->
                      <!--li class="title"> Prezzo: <h5 class="data"> {{item.price}} </h5> </li--> 
                    <!--/template-->
                  </ul>
                </div>
              </b-card-body>

              <b-card-footer>
              <!--b-input-group-->
                <b-button type="button" v-on:click="change(index)" class="noleggioBtn" :id="index">
                  NOLEGGIA
                </b-button>
              <!--/b-input-group-->
              </b-card-footer>

            </b-card>

          </div>

      </template>

      <template v-else-if="!normal">

        <!-- a RENTPAGE si passa selectedID -->
        <RentPage :parentData="mydata" v-on:childToParent="onChildBack" />
        <!--PER ALLEGGERIRE QUESTO COMPONENTE-->

      </template>

      <!--TODO: FARE UN ALTRO V-IF CHE GESTISCE LA VISIONE FILTERED-->
      <!--template v-if="filtered">

      </template-->

      <footer>
        <div class="flex-container" id="footer">
          <div class="element">
            <h3 class="title">CONTATTACI </h3> 
              nolonoloplus.yacht@gmail.com
          </div>
          <!--div class="element">
            <h3 class="title">DOVE TROVARCI </h3> 
              Mura Anteo Zamboni, Bologna
          </div>
          <div class="element">
            <h3 class="title">SOCI </h3> 
              Francesca Chiriacò <br> Sofia Gavanelli <br> Federica Palestini
          </div-->
          </div>
      </footer>
    
  </div>
</template>

<script>
import axios from '../http'
import client from '../user-data'

import SearchBar from './SearchBar.vue'
import RentPage from './RentPage.vue'

export default {
  name: 'IntroPage',
  components: {
    SearchBar,
    RentPage,
  },
  data() {
    return {
      prodInfo: [],
      //slide: 0,
      //sliding: null,
      normal:true,
      mydata: '',
      filtered: false,
      filterProd: [],
      //toggle: true,
    };
  },

  mounted() {

    console.log("sono dentro mounted");
  
    axios.get('/prods')
      .then((response) => {
        this.prodInfo = response.data;
      })
      .catch((error) => {
        //this.loading = false;
        console.log(error);
      });

  },

  methods: {

    onChildBack() {
      this.normal = !this.normal;
    },

    change(__id) {

      this.mydata = this.prodInfo[__id];
      //this.mydata[1] = this.prodInfo;

      this.normal = !this.normal;

    },

    filter() {
      console.log("hai cliccato su filtra");
    }


  },


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
  box-shadow: 0px 0px 4px lightgrey;
    /*background-color: lightgrey;*/
    float: left;
    border: 1px solid #86B3D1;
    /*border-radius: 0.5rem;*/
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
