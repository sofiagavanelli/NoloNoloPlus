<template>
    <div id="about-us" class="flex-container">

        <h3> NoloNoloPlus </h3>
        <div id="aboutdata" class="flex-container">
            <div class="flex-container">
                <img src="../../public/avatar.png">
                <h5 class="title"> Sofia Gavanelli </h5>
                <h6 class="data"> bla bla bla bla bla </h6>
            </div>
            <div class="flex-container">
                <h5 class="title"> Francesca Chiriacò </h5>
                <h6 class="data"> bla bla bla bla bla </h6>
                <img src="../../public/avatar.png">
            </div>
            <div class="flex-container">
                <img src="../../public/avatar.png">
                <h5 class="title"> Federica Palestini </h5>
                <h6 class="data"> bla bla bla bla bla </h6>
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

.data, .title{
    font-family: "Dejavu Sans", Tahoma, Geneva, Verdana, sans-serif;
    color: #5F6366;
    padding-left: 1rem;
}

.img {
    border-radius: 50%;
}

#aboutdata {
    justify-content: center;
}

.flex-container {
    border: 1px solid red;
}

/*#about-us{
    background-color: red;
}*/

</style>

