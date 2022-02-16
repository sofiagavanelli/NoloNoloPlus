<template>
<div>

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

        <!--img class="profile_pic" :src="this.profileInfo[0].img" alt="Card image cap" "https://site202133.tw.cs.unibo.it/img/default-pic.jpg"  src="../assets/avatar.png"-->
        <div id="pic_container">
            <img class="profile_pic" :src="this.profileInfo[0].image" alt="profile image">
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
                        <li class="title"> COMPLEANNO: <h5 class="data"> {{this.profileInfo[0].birth}} </h5> </li>
                    </ul>
                    </div>
                </template>

                <template v-if="this.edit">
                    <h3 class="title">
                        <b-form-input v-model="newInfo[0]" placeholder="Modifica Nome"></b-form-input>
                        <b-form-input v-model="newInfo[1]" placeholder="Modifica Cognome"></b-form-input>
                    </h3> 
                    <div class="details">
                    <ul class="d-flex flex-wrap pl-0" >
                        <!-- NON SI PUO CAMBIARE L'USERNAME PERCHE UNICO -->
                        <!--li class="title"> USERNAME: 
                            <--div class="form-input"--> <!--class="md-form mb-5">
                                <--label data-error="wrong" data-success="right" for="username">Username</label>
                            <b-form-input v-model="username" placeholder="Modifica Username"></b-form-input>
                            </div>
                        </li-->
                        <li class="title"> CITTÀ: 
                            <b-form-input v-model="newInfo[2]" placeholder="Modifica Città"></b-form-input>
                        </li>
                        <li class="title"> INDIRIZZO:
                            <b-form-input v-model="newInfo[3]" placeholder="Modifica Indirizzo"></b-form-input>
                        </li>
                        <li class="title"> PASSWORD:
                            <b-form-input type="password" v-model="newInfo[4]" placeholder="Modifica Password"></b-form-input>
                        </li>
                        <li class="title"> TELEFONO:
                            <b-form-input v-model="newInfo[5]" placeholder="Modifica Telefono"></b-form-input>
                        </li>
                        <li class="title"> EMAIL:
                            <b-form-input v-model="newInfo[6]" placeholder="Modifica Email"></b-form-input>
                        </li>
                        <li class="title"> DATA DI NASCITA:
                            <b-form-input type="date" v-model="newInfo[7]" placeholder="Modifica Compleanno"></b-form-input>
                        </li>
                        <li class="title"> URL FOTO PROFILO:
                            <b-form-input v-model="newInfo[8]" placeholder="Inserire URL Immagine"></b-form-input>
                        </li>
                    </ul>
                    </div>
                    <b-button id="saveBtn" v-on:click="save()">save</b-button>
                </template>

                <template v-if="!this.loading">
                <div class="noleggiTab">

                    <div id="btnTab" class="flex-container">
                        <b-button class="viewBtn" v-on:click="changeView('a')">noleggi attivi</b-button>
                    </div>

                    <!--h5 class="title"> NOLEGGI ATTIVI: </h5--> 

                    <!--div id="btnTab" class="flex-container">
                        <b-button class="viewBtn" v-on:click="changeView('p')">passati</b-button>
                        <b-button class="viewBtn" aria-label="button noleggi attivi" v-on:click="changeView('a')">attivi</b-button>
                        <b-button class="viewBtn" aria-label="button noleggi passati" v-on:click="changeView('f')">futuri</b-button>
                    </div-->
                    
                    <template v-if="this.active">
                    <div class="rents" v-for="(item, index) in activeRent" :key="item._id">
                        <!-- green light -->
                        <template v-if="broken[index]" > <!--"controlStart(index)"--> 
                            
                            <!--router-link id="toProblem" aria-labelledby="problemLabel" to="/edit-rent"-->
                            <b-button v-on:click="openAlert(item._id)" > PROBLEMA CON NOLEGGIO IN PARTENZA: CLICCA QUI. </b-button>
                            <!--/router-link-->

                        </template>
                        <template v-else>

                            <template v-if="!item.approved">
                                in attesa di approvazione 
                            </template>
                            <template v-else>
                                <font-awesome-icon icon="circle" style="color:green"/> approvato
                            </template>

                            <div class="rentInfo">
                                {{item.prod_id}} <br>
                                {{item.start_date.slice(0,10)}} <br>
                                {{item.end_date.slice(0,10)}}
                            </div>
                        </template>

                    </div>
                    </template>
                </div>

                <div class="noleggiTab">

                    <div id="btnTab" class="flex-container">
                        <b-button class="viewBtn" v-on:click="changeView('f')">noleggi futuri</b-button>
                    </div>

                    <template v-if="this.future">
                    <div class="rents" v-for="(item, index) in futureRent" :key="item._id">
                        <!-- green light -->
                        <template v-if="item.approved"> 
                            <font-awesome-icon icon="circle" style="color:green"/> approvato
                        </template>
                        <!-- red light -->
                        <template v-else> 
                            <font-awesome-icon icon="circle" style="color:red"/> non approvato
                        </template>
                        <router-link id="toEdit" aria-labelledby="editLabel" :to="{ name: 'editRent', params: { rentToEdit: futureRent[index] }}" >
                            <font-awesome-icon icon="edit" aria-label="button modifica noleggio" />
                        </router-link>
                        <font-awesome-icon icon="trash" aria-label="button elimina noleggio" v-on:click="deleteRent(index)" />
                        <br>
                        <div class="rentInfo">
                            {{item.prod_id}} <br>
                            {{item.start_date.slice(0,10)}} <br>
                            {{item.end_date.slice(0,10)}}
                        </div>
                    </div>
                    </template>

                </div>

                <div class="noleggiTab">
                    <h5 class="title"> FATTURE PER NOLEGGI PASSATI: </h5>

                    <div class="rents" v-for="(elem, index) in pastRent" :key="elem._id">
                        <div class="rentInfo">
                            <template v-if="elem.deleted">
                                <p style="background-color:red;color:white;"> CANCELLATO </p>
                            </template>
                            {{elem.prod_id}} <br>
                            dal {{elem.start_date.slice(0,10)}} al {{elem.end_date.slice(0,10)}} <br>
                            costo: {{elem.price}} € <br>
                            sconti applicati: {{elem.discount}} % <br>
                            metodo di pagamento: {{elem.paymethod}} <br>

                            <template v-if="!elem.delivered && !elem.deleted">
                                <b-button v-on:click="deliver(index)"> CONSEGNA </b-button>
                            </template>
                        </div>
                        
                    </div>   
                </div>

                </template>

            </b-card-body>
        </b-card>

        
        <!-- The modal -->
      <div id="modal-container" class="flex-container">
        <b-modal ok-title="Presa visione" id="alertModal" v-on:ok="getDiscount()">

            <div id="disclaimer" class="flex-container">
                <font-awesome-icon icon="exclamation-circle" />
                <h6> Chiediamo scusa per il disagio, ma il noleggio che doveva iniziare oggi non sarà più possibile
                per indisponibilità dell'imbarcazione. 
                Per lei a disposizione uno sconto del 15% su uno dei prossimi noleggi! 
                </h6>
            </div>
        
        </b-modal> 
      </div>

    </div>

