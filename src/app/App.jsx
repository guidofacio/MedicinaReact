import { useMemo, useState } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import MedicosPage from './../features/medicos/MedicosPage';
import LoginPage from "../features/auth/LoginPage";
import MainLayout from "./layout/MainLayout";
import Icon from "../components/ui/Icon";
import Card from "../components/ui/Card";

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
          isAuthed ? <MainLayout onLogout={auth.logout} /> : <Navigate to="/" replace />
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

function Coberturas() {
  return <PageTitle>Coberturas</PageTitle>;
}
function ReservarTurno() { return <PageTitle>Reservar turno</PageTitle>; }
function ReservarEstudio() { return <PageTitle>Reservar estudio</PageTitle>; }
function TurnosAgendados() { return <PageTitle>Turnos agendados</PageTitle>; }
function Profesionales() { return <><PageTitle>Profesionales médicos</PageTitle><MedicosPage /></>; }
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