<template>
<div>

  <div> <!--QUESTO LO VEDE -->
    <Navbar />
  </div>

  <div role="main" id="componentView">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>

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
import Navbar from './components/Navbar.vue'
import IntroPage from './components/IntroPage.vue'

export default {
  name: 'App',
  //props: ['loggedIn'],
  components: {
    Navbar,
    IntroPage,
  },

  computed: {
    msg () {
      let data = this.$router.params.data;
      console.log("data is", data);
      //return `Hello, ${ this.loggedIn }!`
    }
    
  },

  methods: {

    
  }

}
</script>

<style>

*, .btn {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;

    font-size: 12px;

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

  z-index: 1;
}

/*.b-navbar {
    list-style: none;
}


.navbar-toggler, .b-navbar-toggle {
    color: white;
}*/

.nav-item, .b-nav-item {
    color: white !important; 
    padding: 0.5em;
}

/*.nav-item:hover {
    color: white;
    font-style: none;
}*/

.element {
  font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: normal;
}

#introduzione { /*(up-right-down-left)*/
    font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: normal;

    font-size: 14px;

    margin-top: 6em;
    padding: 0.5em 3em 1em 3em;
}

.flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

#main_page, #cont1, #rent_page, #modal, #about-us{
  justify-content: center;
}

#componentView  {
  margin-top: 6em;
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
    justify-content: start;

    background-color: lightcyan;

    margin-top: 4vh;
    padding: 3vh 5vw 3vh 5vw;
}

@media screen and (max-width: 900px) {

  #introduzione { /*(up-right-down-left)*/
    margin-top: 5em;
    padding: 0.5em 2em 1em 2em;
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

}

@media screen and (max-width: 500px) {

  #introduzione { /*(up-right-down-left)*/
    margin-top: 4em;
    padding: 0.5em 1.5em 1em 1.5em;
  }

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
