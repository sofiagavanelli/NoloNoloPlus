<template>

    <div id="profile_page" class="flex-container">

        <!-- cambiare estetica? 
        image: {type: String},
        name: {type: String, required: true},
        client_id: {type: String, required: true},
        password: {type: String, required: true, minLeght: 5},
        place: {type: String, required: true},
        address: {type: String, required: true}
        -->

        <img class="profile_pic" :src="this.profileInfo[0].img" alt="Card image cap">

        <b-card class="profile">
            <b-card-body>
                <h3 class="title"> {{this.profileInfo[0].name}} {{this.profileInfo[0].surname}} </h3>
                <div class="details">
                <ul class="d-flex flex-wrap pl-0" >
                    <li class="title"> USERNAME: <h5 class="data"> {{this.profileInfo[0].client_id}} </h5> </li>
                    <li class="title"> CITTA: <h5 class="data"> {{this.profileInfo[0].place}} </h5> </li>
                    <li class="title"> INDIRIZZO: <h5 class="data"> {{this.profileInfo[0].address}} </h5> </li>
                </ul>
                </div>

                <h5 class="title"> NOLEGGI: </h5> 
            
                <div id="rents" v-for="item in rentInfo" :key="item._id">
                    <!-- green light -->
                    <template v-if="item.approved"> 
                        <font-awesome-icon icon="circle" style="color:green"/> approvato
                    </template>
                    <!-- red light -->
                    <template v-else> 
                        <font-awesome-icon icon="circle" style="color:red"/> non approvato
                    </template>
                    <br>
                    <div class="rentInfo"> 
                        {{item.prod_id}} <br>
                        {{item.start_date.slice(0,10)}} <br>
                        {{item.end_date.slice(0,10)}}
                    </div>
                </div>

            </b-card-body>
        </b-card>

        <!--div>
            <h5 class="title"> NOLEGGI: </h5> 
            
            <div id="rents" v-for="item in rentInfo" :key="item._id">
                <!- green light --
                <template v-if="item.approved"> 
                    <font-awesome-icon icon="circle" style="color:green"/> approvato
                </template>
                <!- red light --
                <template v-else> 
                    <font-awesome-icon icon="circle" style="color:red"/> non approvato
                </template>
                <br>
                <div class="rentInfo"> 
                    {{item.prod_id}} <br>
                    {{item.start_date}} <br>
                    {{item.end_date}}
                </div>
            </div>
        </div-->

    </div>


</template>
<script>
import axios from '../http'

export default({
    name: 'ProfilePage',
    data() {
        return {
            username: null,

            profileInfo: [],
            rentInfo: [],
        };
    },
    mounted() {

        this.username = this.$store.state.username;

        axios.get('/allClients/' + this.username)
          .then((response) => {
            this.profileInfo = response.data;

            //console.log((this.profileInfo[0]).img);
          })
          .catch((error) => {
            //this.loading = false;
            console.log(error);
          });

        axios.get('/user-rentals/' + this.username)
          .then((response) => {
            this.rentInfo = response.data;

            console.log(this.rentInfo);
          })
          .catch((error) => {
            //this.loading = false;
            console.log(error);
          });
        
    },
})
</script>

<style scoped>

* {
    border: 1px solid red;
}

.profile {/*(up-right-down-left)*/
    margin: 2em 2em 0.5em 2em;
    border: none;
}

.card-body {
    padding: 0 !important;
}

.profile_pic {
    width: 20%;
    border-radius: 100%;
    padding-bottom: 0.2rem;
    /*border-radius: 0.2rem;*/
    /*object-fit: cover;*/
    /*height: 30vh;*/
}

.rentInfo {
    padding: 0.5em;
    border: 1px solid grey;
    border-radius: 3px;
}

#rents {
    padding: 0.5em;
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
    border-top: 1px solid #86B3D1;
}

@media screen and (max-width: 500px) {

    .profile_pic {
        width: 50%;
    }

}


</style>
