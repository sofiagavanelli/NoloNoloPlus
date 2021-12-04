<template>
<div>
  <p> ciao </p>


  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Nolo Nolo Plus</b-navbar-brand>
    <b-col cols='6'>
      <b-input-group class="noborder">
        <b-form-input id="ricerca" placeholder="Search..."></b-form-input>
        <b-input-group-append>
          <b-button class="bg-primary" v-on:click='smista'>Cerca</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-col>
  </b-navbar>


</div>
</template>


<script>

export default {
  data() {
    return {
      
    };
  },

  methods: {

  },//methods
}
</script>
