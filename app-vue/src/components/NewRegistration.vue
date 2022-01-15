<template>

    <div id="newReg" class="flex-container">
        
        <div id="regContent" class="flex-container">
          
          <div id="header" class="flex-container">
            <p id="regTitle">Registrazione</p>
          </div>

          <div class="form-input"> <!--class="md-form mb-5"-->
            <label data-error="wrong" data-success="right" for="name">Nome</label>
            <b-form-input v-model="name" aria-label="inserire nome"></b-form-input>
          </div>

          <div class="form-input"> <!--class="md-form mb-5"-->
            <label data-error="wrong" data-success="right" for="surname">Cognome</label>
            <b-form-input v-model="surname" aria-label="inserire cognome"></b-form-input>
          </div>

          <div class="form-input"> <!--class="md-form mb-5"-->
            <label data-error="wrong" data-success="right" for="username">Username</label>
            <b-form-input v-model="username" aria-label="inserire username"></b-form-input>
          </div>

          <div class="form-input"> <!--class="md-form mb-5"-->
            <label data-error="wrong" data-success="right" for="city">Città di provenienza</label>
            <b-form-input v-model="city" aria-label="inserire città"></b-form-input>
          </div>

          <div class="form-input"> <!--class="md-form mb-5"-->
            <label data-error="wrong" data-success="right" for="address">Indirizzo</label>
            <b-form-input v-model="address" aria-label="inserire indirizzo"></b-form-input>
          </div>

          <div class="form-input">
            <label data-error="wrong" data-success="right" for="pass">Password</label>
            <b-form-input type="password" v-model="pass" aria-label="inserire password"></b-form-input>
          </div>


          <div> <!--class="d-flex justify-content-center"-->
            <b-button id="EnterRegBtn" v-on:click="registration()">Registrati</b-button>
          </div>
                          
        </div>

    </div>
    
</template>

<script>
import axios from '../http'

export default ({
    name: "NewRegistration",
    data() {
        return {
            name: '',
            surname: '', 
            username: '',
            city: '',
            address: '',
            pass: '',

            newClient: [],
        };
    },
    methods: {

        registration() {

            this.newClient = [ this.name, this.surname, this.username, this.city, this.address, this.pass ];

            console.log(this.newClient);

            var data = JSON.stringify(this.newClient); 

            axios.post('/new-client/' + data)
                .then((response) => {

                })
            .catch((error) => {
                //this.loading = false;
                console.log(error);
            });

        }


    }
})

</script>

<style scoped>

* {
    font-size: 14px;
}

#regTitle {
    font-size: 40px;
    font-weight: normal;
}

#newReg { /*(up-right-down-left)*/
  margin: 2.5em 0 2.5em 0;
  /*margin-bottom: 2em;*/
  justify-content: center;
}

#header {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#regContent {
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.avatar {
    width: 5em;
    height: 5em ;
    border-radius: 50%;
    /*position: absolute;
    top: -17%;
    left: calc(50% - 2.5em);*/
}

.btn {
    padding: 0em 2em;
    /*border: none;
    outline: none;*/
    height: 2em;
    background: #4D6D9A;
    /*background: #ffff;
    color: #000;*/
    font-size: 18px;
    border-radius: 1em;
}

.form-input {
  margin-bottom: 1.5em;
}

.form-control {
    border: none;
    border-radius: 6px;
    border: 1px solid #000;
    background: transparent;
    outline: none;
    height: 40px;
    color: #000;
    font-size: 16px;
}

</style>
