import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FichaTecnicaPopup from './fichaTecnicaPopup';
function CompShowProdCatalogo() {
  const URI = `${process.env.REACT_APP_API_URL}/prodCatalogo/all/`;
  const [productos, setProductos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [aumentoMensual, setAumentoMensual] = useState(5);
  const [cuotasMensuales, setCuotasMensuales] = useState(1);
  const [aumentoSemanal, setAumentoSemanal] = useState(3);
  const [cuotasSemanales, setCuotasSemanales] = useState(1);
  const token = localStorage.getItem("token");
  const [showFichaPopup, setShowFichaPopup] = useState(false); // Estado para controlar el pop-up
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para la ficha técnica
  const [isEditable, setIsEditable] = useState(false); // Controla si el popup es editable
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getProductos();
    }
  }, []);

  const getProductos = async () => {
    try {
      const res = await axios.get(URI, {
        headers: { "x-auth-token": token }
      });
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchText.toLowerCase())
  );
  const updateProduct = (updatedProduct) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === updatedProduct.id ? updatedProduct : producto
      )
    );
  };

  // Cálculos de precios con aumentos
  const calcularPrecioMensual = (costo) => costo * (1 + aumentoMensual / 100);
  const calcularPrecioSemanal = (costo) => costo * (1 + aumentoSemanal / 100);
  const calcularCuotasMensuales = (costo) => calcularPrecioMensual(costo) / cuotasMensuales;
  const calcularCuotasSemanales = (costo) => calcularPrecioSemanal(costo) / cuotasSemanales;
  const calcularPrecioConAumento15 = (costo) => costo * 1.15;
  const openFichaPopup = (producto, editable = true) => {
    setSelectedProduct(producto);
    setIsEditable(editable); // Ahora editable es controlado correctamente
    setShowFichaPopup(true);
  };

  return (
    <div className="bg-[#0A1B30] min-h-screen p-4 flex flex-col items-center">
      {showFichaPopup && (
        <FichaTecnicaPopup
          producto={selectedProduct}
          editable={isEditable}
          onClose={() => setShowFichaPopup(false)}
          onUpdate={updateProduct} // Añadir esta función como prop

        />
      )}
      <div className="w-full max-w-5xl">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">Productos</h2>

        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <Link to="/admin/createproducto/" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200 mb-4 md:mb-0">
            Añadir Producto
          </Link>
          <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Buscar producto" className="w-full md:max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
        </div>

        {/* Configuración de Precios y Cuotas */}
        <div className="bg-[#1B2A40] p-4 rounded-lg shadow-md mb-4 w-full text-white">
          <h3 className="text-lg font-semibold mb-4">Configuración de Precios y Cuotas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="aumentoMensual" className="block mb-1 font-medium">Aumento Mensual (%)</label>
              <input
                id="aumentoMensual"
                type="number"
                value={aumentoMensual}
                onChange={e => setAumentoMensual(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-black rounded-md focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="cuotasMensuales" className="block mt-2 mb-1 font-medium">Cuotas Mensuales</label>
              <input
                id="cuotasMensuales"
                type="number"
                value={cuotasMensuales}
                onChange={e => setCuotasMensuales(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-black rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="aumentoSemanal" className="block mb-1 font-medium">Aumento Semanal (%)</label>
              <input
                id="aumentoSemanal"
                type="number"
                value={aumentoSemanal}
                onChange={e => setAumentoSemanal(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-black rounded-md focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="cuotasSemanales" className="block mt-2 mb-1 font-medium">Cuotas Semanales</label>
              <input
                id="cuotasSemanales"
                type="number"
                value={cuotasSemanales}
                onChange={e => setCuotasSemanales(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-black rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProductos.map((producto) => (
            <div key={producto.id} className="bg-[#1B2A40] p-4 rounded-lg shadow-md text-white">
              <h4 className="font-semibold mb-2">{producto.nombre}</h4>

              <div className="mt-4 space-y-2">
                <div className="bg-[#2D3B50] rounded-md p-2 text-sm">
                  <strong>Costo:</strong> ${producto.costo.toLocaleString()}
                </div>
                <div className="bg-[#3B4D70] rounded-md p-2 text-sm">
                  <strong>Precio + 15%:</strong> ${calcularPrecioConAumento15(producto.costo).toLocaleString()}
                </div>
                <div className="bg-[#465A7E] rounded-md p-2 text-sm">
                  <strong>Precio Mensual:</strong> ${calcularPrecioMensual(producto.costo).toLocaleString()}
                </div>
                <div className="bg-[#5C6F90] rounded-md p-2 text-sm">
                  <strong>Precio Semanal:</strong> ${calcularPrecioSemanal(producto.costo).toLocaleString()}
                </div>
                <div className="bg-[#7089A3] rounded-md p-2 text-sm">
                  <strong>Cuota Mensual:</strong> ${calcularCuotasMensuales(producto.costo).toLocaleString()}
                </div>
                <div className="bg-[#8399B0] rounded-md p-2 text-sm">
                  <strong>Cuota Semanal:</strong> ${calcularCuotasSemanales(producto.costo).toLocaleString()}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  className="bg-cyan-300 px-2 py-1 rounded-md text-black hover:bg-cyan-400 transition duration-200"
                  onClick={() => openFichaPopup(producto, true)} // Editable
                >
                  Añadir detalles
                </button>
                <button
                  className="bg-gray-300 px-2 py-1 rounded-md text-black hover:bg-gray-400 transition duration-200"
                  onClick={() => openFichaPopup(producto, false)} // Solo lectura
                >
                  Ver detalles
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompShowProdCatalogo;
