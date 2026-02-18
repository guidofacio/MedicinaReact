import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://apinet-4v1m.onrender.com/medicos";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estado visor PDF
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfFileName, setPdfFileName] = useState("");

  // Construye la ruta del PDF físico
  function getPdfForMedico(x, idx) {
    // OPCIÓN RECOMENDADA: por matrícula
    // return {
    //   url: `/pdfs/${x.matricula}.pdf`,
    //   name: `${x.matricula}.pdf`,
    // };

    // DEMO: por índice
    return {
      url: `/assets/pdfs/prueba.pdf`,
      name: `prueba.pdf`,
    };
  }

  function openPdf(url, name) {
    console.log("url: " + url + " name: " + name);
    setPdfUrl(url);
    setPdfFileName(name);
    setPdfOpen(true);
  }

  function closePdf() {
    setPdfOpen(false);
    setPdfUrl("");
    setPdfFileName("");
  }

  async function load() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message ?? "Error desconocido");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Medicos (desde .NET API)</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={load} disabled={loading}>
          {loading ? "Cargando..." : "Recargar"}
        </button>

        <a href={API_URL} target="_blank" rel="noreferrer">
          Abrir endpoint
        </a>
      </div>

      {error && (
        <p style={{ marginTop: 16, color: "crimson" }}>
          Error: {error}
        </p>
      )}

      {loading && (
        <p style={{ marginTop: 16 }}>
          Cargando datos…
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p style={{ marginTop: 16 }}>
          No hay datos.
        </p>
      )}

      {!loading && !error && items.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Nombre</th>
                <th style={th}>Apellido</th>
                <th style={th}>Especialidad</th>
                <th style={th}>Matricula</th>
                <th style={th}>PDF</th>
              </tr>
            </thead>

            <tbody>
              {items.map((x, idx) => {
                const pdf = getPdfForMedico(x, idx);

                return (
                  <tr key={idx}>
                    <td style={td}>{x.nombre}</td>
                    <td style={td}>{x.apellido}</td>
                    <td style={td}>{x.especialidad}</td>
                    <td style={td}>{x.matricula}</td>

                    <td style={td}>
                      <a href={pdf.url} target="_blank" rel="noopener noreferrer">
  Ver PDF
</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL PDF */}
      {pdfOpen && (
        <div style={backdrop} onClick={closePdf}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            
            <div style={modalHeader}>

              <strong>{pdfFileName}</strong>

              <div style={{ display: "flex", gap: 10 }}>

                {/* DESCARGAR */}
                <a href={pdfUrl} download={pdfFileName}>
                  Descargar
                </a>

                {/* ABRIR NUEVA PESTAÑA */}
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  Abrir
                </a>

                <button onClick={closePdf}>
                  Cerrar
                </button>

              </div>

            </div>

            {/* VISOR PDF */}
            <iframe
              src={pdfUrl}
              title="Vista previa PDF"
              width="100%"
              height="600px"
              style={{ border: "none" }}
            />

          </div>
        </div>
      )}
    </div>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  padding: "10px",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "10px",
};

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "white",
  width: "900px",
  borderRadius: "8px",
  overflow: "hidden",
};

const modalHeader = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};