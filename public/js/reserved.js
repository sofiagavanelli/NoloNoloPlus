
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

    } }
