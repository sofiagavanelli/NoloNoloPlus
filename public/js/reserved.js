
var clientARRAY = 0;
var inventoryARRAY = 0;
var rentARRAY = 0;
var WORKERINFO = 0;
var prova = 0;


/************************* */
//LOGIN DEL WORKER/MANAGER
function login(){

  _id = document.getElementById("userWorker").value;
  _pass = document.getElementById("passWorker").value;

  
  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/worker/' + _id ,
          success: function (info) {

              WORKERINFO = JSON.parse(info);

              acceptWorker(WORKERINFO, _pass);


          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {

  }

}

function acceptWorker(data, insertedP) {

  for (let i in data) {

    if(data[i].password == insertedP) {

        if(data[i].manager == true) {
          document.getElementById("managBtn").disabled = false;
        }
        else if(document.getElementById("managCheck"))
        console.log("sono dentro");
        location.href = '/worker';

        var found = true;
    }
  }

  if (!found) 
      console.log("non esiste WORKER con questa accoppiata pass-nome");


}

function logOut(){
  location.href = '/login';

}
/***************************** */
/*SIDEBAR -> CLIENTI */
function openClient() {
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  

    $.ajax({
      type: 'GET',
      url: '/allClients' ,
      success: function (data) {

        clientARRAY = JSON.parse(data);

        populate(clientARRAY);
      },
      error: function (xhr, ajaxOptions, thrownError) {

      }
  });

  div = $(`
            <form class="example">
            <input type="text" id="clientId" placeholder="Search client..." name="search">
            <button class="form-btn" type="submit" onclick="searchClient(id)"><i class="fa fa-search"></i></button>
            </form>

            `);
            $("#ctable").append(div);


  function populate(ClientInfo){

      for (let i in ClientInfo) {
          let div = null;

            div = $(`
                <div class="card" style="width: auto; float: left; display: block; margin-left: 3%;">        
                  <img src="${ClientInfo[i].image}" style="height: 13em;"class="card-img-top" alt="...">              
                  <div class="card-body">              
                    <h5 class="card-title" style="text-align: center;">${ClientInfo[i].name} ${ClientInfo[i].surname}</h5>              
                    <p class="card-text" style="text-align: center;">ID: ${ClientInfo[i].client_id}</p>    
                    <div class="card-footer">         
                      <button id="${ClientInfo[i].client_id}" onclick= "deleteClient(id)" class="btn-d">Delete</button>
                      <button class="btn-mod" id="${ClientInfo[i].client_id}" onclick= "modifyClient(id)">Modify</button>             
                    </div>    
                  </div>             
                </div> 

            `);
            $("#ctable2").append(div);
}
} 
}
/***************************** */
/* SIDEBAR -> INVENTARIO */
function openInventory() {
 
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();

  $.ajax({
    type: 'GET',
      url: '/prods' ,
        success: function (data) {
  
          inventoryARRAY = JSON.parse(data);
  
          populateP(inventoryARRAY);

        },

        error: function (xhr, ajaxOptions, thrownError) {

        }
  });

    div = $(`
    <div class="flex-form-container"> 
    <button type="button" class="btn-cat" onclick="showYacht(inventoryARRAY)" style="margin-left: 2%;" data-bs-toggle="button">Yacht</button>
    <button type="button" class="btn-cat" onclick="showGomm(inventoryARRAY)" data-bs-toggle="button">Gommoni</button>
    <button type="button" class="btn-cat" onclick="showBarche(inventoryARRAY)" style="margin-right: 20%;"data-bs-toggle="button">Barche a remi</button>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort by </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
        <button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
        <button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
        </div>
      </div>
      <input type="text" id="prodId" placeholder=" Search product..." name="search">          
      <button class ="form-btn" type="submit" onclick="searchProd(id)"><i class="fa fa-search"></i></button> 
    </div>
    `);
    $("#ctable").append(div);
          
    function populateP(ProdInfo){
      for (let i in ProdInfo) { 
        let div = null;
              
        div = $(`     
        <div class="flex-container">
        <div class="card" style="width: 19em; float: left; display: block; margin-left: 3%; margin-top: 1em;">        
        <img src="https://site202133.tw.cs.unibo.it/img/${ProdInfo[i].category}/${ProdInfo[i].prod_id}.jpg" style=" widht: 10em; height: 10rem;"class="card-img-top" alt="...">              
        <div class="card-body">              
        <h5 class="card-title" style="text-align: center;">${ProdInfo[i].name}</h5>              
        <p class="card-text" style="text-align: center;">ID: ${ProdInfo[i].prod_id}</p>
        <p class="card-text">Brand: ${ProdInfo[i].brand} <br>
        Price: ${ProdInfo[i].low_season}€ - ${ProdInfo[i].high_season}€</p>     
        <div class="card-footer">         
        <button class="btn-mod" id="${ProdInfo[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">See more</button>             
        </div>    
        </div>             
        </div> 
        </div>           
        `);
        $("#ctable2").append(div);
  
      }      
    } 
}
/***************************** */
/*SIDEBAR -> NOLEGGI*/
function openRents() {
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
        
  $.ajax({
    type: 'GET',
    url: '/allRents' ,
    success: function (data) {
      rentARRAY = JSON.parse(data);       
      populate(rentARRAY);
      
    },
            
    error: function (xhr, ajaxOptions, thrownError) {  
      
    }
    });
  div = $(`   
  <div class="flex-form-container"> 
  <button type="button" class="btn-cat" onclick="pastRents(rentARRAY)" style="margin-left: 2%;" data-bs-toggle="button">Closed</button>
  <button type="button" class="btn-cat" onclick="activeRents(rentARRAY)" data-bs-toggle="button">Active</button>
  <button type="button" class="btn-cat" onclick="futureRents(rentARRAY)" style="margin-right: 20%;"data-bs-toggle="button">Future</button>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Sort by </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button class="dropdown-item" type="button" id="sortName" onclick= "SortName()">Name</button>
    <button class="dropdown-item" type="button" id="sortDate" onclick= "SortDate()">Date</button>
      </div>
    </div>
    <input type="text" id="rentId" placeholder=" Search product..." name="search">          
  <button class ="form-btn" type="submit" onclick="searchRent(id)"><i class="fa fa-search"></i></button>
  </div>

  `);
              
  $("#ctable").append(div);
    
      
  function populate(RentInfo){
    
    for (let i in RentInfo) {
          
      let div = null;
      
            
      div = $(`

      <div class="flex-container">
        <div class="card" style="width: 20em; float: left; display: block; margin-left: 3%; margin-top: 1em;">
          <div class="card-body">
            <h5 class="card-title">Rental number: ${RentInfo[i]._id}</h5>
            <p class="card-text">Client ID: ${RentInfo[i].client_id}  <button type="button" id="${RentInfo[i].client_id}" class="btn-postit" onclick="Notes(id)"><i class="far fa-sticky-note fa-lg"></i></button>
             <br> Product ID: ${RentInfo[i].prod_id}<br></p>
            <p class="card-text">Start date: ${RentInfo[i].start_date.slice(0,10)} <br> End date: ${RentInfo[i].end_date.slice(0,10)}</p>
            <button id="${RentInfo[i]._id}" onclick= "deleteRents(id)" class="btn-d">Delete</button>
            <button class="btn-mod">Modify</button>
          </div>
        </div> 
      </div>  `);
    $("#ctable2").append(div);
    }
  } 
}
     
/************************************/

/* RICERCA NOLEGGIO */
function searchRent(){

  _id = document.getElementById("rentId").value;
  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/allRents/' + _id ,
          success: function (info) {
            //console.log(_id);
            //console.log("trovato");

            acceptRent(rentARRAY, _id);
          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {
//console.log("errore nell'else");
  }

}
function acceptRent(data, insertedID) {

  for (let i in data) {

    if(data[i]._id == insertedID) {
        //console.log("???????");
        $( "#ctable2" ).empty();
        $( "#ctable" ).empty();
        //console.log("sono dopo il vuoto");
        div = $(`         
        <button class="btn-back"onclick= "goBackRents()"><i class="fas fa-home"></i> RENTS</button>
  `);
              
  $("#ctable").append(div);
        div = $(` 
        <div class="flex-container">
          <div class="card" style="width: 20em; float: left; display: block; margin-left: 3%; margin-top: 1em;">
            <h5 class="card-title-new">RENT: ${data[i]._id}</h5>
            <p class="card-text-new">Client ID: ${data[i].client_id} <br> Product ID: ${data[i].prod_id}<br></p>
            <p class="card-text-new">Start date: ${data[i].start_date.slice(0,10)} <br> End date: ${data[i].end_date.slice(0,10)}</p>
            <button id="${data[i]._id}" onclick= "openAlertRents(id)" class="btn-d2"><i class="fas fa-trash-alt"></i> Delete</button>
            <button class="btn-mod2"><i class="fas fa-wrench"></i> Modify</button>
                
          </div>
        </div>
        
        `);
        $("#ctable2").append(div);
        //console.log("prooooovaaa");

        

        var found = true;
    }
  }

  if (!found) 
      console.log("non esiste noleggio");


}
/* RICERCA CLIENTE */
function searchClient(){

  _id = document.getElementById("clientId").value;
  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/allClients/' + _id ,
          success: function (info) {

            modifyClient(clientARRAY, _id);
          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {
console.log("errore nell'else");
  }

}

/* RICERCA PRODOTTO */
function searchProd(){

  _id = document.getElementById("prodId").value;
  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/prods/' + _id ,
          success: function (info) {
            //console.log("sono in success");
            acceptProd(inventoryARRAY, _id);
          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {
  console.log("errore nell'else dell'inventario");
  }

}
function acceptProd(data, insertedID) {
  var x = 0;

  for (let i in data) {

    if(data[i].prod_id == insertedID) {
        $( "#ctable2" ).empty();
        $( "#ctable" ).empty();
        div = $(`         
        <button class="btn-back"onclick= "goBackInventory()"><i class="fas fa-home"></i> PRODUCTS</button>
        `);
      $("#ctable").append(div);
      div = $(` 
      <div class="flex-container" style=" margin-left: 3%;">
        <img src="https://site202133.tw.cs.unibo.it/img/${data[i].category}/${data[i].prod_id}.jpg" alt="" width="380" height="280">
        <form class="row g-3" action="/update-prod" method="POST" role="form" style="width: 60%; position: relative; float: right; right: 3%;margin-bottom: 30%;">
          <div class="col-md-6">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="create2" id="inputName" name="name" value="${data[i].name}">
          </div>
          <div class="col-md-6">
            <label for="inputID" class="form-label">Product ID</label>
            <input type="text" class="create2" id="inputID" name="product" value="${data[i].prod_id}" style="cursor: not-allowed;" readonly="readonly">
          </div>
          <div class="col-md-6">
            <label for="inputBrand" class="form-label">Brand</label>
            <input type="text" class="create2" id="inputBrand" name="brand" value="${data[i].brand}">
          </div>
          <div class="col-md-6">
          <label for="inputCat" class="form-label">Category</label>
          <input type="text" class="create2" id="inputCat" name="category" value="${data[i].category}" >
          </div>
          <div class="col-md-6">
            <label for="inputLow" class="form-label">Price Low Season</label>
            <input type="text" class="create2" id="inputLow" name="lowseason" value="${data[i].low_season}">
          </div>
          <div class="col-md-6">
            <label for="inputHigh" class="form-label">Price High Season</label>
            <input type="text" class="create2" id="inputHigh" name="highseason" value="${data[i].high_season}">
          </div>
          <div class="col-md-4">
            <label for="inputStatus" class="form-label">Status</label>
            <select class="create2" id="inputStatus" name="stato" aria-label="Select status">
            <option selected value="${data[i].status}">${data[i].status}</option>
              <option value="ottimo">ottimo</option>
              <option value="buono">buono</option>
              <option value="rovinato">rovinato</option>
              <option value="rotto">rotto</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="inputYear" class="form-label">Length</label>
            <input type="text" class="create2" id="inputYear" name="length" value="${data[i].length}">
            </div>
          <div class="col-md-2">
            <label for="inputGuest" class="form-label">Guests</label>
            <input type="text" class="create2" id="inputGuest" name="guests" value="${data[i].guests}">
          </div>
          <div class="col-md-2">
            <label for="inputYear" class="form-label">Year</label>
            <input type="text" class="create2" id="inputYear" name="year" value="${data[i].year}">
          </div>
          <div class="col-md-2">
            <label for="inputSpeed" class="form-label">Speed</label>
            <input type="text" class="create2" id="inputSpeed" name="speed" value="${data[i].speed}">
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="summary" class="form-label">Product description</label>
              <textarea type="text" class="create2" name="summary" value="${data[i].summary}" style="cursor: not-allowed;" readonly="readonly"></textarea>
            </div>
          </div>
          <div class="col-12">
            <button class="btn-sub" onclick="approveProd()" style="margin-left: 14em;">Update</button>  <i id="smile" class="fas fa-check fa-2x" style="color: green; visibility: hidden; margin-left: 2%; "></i>
          </div>
        </form>
        <button id="${data[i].prod_id}" onclick= "deleteProd(id)" class="btn-sub" style="float: left;margin-top: 2em; margin-left: 0.5em;"><i class="fas fa-trash-alt"></i>  Delete</button>
        <button id="${data[i].prod_id}" onclick= "deleteProd(id)" class="btn-sub" style="float: left; margin-top: 2em; margin-left: 1em; width: 12em;"><i class="fas fa-ban"></i>  Make Unavailable</button>
      </div>
       
      `);
      $("#ctable2").append(div);

        var found = true;
    }
  }

  if (!found) 
    console.log("non esiste prodotto");
}

/***************************** */
/*FUNZIONI PER ELIMINAZIONE */

/*ELIMINAZIONE NOLEGGIO */
function deleteRents(idR) {

  if(idR) {
    $.ajax({
    type: 'DELETE',
    url: '/allRents/' + idR ,
    success: function (data) {
      openRents();

    },
    error: function (xhr, ajaxOptions, thrownError) {

    }
    });
  }
  
}
/*ELIMINAZIONE CLIENTE */
function deleteClient(idDel) {

  if(idDel) {
    $.ajax({
    type: 'DELETE',
    url: '/allClients/' + idDel ,
    success: function (data) {
      openClient();
    },
    error: function (xhr, ajaxOptions, thrownError) {

    }
    });
  }
  
}

/*ELIMINAZIONE PRODOTTO */
function deleteProd(idP) {

  if(idP) {
    $.ajax({
    type: 'DELETE',
    url: '/prods/' + idP ,
    success: function (data) {
      openInventory();

    },
    error: function (xhr, ajaxOptions, thrownError) {

    }
    });
  }
  
}

/***************************** */
/*FUNZIONI ORDINAMENTO */

/*ORDINE ALFABETICO PER ID CLIENTE DEI NOLEGGI*/
function SortName(){   
rentARRAY.sort((a,b) => (a.client_id > b.client_id) ? 1 : ((b.client_id > a.client_id) ? -1 : 0))

$( "#ctable" ).empty();
$( "#ctable2" ).empty();

div = $(`         
<div class="flex-form-container"> 
<button type="button" class="btn-cat" onclick="pastRents(rentARRAY)" style="margin-left: 2%;" data-bs-toggle="button">Closed</button>
<button type="button" class="btn-cat" onclick="activeRents(rentARRAY)" data-bs-toggle="button">Active</button>
<button type="button" class="btn-cat" onclick="futureRents(rentARRAY)" style="margin-right: 20%;"data-bs-toggle="button">Future</button>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort by </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" id="sortName" onclick= "SortName()">Name</button>
  <button class="dropdown-item" type="button" id="sortDate" onclick= "SortDate()">Date</button>
    </div>
  </div>
  <input type="text" id="rentId" placeholder=" Search product..." name="search">          
<button class ="form-btn" type="submit" onclick="searchRent(id)"><i class="fa fa-search"></i></button>
</div>

`);
            
$("#ctable").append(div);
for (let i in rentARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="flex-container">
  <div class="card" style="width: 20em; float: left; display: block; margin-left: 3%; margin-top: 1em;">
    <div class="card-body">
      <h5 class="card-title">Rental number: ${rentARRAY[i]._id}</h5>
      <p class="card-text">Client ID: ${rentARRAY[i].client_id} <br> Product ID: ${rentARRAY[i].prod_id}<br></p>
      <p class="card-text">Start date: ${rentARRAY[i].start_date.slice(0,10)} <br> End date: ${rentARRAY[i].end_date.slice(0,10)}</p>
      <button id="${rentARRAY[i]._id}" onclick= "deleteRents(id)" class="btn-d">Delete</button>
      <button class="btn-mod">Modify</button>
    </div>
  </div> 
</div>  
          `);
           $("#ctable2").append(div);
         
     } 
}
/*ORDINE DATA CRESCENTE NOLEGGI */
function SortDate(){   //ordina in base alla data

  rentARRAY.sort(function compare(a, b) {
    var dateA = new Date(a.start_date);
    var dateB = new Date(b.start_date);
    return dateA - dateB;
  });

$( "#ctable" ).empty();
$( "#ctable2" ).empty();


div = $(`         
<div class="flex-form-container"> 
<button type="button" class="btn-cat" onclick="pastRents(rentARRAY)" style="margin-left: 2%;" data-bs-toggle="button">Closed</button>
<button type="button" class="btn-cat" onclick="activeRents(rentARRAY)" data-bs-toggle="button">Active</button>
<button type="button" class="btn-cat" onclick="futureRents(rentARRAY)" style="margin-right: 20%;"data-bs-toggle="button">Future</button>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort by </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" id="sortName" onclick= "SortName()">Name</button>
  <button class="dropdown-item" type="button" id="sortDate" onclick= "SortDate()">Date</button>
    </div>
  </div>
  <input type="text" id="rentId" placeholder=" Search product..." name="search">          
<button class ="form-btn" type="submit" onclick="searchRent(id)"><i class="fa fa-search"></i></button>
</div>

`);
            
$("#ctable").append(div);
for (let i in rentARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="flex-container">
  <div class="card" style="width: 20em; float: left; display: block; margin-left: 3%; margin-top: 1em;">
    <div class="card-body">
      <h5 class="card-title">Rental number: ${rentARRAY[i]._id}</h5>
      <p class="card-text">Client ID: ${rentARRAY[i].client_id} <br> Product ID: ${rentARRAY[i].prod_id}<br></p>
      <p class="card-text">Start date: ${rentARRAY[i].start_date.slice(0,10)} <br> End date: ${rentARRAY[i].end_date.slice(0,10)}</p>
      <button id="${rentARRAY[i]._id}" onclick= "deleteRents(id)" class="btn-d">Delete</button>
      <button class="btn-mod">Modify</button>
    </div>
  </div> 
</div>    `);
 $("#ctable2").append(div);
         
     } 
}

/*ORDINE ALFABETICO DEI PRODOTTI NELL'INVENTARIO */
function SortNameR(){   //ordine alfabetico dei prodotti
inventoryARRAY.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
$( "#ctable" ).empty();
$( "#ctable2" ).empty();


div = $(`  
<div class="flex-form-container"> 
    <button type="button" class="btn-cat" onclick="showYacht(inventoryARRAY)" style="margin-left: 2%;" data-bs-toggle="button">Yacht</button>
    <button type="button" class="btn-cat" onclick="showGomm(inventoryARRAY)" data-bs-toggle="button">Gommoni</button>
    <button type="button" class="btn-cat" onclick="showBarche(inventoryARRAY)" style="margin-right: 20%;"data-bs-toggle="button">Barche a remi</button>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort by </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
        <button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
        <button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
        </div>
      </div>
      <input type="text" id="prodId" placeholder=" Search product..." name="search">          
      <button class ="form-btn" type="submit" onclick="searchProd(id)"><i class="fa fa-search"></i></button> 
    </div>      
`);
            
$("#ctable").append(div);
for (let i in inventoryARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="card" style="width: 19em; float: left; display: block; margin-left: 3%;">        
  <img src="https://site202133.tw.cs.unibo.it/img/${inventoryARRAY[i].category}/${inventoryARRAY[i].prod_id}.jpg" style=" widht: 10em; height: 10rem;"class="card-img-top" alt="...">             
  <div class="card-body">              
  <h5 class="card-title" style="text-align: center;">${inventoryARRAY[i].name}</h5>              
  <p class="card-text" style="text-align: center;">ID: ${inventoryARRAY[i].prod_id}</p>
  <p class="card-text">Brand: ${inventoryARRAY[i].brand} <br>
  Price: ${inventoryARRAY[i].low_season}€ - ${inventoryARRAY[i].high_season}€</p>              
  <button class="btn-mod" id="${inventoryARRAY[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">See more</button>             
  </div>             
  </div>  
        `);
   $("#ctable2").append(div);
         
 } 
}

/*ORDINE PREZZO CRESCENTE PRODOTTI */
function SortPriceHigh(){   //ordina in base alla data
  inventoryARRAY.sort((a, b) => {
   return parseFloat(b.low_season) - parseFloat(a.low_season);
 });

$( "#ctable" ).empty();
$( "#ctable2" ).empty();


div = $(`         
<div class="flex-form-container"> 
    <button type="button" class="btn-cat" onclick="showYacht(inventoryARRAY)" style="margin-left: 2%;" data-bs-toggle="button">Yacht</button>
    <button type="button" class="btn-cat" onclick="showGomm(inventoryARRAY)" data-bs-toggle="button">Gommoni</button>
    <button type="button" class="btn-cat" onclick="showBarche(inventoryARRAY)" style="margin-right: 20%;"data-bs-toggle="button">Barche a remi</button>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort by </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
        <button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
        <button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
        </div>
      </div>
      <input type="text" id="prodId" placeholder=" Search product..." name="search">          
      <button class ="form-btn" type="submit" onclick="searchProd(id)"><i class="fa fa-search"></i></button> 
    </div>
`);
            
$("#ctable").append(div);
for (let i in inventoryARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="card" style="width: 19em; float: left; display: block; margin-left: 3%;">        
  <img src="https://site202133.tw.cs.unibo.it/img/${inventoryARRAY[i].category}/${inventoryARRAY[i].prod_id}.jpg" style=" widht: 10em; height: 10rem;"class="card-img-top" alt="...">              
  <div class="card-body">              
  <h5 class="card-title" style="text-align: center;">${inventoryARRAY[i].name}</h5>              
  <p class="card-text" style="text-align: center;">ID: ${inventoryARRAY[i].prod_id}</p>
  <p class="card-text">Brand: ${inventoryARRAY[i].brand} <br>
  Price: ${inventoryARRAY[i].low_season}€ - ${inventoryARRAY[i].high_season}€</p>              
  <button class="btn-mod" id="${inventoryARRAY[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">See more</button>              
  </div>             
  </div>    
       `);
   $("#ctable2").append(div);
         
     } 
}
/*ORDINE PREZZO DECRESCENTE PRODOTTI */
function SortPriceLow(){   //ordina in base alla data
  inventoryARRAY.sort((a, b) => {
   return parseFloat(a.low_season) - parseFloat(b.low_season);
 });

$( "#ctable" ).empty();
$( "#ctable2" ).empty();


div = $(`         
<div class="flex-form-container"> 
    <button type="button" class="btn-cat" onclick="showYacht(inventoryARRAY)" style="margin-left: 2%;" data-bs-toggle="button">Yacht</button>
    <button type="button" class="btn-cat" onclick="showGomm(inventoryARRAY)" data-bs-toggle="button">Gommoni</button>
    <button type="button" class="btn-cat" onclick="showBarche(inventoryARRAY)" style="margin-right: 20%;"data-bs-toggle="button">Barche a remi</button>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort by </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
        <button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
        <button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
        </div>
      </div>
      <input type="text" id="prodId" placeholder=" Search product..." name="search">          
      <button class ="form-btn" type="submit" onclick="searchProd(id)"><i class="fa fa-search"></i></button> 
    </div> 
`);
            
$("#ctable").append(div);
for (let i in inventoryARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="card" style="width: 19em; float: left; display: block; margin-left: 3%;">        
  <img src="https://site202133.tw.cs.unibo.it/img/${inventoryARRAY[i].category}/${inventoryARRAY[i].prod_id}.jpg" style=" widht: 10em; height: 10rem;"class="card-img-top" alt="...">              
  <div class="card-body">              
  <h5 class="card-title" style="text-align: center;">${inventoryARRAY[i].name}</h5>              
  <p class="card-text" style="text-align: center;">ID: ${inventoryARRAY[i].prod_id}</p>
  <p class="card-text">Brand: ${inventoryARRAY[i].brand} <br>
  Price: ${inventoryARRAY[i].low_season}€ - ${inventoryARRAY[i].high_season}€</p>              
  <button class="btn-mod" id="${inventoryARRAY[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">See more</button>              
  </div>             
  </div>    
       `);
   $("#ctable2").append(div);
         
     } 
}

///////////////////////////////////////////////////////////////////////
///FILTRI CATEGORIA

//FILTRO YACHT
function showYacht(data){

  $( "#ctable2" ).empty();
  $( "#ctable" ).empty();

  div = $(`         
    <button class="btn-back"onclick= "goBackInventory()"><i class="fas fa-home"></i> PRODUCTS</button>
        `);
  $("#ctable").append(div);

  for (let i in data) {
    console.log(data[i].category);
    if(data[i].category=="yacht"){
      console.log(data[i].name);
      let div = null;
        div = $(` 
          <div class="card" style="width: 19em; float: left; display: block; margin-left: 3%;">        
            <img src="https://site202133.tw.cs.unibo.it/img/${data[i].category}/${data[i].prod_id}.jpg" style=" widht: 10em; height: 10rem;"class="card-img-top" alt="...">              
            <div class="card-body">              
              <h5 class="card-title" style="text-align: center;">${data[i].name}</h5>              
              <p class="card-text" style="text-align: center;">ID: ${data[i].prod_id}</p>
              <p class="card-text">Brand: ${data[i].brand} <br>
              Price: ${data[i].low_season}€ - ${data[i].high_season}€</p>     
              <div class="card-footer">         
              <button class="btn-mod" id="${data[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">See more</button>             
              </div>    
            </div>             
          </div>  `);
         $("#ctable2").append(div);

         var found = true;
    }

  }
  if (!found) 
    console.log("non esiste prodotto");
  

}
//FILTRO GOMMONI
function showGomm(data){

  $( "#ctable2" ).empty();
  $( "#ctable" ).empty();

  div = $(`         
    <button class="btn-back"onclick= "goBackInventory()"><i class="fas fa-home"></i> PRODUCTS</button>
        `);
  $("#ctable").append(div);

  for (let i in data) {
    console.log(data[i].category);
    if(data[i].category=="gommoni"){
      console.log(data[i].name);
      let div = null;
        div = $(` 
          <div class="card" style="width: 19em; float: left; display: block; margin-left: 3%;">        
            <img src="https://site202133.tw.cs.unibo.it/img/${data[i].category}/${data[i].prod_id}.jpg" style=" widht: 10em; height: 10rem;"class="card-img-top" alt="...">              
            <div class="card-body">              
              <h5 class="card-title" style="text-align: center;">${data[i].name}</h5>              
              <p class="card-text" style="text-align: center;">ID: ${data[i].prod_id}</p>
              <p class="card-text">Brand: ${data[i].brand} <br>
              Price: ${data[i].low_season}€ - ${data[i].high_season}€</p>     
              <div class="card-footer">         
                <button class="btn-mod" id="${data[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">See more</button>             
              </div>    
            </div>             
          </div>  `);
         $("#ctable2").append(div);

         var found = true;
    }

  }
  if (!found) 
    console.log("non esiste prodotto");
  

}
//FILTRO BARCHE
function showBarche(data){

  $( "#ctable2" ).empty();
  $( "#ctable" ).empty();

  div = $(`         
    <button class="btn-back"onclick= "goBackInventory()"><i class="fas fa-home"></i> PRODUCTS</button>
        `);
  $("#ctable").append(div);

  for (let i in data) {
    console.log(data[i].category);
    if(data[i].category=="barca"){
      console.log(data[i].name);
      let div = null;
        div = $(` 
          <div class="card" style="width: 19em; float: left; display: block; margin-left: 3%;">        
            <img src="https://site202133.tw.cs.unibo.it/img/${data[i].category}/${data[i].prod_id}.jpg" style=" widht: 10em; height: 10rem;"class="card-img-top" alt="...">              
            <div class="card-body">              
              <h5 class="card-title" style="text-align: center;">${data[i].name}</h5>              
              <p class="card-text" style="text-align: center;">ID: ${data[i].prod_id}</p>
              <p class="card-text">Brand: ${data[i].brand} <br>
              Price: ${data[i].low_season}€ - ${data[i].high_season}€</p>     
              <div class="card-footer">         
                <<button class="btn-mod" id="${data[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">See more</button>             
              </div>    
            </div>             
          </div>  `);
         $("#ctable2").append(div);

         var found = true;
    }

  }
  if (!found) 
    console.log("non esiste prodotto");
  

}

///AGGIUNTA DI UN NUOVO PRODOTTO
function addProduct() {           
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();

  div = $(`         
  <button class="btn-back"onclick= "goBackInventory()"><i class="fas fa-home"></i> PRODUCTS</button>
  `);
$("#ctable").append(div);

div = $(` 
      <div class="flex-container" style=" margin-left: 6%;">
      <h1>Add product</h1>
        <form class="row g-3" action="/new-prod" method="POST" role="form" style="width: 85%;">
          <div class="col-md-6">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="create2" id="inputName" name="name" placeholder="Enter product name">
          </div>
          <div class="col-md-6">
            <label for="inputID" class="form-label">Product ID</label>
            <input type="text" class="create2" id="inputID" name="product" placeholder="Enter product id">
          </div>
          <div class="col-md-6">
            <label for="inputBrand" class="form-label">Brand</label>
            <input type="text" class="create2" id="inputBrand" name="brand" placeholder="Enter product brand">
          </div>
          <div class="col-md-6">
          <label for="inputCat" class="form-label">Category</label>
          <input type="text" class="create2" id="inputCat" name="category" placeholder="Enter category">
          </div>
          <div class="col-md-6">
            <label for="inputLow" class="form-label">Price Low Season</label>
            <input type="text" class="create2" id="inputLow" name="lowseason" placeholder="Enter price low season">
          </div>
          <div class="col-md-6">
            <label for="inputHigh" class="form-label">Price High Season</label>
            <input type="text" class="create2" id="inputHigh" name="highseason" placeholder="Enter price high season">
          </div>
          <div class="col-md-4">
          <label for="inputStatus" class="form-label">Status</label>
          <select class="create2" id="inputStatus" name="stato" aria-label="Select status" >
            <option value="ottimo">ottimo</option>
            <option value="buono">buono</option>
            <option value="rovinato">rovinato</option>
            <option value="rotto">rotto</option>
          </select>
        </div>
          <div class="col-md-2">
            <label for="inputLen" class="form-label">Length</label>
            <input type="text" class="create2" id="inputLen" name="length" placeholder="Enter length">
          </div>
          <div class="col-md-2">
            <label for="inputGuest" class="form-label">Guests</label>
            <input type="text" class="create2" id="inputGuest" name="guests" placeholder="Enter guests">
          </div>
          <div class="col-md-2">
            <label for="inputYear" class="form-label">Year</label>
            <input type="text" class="create2" id="inputYear" name="year" placeholder="Enter year">
          </div>
          <div class="col-md-2">
            <label for="inputSpeed" class="form-label">Speed</label>
            <input type="text" class="create2" id="inputSpeed" name="speed" placeholder="Enter speed">
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="summary" class="form-label">Product description</label>
              <textarea class="create2" id="summary" rows="3" name="summary" placeholder="Add a short description"></textarea>
            </div>
          </div>
          <div class="col-12">
            <button class="btn-sub" onclick="approveProd()" style="position: relative; float: right; right: 15em;">Add</button>  <i id="smile" class="fas fa-check fa-2x" style="color: green; visibility: hidden; position: relative; float: right; margin-right: 1em; "></i>
            <div id ="alert_img" class="alert alert-danger" role="alert" style="width: 30em; position: relative; float: left;">
            REMINDER: to add a new product, load first the image  
            </div>
          </div>
        </form>
      </div>
       
      `);
      $("#ctable2").append(div);
}
////AGGIUNTA NUOVO NOLEGGIO
function openCreate(){
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();

  div = $(`         
  <button class="btn-back"onclick= "goBackRents()"><i class="fas fa-home"></i> RENTS</button>
  `);
$("#ctable").append(div); 
  div = $(`    
  <div class="testbox">
  <form id="create" action="/new-rent" method="POST" role="form">
    <h1>Create Rent</h1>
    <div class="item-2">
      <p>Client ID</p>
      <div>
        <input class="create2" type="text" name="client" placeholder="Enter client ID">
      </div>
    </div>
    <div class="item-2">
      <p>Product ID</p>
      <input class="create2" type="text" name="product" placeholder="Enter product ID">
    </div>
    <div class="item-2" style="display: flex; justify-content: space-between;">
      <p>Start date</p>
      <p style="position: relative; left: -37%;">End date</p></div>
      <div class="item-2" style=" margin-top: -3%;"> 

      <input type="date" name="start" class="create2" style="float: left; width: 45%;"/><i class="far fa-calendar-alt fa-lg"></i>
      <input type="date" min=""  name="end" class="create2" style="float: right; position: relative; right: 1%; width: 45%;"/><i class="far fa-calendar-alt fa-lg" style="left: 47%;"></i>
    </div>
    
    <div class="btn-block">
      <button class="btn-sub" onclick="approveRent()">Create</button>  <i id="smile" class="fas fa-check fa-2x" style="color: green; visibility: hidden; margin-left: 2%; "></i>
    </div>
  </form>
</div>
  
`);
$("#ctable2").append(div);
}

///MODIFICA CLIENTE


///NOLEGGI PER CLIENTE
function searchClientRents(_id){

  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/user-rentals/' + _id ,
          success: function (info) {
            console.log(_id);
            console.log("trovato");

            foundRents(rentARRAY, _id);
          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {
//console.log("errore nell'else");
  }

}
function foundRents(data, insertedID) {
  console.log(insertedID);

  for (let i in data) {

    if(data[i].client_id == insertedID) {
        console.log("???????");
        $( "#ctable2" ).empty();
        $( "#ctable" ).empty();
        console.log("sono dopo il vuoto");
        div = $(`         
        <button class="btn-back"onclick= "goBackRents()"><i class="fas fa-home"></i>> RENTS</button>
  `);
              
  $("#ctable").append(div);
        div = $(` 
        <div class="card-new">
          <div class="card-body">
            <h5 class="card-title-new">RENT: ${data[i]._id}</h5>
            <p class="card-text-new">Client ID: ${data[i].client_id} <br> Product ID: ${data[i].prod_id}<br></p>
            <p class="card-text-new">Start date: ${data[i].start_date.slice(0,10)} <br> End date: ${data[i].end_date.slice(0,10)}</p>
            <button id="${data[i]._id}" onclick= "openAlertRents(id)" class="btn-d2"><i class="fas fa-trash-alt"></i> Delete</button>
            <button class="btn-mod2"><i class="fas fa-wrench"></i> Modify</button>
                
          </div>
        </div>
        
        `);
        $("#ctable2").append(div);
        //console.log("prooooovaaa");

        

        var found = true;
    }
  }

  if (!found) 
      console.log("non esiste noleggio");


}
//MODIFICA CLIENTE
function modifyClient(data, insertedID){
  for (let i in data) {

    if(data[i].client_id == insertedID) {
      console.log(insertedID);
        $( "#ctable2" ).empty();
        $( "#ctable" ).empty();

  div = $(`         
  <button class="btn-back"onclick= "goBackClients()"><i class="fas fa-home"></i> CLIENTS</button>
  `);
$("#ctable").append(div);

div = $(` 
      <div class="flex-container" style=" margin-left: 4%;">
        <img src="${data[i].image}" alt="" width="280" height="300">
        <form class="row g-3" action="/update-client" method="POST" role="form" style="width: 60%; position: relative; float: right; right: 5%; margin-bottom: 30%;">
          <div class="col-md-6">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="create2" id="inputName" name="name" value="${data[i].name}">
          </div>
          <div class="col-md-6">
            <label for="inputSurname" class="form-label">Surname</label>
            <input type="text" class="create2" id="inputSurname" name="surname" value="${data[i].surname}">
          </div>
          <div class="col-12">
            <label for="inputId" class="form-label">Client ID</label>
            <input type="text" class="create2" id="inputId" name="clientID" value="${data[i].client_id}" style="cursor: not-allowed;" readonly="readonly">
          </div>
          <div class="col-md-6">
          <label for="inputPlace" class="form-label">City</label>
          <input type="text" class="create2" id="inputPlace" name="place" value="${data[i].place}">
          </div>
          <div class="col-md-6">
            <label for="inputAdd" class="form-label">Address</label>
            <input type="text" class="create2" id="inputAdd" name="address" value="${data[i].address}">
          </div>
          <div class="col-md-6">
            <label for="inputEmail" class="form-label">Email</label>
            <input type="email" class="create2" id="inputEmail" name="email" value="${data[i].email}">
          </div>
          <div class="col-md-6">
            <label for="inputCell" class="form-label">Phone number</label>
            <input type="text" class="create2" id="inputCell" name="telefono" value="${data[i].phone}">
          </div>
          <div class="col-12">
            <div class="mb-3">
              <label for="note" class="form-label">Note</label>
              <input type="text" class="create2" id="note" rows="3" name="note" value="${data[i].note}"></textarea>
            </div>
          </div>
          <div class="col-12">
            <button class="btn-sub" onclick="approveClient()">Update</button>  <i id="smile" class="fas fa-check fa-2x" style="color: green; visibility: hidden; margin-left: 2%; "></i>
          </div>
        </form>
      </div>
       
      `);
      $("#ctable2").append(div);
      var found = true;
    }

}
if (!found) 
console.log("non esiste cliente");
}

//FILTRO PER NOLEGGI CONCLUSI
function pastRents(data){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  console.log(date);
  $( "#ctable2" ).empty();
  $( "#ctable" ).empty();

  div = $(`         
    <button class="btn-back"onclick= "goBackRents()"><i class="fas fa-home"></i> RENTS</button>
        `);
  $("#ctable").append(div);

  for (let i in data) {
    var dateA = new Date(data[i].end_date);
    var dateB = new Date(date);
    console.log(dateA);
    if(dateA.getTime() < dateB.getTime()){
      let div = null;
        div = $(` 
        <div class="flex-container">
        <div class="card" style="width: 20em; float: left; display: block; margin-left: 3%; margin-top: 1em;">
          <div class="card-body">
            <h5 class="card-title">Rental number: ${rentARRAY[i]._id}</h5>
            <p class="card-text">Client ID: ${rentARRAY[i].client_id} <br> Product ID: ${rentARRAY[i].prod_id}<br></p>
            <p class="card-text">Start date: ${rentARRAY[i].start_date.slice(0,10)} <br> End date: ${rentARRAY[i].end_date.slice(0,10)}</p>
            <button id="${rentARRAY[i]._id}" onclick= "deleteRents(id)" class="btn-d">Delete</button>
            <button class="btn-mod">Modify</button>
          </div>
        </div> 
      </div>  `);
         $("#ctable2").append(div);

         var found = true;
    }

  }
  if (!found) 
    console.log("errore");
  

}
//FILTRO NOLEGGI ATTIVI
function futureRents(data){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  console.log(date);
  $( "#ctable2" ).empty();
  $( "#ctable" ).empty();

  div = $(`         
    <button class="btn-back"onclick= "goBackRents()"><i class="fas fa-home"></i> RENTS</button>
        `);
  $("#ctable").append(div);

  for (let i in data) {
    var dateA = new Date(data[i].end_date);
    var dateB = new Date(date);
    console.log(dateA);
    if(dateA.getTime() > dateB.getTime()){
      let div = null;
        div = $(` 
        <div class="flex-container">
        <div class="card" style="width: 20em; float: left; display: block; margin-left: 3%; margin-top: 1em;">
          <div class="card-body">
            <h5 class="card-title">Rental number: ${rentARRAY[i]._id}</h5>
            <p class="card-text">Client ID: ${rentARRAY[i].client_id} <br> Product ID: ${rentARRAY[i].prod_id}<br></p>
            <p class="card-text">Start date: ${rentARRAY[i].start_date.slice(0,10)} <br> End date: ${rentARRAY[i].end_date.slice(0,10)}</p>
            <button id="${rentARRAY[i]._id}" onclick= "deleteRents(id)" class="btn-d">Delete</button>
            <button class="btn-mod">Modify</button>
          </div>
        </div> 
      </div>  `);
         $("#ctable2").append(div);

         var found = true;
    }

  }
  if (!found) 
    console.log("errore");

}
//FILTRO NOLEGGI FUTURI
function activeRents(data){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

  console.log(date);
  $( "#ctable2" ).empty();
  $( "#ctable" ).empty();

  div = $(`         
    <button class="btn-back"onclick= "goBackRents()"><i class="fas fa-home"></i> RENTS</button>
        `);
  $("#ctable").append(div);

  for (let i in data) {
    var dateA = new Date(data[i].start_date);
    var dateB = new Date(date);
    console.log(dateA);
    if(dateA.getTime() == dateB.getTime()){
      let div = null;
        div = $(` 
        <div class="flex-container">
        <div class="card" style="width: 20em; float: left; display: block; margin-left: 3%; margin-top: 1em;">
          <div class="card-body">
            <h5 class="card-title">Rental number: ${rentARRAY[i]._id}</h5>
            <p class="card-text">Client ID: ${rentARRAY[i].client_id} <br> Product ID: ${rentARRAY[i].prod_id}<br></p>
            <p class="card-text">Start date: ${rentARRAY[i].start_date.slice(0,10)} <br> End date: ${rentARRAY[i].end_date.slice(0,10)}</p>
            <button id="${rentARRAY[i]._id}" onclick= "deleteRents(id)" class="btn-d">Delete</button>
            <button class="btn-mod">Modify</button>
          </div>
        </div> 
      </div>  `);
         $("#ctable2").append(div);

         var found = true;
    }

  }
  if (!found) 
    console.log("errore");
  

}

//FUNZIONE PER VEDERE NOTE CLIENTI
function Notes(insertedID){  
  _id = insertedID;
  console.log(_id);
  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/user-rentals/' + _id ,
          success: function (info) {
            div = $(` 
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Holy guacamole!</strong> You should check in on some of those fields below.
              <button type="button" class="btn-close" aria-label="Close"></button>
            </div>      `);
            $("#ctable").append(div);
          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {
console.log("errore nell'else");
  }

}



//FUNZIONI PER TORNARE INDIETRO
function goBackClients(){
  openClient();
}

function goBackInventory(){
  openInventory();
}

function goBackRents(){
  openRents();
}

//FUNZIONI AUX
function approveRent(){
  document.getElementById("smile").style.visibility = "visible";
}
function approveClient(){
  document.getElementById("smile").style.visibility = "visible";
}
function approveProd(){
  document.getElementById("smile").style.visibility = "visible";
  
} 
