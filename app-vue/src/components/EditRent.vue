<template>
<div>

    <div id="disclaimer" class="flex-container">
        <font-awesome-icon icon="exclamation-circle" />
        <h6> Chiediamo scusa per il disagio, ma il noleggio che doveva iniziare oggi non sarà più possibile
        per indisponibilità dell'imbarcazione. 
        Per lei a disposizione uno sconto del 40% sul prossimo noleggio! 
        </h6>
    </div>


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

    console.log(this.$router.props);

  },

  methods: {

    emitToParent (event) {
        this.$emit('childToParent');
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
