<template>

    <div id="newReg" class="flex-container">
        
        <div id="regContent" class="flex-container">
          
          <div id="header" class="flex-container">
            <p id="regTitle">Registrazione</p>
          </div>

          <div class="flex-container" id="firstRow">

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

          </div>

          <div class="flex-container" id="secondRow">

            <div class="form-input"> <!--class="md-form mb-5"-->
              <label data-error="wrong" data-success="right" for="city">Città di provenienza</label>
              <b-form-input v-model="city" aria-label="inserire città"></b-form-input>
            </div>

            <div class="form-input"> <!--class="md-form mb-5"-->
              <label data-error="wrong" data-success="right" for="address">Indirizzo</label>
              <b-form-input v-model="address" aria-label="inserire indirizzo"></b-form-input>
            </div>

            <div class="form-input"> <!--class="md-form mb-5"-->
              <label data-error="wrong" data-success="right" for="phone">Numero di telefono</label>
              <b-form-input v-model="phone" aria-label="inserire telefono"></b-form-input>
            </div>

          </div>

          <div class="flex-container" id="thirdRow">

            <div class="form-input"> <!--class="md-form mb-5"-->
              <label data-error="wrong" data-success="right" for="email">Email</label>
              <b-form-input v-model="email" aria-label="inserire indirizzo email"></b-form-input>
            </div>

            <div class="form-input"> <!--class="md-form mb-5"-->
              <label data-error="wrong" data-success="right" for="birth">Data di nascita</label>
              <b-form-input type="date" v-model="birth" aria-label="inserire indirizzo email"></b-form-input>
            </div>

            <div class="form-input">
              <label data-error="wrong" data-success="right" for="pass">Password</label>
              <b-form-input type="password" v-model="pass" aria-label="inserire password"></b-form-input>
            </div>

          </div>


          <div id="btncont" class="flex-container"> <!--class="d-flex justify-content-center"-->
            <b-button id="EnterRegBtn" v-on:click="registration()">Registrati</b-button>
            <h5 id="disclaimer"> {{this.msg}} </h5>
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
            name: null,
            surname: null, 
            username: null,
            city: null,
            address: null,
            pass: null,
            image: null,
            phone: null,
            email: null,
            birth: null,

            msg: '',

            newClient: {},
        };
    },
    methods: {

        registration() {

          if(!(this.name && this.surname && this.username && this.city && this.address && this.pass && this.phone && this.email)) {
            this.msg = "è necessario inserire dati in tutti i campi per poter effettuare la registrazione";
          }
          else {
            //TODO MODIFICARE IMG PROFILO
            this.image= "https://lh3.googleusercontent.com/AmrQe6e0h6ugF6FtfN1y9BDVpKKiaGHu9xskKJtRMA4lUFDsAwj2Ffy_w2gMIHpD2mKvEw_vLPwiAID09i13OFRsP-33JNaSsjzqGnoPzKxXGQrOSy28k9w4ZSX1C1FDkpbjRkrsSpxW74q7hl2Ghn_1FwV04wVHcCWHqPIOqCxmLLAvc-ycKKA1DNdZh38gsB065Ix44eR5BkQD-1mR04agbID37cHdDWGNkfRBsj9gbJwyARq2-pOk7RD7Fr3XLEl_gO7dhpMnU0rcUpvMSVhm3iyopydacUUmXPOuFfMdvFeTjMx5hh1SD9ptfoGeZ-l8SFU3fBWf9tuT7P2g_sKCONWIKGntWdu7vOmJkRmuaR8mngx8rkJ5Jztp1Gfi47qyrD0upUHlDOzEXskX45HV6lOX7nKFHatwsL5Za1-sjYp-zViXLIj0ADYLzRKheJIdWUXfT5PjHQ92R6zjdBAOaNkQvXGbwzY2DpjHz0iQ4B4u9x_IwpJVoMb6UA8KKZiYgPNB7xalyCD07VCS6D68-drUvWP30o6LYKOIpjcmipJWxEKpfn7KKxzxp-rGOYM5f-ZvgGEhmxJO87tDRw0f6CDes-vzlrCWpSUB4WknzU9_nBKH9aVI_yp5J7eAYMAQ0Emngwn5PcQwe7kYYFAXMn4Ieze8763rptNCG8AXZnLaqnobLmtM8HRBLQavu8mencgGGZZHryY416enILM4=s1000-no?authuser=9";

            //TODO AGGIUNGERE DATA DI NASCITA
            this.newClient = { a: this.image, b: this.name, c: this.surname, d: this.username, e: this.city, f: this.address, g: this.pass, h: this.phone, i: this.email, j: this.birth };

            axios.post('/new-client', this.newClient)
              .then((result) => {

                this.msg = null;

                console.log(result.data);

                if(result.data == false) {
                  this.msg = "USERNAME NON DISPONIBILE - MODIFICARE";

                  this.newClient = null;

                }
                else {

                  this.$router.push({
                    path: '/login',
                  });

                }
                  
                })
            .catch((error) => {
                //this.loading = false;
                console.log(error);
            });

          }

        }


    }
})

</script>

<style scoped>

* {
    font-size: 14px;
}

#firstRow, #secondRow, #thirdRow {
  /*border: 1px solid red;*/

  align-items: center;
  justify-content: center;

  padding: 1em 0 1em 0;/*(up-right-down-left)*/
}

.form-input {
  padding: 0.5em;
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

#header, #regContent {
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#btncont {
  align-items: center;
  flex-direction: column;
  justify-content: center;
/*(up-right-down-left)*/
  padding: 0 2em 0 2em;
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

.form-input, .form-datepicker {
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


@media screen and (max-width: 500px) {

  #firstRow, #secondRow, #thirdRow {
    padding: 0;/*(up-right-down-left)*/
  }


}


</style>
