import React from 'react';

export default function AlertModal({ isOpen, type = "info", title, message, onClose}) {
    if(!isOpen) return null;

    const styles = {
        success: "bg-green-100 text-green-700 border-green-400",
        error: "bg-red-100 text-red-700 border-red-400",
        info: "bg-blue-100 text-blue-700 border-blue-400",
        warning: "bg-yellow-100 text-yellow-700 border-yellow-400"
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50'>
            <div className={`rouneded-lg shadow-lg p-6 w-96 border ${styles[type]}`}>
                <h2 className='text-lg font-bold mb-2'>{title}</h2>
                <p className='mb-4'>{message}</p>

                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className='px-4 py-2 bg-white rounded hover:bg-gray-100'
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}