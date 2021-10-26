//js per l'index iniziale!!

console.log("ciao ciao"); //questo viene stampato

function change(){
    console.log("sono dentro main page");
    var x = document.getElementsByClassName("price");
    console.log("", x);
    x.visibility = "visible";
}

/*function openCalc(){

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

}*/

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
}*/

