<template>
  <div>

      <template v-if="normal">

        <div id="introduzione" class="flex-container"><!--QUESTO LO VEDE -->
          <br>
          NoloNoloPlus, fondata nel 2021 a Bologna, è specializzata nel noleggio di imbarcazioni nel Mediterraneo. Sfogliate la nostra ampia selezione di barche a noleggio per 
          tutti i portafogli. Contattateci per qualsiasi richiesta - vi garantiamo la risposta più veloce del settore.
        </div>

        <div> 
          <SearchBar v-on:childToParent="filter"  />
        </div>

        <template v-if="!this.showInfo[0]">

          <div id="disclaimer" class="flex-container">
            <font-awesome-icon icon="exclamation-circle" />
            <h6> NON ESISTE IMBARCAZIONE CHE RISPETTI I CRITERI DI RICERCA </h6>
          </div>

        </template>
        
        <template v-else>
        <div id="main_page" class="flex-container">

          <b-card v-for="(item, index) in showInfo" :key="item.prod_id" class="boat-images">
              <router-link id="toRent" aria-labelledby="rentLabel" :to="{ name: 'rentPage', params: { parentData: showInfo[index] }}" >
              <!-- PER LA SRC DELL'IMAGE: src="https://site202133.tw.cs.unibo.it/img/${ProdInfo[i].category}/${ProdInfo[i].prod_id}.jpg" 
              PRIMA: :src="item.image"
              PROVA: :src="this.url + item.category + '/' + item.prod_id + this.ex"-->
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

              <!--b-card-footer>
                <b-button type="button" v-on:click="change(index)" class="noleggioBtn" :id="index">
                  NOLEGGIA
                </b-button>
              </b-card-footer-->
            </router-link>

          </b-card>



          </div>
        </template>

      </template>

      <!--template v-else-if="!normal">

        <RENTPAGE si passa selectedID >
        <RentPage :parentData="mydata" v-on:childToParent="onChildBack" />
        <PER ALLEGGERIRE QUESTO COMPONENTE>

      </template-->

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
      url: "https://site202133.tw.cs.unibo.it/img/",
      ex: ".jpg",

      prodInfo: [],
      showInfo: [],
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

    if(localStorage.getItem('CurrentUser')) {
      this.$store.state.username = JSON.parse(localStorage.getItem('CurrentUser'));
    }
  
    axios.get('/prods')
      .then((response) => {
        this.prodInfo = response.data;

        //TODO: SECONDO ME SI PUO CARICARE NEL DB DIRETTAMENTE COSI FIN DALL'INIZIO: SI GENERA L'URL
        this.prodInfo.forEach(elem => {
          elem.image = this.url + 'prodotti/' + elem.prod_id + this.ex;
        });

        this.showInfo = response.data;

      })
      .catch((error) => {
        //this.loading = false;
        console.log(error);
      });

  },

  methods: {

    /*onChildBack() {
      this.normal = !this.normal;
    },*/

    /*change(__id) {

      this.mydata = this.prodInfo[__id];
      //this.mydata[1] = this.prodInfo;

      this.normal = !this.normal;

    },*/

    filter(data) {

      console.log(data);

      if(data == "reset") {

        this.showInfo = this.prodInfo;

      }
      else {
        var ok_category = [];
        var j = 0;
        
        if(data[0][0]) {
          this.showInfo.forEach(elem => {

            if( elem.category == data[0][0] || elem.category == data[0][1] || elem.category == data[0][2] ) {
              ok_category[j] = elem;

              j++;
            }

          });
        }
        else  ok_category = this.showInfo;

        var second_control = [];
        var k = 0;

        if(data[1][0]) {

          console.log(data[1]);

          ok_category.forEach(elem => {

            if( (data[1][0]-5 <= elem.guests && elem.guests <= data[1][0]) ||  (data[1][1]-5 <= elem.guests && elem.guests <= data[1][1])
            || (data[1][2]-5 <= elem.guests && elem.guests <= data[1][2]) || (data[1][3]-5 <= elem.guests && elem.guests <= data[1][3]) ) {

              second_control[k] = elem;

              k++;

            }

          });
        }
        else  second_control = ok_category;

        var third_control = [];
        var l = 0;

        if(data[2][0]) {

          second_control.forEach(elem => {

            if( (data[2][0]-10 <= elem.year && elem.year <= data[2][0]) ||  (data[2][1]-10 <= elem.year && elem.year <= data[2][1])
            || (data[2][2]-10 <= elem.year && elem.year <= data[2][2]) || (data[2][3]-10 <= elem.year && elem.year <= data[2][3]) ) {

              third_control[l] = elem;

              l++;

            }

          });

        }
        else  third_control = second_control;

        //( data[1][0]-5 >= elem.guests && elem.guests <= data[1][0]) ||  (data[1][1]-5 >= elem.guests && elem.guests <= data[1][1]) || (data[1][2]-5 >= elem.guests && elem.guests <= data[1][2]) || (data[1][3]-5 >= elem.guests && elem.guests <= data[1][3])

        this.showInfo = third_control;
      }

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

    /*QUANDO E GRANDE*/;
    width: 25vw;
}

.boat-images:hover {
  transform: scale(1.1);
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

#disclaimer {
  background-color: rgb(252, 191, 191);
  border-radius: 4px;
  padding: 0.5em;
  margin: 1em;

  font-size: 12px;
}

@media screen and (max-width: 800px) {

  .boat-images {
    width: 40vw;
  }

}

@media screen and (max-width: 500px) {

  .boat-images {
    width: auto;
  }

  .boat-images:hover {
    transform: none;
  }

}


</style>
