<template>
<div>

  <div> <!--QUESTO LO VEDE -->
    <Navbar />
  </div>


            <!--b-navbar toggleable="lg" class="navbar navbar-expand-lg"> <background-color: #31708E;>

                <b-button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="" role="button" ><i class="fa-bars" aria-hidden="true" style="color:white"></i></span>
                </b-button>

                <a id="logoname" class="nav-item">NoloNoloPlus</a>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                  <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                      <!-v-on:click='smista'->
                        <b-nav-item title="Reserved" @click="showModal">
                            Login
                        </b-nav-item>
                    </b-navbar-nav>
                  </b-collapse>

            </b-navbar-->


  <div id="introduzione" class="flex-container"><!--QUESTO LO VEDE -->
    <br>
    NoloNoloPlus, fondata nel 2021 a Bologna, è specializzata nel noleggio di yacht nel Mediterraneo. 
    L’azienda è orgogliosa di selezionare con cura ogni yacht di lusso e di conoscere ognuna delle imbarcazioni proposte. Sfogliate la nostra ampia selezione di yacht a noleggio con 
    equipaggio. Contattateci per qualsiasi richiesta – vi garantiamo la risposta più veloce del settore.
  </div>

  <template v-if="isModalVisible">
    <LoginModal /> <!--@close="closeModal"-->
  </template>


  <div><!--QUESTO NON LO VEDE -->
    <h1> prova11 prova prova </h1>

    <IntroPage /> </div>

  <!--button type="button" class="btn" @click="showModal">
    Open Modal!
  </button>

  <LoginModal v-show="isModalVisible" @close="closeModal" /-->

  <!--template v-else
    <h1> SONO QUA </h1>
    <div>

      <h1>AAAAAAAAAA</h1>
        <QUI APPAIONO LE COSE!  id="main_page" class="flex-container">
        <e qui poi inserisco i vari componenti diversi    v-show="!toggle" v-show="toggle" v-show="!toggle"  @id-to-rent="captureID" -->
      <!--<IntroPage />
        <RentPage v-show="toggle" /
    </div>
  </template-->

  <!--div id="calcolatrice">
    <--devo far aprire il component al click->
    <b-button id="calcBtn" data-toggle="modal" data-target="#calcModal">
      <--non funziona font awesome ->
      <font-awesome-icon icon="calculator" />
    </b-button>
  </div-->



  <footer><!--QUESTO LO VEDE -->
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
import LoginModal from './components/LoginModal.vue';


export default {
  name: 'App',
  components: {
    Navbar,
    IntroPage,
    RentPage,
    LoginModal,
    toggle: false,
  },
  data() {
    return {
      rentId: null,
      isModalVisible: false
    };
  },

  methods: {

    showModal() {
      console.log("sono dentro show");
      this.isModalVisible = true;
      console.log(this.isModalVisible);
    },

    closeModal() {
      this.isModalVisible = false;
    },

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

    margin-top: 0;
    margin-left: 0;

    /*border: 1px solid red;*/
}

.b-button:focus{
    outline:none !important;
}

/**PRIMA PARTE */
#app {
  color: white;
  background-color: #4D6D9A;

  overflow: hidden;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

.b-navbar {
    list-style: none;
}


.navbar-toggler, .b-navbar-toggle {
    color: white;
}

.nav-item {
    color: white;
    padding: 0.5em;
}

.nav-item:hover {
    color: white;
    font-style: none;
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

#main_page{
    justify-content: center;
    background-color: blueviolet;
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
    box-shadow: 0px 0px 13px white;
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

@media screen and (max-width: 900px) {

    #calcBtn {
        float: right;
        position: fixed;
        left: 80vw;
        right: 10vw ! important;
        /*margin-bottom: 2rem;*/
        width: 5rem;
        height: 5rem;
    }

}

@media screen and (max-width: 500px) {

  #calcBtn {
        float: right;
        position: fixed;
        bottom: 10vh;
        left: 75vw;
        right: 10vw ! important;
        /*margin-bottom: 2rem;*/
        width: 5rem;
        height: 5rem;
  }

}

</style>
