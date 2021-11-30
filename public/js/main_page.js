

////
var prodARRAY = 0;
var CLIENTINFO = 0;
var loggedIN = false;
var idLoggedIn = 0;
var nameLoggedIn = 0;

$(document).ready(function () {
    // richiesta storia
    // $.ajax è una funzione che si usa per creare connessioni http
            $.ajax({
                type: 'GET',
                url: '/prods' ,
                success: function (data) {

                    prodARRAY = JSON.parse(data);

                    populate(prodARRAY);

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("errori con db");
                }
            });

});

function home() {
    /*aggiungere if(loggedIn) per gestire il fatto che un cliente già dentro stia navigando
    se invece non è dentro else() serve solo il ricaricamento:*/

    $("#main_page").empty();

    //devo rimettere l'introduzione!! $("#introduzione").show(); non funziona 

    document.getElementById("main_page").style.justifyContent = 'center';
    populate(prodARRAY);

    if(loggedIN) {
        change();
    }

}


function change(){
    //document.getElementsByClassName("price_data").style.visibility = "visible";
    //document.getElementsByClassName("price_data").style.display = "inline";
    //$('.price_data').css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​,'block');​​​​​​

    var elems = document.getElementsByClassName('price_data');
    
    for (var i=0;i<elems.length;i+=1){
        elems[i].style.display = 'block';
    }

}

function login(){

    _id = document.getElementById("username").value;
    _pass = document.getElementById("pass").value;

    console.log(_id, _pass);
    
    if(_id) {
        $.ajax({
            type: 'GET',
            url: '/client/' + _id,
            success: function (info) {

                CLIENTINFO = JSON.parse(info);

                controlInfo(CLIENTINFO, _pass);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("errori con login");
            }
        });
    }
    else {
        console.log("not a valid id");
    }

}

function controlInfo(data, insertedP) {

    for (let i in data) {

        if(data[i].password == insertedP) {
            change();

            var found = true;
            loggedIN = true;
            idLoggedIn = data[i].client_id;
            nameLoggedIn = data[i].name;
        }
    }

    if (!found) {
        console.log("non esiste cliente con questa accoppiata pass-nome");

        let div = null;

        div = $(` <div> Username e/o password errati. </div> `);

        $("#loginfo").append(div);

    }
    else {
        //se entri si aggiunge una scritta nella navbar?

        $('#loginModal').modal('toggle'); 

        /*var elems = document.getElementsByClassName('noleggioBtn');
    
        for (var i=0;i<elems.length;i+=1){
            elems[i].style.display = 'block';
        }*/
        
        document.getElementById("calcBtn").remove();
    }

}

function openCalc(){

    console.log("sono dentro open calc"); 

    document.getElementById("calcCard").style.display = "block";

    /*let div = null;

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
            </div>  );
        
    $("#calcolatrice").append(div);*/

}

