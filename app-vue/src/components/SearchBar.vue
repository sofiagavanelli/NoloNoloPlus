<template>
<div>

  <div id="cont1" class="flex-container">

      <div id="searchBar" class="flex-container">
          <!--b-form-select v-model="selected" :options="options" multiple></b-form-select-->
          <!--p id="text1"> applica un filtro </p-->
          <b-dropdown toggle-class='customDropdown' text="applica un filtro " variant='none'> 
            <h6> Tipologie </h6>
            <b-form-checkbox-group v-model="selected" :options="type" multiple></b-form-checkbox-group>
            <h6> Lunghezze </h6>
            <b-form-checkbox-group v-model="selected" :options="boatL" multiple></b-form-checkbox-group>
            <h6> Anno </h6>
            <b-form-checkbox-group v-model="selected" :options="boatY" multiple></b-form-checkbox-group>
          </b-dropdown>

          <b-button id="subButtom" v-on:click="search()"> SUBMIT </b-button>
      </div>

      <!--b-button id="subButtom" v-on:click="log()"> SUBMIT </b-button-->

  </div>

        <!--h5> Applica un filtro alla ricerca </h5>
        <form class="example">
          <input type="text" id="rentId" placeholder="Search rental..." name="search">
          <b-button type="button" v-on:click="filter()"><i class="fa fa-search"></i></b-button>
        </form> 
        <i dati si prendono quando si clicca su submit>
        <b-dropdown id="ddLUNGH" text="Lunghezza" class="m-md-2">
          <b-dropdown-item id="20">20-30 metri</b-dropdown-item>
          <b-dropdown-item id="30">30-40 metri</b-dropdown-item>
          <b-dropdown-item id="40">40-50 metri</b-dropdown-item>
          <b-dropdown-item id="50">50-60 metri</b-dropdown-item>
          <b-dropdown-item id="60">>60 metri</b-dropdown-item>
        </b-dropdown>
        <b-dropdown id="ddANNO" text="Anno" class="m-md-2">
          <b-dropdown-item id="2000">2000-2005</b-dropdown-item>
          <b-dropdown-item id="2005">2005-2010</b-dropdown-item>
          <b-dropdown-item id="2010">2010-2015</b-dropdown-item>
          <b-dropdown-item id="2015">>2015</b-dropdown-item>
        </b-dropdown>
        <b-dropdown id="ddLUOGO" text="Destinazione" class="m-md-2">
          <b-dropdown-item id="Sicilia">Sicilia</b-dropdown-item>
          <b-dropdown-item id="Sardegna">Sardegna</b-dropdown-item>
          <b-dropdown-item id="Puglia">Puglia</b-dropdown-item>
          <b-dropdown-item id="Liguria">Liguria</b-dropdown-item>
        </b-dropdown>
        <b-button id="subButton" type="button" v-on:click="filter()">SUBMIT</b-button>
      </div-->
      
      

        
        <!--div class="mt-3">Selected: <strong>{{ selected }}</strong></div-->

        <!--form class="needs-validation" novalidate>
          <select class="select" multiple>
            <optgroup label="Label 1">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </optgroup>
            <optgroup label="Label 2">
              <option value="4">Four</option>
              <option value="5">Five</option>
              <option value="6">Six</option>
            </optgroup>
          </select>

          <button type="submit" id="submit" class="btn btn-primary btn-sm mt-3">
            Submit
          </button>

        </form-->

        <!--div class="inventory-filter-button">
          <b-dropdown id=InventoryFilterButton variant="transparent"  text="Split Link" checkbox-menu allow-focus :right="right">
            <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" 
              value="accepted" unchecked-value="not_accepted"> All 
            </b-form-checkbox>
            <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1"
              value="accepted" unchecked-value="not_accepted"> Department 
            </b-form-checkbox>
          </b-dropdown>
        </div-->

        <!--form class="needs-validation" novalidate>
  <select
    class="select" multiple
    id="basic-select"
    data-mdb-validation="true"
    data-mdb-valid-feedback="This value is valid"
    data-mdb-invalid-feedback="This value is invalid"
    data-mdb-clear-button="true"
  >
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
    <option value="7">Seven</option>
    <option value="8">Eight</option>
  </select>
  <button type="submit" id="submit" class="btn btn-primary btn-sm mt-3">
    Submit
  </button>
</form-->


    <!--b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group-->






</div>
</template>
        
<script>

export default {
  name: 'SearchBar',
  data() {
      return {
        selected: [],
        type: [ //destinations
          //{ value: null, text: 'Please select an option' },
          { value: 'yacht', text: 'Yacht' },
          { value: 'barca', text: 'Barca a remi' },
          { value: 'gommoni', text: 'Gommone' } ],
        boatL: [
          { value: '20', text: '20-30 metri' },
          { value: '30', text: '30-40 metri' },
          { value: '40', text: '40-50 metri' },
          { value: '50', text: '50-60 metri' },
          { value: '60', text: '>60 metri' } ],
        boatY: [
          { value: '00', text: '2000-2005' },
          { value: '05', text: '2005-2010' },
          { value: '10', text: '2010-2015' },
          { value: '15', text: '>2015' } ],
      }
          //{ value: 'd', text: 'Selected Option', disabled: true },
          /*<b-dropdown id="ddANNO" text="Anno" class="m-md-2">
          <b-dropdown-item id="2000">2000-2005</b-dropdown-item>
          <b-dropdown-item id="2005">2005-2010</b-dropdown-item>
          <b-dropdown-item id="2010">2010-2015</b-dropdown-item>
          <b-dropdown-item id="2015">>2015</b-dropdown-item>
        </b-dropdown>*/
          
  },
  methods: {
    
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
  /*width: 90%;*/
  border: 1px solid #4D6D9A;
  text-align: center;

  /*justify-content: space-around;*/
}

.customDropdown {
  border-radius: 0 !important;
  margin: 0 !important;
  height: 100%;

  z-index: -1;
}

</style>