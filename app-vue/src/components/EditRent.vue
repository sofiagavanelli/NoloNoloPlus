<template>
<div>

    <div> {{this.myprop}} </div>

    <b-button v-on:click="prova()"> prova </b-button>

    <div class="flex-container">

      <router-link id="toProfile" tag="b-button" aria-labelledby="profileLabel" to="/profile">
        OK
      </router-link>
    </div>

</div>
</template>

<script>

export default {
  name: 'EditRent',
  data() {
    return {

    };
  },
  components: {
  },
  props: ['myprop'],

  mounted() {


  },

  methods: {

    emitToParent (event) {
        this.$emit('childToParent');
    },

    prova() {
        console.log(this.$router.props);
    },

  }

}

</script>

<style scoped>

#disclaimer {
  background-color: rgb(252, 191, 191);
  border-radius: 4px;
  padding: 0.5em;
  margin: 1em;

  font-size: 12px;
}

</style>
