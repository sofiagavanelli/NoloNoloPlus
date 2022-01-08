<template>
  <div>

    <div id="app">

      <b-navbar toggleable="lg" class="navbar navbar-expand-lg"> <!--background-color: #31708E;-->

        <b-button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="" role="button" ><i class="fa-bars" aria-hidden="true" style="color:white"></i></span>
        </b-button>

        <a id="logoname" class="nav-item">NoloNoloPlus</a>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
            <!--v-on:click='smista' @click="showModal"-->
              <b-nav-item title="Reserved" v-on:click='open()'>
                Login
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>

      </b-navbar>

    </div>

    <template v-if="isModalVisible">
      <LoginModal @close="closeModal" />
    </template>

  </div>
</template>

<script>
import LoginModal from './LoginModal.vue';

export default {
  name: 'Navbar',
  components: {
    LoginModal
  },
  data() {
    return {
      isModalVisible: false,
    };
  },

  methods: {

    open() {
      console.log("dentro show");
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
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


.navbar-toggler {
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

</style>
