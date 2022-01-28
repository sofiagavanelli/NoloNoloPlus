import { DropdownButton, Dropdown } from 'react-bootstrap';
import React from "react";
import "../App.css";

export function FilterButton(){
    function crescente(){
        console.log("crescente");
        //funcione sort
    }

    function decrescente(){
        console.log("decrescente");
    }
    return(
    <div id="filter">
        <DropdownButton
            variant="outline-secondary"
            title="Filtra per numero di noleggi"
            id="input-group-dropdown-2"
            align="end"
            >
        <Dropdown.Item href="#" onClick={crescente}>crescente</Dropdown.Item>
        <Dropdown.Item href="#" onClick={decrescente}>Decrescente</Dropdown.Item>
        </DropdownButton>
    </div>
    );
}