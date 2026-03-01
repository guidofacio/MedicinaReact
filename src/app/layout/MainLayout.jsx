import { Outlet } from "react-router-dom";
import NavItem from "../../components/ui/NavItem";
import Icon from "../../components/ui/Icon";

/* ---------------- PORTAL (MENÚ + RUTEO) ---------------- */
export default function PortalLayout({ onLogout }) {
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