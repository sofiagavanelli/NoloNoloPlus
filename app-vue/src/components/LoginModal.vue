<template>
  <div>

  <!--transition name="modal-fade"-->

    <div z-index="2" id="modal" class="flex-container">
  
      <div  id="loginModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <div class="modal-dialog" role="document">
        
        <div class="modal-content">
          <img src="../../public/avatar.png" class="avatar">

          <header class="modal-header">
            <h4 class="modal-title w-100 font-weight-bold">Login here</h4>
            <b-button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </b-button>
          </header>

          <div class="modal-body mx-3">
            <div class="md-form mb-5">
              <label data-error="wrong" data-success="right" for="username">Username</label>
              <b-form-input v-model="username" placeholder="Enter Username"></b-form-input>
            </div>

            <div class="md-form mb-4">
              <label data-error="wrong" data-success="right" for="pass">Password</label>
              <b-form-input type="password" v-model="pass" placeholder="Enter Password"></b-form-input>
            </div>

            <div id="loginfo"> </div>

            <div>
              <i id="newreg" data-toggle="modal" data-target="#newRegModal"> Clicca qui per registrarti </i>
            </div>
          </div>

          <div class="modal-footer d-flex justify-content-center">
            <b-button class="btn btn-default" id="EnterlogBtn" v-on:click="login()">Login</b-button>
          </div>
                          
        </div>
      </div>

      </div>

    </div>
  <!--/transition-->


    <!--b-modal z-index="1" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        
        <div class="modal-content">
          <img src="../../public/avatar.png" class="avatar">

          <header class="modal-header">
            <h4 class="modal-title w-100 font-weight-bold">Login here</h4>
            </b-button>
            <b-button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </header>

          <div class="modal-body mx-3">
            <div class="md-form mb-5">
              <label data-error="wrong" data-success="right" for="username">Username</label>
              <b-form-input v-model="username" placeholder="Enter Username"></b-form-input>
            </div>

            <div class="md-form mb-4">
              <label data-error="wrong" data-success="right" for="pass">Password</label>
              <b-form-input type="password" v-model="pass" placeholder="Enter Password"></b-form-input>
            </div>

            <div id="loginfo"> </div>

            <div>
              <i id="newreg" data-toggle="modal" data-target="#newRegModal"> Clicca qui per registrarti </i>
            </div>
          </div>

          <div class="modal-footer d-flex justify-content-center">
            <b-button class="btn btn-default" id="EnterlogBtn" v-on:click="login()">Login</b-button>
          </div>
                          
        </div>
      </div>
    </b-modal--> 

  </div>
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
      };
    },

    mounted() {
      //this.show("#loginModal");
    },

    methods: {

      close() {
        this.$emit('close');
      },
    
      login() {

        axios.get('/client/' + this.username)
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

        if(this.loggedIN) {

          data = this.loggedIN;

          this.$router.push({
            path: '/home',
            params: { data } 
          });

        }

        //console.log(this.loggedIN);
      },


    },
    
    
  };
</script>


<style scoped>

.p {
  font-size: 40px;

  padding: 5em;
}

/* MODALS */

.modal-content {
    background: #EDB5BF;
    color: #000;
    /*width: 20em;*/
    /*margin: 20vw;*/
    border-radius: 5%;
}

#loginfo {
    color: red;
}

.avatar {
    width: 5em;
    height: 5em ;
    border-radius: 50%;
    position: absolute;
    top: -17%;
    left: calc(50% - 2.5em);
}

.btn {
    padding: 0em 2em;
    border: none;
    outline: none;
    height: 2em;
    background: #ffff;
    color: #000;
    font-size: 18px;
    border-radius: 1em;
}

.form-control {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    height: 40px;
    color: #000;
    font-size: 16px;
}

/**/
#newRegC {
    visibility: hidden;
}

.btn {
    padding: 0em 2em;
    border: none;
    outline: none;
    height: 2em;
    background: #ffff;
    color: #000;
    font-size: 18px;
    border-radius: 1em;
}

.form-control {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #000;
    background: transparent;
    outline: none;
    height: 40px;
    color: #000;
    font-size: 16px;
}

  
  
</style>