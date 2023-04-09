// import React, { useState } from "react";
import "../assets/styles/notes.scss";
import { Link } from "react-router-dom";

function Notes() {

// const [holdback,setHoldback] = useState('');

const returnHome =() =>{
    console.log("volviendo a home")
}





return (
<div className="Note_traking">
  <div className="form-container">
    <img src="./logos/logo_yard_sale.svg" alt="logo" className="logo" />
    <h1 className="title">Seguimiento de Notas</h1>
    <form action="/" className="form">
      <input type="button" defaultValue="Ver notas" className="primary-button login-button" />
      <input type="button" defaultValue="boletas" className="primary-button login-button" />
    </form>
    <div className="spaces">
      <a href="#return" onClick={returnHome}><Link to="/Home"/> volver</a>
    </div>
  </div>
</div>

    )
}

export default Notes