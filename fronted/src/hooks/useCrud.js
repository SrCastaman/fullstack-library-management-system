import api from "../api/axios";

export function useCrud(endpoint, setData) {
    

    const updateItem = async (id, data) => {
        const res = await api.patch(`${endpoint}/${id}`, data);
        setData((prev) => prev.map((item) => (item.id === id ? res.data : item)));
    };

    return { updateItem };
}