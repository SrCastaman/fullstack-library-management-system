import LibroForm from "../Forms/LibroForm";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

export default function LibroModal({ isOpen, onClose, onSave, libro}) {
    const { api } = useAuth();
    const { showAlert } = useAlert();

    if(!isOpen) return null;

    const handleSubmit = async (formData) => {
        try {
            if (libro) {
                await api.patch(`/libros/${libro.id}`, formData);
                showAlert("success", "Libro actualizado", "El libro ha sido actualizado con éxito");

            } else {
                await api.post("libros", formData);
                showAlert("success", "Libro creado", "El libro se ha creado con éxito");
            }
            onSave?.();
            onClose();
        } catch (err) {
            showAlert("error", "Error libro", "Ha habido un error al guardar el libro");
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4"> {libro ? "Editar Libro" : "Añadir Libro"} </h2>

                <LibroForm initialData={libro} onSubmit={handleSubmit} />

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
    );
}