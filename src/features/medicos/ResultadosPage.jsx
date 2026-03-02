import React, { useEffect, useState } from "react";

export default function Resultados({
  endpoint = "https://royalblue-salmon-267723.hostingersite.com/api/uploads.php",
}) {
  // ===== Upload =====
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  // ===== Tabla archivos =====
  const ARCHIVOS_URL = "https://apinet-4v1m.onrender.com/obtenerarchivos"; // <-- CAMBIAR
  const [archivos, setArchivos] = useState([]);
  const [loadingArchivos, setLoadingArchivos] = useState(true);
  const [errorArchivos, setErrorArchivos] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0] || null);
    setStatus("idle");
    setError("");
    setResponse(null);
  };

  async function loadArchivos() {
    setLoadingArchivos(true);
    setErrorArchivos("");

    try {
      const res = await fetch(ARCHIVOS_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setArchivos(Array.isArray(data) ? data : []);
    } catch (e) {
      setErrorArchivos(e?.message ?? "Error desconocido");
      setArchivos([]);
    } finally {
      setLoadingArchivos(false);
    }
  }

  // Cargar tabla al montar
  useEffect(() => {
    loadArchivos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setError("");
    setResponse(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // por si tu backend manda logs:
      if (Array.isArray(data?.logs)) data.logs.forEach((log) => console.log(log));

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Error al subir el archivo");
      }

      setResponse(data);
      setStatus("success");

      // 🔁 refrescar tabla después de subir OK
      await loadArchivos();
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ===== Upload ===== */}
      <div className="flex flex-col gap-3">
        <input type="file" onChange={handleChange} />

        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className="px-4 py-2 rounded border w-fit"
        >
          {status === "uploading" ? "Subiendo..." : "Subir archivo"}
        </button>

        {status === "error" && <p className="text-red-600">{error}</p>}

        {status === "success" && response?.file?.url && (
          <p>
            Archivo subido:{" "}
            <a className="text-blue-600" href={response.file.url} target="_blank" rel="noreferrer">
              Ver archivo
            </a>
          </p>
        )}
      </div>

      <hr className="my-6" />

      {/* ===== Tabla Archivos ===== */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Archivos</h2>

        <button
          onClick={loadArchivos}
          disabled={loadingArchivos}
          className="px-4 py-2 rounded border"
        >
          {loadingArchivos ? "Cargando..." : "Recargar"}
        </button>

        <a href={ARCHIVOS_URL} target="_blank" rel="noreferrer" className="text-blue-600">
          Abrir endpoint
        </a>
      </div>

      {errorArchivos && <p className="text-red-600 mb-4">Error: {errorArchivos}</p>}
      {loadingArchivos && <p className="mb-4">Cargando archivos…</p>}
      {!loadingArchivos && !errorArchivos && archivos.length === 0 && <p>No hay archivos.</p>}

      {!loadingArchivos && !errorArchivos && archivos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border-b">ID</th>
                <th className="text-left p-2 border-b">Nombre real</th>
              </tr>
            </thead>
            <tbody>
              {archivos.map((x, idx) => (
                <tr key={x.idarchivo ?? idx} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{x.idarchivo}</td>
                  <td className="p-2 border-b">{x.nombre_real}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}