
export function calc(start, end, product, logged, noleggi) {

    let payment = false, err = null;

    const diffInMs   = new Date(end) - new Date(start);
    const diffInDays = (diffInMs / (1000 * 60 * 60 * 24)) + 1; //+1 perché conto la data di partenza

    let highDays = highSeason_days(start, diffInDays);

    let temp = (product.high_season * (highDays)) + (product.low_season * (diffInDays - highDays));

    if(logged) {

        if(product.status != "rotto" && controlDate(noleggi, start, end)) {

            if(product.status == "buono") {
              temp = temp - (temp*5/100);
            }
            else if(product.status == "rovinato") {
              temp = temp - (temp*10/100);
            }
            
            payment = true;
        }
        else {
            if(product.status == "rotto")
                err = "imbarcazione non disponibile";
            else
                err = "date già occupate";
          //console.log("PRODOTTO NOLEGGIATO IN QUESTE DATE: CHE FARE?");
        }

    
    } 

    return {total: temp, pay: payment, err};

}


export function controlDate(noleggi, start, end) {

    console.log("sono dentro controldate");

        var myrent_sdate = new Date(start);
        var myrent_edate = new Date(end);

        var disponibile = true;

        noleggi.forEach(item => {

          if(!item.deleted) { //se il noleggio che si sta guardando è stato eliminato allora le sue date NON vanno considerate come occupate

            var checked_start = new Date(item.start_date);
            var checked_end = new Date(item.end_date);

            if((myrent_sdate >= checked_start && myrent_sdate <= checked_end) ||
              (myrent_edate >= checked_start&& myrent_edate <= checked_end) || 
              (myrent_sdate <= checked_start && myrent_edate >= checked_start) ) {

                disponibile = false;
            }

          }

        })

        console.log("dentro è:" + disponibile);

        return(disponibile);

}

export function highSeason_days(start, diff) {
    
    let Hdays = 0;
    var date = new Date(start);

    while (diff>0) {

        if (date.getMonth() >= 5 && date.getMonth() <= 9) { 
        /*NOTA BENE: I MESI PARTONO DA 0 QUINDI MAGGIO=4 E SETTEMBRE=8*/
        Hdays = Hdays + 1;
        }

        date.setDate(date.getDate() + 1);

        diff--;

    }

    return(Hdays);
    
}