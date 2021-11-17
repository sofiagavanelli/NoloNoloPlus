//javascript workers

console.log("ciao prova");

function openClient() {

  //chiamata a get(/allClients)
    $.get({
      url: '/allClients', 
      //data: { source: sourceElem, target: targetElem },
      success: function( data ){ 
        $('html').html( data ); 
      }
    });

    console.log("sono dentro open client");

    let div = null;

    div = $(`
    <style>
    #table-wrapper {
      position: relative;
    height: 70vh;
    margin-top: 6vh;
    }
    #table-scroll {
      height:70vh;
      overflow:auto;  
    }
    #table-wrapper table {
      width:100%;
        
    }
    #table-wrapper table * {
      background:pink;
      color:black;
    }
    #table-wrapper table thead th .text {
      position:absolute;   
      top:-20px;
      z-index:2;
      height:20px;
      width:45%;
      border:1px solid red;
    }
    .btn-add {
      background-color: #4CAF50;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;

      margin:0.5em;
      padding: 0.5em 2em 0.5em 2em;
      border-radius: 12px;
    }
    .btn-searchIcon {
      background-color: white;
      padding: 0.5em;
      margin-right:0.5em;
      margin-left:0;
      border:none;
    }
    .btn:active{
      margin-right:0;
    }

    </style>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn-searchIcon"> <i class="fas fa-search"></i> </button>
    </form>
  <button class="btn-add" type="button">Add </button>
</div>

<div id="table-wrapper">
  <div id="table-scroll">
    <table>
        <thead>
            <tr>
                <th><span class="text">Name</span></th>
                <th><span class="text">Surname</span></th>
                <th><span class="text">User ID</span></th>
            </tr>
        </thead>
        <tbody>


<tr> <td>Mario</td> <td>Rossi</td> <td>MarioRossi</td> </tr>
<tr> <td>John</td> <td>Doe</td> <td>JDoe</td> </tr>
<tr> <td>Pietro</td> <td>Verdi</td> <td>PiVerdi</td> </tr>
<tr> <td>Sasha</td> <td>Wolf</td> <td>Wsasha</td> </tr>
<tr> <td>Josh</td> <td>Duh</td> <td>  Joshdue</td> </tr>
<tr> <td>Carol</td> <td>McCarty</td> <td>CarolMc</td> </tr>
<tr> <td>Mario</td> <td>Rossi</td> <td>MarioRossi</td> </tr>
<tr> <td>John</td> <td>Doe</td> <td>JDoe</td> </tr>
<tr> <td>Pietro</td> <td>Verdi</td> <td>PiVerdi</td> </tr>
<tr> <td>Sasha</td> <td>Wolf</td> <td>Wsasha</td> </tr>
<tr> <td>Josh</td> <td>Duh</td> <td>  Joshdue</td> </tr>
<tr> <td>Carol</td> <td>McCarty</td> <td>CarolMc</td> </tr>
<tr> <td>Mario</td> <td>Rossi</td> <td>MarioRossi</td> </tr>
<tr> <td>John</td> <td>Doe</td> <td>JDoe</td> </tr>
<tr> <td>Pietro</td> <td>Verdi</td> <td>PiVerdi</td> </tr>
<tr> <td>Sasha</td> <td>Wolf</td> <td>Wsasha</td> </tr>
<tr> <td>Josh</td> <td>Duh</td> <td>  Joshdue</td> </tr>
<tr> <td>Carol</td> <td>McCarty</td> <td>CarolMc</td> </tr>
<tr> <td>Mario</td> <td>Rossi</td> <td>MarioRossi</td> </tr>
<tr> <td>John</td> <td>Doe</td> <td>JDoe</td> </tr>
<tr> <td>Pietro</td> <td>Verdi</td> <td>PiVerdi</td> </tr>
<tr> <td>Sasha</td> <td>Wolf</td> <td>Wsasha</td> </tr>
<tr> <td>Josh</td> <td>Duh</td> <td>  Joshdue</td> </tr>
<tr> <td>Carol</td> <td>McCarty</td> <td>CarolMc</td> </tr>


        </tbody>
    </table>
  </div>
</div>
  `);
        
    $("#inner").append(div);

}
