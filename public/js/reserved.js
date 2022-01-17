
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
        $('#loginModal').modal('toggle'); 

        var found = true;
    }
  }

  if (!found) 
      console.log("non esiste WORKER con questa accoppiata pass-nome");


}
/***************************** */
/* CLIENTI */
function openClient() {
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  $("#ctable2").css("-webkit-filter", "blur(0px)");
  

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
            <button type="submit" onclick="searchClient(id)"><i class="fa fa-search"></i></button>
            </form>

           <table id="styled-tab">
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Custumer ID</th>
              <th>Actions</th>
            </tr>
           </table>
            `);
            $("#ctable").append(div);


  function populate(ClientInfo){

      for (let i in ClientInfo) {
          let div = null;

            div = $(`
                    <table id="styled-tab">
                      <tr>
                       <td>${ClientInfo[i].name}</td>
                       <td>${ClientInfo[i].surname}</td>
                       <td>${ClientInfo[i].client_id}</td>
                       <td><button id= "${ClientInfo[i].client_id}" class="btn-upd" onclick="acceptClient(clientARRAY,id)" ><i class="fas fa-user-edit"></i></button>
                       <button id="${ClientInfo[i].client_id}" onclick="openAlert(id)" class= "btn-del"><i class="fas fa-trash-alt"></i></button>
                       <button id="${ClientInfo[i].client_id}" onclick="openNote(id)" class= "btn-note"><i class="far fa-sticky-note"></i></button>
                       </td>
                      </tr>
                    </table>
            `);
            $("#ctable2").append(div);
}
} 
}
/***************************** */
/*INVENTARIO */
function openInventory() {
 
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  $("#ctable2").css("-webkit-filter", "blur(0px)");
  $(".styled-tab").css("-webkit-filter", "blur(0px)");
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
    <form class="example">
    <input type="text" id="prodId" placeholder="Search product..." name="search">          
    <button type="submit"onclick="searchProd(id)"><i class="fa fa-search"></i></button>    
    </form>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort by </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
    <button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
    <button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
    </div>
    </div>`);
    $("#ctable").append(div);
          
    function populateP(ProdInfo){
      for (let i in ProdInfo) { 
        let div = null;
              
        div = $(`     
        <div class="card" style="width: 20rem; float: left; display: block; margin-left: 3%; height: 26rem;">        
        <img src="${ProdInfo[i].image}" style="height: 13rem;"class="card-img-top" alt="...">              
        <div class="card-body">              
        <h5 class="card-title" style="text-align: center;">${ProdInfo[i].name}</h5>              
        <p class="card-text" style="text-align: center;">ID: ${ProdInfo[i].prod_id}</p>
        <p class="card-text">Brand: ${ProdInfo[i].brand} <br>
        Price: ${ProdInfo[i].price}€</p>              
        <button id="${ProdInfo[i].prod_id}" onclick= "openAlertProd(id)" class="btn-d">Delete</button>
        <button class="btn-mod" id="${ProdInfo[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">Modify</button>             
        </div>             
        </div>            
        `);
        $("#ctable2").append(div);
  
      }      
    } 
}
/***************************** */
/*NOLEGGI*/
function openRents() {
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  $("#ctable2").css("-webkit-filter", "blur(0px)");
        
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
  <form class="example">
  <input type="text" id="rentId" placeholder="Search rental..." name="search">
  <button type="submit" onclick="searchRent(id)"><i class="fa fa-search"></i></button> </form> 
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort by </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" id="sortName" onclick= "SortName()">Name</button>
    <button class="dropdown-item" type="button" id="sortDate" onclick= "SortDate()">Date</button>
  </div>
</div>

  `);
              
  $("#ctable").append(div);
    
      
  function populate(RentInfo){
    
    for (let i in RentInfo) {
          
      let div = null;
      
            
      div = $(`

          <div class="row2">
            <div class="column">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Rental: ${RentInfo[i]._id}</h5>
                  <p class="card-text">Client ID: ${RentInfo[i].client_id} <br> Product ID: ${RentInfo[i].prod_id}<br></p>
                  <p class="card-text">Start date: ${RentInfo[i].start_date.slice(0,10)} <br> End date: ${RentInfo[i].end_date.slice(0,10)}</p>
                  <button id="${RentInfo[i]._id}" onclick= "openAlertRents(id)" class="btn-d">Delete</button>
                  <button class="btn-mod">Modify</button>
                </div>
              </div>
            </div> 
          <div>    
              `);
               $("#ctable2").append(div);
             }
         } 
}
     
/************************************/
/*FUNZIONI RICERCA */

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
        <button class="btn-back"onclick= "goBackRents()"><i class="fas fa-angle-double-left"></i> ALL RENTS</button>
  `);
              
  $("#ctable").append(div);
        div = $(` 
        <div class="card-new">
          <div class="card-body">
            <h5 class="card-title-new">RENT: ${data[i]._id}</h5>
            <p class="card-text-new">Client ID: ${data[i].client_id} <br> Product ID: ${data[i].prod_id}<br></p>
            <p class="card-text-new">Start date: ${data[i].start.slice(0,10)} <br> End date: ${data[i].end.slice(0,10)}</p>
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

            acceptClient(clientARRAY, _id);
          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {
console.log("errore nell'else");
  }

}
function acceptClient(data, insertedID) {

  for (let i in data) {

    if(data[i].client_id == insertedID) {
        $( "#ctable2" ).empty();
        $( "#ctable" ).empty();
        div = $(`         
        <button class="btn-back"onclick= "goBackClients()"><i class="fas fa-angle-double-left"></i> ALL CLIENTS</button>
  `);
              
  $("#ctable").append(div);
        div = $(` 
    <div class="wrapper">
      <div class="container">
        <img src="${data[i].img}" alt="" class="profile-img">
    
        <div class="content">
          <div class="sub-content">
            <h1>${data[i].name}  ${data[i].surname}</h1>
            <span>${data[i].client_id}</span>
            <span class="location"><i class="fas fa-map-marker-alt"></i> ${data[i].place}
            <p>${data[i].address}</p></span>
          </div>
          <div class="data">
        
        </div>
        <button id="${data[i].client_id}" onclick= "openAlert(id)" class="btn-d2" style="left: 0%;"><i class="fas fa-trash-alt"></i> Delete</button>
        <button class="btn-mod2"><i class="fas fa-wrench"></i> Modify</button>
      </div>
    </div>
        
        `);
        $("#ctable2").append(div);

        var found = true;
    }
  }

  if (!found) 
      console.log("non esiste cliente");


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
        <button class="btn-back"onclick= "goBackInventory()"><i class="fas fa-angle-double-left"></i> ALL PRODUCTS</button>
        `);
    if(data[i].available== false){
      x= 1; x=""
    }
    else{
      x= 2;
    }
      $("#ctable").append(div);
      div = $(` 
        <div id="img-1">
          <img src="${data[i].image}" style="width: 40%;height: 30%; margin-left: 3% object-fit: fill;" alt="...">
            <div class="col-md-8" style="position: relative; margin-left: 45%; margin-top: -28%;">
              <form class="row g-3" style="width: 70%; top: -30%;">
                <div class="col-md-6">
                  <label for="inputName" class="form-label">Name </label>
                  <input type="name" class="form-control" id="inputName" placeholder="${data[i].name}">
                </div>
                <div class="col-md-6">
                  <label for="inputID" class="form-label">Product ID</label>
                  <input type="productid" class="form-control" id="inputID" placeholder="${data[i].prod_id}">
                </div>
                <div class="col-12">
                  <label for="inputBrand" class="form-label">Brand</label>
                  <input type="text" class="form-control" id="inputBrand" placeholder="${data[i].brand}">
                </div>
                <div class="col-12">
                  <label for="inputPrice" class="form-label">Price</label>
                  <input type="text" class="form-control" id="inputPrice" placeholder="${data[i].price}€">
                </div>
                <div class="col-md-6">
                  <label for="inputYear" class="form-label">Year</label>
                  <input type="text" class="form-control" id="inputYear" placeholder="${data[i].year}">
                </div>
                <div class="col-md-4">
                  <label for="inputSpeed" class="form-label">Speed</label>
                  <select id="inputSpeed" class="form-select">
                    <option selected>${data[i].speed}</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label for="inputGuests" class="form-label">Guests</label>
                  <input type="text" class="form-control" id="inputGuests" placeholder="${data[i].guests}">
                </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
              </form>
            </div>
        </div>  
      `);
      $("#ctable2").append(div);

        var found = true;
    }
  }

  if (!found) 
    console.log("non esiste prodotto");
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


