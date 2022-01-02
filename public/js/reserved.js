
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
            <input type="text" placeholder="Search customer..." name="search">
            <button type="submit"><i class="fa fa-search"></i></button>
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
                       <td><button id= "btn-upd" data-toggle="modal" data-target="#modifyModal"><i class="fas fa-user-edit"></i></button>
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


function openAlert(idDel) {

  console.log(idDel);

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
    <input type="text" placeholder="Search product..." name="search">          
    <button type="submit"><i class="fa fa-search"></i></button>   
    <button id= "btn-add" onclick="openModalM()"><i class="fas fa-plus-circle"> Add item</i></button>  
    </form>`);
    $("#ctable").append(div);
          
    function populateP(ProdInfo){
      for (let i in ProdInfo) { 
        let div = null;
              
        div = $(`     
        <div class="card" style="width: 21rem;">        
        <img src="${ProdInfo[i].image}" class="card-img-top" alt="...">              
        <div class="card-body">              
        <h5 class="card-title">${ProdInfo[i].name}</h5>              
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>              
        <a href="#" class="btn btn-primary">Go somewhere</a>              
        </div>             
        </div>            
        `);
        $("#ctable2").append(div);
  }      
} }

function openModalM(){
  $("#ctable2").css("-webkit-filter", "blur(15px)");
  div = $(`   
    <div class="modal-dialog" id="modModal" style= 'max-width: 700px'>
      <div style='z-index:1; width:100%; border-radius: 0px; margin: 0%; background: #f3cfd5;' class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Add new item</h4>
          <button type="button" id="modModal" onclick="closeModal()"class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>

        <div class="modal-body">
        <form class="row g-3">
          <div class="col-md-6" >
            <label for="inputProdID" class="form-label">Product ID</label>
            <input type="text" class="form-control" id="inputProdID" placeholder="Enter ID">
          </div>

          <div class="col-md-6">
            <label for="inputProdName" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputProdName" placeholder="Enter name">
          </div>

          <div class="col-12">
            <br>
            <label for="inputProdBrand" class="form-label">Brand</label>
            <input type="text" class="form-control" id="inputProdBrand" placeholder="Enter brand">
          </div>

          <div class="col-md-6">
            <br>
            <label for="inputProdPow" class="form-label">Power</label>
            <input type="text" class="form-control" id="inputProdPow" placeholder="...">
          </div>

          <div class="col-md-6">
            <br>
            <label for="inputProdG" class="form-label">Guests</label>
            <input type="text" class="form-control" id="inputProdG" placeholder="...">
          </div>

          <div class="col-md-6">
            <br>
            <label for="inputProdL" class="form-label">Length</label>
            <input type="text" class="form-control" id="inputProdL" placeholder="...">
          </div>

          <div class="col-md-6">
            <br>
            <label for="inputProdY" class="form-label">Year</label>
            <input type="text" class="form-control" id="inputProdY" placeholder="...">
          </div>

          <div class="col-md-4">
            <br>
            <label for="inputProdPrice" class="form-label">Price</label>
            <input type="text" class="form-control" id="inputProdPrice" placeholder="Enter price">
          </div>
          
          <div class="col-md-4">
            <br>
            <label for="inputState" class="form-label">State</label>
            <select id="inputState" class="form-select">
              <option selected>Choose...</option>
              <option>Available</option>
              <option>Not Available</option>
            </select>
          </div>
          
          </div>
        </form>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>     
            
  `);
              
  $("#ctable").append(div);  
  
}
function closeModal() {

  var x = document.getElementById("modModal");
    x.style.display = "none";
    $("#ctable2").css("-webkit-filter", "blur(0px)");
  }
    

     
/************************************/
// non funziona :(
  /*
function searchRent(){

  _id = document.getElementById("rentId").value;
  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/allRents/' + _id ,
          success: function (info) {

            rentARRAY = JSON.parse(info);

            acceptWorker(rentARRAY, _id);
              

          },
          error: function (xhr, ajaxOptions, thrownError) {

          }
      });
  }
  else {

  }

}
function acceptRent(data, insertedID) {

  for (let i in data) {

    if(data[i].rental_id == insertedID) {
        console.log("???????");

        var found = true;
    }
  }

  if (!found) 
      console.log("non esiste noleggio");


}
*/

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
                  <p class="card-text">Start date: ${RentInfo[i].start.slice(0,10)} <br> End date: ${RentInfo[i].end.slice(0,10)}</p>
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


function openAlertRents(idR) {

  console.log(idR);

  alert("Are you sure you want to delete this rent?");

  if(idR) {
    $.ajax({
    type: 'DELETE',
    url: '/allRents/' + idR ,
    success: function (data) {

    },
    error: function (xhr, ajaxOptions, thrownError) {

    }
    });
  }
  
}

function SortName(){   //ordine alfabetico dei clienti
  console.log("prova");
 /*rentARRAY.sort((a, b) => {
  return parseFloat(a.price) - parseFloat(b.price);
});*/
rentARRAY.sort((a,b) => (a.client_id > b.client_id) ? 1 : ((b.client_id > a.client_id) ? -1 : 0))
console.log(rentARRAY);
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
              <p class="card-text">Start date: ${rentARRAY[i].start.slice(0,10)} <br> End date: ${rentARRAY[i].end.slice(0,10)}</p>
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

function SortDate(){   //ordina in base alla data
  console.log("prova");
  rentARRAY.sort(function compare(a, b) {
    var dateA = new Date(a.start);
    var dateB = new Date(b.start);
    return dateA - dateB;
  });


//rentARRAY.sort((a,b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0))
console.log(rentARRAY);
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
              <p class="card-text">Start date: ${rentARRAY[i].start.slice(0,10)} <br> End date: ${rentARRAY[i].end.slice(0,10)}</p>
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
          
  
`);
$("#ctable").append(div);
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content 
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/






