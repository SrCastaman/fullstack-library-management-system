import React, { useState } from "react";
import UsuarioModal from "../components/Modals/UsuarioModal";
import { useAuth } from "../context/AuthContext";
import TableFilters from "../components/UI/TableFilters";
import { useAxios } from "../hooks/useAxios";


export default function Usuarios() {
    const { api } = useAuth(); 

    const { data: usuarios, loading, error, setData} = useAxios("/usuarios");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioEdit, setUsuarioEdit] = useState(null);

    const handleSave = async () => {
        try{
            const res = await api.get("/usuarios");
            setData(res.data);
        } catch (err) {
            console.error("Error al cargar ususarios: ", err);
        }
    };

    const openCrear = () => {
        setUsuarioEdit(null);
        setIsModalOpen(true);
    };

    const openEditar = (usuario) => {
        setUsuarioEdit(usuario);
        setIsModalOpen(true);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

            <button
                onClick={openCrear}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Añadir Usuario
            </button>

            <TableFilters
                columns={[
                    { key: "id", label: "ID"},
                    { key: "nombre", label: "Nombre"},
                    { key: "email", label: "Email"}
                ]}
                data={usuarios}
                actions={[
                    {
                        label: "Editar",
                        className: "bg-yellow-500 text-white hover:bg-yellow-600",
                        onClick: openEditar,
                    }
                ]}
                filterConfig={[
                    {key: "id", label: "ID", type: "text"},
                    {key: "email", label: "Email", type: "text"},
                ]}
            />

            <UsuarioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                usuario={usuarioEdit}
            />
        </div>
    );
}
