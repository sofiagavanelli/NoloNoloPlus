import React from "react";

export function Prova() {
  const [data, setData] = React.useState([]);//data è la variabile che contiene i risultati dell'api, setData è la funzione per inserire i dati nella variabile

  React.useEffect(() => {
    fetch("http://localhost:8680/allRents")
      .then((res) => res.json())
      .then((json) => {
        var app=[];
        for(var i in json){
            console.log(json[i].client_id);
            app[i]=json[i].client_id;
         }
        setData(app);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img  className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}
