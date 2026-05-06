import { useState, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useAlert } from "../../context/AlertContext";

export default function ReservaForm({ initialData, onSubmit }) {
    const { data: usuarios, loading: loadingUsuarios } = useAxios("/usuarios");
    const { data: libros, loading: loadingLibros } = useAxios("/libros");

    const [usuarioId, setUsuarioId] = useState("");
    const [libroId, setLibroId] = useState("");
    const [fechaReserva, setFechaReserva] = useState("");
    const [fechaDevolucion, setFechaDevolucion] = useState("");

    const showAlert = useAlert();


    useEffect(() => {
        if (initialData) {
            setUsuarioId(initialData.usuario?.id || "");
            setLibroId(initialData.libro?.id || "");
            setFechaReserva(formatToDatetimeLocal(initialData.fechaReserva) || "");
            setFechaDevolucion(formatToDatetimeLocal(initialData.fechaDevolucion) || "");
        } else {
            setUsuarioId("");
            setLibroId("");
            setFechaReserva("");
            setFechaDevolucion("");
        }
    }, [initialData]);

    function formatToDatetimeLocal(value) {
        if (!value) return "";
        const s = String(value);
        const m = s.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
        return m ? m[0] : "";
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!usuarioId || !libroId ) {
                showAlert("info", "Error en la selección", "Debes de seleccionar un libro y un usuario para crear la reserva");
                return;
            }

            const addSeconds = (v) => {
                if(!v) return null;
                return v.length === 16 ? `${v}:00` : v;
            };

            await onSubmit({
                usuarioId: Number(usuarioId),
                libroId: Number(libroId),
                fechaReserva: addSeconds(fechaReserva),
                fechaDevolucion: addSeconds(fechaDevolucion) || null, 
            });



            if (!initialData) {
                setUsuarioId("");
                setLibroId("");
                setFechaReserva("");
                setFechaDevolucion("");
            }

        } catch (err) {
            console.error(err);
            showAlert("error", "Error al guardar reserva", "Ha ocurrido un error al intentar guardar la reserva");
        }
    };

    return (
        <div className="mt-6 p-4 border rounded bg-gray-50">

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="font-bold">Usuario</label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        className="border px-3 py-2 w-full rounded"
                        required
                    >
                        <option value="">--Selecciona un usuario--</option>
                        {!loadingUsuarios &&
                            usuarios?.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.nombre} ({u.email})
                                </option>
                            ))}
                    </select>
                </div>

                <div className="">
                    <label className=" font-bold">Libro</label>
                    <select
                        value={libroId}
                        onChange={(e) => setLibroId(e.target.value)}
                        className="border px-3 py-2 w-full rounded"
                        required
                    >
                        <option value="">--Selecciona un libro--</option>
                        {!loadingLibros &&
                            libros
                                ?.filter((l) => l.disponible || l.id === libroId) 
                                .map((l) => (
                                    <option key={l.id} value={l.id}>
                                        {l.nombre} ({l.autor?.nombre})
                                    </option>
                                ))}
                    </select>
                </div>
                {initialData && (
                    <div>
                        <fieldset className="border border-gray-300 rounded p-3">
                            <legend className="text-sm text-gray-500 px-2">
                                Formato: YYYY-MM-DDTHH:MM:SS
                            </legend>
                            <div>
                                <label className="font-bold">
                                    Fecha Reserva
                                </label>

                                <input
                                    type="text"
                                    value={fechaReserva}
                                    onChange={(e) => setFechaReserva(e.target.value)}
                                    className="border px-3 py-2 w-full rounded"
                                />

                            </div>
                        
                            <div>
                                <label className="font-bold">
                                    Fecha Devolucion
                                </label>
                                <input
                                    type="text"
                                    value={fechaDevolucion}
                                    onChange={(e) => setFechaDevolucion(e.target.value)}
                                    className="border px-3 py-2 w-full rounded"
                                    placeholder="Fecha de devolución (opcional)"
                                />
                            </div>
                        </fieldset>
                    </div>

                )}



                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    {initialData ? "Actualizar Reserva" : "Guardar Reserva"}
                </button>
            </form>

        </div>
    );
}
