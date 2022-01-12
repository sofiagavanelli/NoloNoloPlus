<template>
  <div>

  <!--transition name="modal-fade"-->

    <!--div id="modal" class="flex-container"-->
  
      <b-modal z-index="1" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <h3 name="header">
            This is the default tile!
          </h3>
          <button type="button" class="btn-close" v-on:click="close()" aria-label="Close modal">
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <h3 name="body">
            This is the default body!
          </h3>
        </section>

        <footer class="modal-footer">
          <h3 name="footer">
            This is the default footer!
          </h3>
          <button type="button" class="btn-green" v-on:click="close()" aria-label="Close modal">
            Close me!
          </button>
        </footer>
      </b-modal>

    <!--/div-->
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
    data() {
      return {
        username: '',
        pass: '',

        clientInfo: [],
      };
    },

    mounted() {
      this.$bvModal.show("loginModal");
    },

    methods: {

      close() {
        this.$emit('close');
        this.$emit();

      },
    
      login() {
        console.log(this.username + this.pass);

        axios.get('/client/' + this.username)
          .then((response) => {
            this.clientInfo = response.data;
          })
          .catch((error) => {
            //this.loading = false;
            console.log(error);
          });


        //if(this.clientInfo) {
          console.log(this.clientInfo);
        //}

      }

    },
    
    
  };
</script>


<style scoped>

.p {
  font-size: 40px;

  padding: 5em;
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

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  
</style>