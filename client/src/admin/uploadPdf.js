import React, { useState } from "react";
import axios from "axios";

const UploadPDF = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Por favor, seleccione un archivo PDF válido.");
      setPdfFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );

      alert("Productos cargados correctamente");
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Hubo un error al cargar el PDF.";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={!pdfFile}>Cargar PDF</button>
    </form>
  );
};

export default UploadPDF;