/***************************** */
/*FUNZIONI ALERT PER ELIMINAZIONE */

/*ELIMINAZIONE NOLEGGIO */
function openAlertRents(idR) {

  //console.log(idR);

  alert("Are you sure you want to delete this rent?");

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
/*FELIMINAZIONE CLIENTE */
function openAlert(idDel) {

  //console.log(idDel);

  alert("Are you sure you want to delete this client?");

  if(idDel) {
    $.ajax({
    type: 'DELETE',
    url: '/allClients/' + idDel ,
    success: function (data) {
      $( "#ctable2" ).load(window.location.href + " #ctable2" );
      $( "#clientBtn" ).click();
    },
    error: function (xhr, ajaxOptions, thrownError) {

    }
    });
  }
  
}
/***************************** */
/*FUNZIONI ORDINAMENTO */

/*ORDINE ALFABETICO NOLEGGI*/
function SortName(){   //ordine alfabetico dei clienti
rentARRAY.sort((a,b) => (a.client_id > b.client_id) ? 1 : ((b.client_id > a.client_id) ? -1 : 0))

$( "#ctable" ).empty();
$( "#ctable2" ).empty();
$("#ctable2").css("-webkit-filter", "blur(0px)");

div = $(`         
<form class="example">
<input type="text" id="rentId" placeholder="Search rental..." name="search">
<button type="submit"><i class="fa fa-search"></i></button> </form> 
<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Sort by </button>
<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
  <button class="dropdown-item" type="button" id="sortName" onclick= "SortName()">Name</button>
  <button class="dropdown-item" type="button" id="sortDate" onclick= "SortDate()">Date</button>
</div>
</div>

`);
            
$("#ctable").append(div);
for (let i in rentARRAY) {
          
  let div = null;
  
        
  div = $(`

      <div class="row2">
        <div class="column">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rental: ${rentARRAY[i]._id}</h5>
              <p class="card-text">Client ID: ${rentARRAY[i].client_id} <br> Product ID: ${rentARRAY[i].prod_id}</p>
              <p class="card-text">Start date: ${rentARRAY[i].start_date.slice(0,10)} <br> End date: ${rentARRAY[i].end_date.slice(0,10)}</p>
              <button id="${rentARRAY[i]._id}" onclick= "openAlertRents(id)" class="btn-d">Delete</button>
              <button class="btn-mod">Modify</button>
            </div>
          </div>
        </div> 
      <div>    
          `);
           $("#ctable2").append(div);
         
     } 
}
/*ORDINE DATA CRESCENTE NOLEGGI */
function SortDate(){   //ordina in base alla data
  console.log("prova data");
  rentARRAY.sort(function compare(a, b) {
    var dateA = new Date(a.start_date);
    var dateB = new Date(b.start_date);
    return dateA - dateB;
  });

$( "#ctable" ).empty();
$( "#ctable2" ).empty();
$("#ctable2").css("-webkit-filter", "blur(0px)");

div = $(`         
<form class="example">
<input type="text" id="rentId" placeholder="Search rental..." name="search">
<button type="submit"><i class="fa fa-search"></i></button> </form> 
<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Sort by </button>
<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
  <button class="dropdown-item" type="button" id="sortName" onclick= "SortName()">Name</button>
  <button class="dropdown-item" type="button" id="sortDate" onclick= "SortDate()">Date</button>
</div>
</div>

`);
            
$("#ctable").append(div);
for (let i in rentARRAY) {
          
  let div = null;
  
        
  div = $(`

      <div class="row2">
        <div class="column">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rental: ${rentARRAY[i]._id}</h5>
              <p class="card-text">Client ID: ${rentARRAY[i].client_id} <br> Product ID: ${rentARRAY[i].prod_id}<br></p>
              <p class="card-text">Start date: ${rentARRAY[i].start_date.slice(0,10)} <br> End date: ${rentARRAY[i].end_date.slice(0,10)}</p>
              <button id="${rentARRAY[i]._id}" onclick= "openAlertRents(id)" class="btn-d">Delete</button>
              <button class="btn-mod">Modify</button>
            </div>
          </div>
        </div> 
      <div>    
          `);
           $("#ctable2").append(div);
         
     } 
}

/*ORDINE ALFABETICO INVENTARIO */
function SortNameR(){   //ordine alfabetico dei prodotti
inventoryARRAY.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
$( "#ctable" ).empty();
$( "#ctable2" ).empty();
$("#ctable2").css("-webkit-filter", "blur(0px)");

div = $(`  
    <form class="example">
    <input type="text" placeholder="Search product..." name="search">          
    <button type="submit"><i class="fa fa-search"></i></button>    
    </form>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort by </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
    <button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
    <button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
    </div>
    </div>       
`);
            
$("#ctable").append(div);
for (let i in inventoryARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="card" style="width: 20rem; float: left; display: block; margin-left: 3%; height: 26rem;">        
  <img src="${inventoryARRAY[i].image}" style="height: 13rem;"class="card-img-top" alt="...">              
  <div class="card-body">              
  <h5 class="card-title" style="text-align: center;">${inventoryARRAY[i].name}</h5>              
  <p class="card-text" style="text-align: center;">ID: ${inventoryARRAY[i].prod_id}</p>
  <p class="card-text">Brand: ${inventoryARRAY[i].brand} <br>
  Price: ${inventoryARRAY[i].price}€</p>              
  <button id="${inventoryARRAY[i].prod_id}" onclick= "openAlertProd(id)" class="btn-d">Delete</button>
  <button class="btn-mod"id="${inventoryARRAY[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">Modify</button>             
  </div>             
  </div>  
        `);
   $("#ctable2").append(div);
         
 } 
}

/*ORDINE PREZZO CRESCENTE PRODOTTI */
function SortPriceHigh(){   //ordina in base alla data
  inventoryARRAY.sort((a, b) => {
   return parseFloat(b.price) - parseFloat(a.price);
 });

$( "#ctable" ).empty();
$( "#ctable2" ).empty();
$("#ctable2").css("-webkit-filter", "blur(0px)");

div = $(`         
<form class="example">
<input type="text" placeholder="Search product..." name="search">          
<button type="submit"><i class="fa fa-search"></i></button>    
</form>
<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Sort by </button>
<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
<button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
<button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
<button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
</div>
</div> 
`);
            
$("#ctable").append(div);
for (let i in inventoryARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="card" style="width: 20rem; float: left; display: block; margin-left: 3%; height: 26rem;">        
  <img src="${inventoryARRAY[i].image}" style="height: 13rem;"class="card-img-top" alt="...">              
  <div class="card-body">              
  <h5 class="card-title" style="text-align: center;">${inventoryARRAY[i].name}</h5>              
  <p class="card-text" style="text-align: center;">ID: ${inventoryARRAY[i].prod_id}</p>
  <p class="card-text">Brand: ${inventoryARRAY[i].brand} <br>
  Price: ${inventoryARRAY[i].price}€</p>              
  <button id="${inventoryARRAY[i].prod_id}" onclick= "openAlertProd(id)" class="btn-d">Delete</button>
  <button class="btn-mod"id="${inventoryARRAY[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">Modify</button>              
  </div>             
  </div>    
       `);
   $("#ctable2").append(div);
         
     } 
}

