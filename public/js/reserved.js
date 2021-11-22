
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
  div = $(`
            <div class = "table-box">
              <div class = "table-row">
                <div class="table-cell">
                  <p>Name</p>
                </div>
                <div class="table-cell">
                  <p>Surname</p>
                </div>
                <div class="table-cell">
                  <p> Customer ID</p>
                </div>
                <div class="table-cell">
                  <p>Actions</p>
                </div>
              </div>
            </div>

            `);
            $("#ctable").append(div);

  function populate(ClientInfo){

      console.log("sono dentro populate");
      console.log(ClientInfo);
  
      for (let i in ClientInfo) {
          let div = null;

            div = $(`
            <div class = "table-box">
              <div class = "table-row">
                <div class="table-cell">
                  <p>${ClientInfo[i].name}</p>
                </div>
                <div class="table-cell">
                  <p>${ClientInfo[i].surname}</p>
                </div>
                <div class="table-cell">
                  <p>${ClientInfo[i].client_id}</p>
                </div>
                <div class="table-cell">
                  <p><button id="btn-upd" type="button"> <i class="fas fa-user-edit"></i></button></p>
                </div>
              </div>
            </div>

            `);
            $("#ctable2").append(div);
    

}

    } }
