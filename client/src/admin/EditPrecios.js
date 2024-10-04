import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompEditPrecios = () => {
  const [data, setData] = useState(null);
  const [selectedModel, setSelectedModel] = useState('reparacion'); // 'reparacion' o 'instalacion'
  const [column, setColumn] = useState(null); // Inicializando como null para no seleccionar ninguna columna
  const [value, setValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [selectedModel]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.fullserviceyb.com/servicios/${selectedModel}/precios`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePrecio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://www.fullserviceyb.com/servicios/${selectedModel}/precios`,
        { column, value },
        {
          headers: {
            "x-auth-token": token
          }
        }
      );
      setSuccessMessage('¡Actualización exitosa!');
      setErrorMessage('');
      fetchData(); // Refresca los datos después de actualizar
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Borra el mensaje de éxito después de 3 segundos
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al actualizar precios. Inténtelo de nuevo.');
      setSuccessMessage('');
    }
  };

  const handleColumnChange = (e) => {
    const selectedColumn = e.target.value;
    setColumn(selectedColumn);
    // Asignamos el valor correspondiente de la columna seleccionada
    if (data && data[selectedColumn] !== undefined) {
      setValue(data[selectedColumn].toString());
    } else {
      setValue('');
    }
  };

  // Función para obtener las claves de data sin incluir 'id'
  const getColumnOptions = () => {
    if (!data) return [];
    return Object.keys(data).filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt');
  };

  return (
    <div className="bg-[#0A1B30] min-h-screen flex items-center justify-center p-4">
      <form onSubmit={updatePrecio} className="bg-[#1B2A40] p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-white text-2xl font-bold text-center mb-4">Actualizar Precios</h1>

        <div className="mb-4">
          <label htmlFor="model" className="block text-white text-sm font-semibold">Modelo:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="reparacion">Reparacion</option>
            <option value="instalacion">Instalacion</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="column" className="block text-white text-sm font-semibold">Columna:</label>
          <select
            id="column"
            value={column || ''}
            onChange={handleColumnChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Seleccionar columna</option>
            {data && getColumnOptions().map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="value" className="block text-white text-sm font-semibold">Valor:</label>
          <input
            type="text"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        {successMessage && (
          <div className="bg-green-500 text-white p-2 rounded">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default CompEditPrecios;
