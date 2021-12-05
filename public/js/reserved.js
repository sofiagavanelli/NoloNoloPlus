
var clientARRAY = 0;
var inventoryARRAY = 0;
var rentARRAY = 0;
var WORKERINFO = 0;
var p=0;


/************************* */
//LOGIN DEL WORKER/MANAGER
function login(){

  _id = document.getElementById("userWorker").value;
  _pass = document.getElementById("passWorker").value;

  console.log(_id, _pass);
  
  if(_id) {
      $.ajax({
          type: 'GET',
          url: '/worker/' + _id ,
          success: function (info) {

              WORKERINFO = JSON.parse(info);

              acceptWorker(WORKERINFO, _pass);

              console.log("appartieni ai worker");

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

function acceptWorker(data, insertedP) {

  for (let i in data) {

    if(data[i].password == insertedP) {

        if(data[i].manager == true) {
          document.getElementById("managBtn").disabled = false;
        }
        else if(document.getElementById("managCheck"))
          console.log("non sei davvero un manager, stai attento");

        //magari si aggiunge un avviso che non è davvero un manager
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
  

    $.ajax({
      type: 'GET',
      url: '/allClients' ,
      success: function (data) {

        clientARRAY = JSON.parse(data);

        populate(clientARRAY);
      },
      error: function (xhr, ajaxOptions, thrownError) {
          console.log("errore nei clienti");
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

      console.log("sono dentro populate clienti");
      console.log(ClientInfo);

      
  
      for (let i in ClientInfo) {
          let div = null;

            div = $(`
                    <table id="styled-tab">
                      <tr>
                       <td>${ClientInfo[i].name}</td>
                       <td>${ClientInfo[i].surname}</td>
                       <td>${ClientInfo[i].client_id}</td>
                       <td><button id= "btn-upd" data-toggle="modal" data-target="#modifyModal"><i class="fas fa-user-edit"></i></button>
                       <button  id="${ClientInfo[i].client_id}" onclick="openAlert(id)" class= "btn-del"><i class="fas fa-trash-alt"></i></button></td>
                      </tr>
                    </table>
            `);
            $("#ctable2").append(div);
}
} 
}

//$(document).on('click', '.btn-del', openAlert(this.id));

function openAlert(idDel) {

  console.log(idDel);

  alert("Are you sure you want to delete this client?");

  if(idDel) {
    $.ajax({
    type: 'GET',
    url: '/removeClient/' + idDel ,
    success: function (data) {
      console.log("sono dentro success");

    },
    error: function (xhr, ajaxOptions, thrownError) {
        console.log("errore nell'eliminare");
    }
    });
  }


}
/*********************************** */



function openInventory() {
 
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();

  $.ajax({
    type: 'GET',
      url: '/prods' ,
        success: function (data) {
  
          inventoryARRAY = JSON.parse(data);
  
          populateP(inventoryARRAY);
  
  
            console.log(ProdInfo);
  
            console.log("sono dentro success");
        },
        //Non è stata trovata la storia
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("La storia selezionata non esiste");
        }
    });
    div = $(`
          
             <form class="example">
             <input type="text" placeholder="Search product..." name="search">
             <button type="submit"><i class="fa fa-search"></i></button>

             <button id= "btn-add" data-toggle="modal" data-target="#addModal"><i class="fas fa-plus-circle"> Add item</i></button>

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
  
        console.log("sono dentro populate prodotti");
        console.log(ProdInfo);
  
        
    
        for (let i in ProdInfo) {
            let div = null;
  
              div = $(`
                      <table id="styled-tab">
                        <tr>
                         <td>${ProdInfo[i].name}</td>
                         <td>${ProdInfo[i].brand}</td>
                         <td>${ProdInfo[i].prod_id}</td>
                         <td>${ProdInfo[i].price}</td>
                         <td><p class="status">${ProdInfo[i].available}<p></td>
                         </tr>
                      </table>
  
              `);
              $("#ctable2").append(div);
      
  
  }
  
      } }

/************************************/

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
      console.log("errore nei noleggi");       
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
      
        
    console.log("sono dentro populate noleggi");
        
    console.log(RentInfo);
        
    for (let i in RentInfo) {
          
      let div = null;
      
            
      div = $(`
            <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Rental: ${RentInfo[i].rental_id}</h5>
                  <p class="card-text">Client ID: ${RentInfo[i].client_id} <br> Product ID: ${RentInfo[i].prod_id}</p>
                  <p class="card-text">Start date: ${RentInfo[i].start} <br> End date: ${RentInfo[i].end}</p>
                </div>
              </div>
            </div>
      
              `);
               $("#ctable2").append(div);
             }
         } 
}

function openContacts() {           
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
                     
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






