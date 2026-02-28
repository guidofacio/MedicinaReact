import { useEffect, useState } from "react";

const API_URL = "https://apinet-4v1m.onrender.com/medicos";

export default function MedicosPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, _setError] = useState("");

	// Estado visor PDF
	const [pdfOpen, setPdfOpen] = useState(false);
	const [pdfUrl, setPdfUrl] = useState("");
	const [pdfFileName, setPdfFileName] = useState("");

	// Construye la ruta del PDF físico
	function getPdfForMedico() {
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
		setPdfUrl(url);
		setPdfFileName(name);
		setPdfOpen(true);
	}

	function closePdf() {
		setPdfOpen(false);
		setPdfUrl("");
		setPdfFileName("");
	}

	// ==============================
	// MOCK TEMPORAL
	// ==============================
	useEffect(() => {
		// Comentamos fetch real para usar mock
		/*
		load();
		*/

		// Mock de prueba para desarrollo responsive
		setTimeout(() => {
			setItems([
				{ nombre: "Guido", apellido: "Facio", especialidad: "Cardiología", matricula: "MP12345" },
				{ nombre: "Lucio", apellido: "Aymonino", especialidad: "Pediatría", matricula: "MP67890" },
				{ nombre: "Ana", apellido: "Gonzalez", especialidad: "Dermatología", matricula: "MP54321" },
			]);
			setLoading(false);
		}, 500);
	}, []);

	// ==============================
	// FETCH REAL (original)
	// ==============================
	/*
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
	*/

	return (

		<div className="max-w-4xl mx-auto p-6">
			<h1>Medicos (desde .NET API)</h1>

			<div className="flex gap-3 items-center mb-4">
				<button
					// onClick={load} // comentado porque usamos mock
					disabled={loading}
					className="px-4 py-2 rounded border"
				>
					{loading ? "Cargando..." : "Recargar"}
				</button>

				<a href={API_URL} target="_blank" rel="noreferrer" className="text-blue-600">
					Abrir endpoint
				</a>
			</div>

			{error && <p className="text-red-600 mb-4">Error: {error}</p>}
			{loading && <p className="mb-4">Cargando datos…</p>}
			{!loading && !error && items.length === 0 && <p>No hay datos.</p>}

			{/* ==============================
          TABLA PARA DESKTOP
      ============================== */}
			{!loading && !error && items.length > 0 && (
				<div className="mb-4">
					<table className="hidden md:table w-full border-collapse border border-gray-400">
						<thead>
							<tr className="bg-gray-100">
								<th className="text-left p-2 border-b">Nombre</th>
								<th className="text-left p-2 border-b">Apellido</th>
								<th className="text-left p-2 border-b">Especialidad</th>
								<th className="text-left p-2 border-b">Matrícula</th>
								<th className="text-left p-2 border-b">PDF</th>
							</tr>
						</thead>
						<tbody>
							{items.map((x, idx) => {
								const pdf = getPdfForMedico(x, idx);
								return (
									<tr key={idx} className="hover:bg-gray-50">
										<td className="p-2 border-b">{x.nombre}</td>
										<td className="p-2 border-b">{x.apellido}</td>
										<td className="p-2 border-b">{x.especialidad}</td>
										<td className="p-2 border-b">{x.matricula}</td>
										<td className="p-2 border-b">
											<a href={pdf.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">Ver PDF</a>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			)}

			{/* ==============================
          CARDS PARA MOBILE
      ============================== */}
			<div className="md:hidden grid gap-4">
				{items.map((x, idx) => {
					const pdf = getPdfForMedico(x, idx);
					return (
						<div key={idx} className="border rounded p-4 shadow-sm">
							<div className="font-bold text-lg">{x.nombre} {x.apellido}</div>
							<div className="text-gray-600">{x.especialidad}</div>
							<div className="text-gray-500">{x.matricula}</div>
							<button
								onClick={() => openPdf(pdf.url, pdf.name)}
								className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
							>
								Ver PDF
							</button>
						</div>
					);
				})}
			</div>

			{/* MODAL PDF */}
			{pdfOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closePdf}>
					<div className="bg-white w-full max-w-3xl rounded overflow-hidden" onClick={(e) => e.stopPropagation()}>
						<div className="p-3 border-b flex justify-between items-center">
							<strong>{pdfFileName}</strong>
							<div className="flex gap-2">
								<a href={pdfUrl} download={pdfFileName} className="text-blue-600">Descargar</a>
								<a href={pdfUrl} target="_blank" rel="noreferrer" className="text-blue-600">Abrir</a>
								<button onClick={closePdf} className="px-2 py-1 border rounded">Cerrar</button>
							</div>
						</div>
						<iframe
							src={pdfUrl}
							title="Vista previa PDF"
							width="100%"
							height="600px"
							className="border-none"
						/>
					</div>
				</div>
			)}
		</div>
	);
}