import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAxios } from '../../hooks/useAxios';
import { useAlert } from '../../context/AlertContext';

export default function LibroForm({ initialData, onSubmit }){
    const { api } = useAuth();
    const { data: libros } = useAxios("/libros");
    const { data: autores, loading: loadingAutores } = useAxios("/autores");

    const [nombreLibro, setNombreLibro] = useState("");
    const [autorId, setAutorId] = useState("");
    const [nuevoAutor, setNuevoAutor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [nuevaCategoria, setNuevaCategoria] = useState("");
    const [disponible, setDisponible] = useState(true);

    const categoriasExistentes = [...new Set(libros?.map((l) => l.categoria).filter(Boolean))];

    const { showAlert } = useAlert();

    
    useEffect(() => {
        if(initialData) {
            setNombreLibro(initialData.nombre || "");
            setAutorId(initialData.autor?.id || "");
            setNuevoAutor("");
            setCategoria(initialData.categoria || "");
            setNuevaCategoria("");
            setDisponible(initialData.disponible ?? true);
        } else {
            setNombreLibro("");
            setAutorId("");
            setNuevoAutor("");
            setCategoria("");
            setNuevaCategoria("");
            setDisponible(true);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let autorParaUsar = autorId || initialData?.autor?.id;

            if(nuevoAutor.trim() !==""){
                const resAutor = await api.post("/autores", { nombre: nuevoAutor });
                autorParaUsar = resAutor.data.id;
            }

            autorParaUsar = Number(autorParaUsar);
            
            await onSubmit({
                nombre: nombreLibro,
                autor: { id: autorParaUsar },
                categoria: nuevaCategoria.trim() !== "" ? nuevaCategoria.trim() : categoria,
                disponible,
            });
        } catch (err){
            showAlert("error", "Error al crear libro", "Ha ocurrido un error al intentar guardar el libro");
        }
    }
    



    return (
        <div className="mt-6 p-4 border rounded bg-gray-50" >
            

            <form onSubmit={handleSubmit} className='space-y-4'>

                <div>
                    <label className='font-bold'>Nombre</label>
                    <input
                        type="text"
                        placeholder='Nombre del libro'
                        value={nombreLibro}
                        onChange={(e) => setNombreLibro(e.target.value)}
                        className='border px-3 py-2 w-full rounded'
                        required
                    />

                </div>

                <div>
                    <label className='font-bold'>Autor</label>
                    <select value={autorId} onChange={(e) => setAutorId(e.target.value)} className='border px-3 py-2 w-full rounded' disabled={nuevoAutor.trim() !== ""}>
                        <option value="">--Selecciona un autor--</option>
                        {!loadingAutores && 
                            autores?.map((a) => (
                                <option key={a.id} value={a.id}>{a.nombre}</option>
                            ))}
                    </select>

                    <div className='text-center text-gray-500'>o</div>

                    <input
                        type="text"
                        placeholder="Nuevo autor"
                        value={nuevoAutor}
                        onChange={(e) => setNuevoAutor(e.target.value)}
                        className='border px-3 py-2 w-full rounded'
                        disabled={autorId !== "" }
                    
                    />
                    
                </div>

                <div>
                    <label className='font-bold'>Categoría</label>
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className='border px-3 py-2 w-full rounded' disabled={nuevaCategoria.trim() !== ""}>
                            <option value="">--Selecciona categoría--</option>
                            {categoriasExistentes.map((cat, i) => (
                                <option key={i} value={cat}>
                                    {cat}
                                </option>
                            ))}
                    </select>

                    <div className='text-center text-gray-500'>o</div>

                    <input
                        type="text"
                        placeholder="Nueva Categoría"
                        value={nuevaCategoria}
                        onChange={(e) => setNuevaCategoria(e.target.value)}
                        className='border px-3 py-2 w-full rounded'
                        disabled={categoria !== ""}                    
                    />
                </div>


                {initialData && (
                    <div className='flex items-center space-x-2'>
                        <input
                            type="checkbox"
                            id="disponible"
                            checked={disponible}
                            onChange={(e) => setDisponible(e.target.checked)}
                        />
                        <label htmlFor='disponible'>Disponible</label>

                    </div>
                )}


                <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full'>
                    {initialData ? "Actualizar libro" : "Guardar Libro"}
                </button>
            </form>
        </div>
    )
}