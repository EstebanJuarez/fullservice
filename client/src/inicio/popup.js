import { useState } from 'react';
import { motion } from 'framer-motion';

const Popup = ({ type }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };


    const content = {
        installation: (
            <>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Detalles de Instalación</h3>
                <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">Incluye:</h4>
                    <ul className="list-disc pl-4">
                        <li>Equipos hasta 3000 frigorías todo incluido 2 metros de caños y ménsulas $110.000</li>
                        <li>Equipos hasta 4500 frigorías todo incluido 2 metros de caños y ménsulas $125.000</li>
                        <li>Equipos hasta 6000 frigorías todo incluido 2 metros de caños y ménsulas $135.000</li>
                        <li>Si la instalación excede los 2 metros de caños, se aplican costos adicionales.</li>
                    </ul>
                </section>
                <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">Adicionales:</h4>
                    <ul className="list-disc pl-4">
                        <li>Trabajo en altura o al vacío $10.000</li>
                        <li>Pase de viga $8.000</li>
                        <li>Entregamos garantía escrita por 12 meses por Técnico Matriculado</li>
                    </ul>
                </section>
                <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">No Incluye:</h4>
                    <p className="mb-2">No incluye instalación de tomacorrientes (precio a convenir).</p>
                </section>
                <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700">Información Adicional:</h4>
                    <p>Trabajamos con herramientas de última generación, bomba de vacío, nitrógeno, detector de fugas electrónico, etc. Instalaciones prolijas y seguras. Entregamos informe de instalación con matrícula y garantía de 12 meses.</p>
                </section>
            </>
        ),
        maintenance: (
            <>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Detalles de Mantenimiento</h3>
                <section className="mb-4">
                    <p>El mantenimiento del aire acondicionado es importante para evitar problemas como el aumento del consumo eléctrico,
                        la incrustación de suciedad en la unidad interior, la obstrucción de la circulación de aire y
                        la expulsión de partículas perjudiciales para la salud. El mantenimiento frecuente y profesional
                        mejora la eficiencia energética y aumenta la vida útil del equipo, además de prevenir malos olores,
                        vibraciones y ruidos molestos. También se recomienda limpiar los filtros cada semana y realizar un mantenimiento completo cada 3 meses.</p>
                </section>
            </>
        ),
        repair: (
            <>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Detalles de Reparación</h3>
                <section className="mb-4">
                    <p>El precio de una reparación puede variar, para tener una idea:</p>
                    <ul className="list-disc pl-4 mb-4 text-left">
                        <li>Si es algo eléctrico entre $30.000 hasta $40.000</li>
                        <li>Las pérdidas de gas se verifican con nitrógeno, puede ser pérdidas en las tuercas o una pinchadura en alguna parte del circuito</li>
                        <li>El presupuesto del arreglo varía en función de lo que se encuentre. Los trabajos tienen garantía.</li>
                    </ul>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Reparación</th>
                                    <th className="px-4 py-2 border">Gas refrigerante</th>
                                    <th className="px-4 py-2 border">Nitrógeno</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">Carga de gas hasta 3000Frig</td>
                                    <td className="border px-4 py-2">$42.000</td>
                                    <td className="border px-4 py-2">$32.000</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Carga de gas hasta 4500Frig</td>
                                    <td className="border px-4 py-2">$48.000</td>
                                    <td className="border px-4 py-2">$32.000</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-2">Carga de gas hasta 6000Frig</td>
                                    <td className="border px-4 py-2">$53.000</td>
                                    <td className="border px-4 py-2">$45.000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </>
        ),

    };
    return (
        <div className="relative">
            <a href="#" onClick={toggleMenu} className="block text-center py-2 px-4 bg-blue-500 text-white rounded-lg shadow-lg font-semibold text-sm sm:text-base">
                Más info
            </a>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto bg-gray-900 bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white p-6 shadow-lg rounded-lg max-w-lg mx-auto text-black m-4 sm:m-8"
                    >
                        <button
                            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={toggleMenu}
                            aria-label="Cerrar"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {content[type]}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Popup;