function SortPriceLow(){   //ordina in base alla data
  inventoryARRAY.sort((a, b) => {
   return parseFloat(a.price) - parseFloat(b.price);
 });

$( "#ctable" ).empty();
$( "#ctable2" ).empty();
$("#ctable2").css("-webkit-filter", "blur(0px)");

div = $(`         
<form class="example">
<input type="text" placeholder="Search product..." name="search">          
<button type="submit"><i class="fa fa-search"></i></button>    
</form>
<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Sort by </button>
<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
<button class="dropdown-item" type="button" id="sortName" onclick= "SortNameR()">Name</button>
<button class="dropdown-item" type="button" id="sortPriceL" onclick= "SortPriceLow()">Price: Low</button>
<button class="dropdown-item" type="button" id="sortPriceH" onclick= "SortPriceHigh()">Price: High</button>
</div>
</div> 
`);
            
$("#ctable").append(div);
for (let i in inventoryARRAY) {
          
  let div = null;
  
        
  div = $(`
  <div class="card" style="width: 20rem; float: left; display: block; margin-left: 3%; height: 26rem;">        
  <img src="${inventoryARRAY[i].image}" style="height: 13rem;"class="card-img-top" alt="...">              
  <div class="card-body">              
  <h5 class="card-title" style="text-align: center;">${inventoryARRAY[i].name}</h5>              
  <p class="card-text" style="text-align: center;">ID: ${inventoryARRAY[i].prod_id}</p>
  <p class="card-text">Brand: ${inventoryARRAY[i].brand} <br>
  Price: ${inventoryARRAY[i].price}€</p>              
  <button id="${inventoryARRAY[i].prod_id}" onclick= "openAlertProd(id)" class="btn-d">Delete</button>
  <button class="btn-mod"id="${inventoryARRAY[i].prod_id}" onclick= "acceptProd(inventoryARRAY,id)">Modify</button>              
  </div>             
  </div>    
       `);
   $("#ctable2").append(div);
         
     } 
}

