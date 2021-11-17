

////
var first_time = true;
var prodJSON = 0;

$(document).ready(function () {
    console.log("sono dentro ready in main page");
    // richiesta storia
    // url_string prende l'url sotto forma di stringa della pagina html e con new URL la trasforma in un'url 
    //in modo che si possa accedere ai parametri dell'url url.searchParams.get('id')
        //var url_string = window.location.href;
        //var url = new URL(url_string);
        //var id = url.searchParams.get("id");
    // $.ajax è una funzione che si usa per creare connessioni http
    //get story by id 
        //if (first_time) {
            $.ajax({
                type: 'GET',
                url: '/prods' ,
                success: function (data) {

                    console.log(data);

                    //console.log("sono dentro success");
                },
                //Non è stata trovata la storia
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("La storia selezionata non esiste");
                }
            });
        //}
});


console.log("ciao ciao"); //questo viene stampato

function change(){
    console.log("sono dentro main page");
    var x = document.getElementsByClassName("price");
    console.log("", x);
    x.visibility = "visible";
    var y = document.getElementById("newRegC").style.visibility;
    y = "visible";
}

function openCalc(){

    console.log("sono dentro open calc"); 

    let div = null;

    div = $(` <div class="modal fade" role="dialog" id="calcModal">
                    <div class="modal-content">    
                        <div class="modal-header text-center">
                            <h4 class="modal-title w-100 font-weight-bold">Calcola il prezzo del tuo noleggio</h4>
                            <button type="button" class="close" data-dismiss="calcModal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3">
                            <a> *ricordiamo che lo yacht scelto potrebbe non essere disponibile nelle date richieste </a>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <button class="btn btn-default">Login</button>
                        </div>
                    </div>
            </div> `);
        
    $("#main_page").append(div);

}

function populate(){

    for (i=0; i<=8; i++) {
        let div = null;

            div = $(`<div class="boat-images" data-toggle="modal" data-target="#boatModal">
                        <div class="boat">
                            <img class="post_image" src="img/yacht2.png"></img>
                            <div class="boat_info">
                                <h3 class="title">Lucifero</h5>
                                <h4 class="title">Marca1</h5>
                                <div class="details">
                                    <ul class="d-flex flex-wrap pl-0">
                                        <li class="title">Potenza:<h5 class="data"> ---- </h5> </li>
                                        <li class="title">Lunghezza:<h5 class="data"> --- </h5> </li>
                                        <li class="title">Ospiti:<h5 class="data"> --- </h5> </li>
                                        <li class="title">Età:<h5 class="data"> --- </h5> </li>
                                        <li class="title">Prezzo: <h5 class="price_data"> ------ </h5> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </div>`);

            $("#main_page").append(div);
            
    }

    //$("#main_page").addClass('boat-images');
}

/******************/
/* VERSIONE ESEMPIO CON LE VARIABILI */
/*appendTweets(data, begin, end, word, img_only) {
    word = word || "";
    let reg = new RegExp(word.trim().replace(/(\s|,)+/g, '|').trim(), 'gi');
    
    let begin_count = $("#tweets-search").children().length;
    for (let i = begin; i < Math.min(data.length, end); i++) {
        let div = null;
        if (!img_only) {
            //If there is a keyword higlight it
            let text = data[i].text;
            if (word) {
                text = text.replace(reg, '<mark>$&</mark>');
            }
            div = $(`<div class="tweet">
                        <p class="date">${data[i].data}</p>
                        <img src="${data[i].profile || '/static/img/default_user.png'}" class="profile_pic" alt="profilepic_tweet${i}" onerror="this.src='/static/img/default_user.png'"></img>
                        <div class="user">
                           <h5>${data[i].user}</h5>
                           <p class="tweet-content">${text}</p>
                        </div>
                        <button class="showBtn" data-toggle="modal" data-target="#tweetModal" >Show</button>
                    </div>`);
                    div.find('button').on("click", () => this.showTweetInModal(data[i].id));
        } else if(data[i].images[0]) {
            div = $(`<div class="tweet-images" data-toggle="modal" data-target="#tweetModal">
                        <img src="${data[i].profile || '/static/img/default_user.png'}" class="profile_pic" alt="profilepic_tweet${i}" onerror="this.src='/static/img/default_user.png'"></img>
                        <div class="user">
                           <h5>${data[i].user}</h5>
                           <img class="post_image" src="${data[i].images[0]}"></img>
                        </div>
                    </div>`);
            div.on("click", () => this.showTweetInModal(data[i].id));
        }
       
        if(div) {
            // Add the city and coordinates only if they are available in the tweet
            if(data[i].city || data[i].coordinates){
                let yCenter = (Number(data[i].coordinates[0][1][0]) + Number(data[i].coordinates[0][3][0])) / 2;
                let xCenter = (Number(data[i].coordinates[0][1][1]) + Number(data[i].coordinates[0][3][1])) / 2;

                let cityAndCoord = `<p>Città: ${data[i].city}<br>Coordinate: lat ${xCenter}, long ${yCenter} </p>`;
                $(cityAndCoord).insertBefore(div.find('button'));
            }

            $("#tweets-search").append(div);
        } else {
            end++;
        }
    }

    //When the 50th tweet comes to the screen load 100 more
    if(end < data.length) {
        let end_count = $("#tweets-search").children().length;
        let i = begin_count + Math.floor((end_count - begin_count)/ 2);
        let div = $($("#tweets-search").children().get(i));
        $("#searchDiv").off();
        $("#searchDiv").on("scroll", () => {
            if(div.visible()) {
                $("#searchDiv").off();
                this.appendTweets(data, end, end + 100, word, img_only);
            }
        });
    }

    $("#tweets-search").addClass('bd-white');
}
*/


