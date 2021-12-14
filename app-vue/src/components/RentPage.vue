<template>
  <div>

    <p> PROVA  </p>

    
  </div>
</template>

<script>
import axios from '../http'

export default {
  name: 'RentPage',
  data() {
    return {
      prodInfo: [],
      idForRent: Number
      //slide: 0,
      //sliding: null,

      //isHidden:true
    };
  },

mounted: function() {
  
  /*axios.get('/prods', {
      
  })
  
    .then((response) => {
      this.prodInfo = response.data;
      console.log(this.prodInfo);
          //this.sortArray();
          //this.loading = false;
          //document.getElementById('ricerca').value = '';
    })
    .catch((error) => {
      //this.loading = false;
      console.log(error);
    });*/


},

methods: {

  onSlideStart() {
    this.sliding = true
  },

  onSlideEnd() {
    this.sliding = false
  }

}


//chiude l'export
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.b-card-footer {
    justify-content: center;
}

/**** gestisce i div con le immagini e i dati degli yacht *****/
.boat-images {
    /*background-color: lightgrey;*/
    float: left;
    border: 1px solid #86B3D1;
    /*border-radius: 1rem;*/
    margin: 4% 2% 0 2%; /*(up-right-down-left)*/
    /*padding: 1rem;*/
    width: 20%;
    overflow: auto;
    height: 70vh;

    z-index: -1;
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

.post_image {
    width: 100%;
    padding-bottom: 0.2rem;
    /*border-radius: 0.2rem;*/
    object-fit: cover;
    height: 20vh;
}

.price_data  {
    /*visibility: hidden;*/
    display: none;
}


@media screen and (max-width: 900px) {

    * {
        font-size: 20px;
    }

    #calcBtn {
        float: right;
        position: fixed;
        left: 80vw;
        right: 10vw ! important;
        /*margin-bottom: 2rem;*/
        width: 5rem;
        height: 5rem;
    }

    .boat-images, .b-card {
        background-color: red;
        float: left;
        border: 1px solid #86B3D1;
        /*border-radius: 1rem;*/
        /*margin: 4% 0 0 4%;*/
        align-self: center;
        /*padding: 1rem;*/
        width: 40%;
        overflow: auto; 
        height: 70vh;
    }
}


/*mobile first*/
#smallboat {
  width: 80vw;
}

.b-carousel-slide {
  width: 100%;
}

.carousel-item {
  display: block;
  height: 70vh;
}



</style>
