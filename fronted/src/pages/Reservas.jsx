import React, { useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { useAuth } from "../context/AuthContext";
import ReservaModal from "../components/Modals/ReservaModal";
import { useAlert } from "../context/AlertContext";
import TableFilters from "../components/UI/TableFilters";

export default function Reservas() {
    const {api} = useAuth();
    const { data: reservas, loading, error, setData } = useAxios("/reservas");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservaEdit, setReservaEdit] = useState(null);
    const { showAlert } = useAlert();


    const handleSave = async () => {
        try {
            const res = await api.get("/reservas");
            setData(res.data);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error al cargar reservas: ", err);
        }
    };

    const openCrear = () => {
        setReservaEdit(null);
        setIsModalOpen(true);
    };

    const openEditar = (reserva) => {
        setReservaEdit(reserva);
        setIsModalOpen(true);
    };

    const handleDevolver = async (reservaId) => {
        try {
            await api.post(`reservas/devolver/${reservaId}`);
            const res = await api.get("/reservas");
            setData(res.data);
            showAlert("success", "Devolver libro", "El libro fue devuelto con éxito");

        } catch (err) {
            console.error("Error al devolver la reserva: ", err);
            showAlert("error", "Devolver libro", "Se ha producido un error al intentar devolver el libro");
        }
    }

    if (loading) return <p className="p-4">Cargando...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Reservas</h1>

            <button
                onClick={openCrear}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Añadir Reserva
            </button>

            <TableFilters
                columns={[
                    { key: "id", label: "ID"},
                    { key: "usuario", label: "Usuario", render: (usuario) => usuario?.nombre},
                    { key: "libro", label: "Libro", render: (libro) => libro?.nombre},
                    { key: "fechaReserva", label: "Fecha de Reserva"},
                    { key: "fechaDevolucion", label: "Fecha de Devolución", 
                        render: (_, row) => {
                            // row es toda la reserva
                            if(row.fechaDevolucion) {
                                return <span className="text-green-600 font-semibold">{row.fechaDevolucion}</span>;
                            }

                            const nowTime = new Date();
                            const limite = row.fechaLimite ? new Date(row.fechaLimite) : null;

                            if(limite && nowTime > limite) {
                                return <span className="text-red-600 font-semibold">Atrasado</span>;
                            }

                            return <span className="text-yellow-600 font-semibold">Ocupado</span>;
                        },
                    },
                ]}
                data={reservas}
                actions={[
                    {
                        label: "Editar",
                        className: "bg-yellow-500 text-white hover:bg-yellow-600",
                        onClick: openEditar,
                    },
                    
                    {
                        label: "Devolver",
                        className: "bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700",
                        onClick: (row) => handleDevolver(row.id),
                        show: (row) => !row.fechaDevolucion
                    }
                ]}
                filterConfig={[
                    {key: "usuario", label: "Usuario", type: "text"},
                    {key: "libro", label: "Libro", type: "text"},
                    {key: "fechaReserva", label: "Fecha", type: "text"},
                    {key: "estado", label: "Estado", type: "select", options: [
                        { value: "devuelto", label: "Devuelto"},
                        { value: "ocupado", label: "Ocupado"},
                        { value: "atrasado", label: "Atrasado"}
                    ]}
                ]}
            />


            <ReservaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                reserva={reservaEdit}
            />
        </div>
    );
}
