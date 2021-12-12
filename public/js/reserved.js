
var clientARRAY = 0;
var inventoryARRAY = 0;
var rentARRAY = 0;
var WORKERINFO = 0;


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
                       <button id="${ClientInfo[i].client_id}" onclick="openAlert(id)" class= "btn-del"><i class="fas fa-trash-alt"></i></button></td>
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

    },
    error: function (xhr, ajaxOptions, thrownError) {

    }
    });
  }
  
}
/*********************************** */



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

             </form>

             <table id="styled-tab">
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Product ID</th>
                <th>Price</th>
                <th>Available</th>
              </tr>
             </table>
              `);
              $("#ctable").append(div);
  
    function populateP(ProdInfo){

        for (let i in ProdInfo) {
            let div = null;

            /*if(ProdInfo[i].available)
            var x='available'*/
  
              div = $(`
                      <table id="styled-tab">
                        <tr>
                         <td>${ProdInfo[i].name}</td>
                         <td>${ProdInfo[i].brand}</td>
                         <td>${ProdInfo[i].prod_id}</td>
                         <td>${ProdInfo[i].price}</td>
                         <td>${ProdInfo[i].available}<p></td>
                         </tr>
                      </table>
  
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
  <input type="text" placeholder="Search rental..." name="search">
  <button type="submit"><i class="fa fa-search"></i></button>
  </form>          
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
                  <p class="card-text">Client ID: ${RentInfo[i].client_id} <br> Product ID: ${RentInfo[i].prod_id}</p>
                  <p class="card-text">Start date: ${RentInfo[i].start} <br> End date: ${RentInfo[i].end}</p>
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

  alert("Are you sure you want to delete this rental?");

  if(idR) {
    $.ajax({
    type: 'DELETE',
    url: '/allRents/' + idR ,
    success: function (data) {
      console.log("sono dentro success dei noleggi");

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log("errore nell'eliminare il noleggio");
    }
    });
  }
  //location.reload()


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






