import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';

library.add(faTrash)


const URI = `${process.env.REACT_APP_API_URL}/productos/admin/`;

function CompEditProducto() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const [descripcion, setDescripcion] = useState([])
    const [precio, setPrecio] = useState([])
    const [stock, setStock] = useState([])
    const [imagenes, setImagenes] = useState([])
    const [newimagenes, newsetImagenes] = useState([])
    const { id } = useParams()
    const [detalles, setDetalles] = useState("");


    useEffect(() => {
        if (!token) {
            navigate("/login")
        }

    }, []);

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("stock", stock);
        formData.append("detalles", detalles);

        for (let i = 0; i < newimagenes.length; i++) {
            formData.append("imagenes", newimagenes[i]);
        }
        try {

            await axios.put(URI + id, formData,
                {
                    headers: {
                        "x-auth-token": token
                    }
                });

            navigate('/admin/productos');
        } catch (error) {
            console.log(error);
        }
    };

    const handleImagenesChange = (e) => {
        const files = Array.from(e.target.files);
        newsetImagenes(files);
        console.log(newimagenes);
    };

    const getProducto = async () => {
        try {
            const res = await axios.get(URI + id, {
                headers: {
                    "x-auth-token": token
                }
            },)
            setDescripcion(res.data.producto.descripcion)
            setPrecio(res.data.producto.precio)
            setStock(res.data.producto.stock)


            setImagenes(res.data.producto.img_productos)
            setDetalles(res.data.producto.detalles)

        } catch (error) {
            console.log(error);
        }

    }


    const delteImg = async (id) => {
        console.log(id);
        if (window.confirm("¿Estás seguro de eliminar esta imagen?")) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/productos/imagen/` + id, {
                    headers: {
                        "x-auth-token": token
                    }
                },)

                getProducto()
            } catch (error) {
                console.error(error);
                if (error.response.status === 401 && error.response.data === "Token expired.") {
                    localStorage.removeItem("token");
                    console.log(localStorage.getItem("token"));
                }
            }


        }
    }
    useEffect(() => {

        if (!token) {
            navigate("/login")
        } else {
            getProducto();
        }
    }, [])

    const handleKeyDown = (e) => {
        const { selectionStart, value } = e.target;
        if (e.key === "Enter") {
            e.preventDefault();
            e.target.value =
                value.substring(0, selectionStart) +
                "@" +
                "\n" +
                value.substring(selectionStart, value.length);
            e.target.selectionStart = selectionStart + 2;
            e.target.selectionEnd = selectionStart + 2;
        }
    }








    return (
        <div className="bg-[#0A1B30] min-h-screen flex items-center justify-center p-4">
            <form onSubmit={update} className="bg-[#1B2A40] p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <h1 className="text-white text-2xl font-bold text-center mb-4">Actualizar Producto</h1>

                <label htmlFor="id" className="block text-white text-sm font-semibold">ID:</label>
                <input type="text" name="id" id="id" value={id} readOnly className="w-full p-2 rounded bg-gray-700 text-white" />

                <label htmlFor="descripcion" className="block text-white text-sm font-semibold">Descripción:</label>
                <input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <label htmlFor="detalles" className="block text-white text-sm font-semibold">Detalles:</label>
                <textarea
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    type="text"
                    min="0"
                    value={detalles}
                    onChange={(e) => setDetalles(e.target.value)}
                    required
                    onKeyDown={handleKeyDown}
                />

                <label htmlFor="Precio" className="block text-white text-sm font-semibold">Precio:</label>
                <input
                    type="text"
                    name="Precio"
                    id="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white"
                />

                <div className="space-y-4">
                    {imagenes && imagenes.length > 0 && imagenes.map((imagen, index) => (
                        <div key={index} className="relative">
                            <FontAwesomeIcon
                                className='absolute top-0 right-0 text-red-500 cursor-pointer'
                                onClick={() => delteImg(imagen.id)}
                                icon="fa-solid fa-trash"
                            />
                            <div className="mt-2">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/${imagen.ruta}`}
                                    alt={`Imagen ${index + 1} del producto`}
                                    className="w-full h-auto rounded"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <input
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={handleImagenesChange}
                    multiple
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Actualizar
                </button>
            </form>
        </div>

    );
}

export default CompEditProducto;
