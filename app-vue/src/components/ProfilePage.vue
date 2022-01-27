<template>

    <div id="profile_page" class="flex-container">

        <!-- cambiare estetica? 
        image: {type: String},
        name: {type: String, required: true},
        client_id: {type: String, required: true},
        password: {type: String, required: true, minLeght: 5},
        place: {type: String, required: true},
        address: {type: String, required: true}


        profileInfo[0]
        -->

        <!--img class="profile_pic" :src="this.profileInfo[0].img" alt="Card image cap"-->
        <div id="pic_container">
            <img class="profile_pic" src="../../public/avatar.png" alt="Card image cap">
        </div>

        <b-card class="profile">
            <b-card-body>
                <template v-if="!this.edit">
                    <h3 class="title"> {{this.profileInfo[0].name}} {{this.profileInfo[0].surname}} 
                        <font-awesome-icon icon="user-edit" aria-label="edit button" v-on:click="editProfile()"/>
                    </h3> 
                    <div class="details">
                    <ul class="d-flex flex-wrap pl-0" >
                        <li class="title"> USERNAME: <h5 class="data"> {{this.profileInfo[0].client_id}} </h5> </li>
                        <li class="title"> CITTÀ: <h5 class="data"> {{this.profileInfo[0].place}} </h5> </li>
                        <li class="title"> INDIRIZZO: <h5 class="data"> {{this.profileInfo[0].address}} </h5> </li>
                        <li class="title"> TELEFONO: <h5 class="data"> {{this.profileInfo[0].phone}} </h5> </li>
                        <li class="title"> EMAIL: <h5 class="data"> {{this.profileInfo[0].email}} </h5> </li>
                    </ul>
                    </div>
                </template>

                <template v-if="this.edit">
                    <h3 class="title">
                        <b-form-input v-model="name" placeholder="Modifica Nome"></b-form-input>
                        <b-form-input v-model="surname" placeholder="Modifica Cognome"></b-form-input>
                    </h3> 
                    <div class="details">
                    <ul class="d-flex flex-wrap pl-0" >
                        <li class="title"> USERNAME: 
                            <!--div class="form-input"--> <!--class="md-form mb-5"-->
                                <!--label data-error="wrong" data-success="right" for="username">Username</label-->
                            <b-form-input v-model="username" placeholder="Modifica Username"></b-form-input>
                            <!--/div-->
                        </li>
                        <li class="title"> CITTÀ: 
                            <b-form-input v-model="city" placeholder="Modifica Città"></b-form-input>
                        </li>
                        <li class="title"> INDIRIZZO:
                            <b-form-input v-model="address" placeholder="Modifica Indirizzo"></b-form-input>
                        </li>
                        <li class="title"> PASSWORD:
                            <b-form-input type="password" v-model="pass" placeholder="Modifica Password"></b-form-input>
                        </li>
                        <li class="title"> TELEFONO:
                            <b-form-input v-model="tel" placeholder="Modifica Telefono"></b-form-input>
                        </li>
                        <li class="title"> EMAIL:
                            <b-form-input v-model="email" placeholder="Modifica Email"></b-form-input>
                        </li>
                    </ul>
                    </div>
                    <b-button id="saveBtn" v-on:click="save()">save</b-button>
                </template>
                
                <div id="noleggiTab">

                    <h5 class="title"> NOLEGGI: </h5> 

                    <div id="btnTab" class="flex-container">
                        <!--b-button class="viewBtn" v-on:click="changeView('p')">passati</b-button-->
                        <b-button class="viewBtn" aria-label="button noleggi attivi" v-on:click="changeView('a')">attivi</b-button>
                        <b-button class="viewBtn" aria-label="button noleggi passati" v-on:click="changeView('f')">futuri</b-button>
                    </div>

                    <div class="rents" v-for="item in showRents" :key="item._id">
                        <!-- green light -->
                        <template v-if="item.approved"> 
                            <font-awesome-icon icon="circle" style="color:green"/> approvato
                            <font-awesome-icon icon="edit" aria-label="button modifica noleggio" v-on:click="editRent(item._id)" />
                        </template>
                        <!-- red light -->
                        <template v-else> 
                            <font-awesome-icon icon="circle" style="color:red"/> non approvato
                            <font-awesome-icon icon="edit" aria-label="button stampa fattura" v-on:click="editRent(item._id)" />
                        </template>
                        <br>
                        <div class="rentInfo">
                            {{item.prod_id}} <br>
                            {{item.start_date.slice(0,10)}} <br>
                            {{item.end_date.slice(0,10)}}
                        </div>
                    </div>

                </div>

                <div id="pastRents">
                    <h5 class="title"> FATTURE PER NOLEGGI PASSATI: </h5>

                    <div class="rents" v-for="elem in pastRent" :key="elem._id">
                        <div class="rentInfo">
                            {{elem.prod_id}} <font-awesome-icon icon="print" v-on:click="print(item._id)" /> <br>
                            {{elem.start_date.slice(0,10)}} <br> 
                            {{elem.end_date.slice(0,10)}}
                        </div>
                    </div>   
                </div>

            </b-card-body>
        </b-card>

    </div>

