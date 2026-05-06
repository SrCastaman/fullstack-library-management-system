import UsuarioForm from "../Forms/UsuarioForm";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";


export default function UsuarioModal({ isOpen, onClose, onSave, usuario }) {
    const { api } = useAuth();
    const { showAlert } = useAlert();
    if(!isOpen) return null;

    const handleSubmit = async (formData) => {
        try{
            if(usuario) {
                await api.patch(`/usuarios/${usuario.id}`, formData);
                showAlert("success", "Usuario actualizado", "El usuario ha sido actualizado con éxito");
            } else {
                await api.post("/usuarios", formData);
                showAlert("success", "Usuario creado", "El usuario se ha creado con éxito");
            }
            onSave?.();
            onClose();
        } catch (err) {
            console.error("Error en handleSubmit:", err);
            showAlert("error", "Error usuario", "Ha habido un error al guardar el usuario");
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 <-50">
            <div className="bg-white rounde-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">
                    {usuario ? "Editar usuario" : "Crear usuario"}
                </h2>

                <UsuarioForm initialData={usuario} onSubmit={handleSubmit}/>

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    )

}