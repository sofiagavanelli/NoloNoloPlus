
var clientARRAY = 0;
var inventoryARRAY = 0;

function openClient() {
  $( "#ctable" ).empty();
  $( "#ctable2" ).empty();
  

    $.ajax({
      type: 'GET',
      url: '/allClients' ,
      success: function (data) {

        clientARRAY = JSON.parse(data);

        populate(clientARRAY);


          //console.log(data);

          //console.log("sono dentro success");
      },
      //Non è stata trovata la storia
      error: function (xhr, ajaxOptions, thrownError) {
          console.log("La storia selezionata non esiste");
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

      console.log("sono dentro populate");
      console.log(ClientInfo);

      
  
      for (let i in ClientInfo) {
          let div = null;

            div = $(`
                    <table id="styled-tab">
                      <tr>
                       <td>${ClientInfo[i].name}</td>
                       <td>${ClientInfo[i].surname}</td>
                       <td>${ClientInfo[i].client_id}</td>
                       <td> <button id= "btn-del"><i class="fas fa-trash-alt"></i></button> <button id= "btn-upd"><i class="fas fa-user-edit"></i></button></td>
                      </tr>
                    </table>

            `);
            $("#ctable2").append(div);
}
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
  
        console.log("sono dentro populate");
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
                         <td>${ProdInfo[i].available}</td>
                         </tr>
                      </table>
  
              `);
              $("#ctable2").append(div);
      
  
  }
  
      } }