function populate(ProductInfo){


    if($(window).width() <= 700) {
        console.log("sei dentro");

        $("#main_page").empty();

        let div = null;

        /*questo è il div senza le aggiunte 
        div = $(`<div id="carousel-deck" class="carousel slide" data-ride="carousel" data-interval="false" data-wrap="false">
                    <ol class="carousel-indicators">
                    </ol>
                    <div class="carousel-inner" role="listbox">
                    </div>
                <a class="left carousel-control" href="#carousel-deck"
                    data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span><span
                        class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-deck"
                    data-slide="next"><span
                        class="glyphicon glyphicon-chevron-right"></span><span
                        class="sr-only">Next</span>
                </a>
            </div>`);

        $("#main_page").append(div);

        //adesso va riempito
        var markup = '';

        for (let i in ProductInfo) {
            markup += '<li data-target="#carousel-deck" data-slide-to="' + ProductInfo[i].name + '"></li>';
        }

        $('#carousel-deck .carousel-indicators').html(markup);
        markup = '';

        for (let i in ProductInfo) {
            markup += '<div class="item">';
            markup += '<img src=" '+ ProductInfo[i].image +' " style="width:100%;">'
            markup += '</div>';
        }

        $('#carousel-deck .carousel-inner').html(markup);
        $('#carousel-deck .item').first().addClass('active');
        $('#carousel-deck .carousel-indicators > li').first().addClass('active');
        $('#carousel-deck').carousel({
            pause: true,
            interval: false
        });*/

        div = $(`<div id="myCarousel" class="carousel slide" data-mdb-ride="carousel" >
                <div class="carousel-inner">
                </div>
                <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true" style="color: black"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true" style="color:black; font-size=x-large"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>`);

        $("#main_page").append(div);

        var items = [];

        for(let i in ProductInfo) {
        var item = ''
            +'<div class="carousel-item">'
            + `<img class="post_image" `
            +       ` src="${ProductInfo[i].image}" alt="photo of ${ProductInfo[i].name}">`
            +  `<div class="carousel-caption">`
            +    `<h3 class="title">${ProductInfo[i].name}</h5>
                    <h4 class="title">${ProductInfo[i].brand}</h5>
                    <div class="details">
                        <ul class="d-flex flex-wrap pl-0">
                            <li class="title">Potenza:<h5 class="data"> ${ProductInfo[i].power} </h5> </li>
                            <li class="title">Lunghezza:<h5 class="data"> ${ProductInfo[i].length} </h5> </li>
                            <li class="title">Ospiti:<h5 class="data"> ${ProductInfo[i].guests} </h5> </li>
                            <li class="title">Anno:<h5 class="data"> ${ProductInfo[i].year} </h5> </li>
                            <div class="price_data"> <li class="title"> Prezzo: 
                                    <h5 class="data"> ${ProductInfo[i].price} </h5> </li> </div>
                        </ul>
                    </div>`
            +  '</div>'
            +'</div>'
        items.push(item);
        }
        var myCarouselEl = document.getElementById("myCarousel");
        var carouselInnerEl = myCarouselEl.getElementsByClassName("carousel-inner")[0];
        carouselInnerEl.innerHTML =items.join("\n");
        carouselInnerEl.firstElementChild.className += " active";
        $(myCarouselEl).carousel({interval: false});

    }

    else {
        for (let i in ProductInfo) {
            let div = null;

                /*div = $(`<div class="boat-images" data-toggle="modal" data-target="#boatModal">
                        <div class="boat">
                            <img class="post_image" src="${ProductInfo[i].image}"></img>
                            <div class="boat_info">
                                <h3 class="title">${ProductInfo[i].name}</h5>
                                <h4 class="title">${ProductInfo[i].brand}</h5>
                                <div class="details">
                                    <ul class="d-flex flex-wrap pl-0">
                                        <li class="title">Potenza:<h5 class="data"> ${ProductInfo[i].power} </h5> </li>
                                        <li class="title">Lunghezza:<h5 class="data"> ${ProductInfo[i].length} </h5> </li>
                                        <li class="title">Ospiti:<h5 class="data"> ${ProductInfo[i].guests} </h5> </li>
                                        <li class="title">Anno:<h5 class="data"> ${ProductInfo[i].year} </h5> </li>
                                        <div class="price_data"> <li class="title"> Prezzo: 
                                                <h5 class="data"> ${ProductInfo[i].price} </h5> </li> </div>
                                    </ul>
                                </div>
                            </div>

                            <div class="flex-container" id="nB">
                                <button class="noleggioBtn" id="${i}">
                                    NOLEGGIA
                                </button>
                            </div>

                        </div>
                </div>`);  class="card-img-top"*/

                div = $(`<div class="card" >
                            <img class="post_image" src="${ProductInfo[i].image}" alt="Card image cap">
                            <div class="card-body">
                                    <h3 class="title">${ProductInfo[i].name}</h5>
                                    <h4 class="title">${ProductInfo[i].brand}</h5>
                                    <div class="details">
                                        <ul class="d-flex flex-wrap pl-0">
                                            <li class="title">Potenza:<h5 class="data"> ${ProductInfo[i].power} </h5> </li>
                                            <li class="title">Lunghezza:<h5 class="data"> ${ProductInfo[i].length} </h5> </li>
                                            <li class="title">Ospiti:<h5 class="data"> ${ProductInfo[i].guests} </h5> </li>
                                            <li class="title">Anno:<h5 class="data"> ${ProductInfo[i].year} </h5> </li>
                                            <div class="price_data"> <li class="title"> Prezzo: 
                                                    <h5 class="data"> ${ProductInfo[i].price} </h5> </li> </div>
                                        </ul>
                                    </div>
                            </div>

                            <div class="card-footer" >
                                <button type="button" class="noleggioBtn" id="${i}">
                                    NOLEGGIA
                                </button>
                            </div>

                    </div>`);

            $("#main_page").append(div);
                
        }
    }

    //$("#main_page").addClass('boat-images');
}

$(document).on('click', ".post_image", function () {
    console.log(this.id);

    var x = this.id;

    $("#introduzione").empty();
    $("#main_page").empty();

    $('.datepicker').datepicker();

    let div = null;

        //forse in questa parte l'immagine si può togliere

        div = $(`<div class="flex-container" id="noleggiocard">
                    <div class="flex-container" id="leftinfo">
                        <div class="flex-element">
                            <img class="post_image" src="${prodARRAY[x].image}"></img>
                        </div>
                        <div class="flex-element">
                            <h3 class="title">${prodARRAY[x].name}</h5>
                            <h4 class="title">${prodARRAY[x].brand}</h5>
                            <div class="details">
                                <ul class="d-flex flex-wrap pl-0">
                                    <li class="title">Potenza:<h5 class="data"> ${prodARRAY[x].power} </h5> </li>
                                    <li class="title">Lunghezza:<h5 class="data"> ${prodARRAY[x].length} </h5> </li>
                                    <li class="title">Ospiti:<h5 class="data"> ${prodARRAY[x].guests} </h5> </li>
                                    <li class="title">Anno:<h5 class="data"> ${prodARRAY[x].year} </h5> </li>
                                    <li class="title"> Prezzo: <h5 class="data"> ${prodARRAY[x].price} </h5> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="flex-element">
                        tutte le cose per il noleggio !
                    </div>
                                     
            </div>
            
            <div class="flex-container">
                <div class="flex-element">
                    <input placeholder="Scegli una data" class="form-control hasDatepicker">
                        
                    </input>
                </div>
            </div>
            
            
            `);

    document.getElementById("main_page").style.justifyContent = 'left';

    $("#main_page").append(div);

    console.log(nameLoggedIn);

}); 
