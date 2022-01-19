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
        <b-card>
            <img :src="this.profileInfo[0].image" alt="Card image cap">
            <b-card-body>
                <h3 class="title"> {{this.profileInfo[0].name}} {{this.profileInfo[0].surname}} </h3>
                <div class="details">
                <ul class="d-flex flex-wrap pl-0" >
                    <li><h5 class="data"> {{this.profileInfo[0].client_id}} </h5> </li>
                    <li><h5 class="data"> {{this.profileInfo[0].place}} </h5> </li>
                    <li><h5 class="data"> {{this.profileInfo[0].address}} </h5> </li>
                </ul>
                </div>
            </b-card-body>

        </b-card>

        <!-- scelte multiple per scegliere e calcolare il rent -->

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
        };
    },
    mounted() {

        this.username = this.$store.state.username;

        axios.get('/client/' + this.username)
          .then((response) => {
            this.profileInfo = response.data;

          })
          .catch((error) => {
            //this.loading = false;
            console.log(error);
          });

        
    },
})
</script>

<style scoped>

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

</style>
