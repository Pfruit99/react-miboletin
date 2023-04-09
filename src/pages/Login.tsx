import "../assets/styles/login.scss";

function Login() {
  return (
    <div className="login">
      <div className="form-container">
        <h1 className="title">inicio de sesion</h1>
        <p className="subtitle">Inicia sesion con tu cuenta</p>
        <form className="form">
          <label className="label">Usuario</label>
          <input
            type="text"
            id="text"
            placeholder="ejemplo: user1"
            className="input"
          />
          <label className="label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="input input-password"
          />
          <input
            type="submit"
            defaultValue="Inicia Sesion"
            className="primary-button login-button"
          />
        </form>
        <div className="spaces">
          <a href="#forgotpassword">olvidastes la contraseña?</a>
          <a href="#registro">Registrate</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
