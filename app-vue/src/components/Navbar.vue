<template>
  <div>

    <div id="app">

            <b-navbar class="navbar navbar-expand-lg"> <!--background-color: #31708E;-->

                <b-button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="" role="button" ><i class="fa fa-bars" aria-hidden="true" style="color:#e6e6ff"></i></span>
                </b-button>

                <a id="logoname" class="nav-item">NoloNoloPlus</a>

                <div class="collapse navbar-collapse"  id="navbarCollapse">
                    <ul class="navbar-nav navbar-nav ml-auto">
                      <!--v-on:click='smista'-->
                        <li class="nav-item" title="Reserved" data-toggle="modal" data-target="#loginModal">
                            Login
                        </li>
                    </ul>
                </div>

            </b-navbar>
    </div>
    
    <!--b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Twitter Client</b-navbar-brand>
    <b-col cols='6'>
      <b-input-group class="noborder">
        <b-form-input id="ricerca" placeholder="Search..."></b-form-input>
        <b-input-group-append>
          <b-button class="bg-primary" v-on:click='smista'>Cerca</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-col>

    <b-col cols='2'>
      <b-input-group>
        <b-button class="bg-primary" v-on:click='esempio'>Bologna</b-button>
      </b-input-group>
    </b-col>

    <b-col>
      <div>
        <b-button :disabled="graphDisabled" class="bg-primary mr-2">Grafico</b-button>
        <b-button class="bg-primary" v-b-toggle.sidebar-right>Filtri</b-button>
        <b-sidebar id="sidebar-right" title="Filtri" right shadow>
          <div class="px-3 py-2">
            <b-form-group label="Lingua">
              <b-form-select v-model="lingua" :options="lingue"></b-form-select>
            </b-form-group>
            <b-form-group label="Numero di tweet">
              <b-form-input v-model="numero" type="number" min="1" max="100" step="1"></b-form-input>
            </b-form-group>
            <b-form-group label="Ordina per">
              <b-form-select v-model="ordine" :options="ordini" @change="sortArray"></b-form-select>
            </b-form-group>
          </div>
        </b-sidebar>
      </div>
    </b-col>

  </b-navbar-->

  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
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
