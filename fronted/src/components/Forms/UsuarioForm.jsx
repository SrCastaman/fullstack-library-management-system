import { useState, useEffect } from 'react';


export default function UsuarioForm({ initialData, onSubmit}) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if(initialData) {
            setNombre(initialData.nombre || "");
            setEmail(initialData.email || "");
        } else {
            setNombre("");
            setEmail("");
        }
    }, [initialData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ nombre, email});
    };


    return (
        <div className='mt-6 p-4 border rounded bg-gray-50'>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    type='text'
                    placeholder='Nombre del usuario'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className='border px-3 py-2 w-full rounded'
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border px-3 py-2 w-full rounded'
                    required
                />

                <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full'>
                    {initialData ? "Actualizar Usuario" : "Guardar Usuario"}
                </button>

            </form>

        </div>
    )
}