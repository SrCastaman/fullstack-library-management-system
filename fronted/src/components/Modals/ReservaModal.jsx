import ReservaForm from "../Forms/ReservaForm";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

export default function ReservaModal({ isOpen, onClose, onSave, reserva }) {
    const { api } = useAuth();
    const { showAlert } = useAlert();
    
    if (!isOpen) return null;

    const handleSubmit = async (formData) => {
        try {
            if (reserva) {
                await api.patch(`/reservas/${reserva.id}`, formData);
                showAlert("success", "Reserva actualizada", "La reserva ha sido actualizada con éxito");
            } else {
                await api.post("/reservas", formData);
                showAlert("success", "Reserva creada", "La reserva se ha creado con éxito");
            }
            onSave?.();
            onClose();
        } catch (err) {
            console.error(err);
            showAlert("error", "Error reserva", "Ha habido un error al guardar la reserva");
        }
    };

    const initialDataParsed = reserva ? {
        ...reserva,
        fechaReserva: reserva.fechaReserva?.slice(0, 16), 
        fechaDevolucion: reserva.fechaDevolucion?.slice(0, 16),
    } : null;


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">
                    {reserva ? "Editar Reserva" : "Crear Reserva"}
                </h2>

                <ReservaForm initialData={initialDataParsed} onSubmit={handleSubmit} />

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
