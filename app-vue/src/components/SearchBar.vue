<template>
<div>

  <div id="cont1" class="flex-container">

      <div id="searchBar" class="flex-container">

            <b-dropdown toggle-class='customDropdown' text="Categoria" variant='none'> 
              <b-form-checkbox-group v-model="boat" :options="type" multiple></b-form-checkbox-group>
            </b-dropdown>
            <b-dropdown toggle-class='customDropdown' text="Ospiti" variant='none'>
              <b-form-checkbox-group v-model="people" :options="guests" multiple></b-form-checkbox-group>
            </b-dropdown>
            <b-dropdown toggle-class='customDropdown' text="Anno di produzione" variant='none'>
              <b-form-checkbox-group v-model="age" :options="year" multiple></b-form-checkbox-group>
            </b-dropdown>

          <b-button id="subButtom" v-on:click="emitToParent"> SUBMIT </b-button>
          <b-button id="resetButtom" v-on:click="resetFilter"> RESET </b-button>

      </div>

      <!--b-button id="subButtom" v-on:click="log()"> SUBMIT </b-button-->

  </div>

</div>
</template>
        
<script>

export default {
  name: 'SearchBar',
  data() {
      return {
        boat: [],
        people: [],
        age: [],
        type: [ //destinations
          //{ value: null, text: 'Please select an option' },
          { value: 'yacht', text: 'Yacht' },
          { value: 'barca', text: 'Barca a remi' },
          { value: 'gommoni', text: 'Gommone' } ],
        guests: [
          { value: '5', text: '<= 5' },
          { value: '10', text: '5-10' },
          { value: '15', text: '10-15' },
          { value: '20', text: '> 15' } ],
        year: [
          { value: '1995', text: '<= 1995' },
          { value: '2005', text: '1995-2005' },
          { value: '2015', text: '2005-2015' },
          { value: '2020', text: '>2015' } ],
      }
  },
  methods: {

    emitToParent(event) {
      
      var filters = []
      filters[0] = this.boat;
      filters[1] = this.people;
      filters[2] = this.age;

      this.$emit('childToParent', filters);
    },

    resetFilter(event) {

      console.log("ciao");
      var reset = "reset";

      this.boat = [];
      this.age = [];
      this.people = [];

      this.$emit('childToParent', reset);
    },
    
    search() {
      console.log(this.selected);
    }


  }
}
</script>

<style scoped>

#text1 {
  font-style: italic;
  padding: 0.5em;
  margin: 0;
}

.btn {
  border-radius: 0 !important;
}

#searchBar {
  /*width: 90%;
  border: 1px solid #4D6D9A;
  text-align: center;*/

  justify-content: space-around;
}

.customDropdown {
  border-radius: 0 !important;
  margin: 0 !important;
  height: 100%;

  font-size: 14px;

  z-index: -1;
}

</style>