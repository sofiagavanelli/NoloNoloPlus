<template>
<div>

  <div>
    <Navbar />
  </div>

  <div role="main" id="componentView">
			<router-view></router-view>
	</div>

</div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import IntroPage from './components/IntroPage.vue'


export default {
  name: 'App',
  components: {
    Navbar,
    IntroPage,
  },

  computed: {
  },

  methods: {
  }

}
</script>

<style>

*, .btn {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;

    font-size: 10px;

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

.nav-item, .b-nav-item, .nav-link, .navbar-toggler-icon {
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

    font-size: 12px;

    /*margin-top: 6em;*/
    padding: 0.5em 3em 1em 3em;
}

.flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

#main_page, #cont1, #rent_page, #contedit, #login, #about-us, #profile_page{
  justify-content: center;
  padding: 0 1.5em 0 1.5em;
}

#componentView  {
  margin-top: 5em;
  /*(up-right-down-left)*/
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
    margin-top: 3em;
    padding: 0.5em 2em 1em 2em;
  }

}

@media screen and (max-width: 500px) {

  /** {
    font-size: 10px;
  }*/

  .nav-item {
    font-size: 12px !important;
  }

  #introduzione { /*(up-right-down-left)*/
    margin-top: 2em;
    padding: 0.5em 1.5em 1em 1.5em;
  }

}

</style>