</div>
</template>

<script>
import axios from '../http'
import EditRent from './EditRent.vue'

export default({
    name: 'ProfilePage',
    data() {
        return {
            indisponibile: '',

            active: false,
            future: false,

            loading: true, 

            editing: false,
            edit: false,

            username: null,

            profileInfo: [],
            rentInfo: [],

            futureRent: [],
            pastRent: [],
            activeRent: [],

            newInfo: [null],

            //per profile edit
            name: null,
            surname: null, 
            username: null,
            city: null,
            address: null,
            pass: null,
            tel: null,
            birth: null,
            email: null,

            showRents: [],

            id: '',

            newRent: [],
            today: new Date(),


            //PER STAMPA
            myUrl: '#',
            myFilename: '',

            broken: [],
        };
    },
    components: {
        EditRent,
    },
    /*props: {
        rentToEdit: [],
    },*/
    created() { 

        if(localStorage.getItem('CurrentUser')) {
            this.$store.state.username = JSON.parse(localStorage.getItem('CurrentUser')).user || JSON.parse(localStorage.getItem('CurrentUser'));

            this.username = this.$store.state.username;

            /*if( JSON.parse(localStorage.getItem('CurrentUser')).discount )
                this.$store.state.discount = JSON.parse(localStorage.getItem('CurrentUser')).discount;*/

            //console.log();
        }
        else {
            this.username = this.$store.state.username;
        }

        axios.get('/allClients/' + this.username)
          .then((response) => {
            //console.log(response.data);
            this.profileInfo = response.data;

            if(this.profileInfo[0].discount)
                this.$store.state.discount = this.profileInfo[0].discount;

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

    /*mounted() {

        if(localStorage.getItem('CurrentUser')) {
            this.$store.state.username = JSON.parse(localStorage.getItem('CurrentUser'));

            this.username = this.$store.state.username;
        }

    },*/

    methods: {

        onChildBack() {
            
            this.editing = !this.editing;

        },

        changeView(_type) {
            if(_type == 'a') {
                this.active = !this.active;
            }
            else 
                this.future = !this.future;
        },

        sortRents(noleggi) {

            var i = 0, j = 0, k = 0;

            noleggi.forEach(elem => {
                var today = new Date();

                var start_date = new Date(elem.start_date);
                var end_date = new Date(elem.end_date);

                if(end_date < today || elem.deleted) {
                    this.pastRent[i] = elem;
                    i++;
                }
                else if(start_date > today) {
                    this.futureRent[j] = elem;
                    j++;
                }
                else {
                    this.activeRent[k] = elem;

                    //sono nei rent attivi: se uno di questi prodotti è rotto me lo segno  nella sua posizione nell'aray dei rent!!
                    //NON ASPETTA!!!
                    //this.broken[k] = this.controlStart(elem);
                    //console.log(this.broken[k]);

                    k++;
                }

            });

            console.log("sto per entrare in control approved");

            this.controlStart(this.activeRent);

            //this.loading = !this.loading;

        },

        controlStart(items) {//_id) {

            console.log(items);
            console.log(this.broken);

            var prodToRent = [];
            var k = 0;

            items.forEach(item => {

            axios.get('/prods/' + item.prod_id)//this.activeRent[_id].prod_id)
                .then((response) => {
                    //console.log(response.data);
                    prodToRent = response.data;

                    /*console.log(prodToRent);
                    console.log(prodToRent[0].status == "rotto");*/

                    if(prodToRent[0].status == "rotto") {
                        /*rotto = true;*/
                        //console.log("sono dentro rotto");

                        this.broken[k] = true;
                        k++;

                        console.log(this.broken[k]);
                    }
                    else {
                        this.broken[k] = false;
                        k++;
                    }

                    /*var start = new Date(this.activeRent[_id].start_date);
                    var today = null;

                    if(start.getDay() == this.today.getDay() && start.getMonth() == this.today.getMonth() && 
                        start.getYear() == this.today.getYear()) {

                        today = true;
                    }
                    else
                        today = false;*/

                    /*console.log(rotto);
                    return(rotto);*/

                })
                .catch((error) => {
                    //this.loading = false;
                    console.log(error);
                });


            /*var start = new Date(this.activeRent[_id].start_date);
            var today = null;

            if(start.getDay() == this.today.getDay() && start.getMonth() == this.today.getMonth() && 
                start.getYear() == this.today.getYear()) {

                today = true;
            }
            else
                today = false;

            console.log(rotto && today);
            return(rotto && today);*/

            });

            //console.log(k + "  " + items.length);

            //if(k == items.length)
            this.loading = !this.loading;
            

        },

        editProfile() {

            this.edit = !this.edit;

        },

        /*app.post('/update-client',async (req, res)=>{
        console.log("sono nell'update dei clienti ");
        
            const idcliente = req.body.clientID;
            var nome = req.body.name;
            var cognome = req.body.surname;
            //var user = req.body.clientID;
            var city = req.body.place;
            var add = req.body.address; 
            var cell = req.body.telefono;
            var mail = req.body.email;
            var note = req.body.note;

        console.log(idcliente);
       await db.updateClient(idcliente, nome, cognome, city, add, cell, mail, note)
    });*/

        save() {

            var update = {image: this.profileInfo[0].image, clientID: this.profileInfo[0].client_id, name: this.profileInfo[0].name, surname: this.profileInfo[0].surname, 
            place: this.profileInfo[0].place, address: this.profileInfo[0].address, pass: this.profileInfo[0].pass, telefono: this.profileInfo[0].phone, 
            email: this.profileInfo[0].email, birth: this.profileInfo[0].birth};

            var changed = [];

            for(let i=0; i<9; i++) {
                if(this.newInfo[i] && this.newInfo[i].length > 3)
                    changed[i] = true;
            }

            if(changed[0]) update.name = this.newInfo[0];
            if(changed[1]) update.surname = this.newInfo[1];
            if(changed[2]) update.place = this.newInfo[2];
            if(changed[3]) update.address = this.newInfo[3];
            //ci andrebbe il cambio password!
            if(changed[4]) update.pass = this.newInfo[4];
            if(changed[5]) update.telefono = this.newInfo[5];
            if(changed[6]) update.email = this.newInfo[6];
            if(changed[7]) update.birth = this.newInfo[7];
            if(changed[8]) update.image = this.newInfo[8];

            if(changed[0] || changed[1] || changed[2] || changed[3] || changed[4] || changed[5] || changed[6] || changed[7] || changed[8]) {

                axios.post('/update-client/', update)
                    .then((response) => {
                        //console.log(response.data);
                        console.log("update" ,response);

                        //reload!!
                        
                    })
                    .catch((error) => {
                        //this.loading = false;
                        console.log(error);
                    });

                
            }

            //oppure facciamo una reload direttamente
            //il cliente deve fare refresh
            this.edit = !this.edit;

        },

        openAlert(/*_index, */ rent_id) {

            //modale per l'edit
            //this.id = _index;
            //this.rentToEdit = this.showRents[_index];

            this.indisponibile = rent_id;

            this.$bvModal.show("alertModal");

        },

        /*editRent(_id) {

            this.rentToEdit = this.futureRent[_id];

            console.log(this.rentToEdit);

            this.$router.push({
                path: '/edit-rent',
            })

        },

        updateRent() {
            console.log("dovrei fare la post");
        },*/

        /*print(rent_id) {

            var rentToPrint = this.pastRent[rent_id];

            const jsonData = encodeURIComponent('{"is_valid": true}');
            this.myUrl = `data:text/plain;charset=utf-8,${jsonData}`;
            this.myFilename = 'example.json';

        },*/

        deleteRent(_ind) {
            console.log(this.futureRent[_ind]);

            var rent_to_delete = {};
            rent_to_delete = {id: this.futureRent[_ind]._id}

            axios.post('/delete-rent', rent_to_delete)
                .then((response) => {
                    //console.log(response.data);
                    console.log(response);

                    this.$router.go(0);

                })
                .catch((error) => {
                        //this.loading = false;
                    console.log(error);
                });

        },

        deliver(_ind) {
            //TODO UPDATE 
            //elem.deliverd = true

            var rent_to_deliver = {};
            rent_to_deliver = {id: this.pastRent[_ind]._id}

            axios.post('/deliver-rent', rent_to_deliver)
                .then((response) => {
                    //console.log(response.data);
                    console.log(response);

                    this.$router.go(0);

                })
                .catch((error) => {
                        //this.loading = false;
                    console.log(error);
                });
            

        },

        getDiscount() {

            console.log(this.indisponibile);

            axios.delete('/allRents/' + this.indisponibile)
                .then((response) => {
                    //console.log(response.data);
                    console.log(response);

                        //reload!!
                })
                .catch((error) => {
                        //this.loading = false;
                    console.log(error);
                });

            axios.post('/add-discount', {clientID: this.username})
                .then((response) => {
                    //console.log(response.data);
                    console.log(response);

                        //reload!!
                })
                .catch((error) => {
                        //this.loading = false;
                    console.log(error);
                });

            var user_discount = {user: this.username, discount: 15};

            this.$store.state.discount = 15;

            localStorage.setItem('CurrentUser', JSON.stringify(user_discount));

            //var prova = JSON.parse(localStorage.getItem('CurrentUser'));

            //console.log(prova);

        }

    }
})
</script>

<style scoped>

* {
    /*border: 1px solid red;*/
}

#disclaimer {
  background-color: rgb(252, 191, 191);
  border-radius: 4px;
  padding: 0.5em;
  margin: 1em;

  font-size: 12px;
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
    /*border-radius: 100%;*/
    padding-bottom: 0.2rem;
    margin-top: 2em;
    /*border-radius: 0.2rem;*/
    /*object-fit: cover;*/
    /*height: 30vh;*/
}

#pic_container {
    width: 10%;
}

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

.noleggiTab{
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

@media screen and (max-width: 800px) {

    #pic_container {
        width: 20%;
    }

}

@media screen and (max-width: 500px) {

    .profile_pic {
        margin: 0;
        width: 50%;
    }

    #pic_container {
        width: 40%;
        display: flex;
        justify-content: center;
    }

}


</style>
