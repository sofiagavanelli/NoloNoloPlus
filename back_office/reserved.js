//javascript workers

console.log("ciao prova");

function openClient() {

    console.log("sono dentro open client");

    let div = null;

    div = $(`<style>
    body{
        padding: 0;
        margin: 0;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    table{
        display: block;
        overflow-x: auto;
        transform: translate(-50%,-50%);
        border-collapse: collapse;
        height: 200px;
        border: 1px solid rgb(rgb(255, 255, 255), green, blue);
        box-shadow: 2px 2px 12px rgb(172, 170, 170), -1px -1px 8px rgb(172, 170, 170);
    }

    tr{
        transition: all .2s ease-in;
        cursor: pointer;
    }

    th,td{
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    #header{
        background-color: #16a085;
        color: #fff;
     }

     h1{
         font-weight: 600;
         text-align: center;
         background-color: #16a085;
         color:#fff;
         padding: 10px 0px;
     }

     tr:hover{
         background-color: #f5f5f5;
         transform: scale(1.02);
         box-shadow: 2px 2px 12px rgb(172, 170, 170), -1px -1px 8px rgb(172, 170, 170);
     }
    
     /*media query*/
     @media only screen and (max-widht: 768px){
          table{
              width: 90%;
          }
     }

</style>
     <table style="width:1000px;">
    <tr id="header">
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Country</th>
    </tr>

    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>24</td>
        <td>Male</td>
        <td>Usa</td>
    </tr>
    
    <tr>
        <td>Paul</td>
        <td>Smith</td>
        <td>20</td>
        <td>Male</td>
        <td>Canada</td>
    </tr>
    <tr>
        <td>Mario</td>
        <td>Rossi</td>
        <td>29</td>
        <td>Male</td>
        <td>Italy</td>
    </tr>
    <tr>
        <td>Sarah</td>
        <td>Drew</td>
        <td>30</td>
        <td>Female</td>
        <td>Usa</td>
    </tr>
</table> `);
        
    $("#inner").append(div);

}
