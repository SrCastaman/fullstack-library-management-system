import { createContext, useContext, useState } from 'react';
import AlertModal from '../components/UI/AlertModal';

const AlertContext = createContext();

export function AlertProvider({ children }) {
    const [alertData, setAlertData] = useState({
        isOpen: false,
        type: "info",
        title: "",
        message: ""
    });

    const showAlert = (type, title, message) => {
        setAlertData({ isOpen: true, type, title, message });
    };

    const closeAlert = () => {
        setAlertData((prev) => ({ ...prev, isOpen: false}));
    };


    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <AlertModal
                isOpen={alertData.isOpen}
                type={alertData.type}
                title={alertData.title}
                message={alertData.message}
                onClose={closeAlert}
            />
        </AlertContext.Provider>
    );
}

export const useAlert = () => useContext(AlertContext);