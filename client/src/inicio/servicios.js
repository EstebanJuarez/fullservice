import Popup from "./popup";

const ServiciosSection = () => {
    return (
        <section className="bg-cyan-700 py-32 mt-24 ">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-8">Nuestros Servicios</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
                    <li className="flex flex-col items-center p-6 bg-cyan-800 rounded-lg shadow-lg">
                        <span className="text-4xl font-bold mb-2">01</span>
                        <span className="text-xl mb-4">Instalación</span>
                        <Popup type="installation" />
                    </li>
                    <li className="flex flex-col items-center p-6 bg-cyan-800 rounded-lg shadow-lg">
                        <span className="text-4xl font-bold mb-2">02</span>
                        <span className="text-xl mb-4">Mantenimiento</span>
                        <Popup type="maintenance" />
                    </li>
                    <li className="flex flex-col items-center p-6 bg-cyan-800 rounded-lg shadow-lg">
                        <span className="text-4xl font-bold mb-2">03</span>
                        <span className="text-xl mb-4">Reparaciones</span>
                        <Popup type="repair" />
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default ServiciosSection;
