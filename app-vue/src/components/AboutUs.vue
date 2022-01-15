<template>
    <div id="about-us" class="flex-container">

        <h3> NoloNoloPlus </h3>
        <div id="aboutdata" class="flex-container">
            <div class="flex-container">
                <img class="shot" src="../../public/avatar.png">
                <div class="persInfo">
                    <h5 class="title"> Sofia Gavanelli </h5>
                    <h6 class="data"> bla bla bla bla bla </h6>
                </div>
            </div>
            <div class="flex-container">
                <div class="persInfo">
                    <h5 class="title"> Francesca Chiriacò </h5>
                    <h6 class="data"> bla bla bla bla bla </h6>
                </div>
                <img class="shot" src="../../public/avatar.png">
            </div>
            <div class="flex-container">
                <img class="shot" src="../../public/avatar.png">
                <div class="persInfo">
                    <h5 class="title"> Federica Palestini </h5>
                    <h6 class="data"> bla bla bla bla bla </h6>
                </div>
            </div>
        </div>

    <div>

    </div>



    </div>
</template>

<script>

export default {
    name: "AboutUs",
    methods: {

    }
}

</script>

<style scoped>

.persInfo {
    flex-direction: column;
}

.data, .title{
    font-family: "Dejavu Sans", Tahoma, Geneva, Verdana, sans-serif;
    color: #5F6366;
    padding-left: 1rem;
}

.shot {
    border-radius: 50%;
    width: 30vh;
}

#aboutdata {
    /*align-items: center;*/
    flex-direction: column;
    justify-content: center;
}

#about-us {
    /*align-items: center;
    flex-direction: column;
    justify-content: center;*/
    margin: 1em;
    border: 1px solid red;
    border-radius: 4px;
}

.flex-container {
    padding: 1em;
}

/*#about-us{
    background-color: red;
}*/

</style>

