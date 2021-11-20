
var clientARRAY = 0;

function openClient() {

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


  function populate(ClientInfo){

      console.log("sono dentro populate");
      console.log(ClientInfo);
  
      for (let i in ClientInfo) {
          let div = null;

            div = $(`

                <div class="card">
                  <div class="card-body">
                  <h5 class="card-title"> Customer:  ${ClientInfo[i].name} ${ClientInfo[i].surname}</h5>
                  <p class="card-text">Customer ID: ${ClientInfo[i].client_id}</p>
                  <button id="btn-del" type="button" onclick="alert('Are you sure you want to delete this customer?')" >Delete</button>
                  <button id="btn-upd" type="button" >Update </button>
                  <button id="btn-pass" type="button">Show password</button>
                  
                  </div>
                </div>`);
        
    $("#ctable").append(div);

}

    } }
