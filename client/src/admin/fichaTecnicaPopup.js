import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function FichaTecnicaPopup({ producto, onClose, editable , onUpdate}) {
    const URI = `${process.env.REACT_APP_API_URL}/prodCatalogo/update/${producto.id}`;
    const token = localStorage.getItem("token");

    const [ficha_tecnica, setFicha_tecnica] = useState(producto.ficha_tecnica || '');
    const [img_url, setImgUrl] = useState(producto.img_url || '');

    const handleSubmit = async () => {
        try {
            const res = await axios.put(
                URI,
                { ficha_tecnica, img_url },
                { headers: { "x-auth-token": token } }
            );
            if (res.status === 200) {
                alert("Ficha técnica actualizada exitosamente");
                onUpdate({ ...producto, ficha_tecnica, img_url }); // Actualiza el producto en el componente principal
                onClose();
            }
        } catch (error) {
            console.error("Error al actualizar la ficha técnica:", error);
            alert("Ocurrió un error al actualizar la ficha técnica.");
        }
    };


    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <button
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                >
                    X
                </button>

                <h3 className="text-lg font-semibold mb-4 text-center">
                    Ficha Técnica de {producto.nombre}
                </h3>

                <div className="space-y-2">
                    <label className="block mb-1 font-medium">
                        <strong>Ficha técnica:</strong>
                    </label>
                    <textarea
                        value={ficha_tecnica}
                        onChange={(e) => setFicha_tecnica(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black"
                        placeholder="Ficha técnica del producto"
                        readOnly={!editable} // Bloquea el campo si no es editable
                    />

                    <div className="mt-2">
                        <img
                            src={img_url}
                            alt="Imagen del producto"
                            className="w-full h-auto rounded-md"
                        />
                    </div>

                    <input
                        value={img_url}
                        onChange={(e) => setImgUrl(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-black"
                        placeholder="Añadir URL de la imagen"
                        readOnly={!editable} // Bloquea el campo si no es editable
                        accept="image/*"
                    />
                </div>

                {editable && (
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Guardar
                        </button>
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Cerrar
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default FichaTecnicaPopup;
