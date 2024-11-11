import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import CompShowHeader from "./header";
import Footer from "./footer";

const localApi = 'http://localhost:5004/';
const URI = `${localApi}productos/productos/`;

function CompShowProductsSection({ categoria }) {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProductId, setExpandedProductId] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get(URI, {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });
        setProductos(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    obtenerProductos();
  }, []);

  const handleContactClick = (producto) => {
    const message = `Hola, estoy interesado en el producto *${producto.descripcion}* con ID: ${producto.id}`;
    window.open(`https://wa.me/5493814474009?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <CompShowHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">{categoria}</h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-white shadow-md rounded-lg p-4">
                {producto.img_productos && producto.img_productos.length > 0 ? (
                  <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    src={`http://localhost:5004/${producto.img_productos[0].ruta}`}
                    alt={producto.img_productos[0].descripcion}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">{producto.descripcion}</h2>
                  <p className="text-lg font-semibold text-green-600">${producto.precio}</p>
                  <motion.ul
                    className="mt-2"
                    initial={{ height: 0 }}
                    animate={{ height: expandedProductId === producto.id ? "auto" : 60 }}
                    transition={{ duration: 0.3 }}
                  >
                    {producto.detalles &&
                      (expandedProductId === producto.id
                        ? producto.detalles.split("@").map((detail, index) => (
                            <li key={index} className="text-sm">
                              {detail}
                            </li>
                          ))
                        : producto.detalles.split("@").slice(0, 3).map((detail, index) => (
                            <li key={index} className="text-sm">
                              {detail}
                            </li>
                          )))}
                  </motion.ul>
                  {producto.detalles &&
                    producto.detalles.split("@").length > 3 && (
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                          setExpandedProductId(
                            expandedProductId === producto.id ? null : producto.id
                          )
                        }
                      >
                        {expandedProductId === producto.id ? "Ver menos" : "Ver más"}
                      </button>
                    )}
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105"
                      onClick={() => handleContactClick(producto)}
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> Contacto
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CompShowProductsSection;
