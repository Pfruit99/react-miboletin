import React from "react"
import "../assets/styles/rol.scss"


function Rol() {
const selectOption = () =>{
    console.log("usted ha seleccionado la opcion docente")
}

const selectOption2 = () =>{
    console.log("usted ha seleccionado la opcion Rector")
}

    return(
<div className="Note_traking">
  <div className="form-container">
    <img src="./logos/logo_yard_sale.svg" alt="logo" className="logo" />
    <h1 className="title">Rol</h1>
    <form action="/" className="form">
      <input type="button" defaultValue="Docente" onClick={selectOption} className="primary-button login-button" />
      <input type="button" defaultValue="Rector" onClick={selectOption2} className="primary-button login-button" />
    </form>
    <div className="spaces">
      <a href="#return">volver</a>
    </div>
  </div>
</div>

    )
}

export default Rol