</template>

<script>
import axios from '../http'

export default({
    name: 'ProfilePage',
    data() {
        return {
            edit: false,

            username: null,

            profileInfo: [],
            rentInfo: [],

            futureRent: [],
            pastRent: [],
            activeRent: [],

            //per profile edit
            name: null,
            surname: null, 
            username: null,
            city: null,
            address: null,
            pass: null,
            tel: null,
            email: null,

            showRents: []
        };
    },
    created() { //diverso da mounted!!

        this.username = this.$store.state.username;

        axios.get('/allClients/' + this.username)
          .then((response) => {
            //console.log(response.data);
            this.profileInfo = response.data;
          })
          .catch((error) => {
            //this.loading = false;
            console.log(error);
          });

        axios.get('/user-rentals/' + this.username)
          .then((response) => {
            this.rentInfo = response.data;

            this.sortRents(this.rentInfo);
          })
          .catch((error) => {
            //this.loading = false;
            console.log(error);
          });
        
    },

    methods: {

        changeView(_type) {
            if(_type == 'a') {
                this.showRents = this.activeRent;
            }
            else if(_type == 'f')
                this.showRents = this.futureRent;
            else
                console.log("error");
        },

        sortRents(noleggi) {

            var i = 0, j = 0, k = 0;

            noleggi.forEach(elem => {
                var today = new Date();

                var start_date = new Date(elem.start_date);
                var end_date = new Date(elem.end_date);

                if(end_date <= today) {
                    this.pastRent[i] = elem;
                    i++;
                }
                else if(start_date >= today) {
                    this.futureRent[j] = elem;
                    j++;
                }
                else {
                    this.activeRent[k] = elem;
                    k++;
                }

            });

        },

        editProfile() {

            this.edit = !this.edit;

        },

        save() {
            console.log(this.name + this.surname + this.username + this.city + this.address + this.pass);

            this.edit = !this.edit;
        },

        editRent(rent_id) {


        },

        print(rent_id) {


        }

    }
})
</script>

<style scoped>

* {
    /*border: 1px solid red;*/
}

.viewBtn {
    background-color: transparent !important;
    border: none;
    color: black;
    transition: none;
}

#btnTab {
    background-color: #EDB5BF;
    border-radius: 4px;
}

#saveBtn {
    margin-bottom: 2em;
}

.profile {/*(up-right-down-left)*/
    margin: 2em 2em 0.5em 2em;
    border: none;
}

.card-body {
    padding: 0 !important;
}

.profile_pic {
    width: 100%;
    border-radius: 100%;
    padding-bottom: 0.2rem;
    margin-top: 2em;
    /*border-radius: 0.2rem;*/
    /*object-fit: cover;*/
    /*height: 30vh;*/
}

/*#pic_container {
    border: 1px solid red;
}*/

.rentInfo {
    padding: 0.5em;
    /*border: 1px solid grey;*/
    background-color: lightgray;
    border-radius: 3px;

    font-weight: normal;
}

.rents {
    padding: 0.5em;
}

#noleggiTab, #pastRents {
    border: 1.5px solid #86B3D1;
    padding: 1em;
    border-radius: 4px;

    margin: 0.4em;
}

.data, .title{
    font-family: "Dejavu Sans", Tahoma, Geneva, Verdana, sans-serif;
    color: #5F6366;
    padding-left: 1rem;
}

.data {
    font-weight: normal;
}

.d-flex {
    list-style: none;
    display: flex;
    border-top: 1px solid /*#4D6D9A*/ #86B3D1;
}

@media screen and (max-width: 500px) {

    .profile_pic {
        margin: 0;
        width: 50%;
    }

    #pic_container {
        display: flex;
        justify-content: center;
    }

}


</style>
