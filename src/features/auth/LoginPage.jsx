/* ---------------- LOGIN ---------------- */
import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [doc, setDoc] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const ok = onLogin(doc.trim(), pass);
    if (!ok) setError("Usuario o contraseña incorrectos. Probá: juan / 1234");
    else setError("");
  }

  return (
    <div className="loginShell">
      <section className="loginLeft">
        <div className="loginOverlay">
          <h1>Bienvenido a Tu Portal, nuestro Portal HP</h1>
          <p>Todo en un mismo lugar, la comodidad al alcance de tu mano, fácil y práctico</p>
          <div className="loginFooter">
            <small>©2024 Hospital Prueba Asociación Civil</small>
          </div>
        </div>
      </section>

      <section className="loginRight">
        <div className="brandRow">
          <div className="brandMark">HP</div>
          <div className="brandText">
            <div className="brandTitle">Hospital</div>
            <div className="brandTitle">Prueba</div>
          </div>
        </div>

        <div className="loginCard">
          <h2>Iniciar sesión</h2>

          <form onSubmit={submit} className="form">
            <label className="label">
              Documento de identidad
              <input
                className="input"
                value={doc}
                onChange={(e) => setDoc(e.target.value)}
                placeholder="Ej: juan"
                autoComplete="username"
              />
            </label>

            <label className="label">
              Contraseña
              <input
                className="input"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Ej: 1234"
                autoComplete="current-password"
              />
            </label>

            {error ? <div className="errorBox">{error}</div> : null}

            <div className="loginRow">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Recordar usuario</span>
              </label>

              <button type="button" className="linkBtn">Recuperar contraseña</button>
            </div>

            <button className="primaryBtn" type="submit">
              Iniciar sesión
            </button>

            <div className="loginBottom">
              <span>¿Todavía no tenés cuenta?</span>
              <button type="button" className="linkBtn">Creala ahora</button>
            </div>

            <button type="button" className="linkBtn muted">Datos de contacto</button>
          </form>
        </div>
      </section>
    </div>
  );
}