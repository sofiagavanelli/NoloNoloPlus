<template>
  <div>

    <div id="app">

      <b-navbar toggleable="lg" class="navbar navbar-expand-lg"> <!--background-color: #31708E;-->

        <a id="logoname" class="nav-item">
          <router-link id="toHome" tag="nav-item" aria-labelledby="homeLabel" to="/home">
            NOLONOLOPLUS
          </router-link>
        </a>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <template v-if="!this.$store.state.username">
                <b-nav-item title="Login">
                  <router-link id="toLogin" tag="nav-item" aria-labelledby="loginLabel" to="/login">
                    LOGIN
                  </router-link>
                </b-nav-item>
              </template>
              <template v-else>
                <b-nav-item title="Profile">
                  <router-link id="toProfile" tag="nav-item" aria-labelledby="profileLabel" to="/profile">
                    PROFILE
                  </router-link>
                </b-nav-item>
                <b-nav-item title="Logout" v-on:click="logout()">
                  <router-link id="toLogout" tag="nav-item" aria-labelledby="loginLabel" to="/home">
                    <font-awesome-icon icon="sign-out-alt"/> LOGOUT
                  </router-link>
                </b-nav-item>
              </template>
            </b-navbar-nav>
          </b-collapse>

      </b-navbar>

    </div>
    
  </div>
</template>

<script>
import LoginModal from './LoginModal.vue';

import client from '../user-data'

export default {
  name: 'Navbar',
  components: {
    LoginModal
  },
  //props: ['loggedIn'],
  data() {
    return {
      loggedIN: false,
    };
  },

  mounted() {

    if(localStorage.getItem('CurrentUser')) {
      this.$store.state.username = JSON.parse(localStorage.getItem('CurrentUser'));
    }

  },

  methods: {

    logout() {

      //TODO: inserire alert per il logout!!

      this.$store.commit("setUsername", null);   

      localStorage.removeItem('CurrentUser');

    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#app {
    background-color: #4D6D9A;

    overflow: hidden;
    position: fixed; /* Set the navbar to fixed position */
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
}

.b-navbar {
    list-style: none;
}

.b-nav-item {
  color:white; 
}

</style>
