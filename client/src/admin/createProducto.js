import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import Resizer from 'react-image-file-resizer';

import axios from "axios";

function CompCreateProducto() {
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const [detalles, setDetalles] = useState("");
    const [imagenes, setImagenes] = useState([]);

    const [calidad, setCalidad] = useState(75);

    const token = localStorage.getItem("token")



    const qualityOptions = [
        { value: '75', label: 'Media', },
        { value: '86', label: 'Media-alta', },
        { value: '100', label: 'Alta', },

    ];


    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate("/login")
        }

    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("stock", stock);
        formData.append("detalles", detalles);

        try {
            // Compress all images asynchronously and wait for all to complete
            const compressedImages = await Promise.all(
                imagenes.map((imagen) => compressImage(imagen, calidad))
            );

            // Append the compressed images to the formData
            compressedImages.forEach((compressedImage) => {
                console.log(compressImage);
                formData.append("imagenes", compressedImage);
            });

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/productos/`, formData, {
                headers: {
                    "x-auth-token": token,
                },
            });
            console.log(res.data);

            alert("Producto creado exitosamente");
            navigate('/admin');
        } catch (error) {
            console.log(error);
            alert("Error al crear el producto");
        }

    };


    const compressImage = async (originalImage, quality) => {
        console.log(originalImage);
        return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
                originalImage,
                1500,
                1500,
                'webp',
                quality,
                0,
                (compressedImage) => {
                    console.log(compressImage);
                    resolve(compressedImage);
                },
                'blob',
                1000,
                1000

            );

        });
    }
    const handleImagenesChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenes(files);
    };



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
        <form onSubmit={handleSubmit} className="bg-[#1B2A40] p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <h1 className="text-white text-2xl font-bold text-center mb-4">Crear Producto</h1>
      
          <label htmlFor="descripcion" className="block text-white text-sm font-semibold">
            Titulo:
          </label>
          <textarea
            id="descripcion"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
      
          <label htmlFor="detalles" className="block text-white text-sm font-semibold">
            Detalles:
          </label>
          <textarea
            id="detalles"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}
            required
            onKeyDown={handleKeyDown}
          />
      
          <label htmlFor="precio" className="block text-white text-sm font-semibold">
            Precio:
          </label>
          <input
            id="precio"
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
      
          <label htmlFor="stock" className="block text-white text-sm font-semibold">
            Stock:
          </label>
          <input
            id="stock"
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
      
          <hr className="border-gray-600 my-4" />
      
          <label htmlFor="imagenes" className="block text-white text-sm font-semibold">
            Imágenes:
          </label>
          <input
            id="imagenes"
            className="w-full p-2 rounded bg-gray-700 text-white mt-1"
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={handleImagenesChange}
            multiple
            required
          />
      
          <label htmlFor="calidad" className="block text-white text-sm font-semibold">
            Calidad:
          </label>
          <Select
            id="calidad"
            className="mt-1"
            placeholder={"Media"}
            options={qualityOptions}
            onChange={(option) => {
              setCalidad(option.value);
              console.log(option);
            }}
          />
      
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded mt-4 transition duration-200" type="submit">
            Crear producto
          </button>
        </form>
      </div>
      

    );
}
export default CompCreateProducto;
