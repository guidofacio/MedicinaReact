import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate, NavLink, Outlet } from "react-router-dom";
import Medicos from "./Medicos";

const HARDCODE_USER = "juan";
const HARDCODE_PASS = "1234";

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  const auth = useMemo(
    () => ({
      isAuthed,
      login: (user, pass) => {
        const ok = user === HARDCODE_USER && pass === HARDCODE_PASS;
        setIsAuthed(ok);
        return ok;
      },
      logout: () => setIsAuthed(false),
    }),
    [isAuthed]
  );

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={
          isAuthed ? (
            <Navigate to="/app" replace />
          ) : (
            <LoginPage onLogin={auth.login} />
          )
        }
      />

      {/* Portal (protegido) */}
      <Route
        path="/app"
        element={
          isAuthed ? <PortalLayout onLogout={auth.logout} /> : <Navigate to="/" replace />
        }
      >
        <Route index element={<Home />} />
        <Route path="coberturas" element={<Coberturas />} />

        <Route path="turnos/reservar-turno" element={<ReservarTurno />} />
        <Route path="turnos/reservar-estudio" element={<ReservarEstudio />} />
        <Route path="turnos/agendados" element={<TurnosAgendados />} />
        <Route path="turnos/profesionales" element={<Profesionales />} />
        <Route path="turnos/resultados" element={<Resultados />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/* ---------------- LOGIN ---------------- */
function LoginPage({ onLogin }) {
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

/* ---------------- PORTAL (MENÚ + RUTEO) ---------------- */
function PortalLayout({ onLogout }) {
  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="sidebarBrand">
          <div className="brandMark big">HP</div>
        </div>

        <div className="navSectionTitle">TU PORTAL</div>
        <NavItem to="/app" end icon="home" label="Inicio" />
        <NavItem to="/app/coberturas" icon="card" label="Coberturas" />

        <div className="navSectionTitle row">
          <span>TURNOS</span>
          <span className="chev">▾</span>
        </div>
        <NavItem to="/app/turnos/reservar-turno" icon="plus" label="Reservar turno" />
        <NavItem to="/app/turnos/reservar-estudio" icon="calendar" label="Reservar estudio" />
        <NavItem to="/app/turnos/agendados" icon="check" label="Turnos agendados" />
        <NavItem to="/app/turnos/profesionales" icon="doctor" label="Profesionales médicos" />
        <NavItem to="/app/turnos/resultados" icon="lab" label="Resultados de estudios" />
      </aside>

      <main className="main">
        <header className="topbar">
          <div />
          <div className="topbarRight">
            <Icon name="phone" />
            <Icon name="bell" />
            <div className="userBox">
              <div className="userName">Juan</div>
              <div className="userRole">
                Titular <span className="caret">▾</span>
              </div>
            </div>
            <button className="ghostBtn" onClick={onLogout}>Salir</button>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ---------------- PÁGINAS ---------------- */
function Home() {
  return (
    <div className="grid2">
      <Card title="Cobertura" icon="card">
        <div className="emptyHint">Contenido de cobertura (placeholder)</div>
      </Card>

      <Card title="Nuevo turno" icon="plus">
        <div className="centerAction">
          <div className="circlePlus">
            <Icon name="plus" size={34} />
          </div>
          <div className="actionTitle">Reservar turno</div>
        </div>
      </Card>
    </div>
  );
}

function Coberturas() { return <PageTitle>Coberturas</PageTitle>; }
function ReservarTurno() { return <PageTitle>Reservar turno</PageTitle>; }
function ReservarEstudio() { return <PageTitle>Reservar estudio</PageTitle>; }
function TurnosAgendados() { return <PageTitle>Turnos agendados</PageTitle>; }
function Profesionales() { return <><PageTitle>Profesionales médicos</PageTitle><Medicos/></>; }
function Resultados() { return <PageTitle>Resultados de estudios</PageTitle>; }
function NotFound() { return <PageTitle>Ruta no encontrada</PageTitle>; }

function PageTitle({ children }) {
  return (
    <div className="pageBox">
      <h1 className="pageTitle">{children}</h1>
      <p className="pageDesc"></p>
    </div>
  );
}

/* ---------------- UI ---------------- */
function Card({ title, icon, children }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <div className="cardHeaderLeft">
          <Icon name={icon} />
          <div className="cardTitle">{title}</div>
        </div>
      </div>
      <div className="cardBody">{children}</div>
    </div>
  );
}

function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </NavLink>
  );
}

/* ---------------- ICONOS ---------------- */
function Icon({ name, size = 18 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", className: "icon" };

  switch (name) {
    case "home":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "card":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "check":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "doctor":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          <path d="M12 7v8M8 11h8" />
        </svg>
      );
    case "lab":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 2v6l-5 9a4 4 0 0 0 3.5 6h7A4 4 0 0 0 19 17l-5-9V2" />
          <path d="M8 8h8" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.9.32 1.76.57 2.6a2 2 0 0 1-.45 2.11L9 10.1a16 16 0 0 0 4.9 4.9l.67-1.23a2 2 0 0 1 2.11-.45c.84.25 1.7.45 2.6.57A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    default:
      return null;
  }
}