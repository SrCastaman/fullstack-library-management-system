import React from "react";
import { useAxios } from "../hooks/useAxios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LibroModal from "../components/Modals/LibroModal";
import TableFilters from "../components/UI/TableFilters";



export default function Libros(){
    const { api } = useAuth();
    const { data: libros, loading, error, setData } = useAxios("/libros");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [libroEdit, setLibroEdit] = useState(null);


    const handleSave = async () => {
        try{
            const res = await api.get("/libros");
            setData(res.data);
        } catch (err) {
            console.error("Error al cargar libros: ", err);
        }
    };

    const openCrear = () => {
        setLibroEdit(null);
        setIsModalOpen(true);
    };

    const openEditar = (libro) => {
        setLibroEdit(libro);
        setIsModalOpen(true);
    }
 
    

    if (loading) return <p className="p-4">Cargando...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Libros</h1>

            <button
                onClick={openCrear}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Añadir Libro
            </button>


            <TableFilters
                columns={[
                    { key: "id", label: "ID"},
                    { key: "nombre", label:"Nombre"},
                    { key: "autor", label: "Autor", render: (autor) => autor?.nombre || "-"},
                    { key: "categoria", label: "Categoria"},
                    { key: "disponible", label: "Disponible", sortable: false, render: (disp) => (<span className={`px-2 py-1 rounded text-white text-xs ${disp ? "bg-green-500" : "bg-red-500"}`}>{disp ? "Disponible" : "Ocupado"}</span>) }
                ]}
                data={libros}
                actions={[
                    {
                        label: "Editar",
                        className: "bg-yellow-500 text-white hover:bg-yellow-600",
                        onClick: openEditar,
                    }
                ]}
                filterConfig={[
                    {key: "nombre", label: "Nombre", type: "text"},
                    {key: "autor", label: "Autor", type: "text"},
                    {key: "categoria", label: "Categoria", type: "select", options: [...new Set(libros.map(libro => libro.categoria).filter(Boolean))].map(c => ({value: c, label: c}))},
                    {key: "disponible", label: "Disponible", type: "boolean"}
                ]}
        
            />


            <LibroModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                libro={libroEdit}
            />
        </div>
    )
}