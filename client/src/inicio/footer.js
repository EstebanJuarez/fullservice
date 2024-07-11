import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6 sm:p-8 mt-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-bold mb-4">Redes sociales</h3>
                    <ul>
                        <li className="mb-2">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/fullserviceyb/" className="hover:text-gray-400 flex items-center">
                                <FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram
                            </a>
                        </li>
                        <li className="mb-2">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/people/Full-service-Aire-acondicionado/100064153087676/" className="hover:text-gray-400 flex items-center">
                                <FontAwesomeIcon icon={faFacebook} className="mr-2" /> Facebook
                            </a>
                        </li>
                        <li className="mb-2">
                            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/5493814474009/?text= Hola, vengo de Fullserviceyb.com" className="hover:text-gray-400 flex items-center">
                                <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> Whatsapp
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-bold mb-4">Teléfono</h3>
                    <p className="hover:text-gray-400">+543814474009</p>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-bold mb-4">Correo electrónico</h3>
                    <p className="hover:text-gray-400">Fullserviceyb@gmail.com</p>
                </div>
            </div>
            <div className="mt-8 text-center md:text-right">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Full Service YB. Todos los derechos reservados.</p>
                <p className="text-sm text-gray-500">Hecho por <a className='font-bold' target='_blank' href='https://dicorus.com'>Dicorus</a>.</p>
            </div>
        </footer>
    );
};

export default Footer;