/*Vue.component('todo-component', {
    template: '#todo-component',
    data: function () {
        return {
            items: [
                {
                    id: 'item-1',
                    title: 'Checkout vue',
                    completed: false
                }, {
                    id: 'item-2',
                    title: 'Use this stuff!!',
                    completed: false
                }
            ],
            newItem: ''

        };
    },
    methods: {
        addItem: function () {
            if (this.newItem) {
                var item = {
                    id: Math.random(0, 10000),
                    title: this.newItem,
                    completed: false
                };

                this.items.push(item);
                this.newItem = '';
            }
        }
    }
});

//nell'html:
/* 
    <div class="container" id="vue-app">
        [....]
        <div class="col-md-4">
            <todo-component></todo-component>
        </div>
    </div>

 */


/***********************************************************************
NUOVA VERSIONE JS CON VUE


 export default{
    name: "App", 

    /*created() {
        //funzione di popolamento ?
    },*
    mounted() {
        //?
    },

    methods: {
        //funzioni varie?

        renderEl() {

            return `<div class="boat-images" data-toggle="modal" data-target="#boatModal">
                        <div class="boat">
                            <img class="post_image" src="img/yacht2.png"></img>
                            <div class="boat_info">
                                <h3 class="title">Lucifero</h5>
                                <h4 class="title">Marca1</h5>
                                <div class="details">
                                    <ul class="d-flex flex-wrap pl-0">
                                        <li class="title">Potenza:<h5 class="data"> ---- </h5> </li>
                                        <li class="title">Lunghezza:<h5 class="data"> --- </h5> </li>
                                        <li class="title">Ospiti:<h5 class="data"> --- </h5> </li>
                                        <li class="title">Età:<h5 class="data"> --- </h5> </li>
                                        <li class="title">Prezzo: <h5 class="price_data"> ------ </h5> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`
        }
    }
};

var vm = new Vue ({
    el: '#main_page'
})*/



/*************************************************** *
//VERSIONE 3 16:39 27 OTTOBRE
// Create a Vue application
const app = Vue.createApp({})

// Define a new global component called button-counter
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
})*


new Vue({
    el: "#prova",
    data() {
      return {
        someValue: 10
      }
    },
    computed: {
      someComputed() {
        return this.someValue * 10;
      }
    }
  });*/



  //js per l'index iniziale!!

///////////////////////////////77
/* DARIO
var player_id = null;
var validPhoto = null;
var index = null;
var next_index = 0;
var storyJSON = null;
var answer = "";
var isChatOpen = false;
var isHelpPaneOpen = false;
var isTextWindowOpen = false;


---------------------------> qui ha senso mettere il popolamento
$(document).ready(function () {
// richiesta storia
// url_string prende l'url sotto forma di stringa della pagina html e con new URL la trasforma in un'url 
//in modo che si possa accedere ai parametri dell'url url.searchParams.get('id')
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
// $.ajax è una funzione che si usa per creare connessioni http
//get story by id 
    if (id) {
        $.ajax({
            type: 'GET',
            url: '/stories/' + id,
            success: function (data) {
                storyJSON = data;
                //Invoco la funzione per caricare il css della storia
                loadCustomCSS();
                
                //Label accessibilita' storia
                if (storyJSON.accessible) {
                    $('#generico').append('<span id="accessibility" class="accessibility-true">Storia accessibile</span>');
                } else {
                    $('#generico').append('<span id="accessibility" class="accessibility-false">Storia non accessibile</span>');
                }
                
                //Se la storia è stata pubblicata setto il player, altrimenti blocco l'app
                if (storyJSON.published) {
                    $('#score').text('Score: 0');
                    blinkNotify('#score');
                    setPlayer(storyJSON);
                } else {
                    blockApplication('La storia risulta archiviata, per tanto non è possibile giocarci');
                }
               
            },
            //Non è stata trovata la storia
            error: function (xhr, ajaxOptions, thrownError) {
                blockApplication('La storia selezionata non esiste');
            }
        });
    } else {
        //Non c'è l'id nel url
        blockApplication('Non è selezionata nessuna storia')
    }
}); */
