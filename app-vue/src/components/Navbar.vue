<template>
  <div>

    <div id="app">

      <b-navbar toggleable="lg" class="navbar navbar-expand-lg"> <!--background-color: #31708E;-->

        <!--b-button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="" role="button" ><i class="fa-bars" aria-hidden="true" style="color:white"></i></span>
        </b-button-->

        <a id="logoname" class="nav-item">
          <router-link id="toHome" tag="nav-item" aria-labelledby="homeLabel" to="/home">
            NOLONOLOPLUS
          </router-link>
        </a>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
            <!--v-on:click='smista' @click="showModal" v-on:click='open()'-->
              <b-nav-item title="Site by">
                <router-link id="toAboutUs" tag="nav-item" aria-labelledby="AboutUsLabel" to="/about">
                  ABOUT US
                </router-link>
              </b-nav-item>
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
    

    <!--TODO: INSERIRE DIRETTAMENTE QUI IL MODALE PER UNA GESTIONE MIGLIORE SENZA IF-->
    <!--template v-if="isModalVisible">
      <LoginModal v-on:childToParent="onChildBack" />
    </template-->

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
      //username: client.username,
      //isModalVisible: false,
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

      this.$router.push({
          path: '/home',
      });

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
