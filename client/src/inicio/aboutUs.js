import React from 'react';

const AboutUs = () => {
    return (
        <div id='sobre-nosotros' className='flex flex-col'>
            <div className="max-w-6xl mx-auto p-4 sm:p-8 flex flex-col lg:flex-row gap-8 mt-24 ">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl sm:text-3xl font-bold mb-4 text-gray-800 ">¿Quiénes somos?</h2>
                    <p className="text-gray-700 mb-4 text-lg">
                        Somos Full Service Yerba Buena, una empresa especializada en la instalación y mantenimiento de diferentes modelos y marcas de Aires acondicionados.
                    </p>
                </div>
                <div className="lg:w-1/2">
                    <h3 className="text-3xl sm:text-3xl font-bold mb-4 text-gray-800 ">Nuestros trabajos</h3>
                    <p className="text-gray-700 mb-6 text-lg">
                        Desde el inicio brindamos un servicio totalmente confiable y profesional a nuestros clientes, generando la mayor satisfacción para usted y su familia.
                    </p>

                </div>


            </div>
            
            <div className="grid grid-cols-1  gap-8 px-12  md:grid-cols-3 lg:grid-cols-3">
                    <div className="sm:col-span-3 lg:col-span-1">
                        <img src="img.webp" alt="Trabajo 1" className="w-full h-auto rounded-lg shadow-md mb-4 sm:mb-0" />
                    </div>
                    <div className="sm:col-span-3 lg:col-span-1">
                        <img src="img1.webp" alt="Trabajo 2" className="w-full h-auto rounded-lg shadow-md mb-4 sm:mb-0" />
                    </div>
                    <div className="sm:col-span-3 lg:col-span-1">
                        <img src="img2.webp" alt="Trabajo 3" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                </div>
        </div>
    );
};

export default AboutUs;