///////////////////////////////////////////////////////////////////////

function openContacts() {           
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  $("#ctable2").css("-webkit-filter", "blur(0px)");
                     
  div = $(`                  
  <div style='left:0%;'class="card">                   
    <h5 class="card-header"><b><i class="far fa-envelope">  Gmail</b></i></h5>
      <div class="card-body">
        <h5 class="card-title">Mail box</h5>               
        <p class="card-text">Check the clients email!</p>
        <button id= "btn-add" data-toggle="modal" data-target="#addModal"><i class="fas fa-plus-circle"> Add item</i></button>
                  
        <a href="https://mail.google.com/mail/u/5/?ogbl#inbox" class="btn btn-primary">Go somewhere</a>
                        
      </div>
  </div>
`);
$("#ctable").append(div);
}

function openPersonalArea() {           
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  $("#ctable2").css("-webkit-filter", "blur(0px)");
                     
  div = $(`    
  <h1>ciao</h1>
`);
$("#ctable").append(div);
}

function openCreate(){
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  $("#ctable2").css("-webkit-filter", "blur(0px)");
                     
  div = $(`    
  <div class="testbox">
  <form id="create" action="/" method="POST" role="form">
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
      <input type="date" name="end" class="create2" style="float: right; position: relative; right: 1%; width: 45%;"/><i class="far fa-calendar-alt fa-lg" style="left: 47%;"></i>
    </div>
    
    <div class="btn-block">
      <button class="btn-sub" onclick="checkRent()">Create</button> <i class="far fa-smile" style="color: green;"></i>
    </div>
  </form>
</div>
  
`);
$("#ctable2").append(div);
}

function checkRent(){
  console.log("sono dentro");
  //alert("Rent created with succes!");

}






