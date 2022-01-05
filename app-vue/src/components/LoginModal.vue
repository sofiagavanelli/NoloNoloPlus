<template>
  <div>

    <h1> prova </h1>

  <!--transition name="modal-fade">
  
    <div class="modal-backdrop">
      <b-modal z-index="1" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <h3 name="header">
            This is the default tile!
          </h3>
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">
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
          <button type="button" class="btn-green" @click="close" aria-label="Close modal">
            Close me!
          </button>
        </footer>
      </b-modal>
    </div>
  </transition--


    <b-modal z-index="1" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <img src="public/img/avatar.png" class="avatar">

          <div class="modal-header text-center">
            <h4 class="modal-title w-100 font-weight-bold">Login here</h4>
            <b-button type="button" class="btn-close" @click="close" aria-label="Close modal"> x
            </b-button>
            <b-button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </b-button>
          </div>

          <div class="modal-body mx-3">
            <div class="md-form mb-5">
              <label data-error="wrong" data-success="right" for="username">Username</label>
              <input type="email" id="username" class="form-control validate" placeholder="Enter Username">
            </div>

            <div class="md-form mb-4">
              <label data-error="wrong" data-success="right" for="pass">Password</label>
              <input type="password" id="pass" class="form-control validate" placeholder="Enter Password">
            </div>

            <div id="loginfo"> </div>

            <div>
              <i id="newreg" data-toggle="modal" data-target="#newRegModal"> Clicca qui per registrarti </i>
            </div>
          </div>

          <div class="modal-footer d-flex justify-content-center">
            <b-button class="btn btn-default" id="EnterlogBtn">Login</b-button>
          </div>
                          
        </div>
      </div>
    </b-modal--> 

  </div>
</template>

<script>
  export default {
    name: 'LoginModal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
    activated: function() {
      console.log("sono in logimodal");
    }
  };
</script>


<style>

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

  /*.modal-backdrop {
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
  }*/
  
</style>