<template>
<div>

  <div>
    <Navbar />
  </div>

  <div id="introduzione" class="flex-container">
    NoloNoloPlus, fondata nel 2021 a Bologna, è specializzata nel noleggio di yacht nel Mediterraneo. 
    L’azienda è orgogliosa di selezionare con cura ogni yacht di lusso e di conoscere ognuna delle imbarcazioni proposte. Sfogliate la nostra ampia selezione di yacht a noleggio con 
    equipaggio. Contattateci per qualsiasi richiesta – vi garantiamo la risposta più veloce del settore.
  </div>

  
  <div>
      <!--QUI APPAIONO LE COSE!  id="main_page" class="flex-container"-->
      <!-- e qui poi inserisco i vari componenti diversi    v-show="!toggle" v-show="toggle" -->
      <IntroPage v-show="!toggle"  @id-to-rent="captureID" />
      <RentPage v-show="toggle" />
  </div>

  <div id="calcolatrice">
    <!--devo far aprire il component al click-->
    <b-button id="calcBtn" data-toggle="modal" data-target="#calcModal">
      <!--non funziona font awesome -->
      <font-awesome-icon icon="calculator" />
    </b-button>
  </div>



  <footer>
    <div class="flex-container" id="footer">
      <div class="element">
        <h3 class="title">CONTATTI </h3> 
          nolonoloplus.yacht@gmail.com
      </div>
      <div class="element">
        <h3 class="title">DOVE TROVARCI </h3> 
          Mura Anteo Zamboni, Bologna
      </div>
      <div class="element">
        <h3 class="title">SOCI </h3> 
          Francesca Chiriacò <br> Sofia Gavanelli <br> Federica Palestini
      </div>
      </div>
  </footer>

</div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import IntroPage from './components/IntroPage.vue'
import RentPage from './components/RentPage.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    IntroPage,
    RentPage,
    toggle: false,
    rentId: Number
  },

  mounted: function() {


  },

  methods: {

    captureID(_id) {
      console.log(_id);
      this.rentId = _id;

      if(rentId)
        toggle = !toggle;
        
    }

    
  }

}
</script>

<style>

*, .btn {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;

    font-size: 15px;

    margin: 0;

    border: 1px solid red;
}

.b-button:focus{
    outline:none !important;
}

#introduzione { /*(up-right-down-left)*/
    margin-top: 4em;
    padding: 0.5em 3em 1em 3em;
}

.flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

#main_page, #nB {
    justify-content: center;
}

#main_page {
    padding-bottom: 4vh;
}

#calcBtn {
    float: right;
    position: fixed;
    bottom: 10vh;
    left: 90vw;;
    /*margin-bottom: 2rem;*/
    background-color: #4D6D9A;
    box-shadow: 0px 0px 11px white;
    color: white;
    outline: none;
    border: none;
    border-radius: 3rem;
    width: 5rem;
    height: 5rem;
}

#footer {
    /*(up-right-down-left)*/
    justify-content: space-around;

    background-color: lightcyan;
    padding: 3vh 5vw 3vh 5vw;
}

</style>
