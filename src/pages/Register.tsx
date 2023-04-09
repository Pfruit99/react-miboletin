import React from 'react'
import '../assets/styles/register.scss'

function Register() {
    return(
<div className="registro">
  <div className="form-container">
    <h1 className="title">Registro</h1>
    <p className="subtitle">Edita la informacion de tu cuenta</p>
    <form action="/" className="form">
      <div>
        <label htmlFor="text" className="label">Usuario</label>
        <input type="text" id="Usuario" placeholder="Pling87" className="input input-Email" />
        <label htmlFor="text" className="label">Sexo</label>
        <input type="text" id="Sexo" className="input" />
        <label htmlFor="Email" className="label">Correo</label>
        <input type="email" id="email" className="input" />
        <label htmlFor="new-password" className="label">Contraseña</label>
        <input type="password" id="password" placeholder="******" className="input input-password" />
      </div>
      <input type="submit" defaultValue="CrearCuenta" className="secondary-button register-button" />
      <div className="spaces">
        <a href="#registro">atras</a>
        <a href="#account">ya tienes cuenta?</a>
      </div>
    </form>
  </div>
</div>

    )   
}


export default Register