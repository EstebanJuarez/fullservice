import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function CompAdminProductos() {

  const URI = 'https://www.fullserviceyb.com/productos/admin/'
  const [productos, setProductos] = useState([]);
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    else {
      getProductos()
    }
  }, []);

  const getProductos = async () => {
    try {
      const res = await axios.get(URI, {
        headers: {
          "x-auth-token": token
        }
      });
      setProductos(res.data.productos);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {

      try {
        await axios.delete(URI + id, {
          headers: {
            "x-auth-token": token
          }
        });
        getProductos()
      } catch (error) {
        console.log(error);
        // mostrar mensaje de error al usuario
      }
    }
  }


  const [searchText, setSearchText] = useState('');
  const filteredProductos = productos.filter((producto) => {
    const descripcionMatches = producto.descripcion.toLowerCase().includes(searchText.toLowerCase());

    return descripcionMatches;
  });



  return (<div className="bg-[#0A1B30] min-h-screen p-4 flex flex-col items-center">
    <div className="w-full max-w-4xl">
      <h2 className="text-white text-2xl font-bold mb-4 text-center">Productos</h2>
      <div className="flex justify-between items-center mb-4">
        <div className='flex flex-col gap-5'>   
           <Link
          to="/admin/createproducto/"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Añadir Producto
        </Link>
          <Link
            to="/admin/editprecios/"
            className="bg-cyan-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-cyan-600 transition duration-200"
          >
           Actualizar precio de servicios
          </Link>
           </div>

        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Buscar"
          className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-white">
          <thead className="bg-[#1B2A40]">
            <tr>
              <th className="px-4 py-2">Código</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-[#1B2A40]">
            {filteredProductos.map(producto => (
              <tr key={producto.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{producto.id}</td>
                <td className="px-4 py-2">{producto.descripcion}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 items-center">
                    <Link to={`/admin/productos/edit/${producto.id}`}>
                      <button className="bg-cyan-300 px-2 py-1 rounded-md text-black hover:bg-cyan-400 hover:text-gray-200 focus:outline-none focus:bg-cyan-400 focus:text-gray-200 transition duration-200">Editar</button>
                    </Link>
                    <button
                      onClick={() => deleteProducto(producto.id)}
                      className="bg-red-500 px-2 py-1 rounded-md text-white hover:bg-red-600 hover:text-gray-200 focus:outline-none focus:bg-red-600 focus:text-gray-200 transition duration-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

export default CompAdminProductos;
