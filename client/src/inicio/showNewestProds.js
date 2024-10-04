import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

library.add(faChevronRight, faChevronLeft, faSpinner);

const localApi = 'https://www.fullserviceyb.com/';
const URI = `${localApi}productos/lastprods/`;

function useProductos() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hayToken, setHaytoken] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get(URI, {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });
        setProductos(res.data.productos);
        setIsLoading(false);

        if (res.status === 401 && res.data === "Token expired.") {
          localStorage.removeItem("token");
          setHaytoken(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        if (error.response && error.response.status === 401 && error.response.data === "Token expired.") {
          localStorage.removeItem("token");
          setHaytoken(false);
        }
      }
    };

    obtenerProductos();
  }, [hayToken]);

  return { productos, isLoading };
}

function CompShowProductos() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { productos, isLoading } = useProductos();
  const ultimosProductos = productos.slice(-6);

  const handleContactClick = (producto) => {
    const message = `Hola, estoy interesado en el producto *${producto.descripcion}* con ID: ${producto.id}`;
    window.open(`https://wa.me/5493814474009?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <h1 className="text-3xl font-bold text-center mb-8">Nuevos ingresos</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="relatedCarouselContainer">
          {ultimosProductos.length > 0 ? (
            <Slider {...settings} className="relatedCarousel">
              {ultimosProductos.map((producto) => (
                <div className="producto p-4" key={producto.id}>
                  {producto.img_productos && producto.img_productos.length > 0 ? (
                    <img
                      className="w-full h-48 object-contain rounded-lg transition-transform transform hover:scale-105"
                      src={`https://www.fullserviceyb.com/${producto.img_productos[0].ruta}`}
                      alt={producto.img_productos[0].descripcion}
                    />
                  ) : (
                    <span className="block w-full h-48 bg-gray-200 rounded-lg">Sin imagen</span>
                  )}
                  <p className="text-xl font-semibold mt-4">$ {producto.precio}</p>
                  <Link
                    onClick={() => window.scrollTo(0, 200)}
                    to={`/producto/${producto.id}`}
                    className="text-lg text-blue-600 hover:underline"
                  >
                    {producto.descripcion}
                  </Link>
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105"
                      onClick={() => handleContactClick(producto)}
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> Contacto
                    </button>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-500">No hay productos disponibles en este momento.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CompShowProductos;
