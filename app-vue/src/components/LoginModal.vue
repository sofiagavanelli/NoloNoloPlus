<template>
  <!--div-->

    <div id="login" class="flex-container">
        
        <div id="logContent" class="flex-container">
          
          <div id="header" class="flex-container">
            <img src="../assets/avatar.png" class="avatar">
            <p id="logTitle">Login</p>
          </div>

          <div class="form-input"> <!--class="md-form mb-5"-->
            <label data-error="wrong" data-success="right" for="username">Username</label>
            <b-form-input v-model="username" placeholder="Enter Username"></b-form-input>
          </div>

          <div class="form-input">
            <label data-error="wrong" data-success="right" for="pass">Password</label>
            <b-form-input type="password" v-model="pass" placeholder="Enter Password"></b-form-input>
          </div>

          <div id="loginfo"> {{this.errorMsg}} </div>

          <div id="newReg">
            <router-link id="toHome" aria-labelledby="newRegLabel" to="/new-client">
            Clicca qui per registrarti
            </router-link>
            <!--<i v-on:click="prova()"> Clicca qui per registrarti </i-->
          </div>

          <div> <!--class="d-flex justify-content-center"-->
            <b-button id="EnterlogBtn" v-on:click="login()">Login</b-button>
          </div>

          <p id="infoFoot"> per qualsiasi problema: nolonoloplus.yacht@gmail.com </p>
                          
        </div>

    </div>

  
  <!--/div-->
</template>

<script>
import axios from '../http'

export default {
  name: 'LoginModal',
    /*props: {
      loggedIN: false,
    },*/
  data() {
    return {
      username: '',
      pass: '',

      clientInfo: [],
      loggedIN: false,

      errorMsg: '',
    };
  },

    methods: {

      prova() {
        //TODO
      },
    
      login() {

        axios.get('/allClients/' + this.username)
          .then((response) => {
            this.clientInfo = response.data;
            this.controlInfo(this.clientInfo, this.pass);
          })
          .catch((error) => {
            //this.loading = false;
            console.log(error);
          });

      },

      controlInfo(data, insertedP) {

        for (let i in data) {

          if(data[i].password == insertedP) {
              var found = true;
              this.loggedIN = true;
          }

        }

        //console.log("username cambiato in " + config.username);

        if(this.loggedIN) {

          //console.log(this.$store.state);
          this.$store.commit("setUsername", this.username);
          //console.log(this.$store.state.username);

          localStorage.setItem('CurrentUser', JSON.stringify(this.username));

          if(this.clientInfo.discount)
            this.$store.state.discount = this.clientInfo.discount;

          //data = this.loggedIN;

          this.username = null;
          this.pass = null;

          this.$router.push({
            path: '/profile',
            //params: { data } 
          });

        }
        else {
          this.errorMsg = "non è stato trovato un utente con questi username/password, controllare e riprovare.";
        }

        //console.log(this.loggedIN);
      },


    },
    
    
  };
</script>


<style scoped>

* {
  font-size: 15px;
}

#infoFoot {
  padding-top: 1.5em;
  font-size: 10px;
  font-style: italic;
  font-weight: normal;
}

#logTitle {
  font-size: 40px;
  font-weight: normal;
}

#login { /*(up-right-down-left)*/
  margin: 2.5em 0 2.5em 0;
  /*margin-bottom: 2em;*/
  justify-content: center;
}

#header {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#logContent {
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

#loginfo {
  text-align: center;
  color: red;
  font-weight: normal;
  padding-bottom: 0.5em;
  /*padding: 0 0.5em 0.5em 0.5em;*/
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

/**/
#newReg {
  padding-bottom: 1em;
}
  
</style>