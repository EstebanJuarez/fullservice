import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const CompShowHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Función para manejar el scroll suave
    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Variante de animación para el menú desplegable
    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <header className="bg-gray-100 shadow-md">
            <div className="container mx-auto px-4 lg:px-28 py-2 flex items-center justify-between">
                <Link to="/">
                    <img className="w-52" src="/Logoancho.png" alt="Logo" />
                </Link>

                {/* Hamburger Button - Mobile */}
                <button
                    className="lg:hidden text-gray-700 hover:text-cyan-500 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>

                {/* Menu Links - Desktop */}
                <nav className="hidden lg:flex space-x-4 text-lg">
                    <Link to="/" className="text-gray-700 hover:text-cyan-500">Inicio</Link>
                    <a target="_blank" href="https://wa.me/5493814474009/?text= Hola, vengo de Fullserviceyb.com" className="text-gray-700 hover:text-cyan-500" onClick={() => scrollToElement('contacto')}>
                        Contacto
                    </a>
                    <Link to="/productos" className="text-gray-700 hover:text-cyan-500">Productos</Link>
                    <a href="/#sobre-nosotros" className="text-gray-700 hover:text-cyan-500" onClick={() => scrollToElement('sobre-nosotros')}>
                        Sobre nosotros
                    </a>
                </nav>

                {/* Animated Menu - Mobile */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute top-16 right-4 lg:hidden bg-white shadow-md rounded-md p-4 z-10"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            <ul className="flex flex-col space-y-2">
                                <li>
                                    <Link to="/" className="text-gray-700 hover:text-cyan-500" onClick={toggleMenu}>
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <a target="_blank" href="https://wa.me/5493814474009/?text= Hola, vengo de Fullserviceyb.com" className="text-gray-700 hover:text-cyan-500" onClick={() => { toggleMenu(); scrollToElement('contacto'); }}>
                                        Contacto
                                    </a>
                                </li>
                                <li>
                                    <Link to="/productos" className="text-gray-700 hover:text-cyan-500" onClick={toggleMenu}>
                                        Productos
                                    </Link>
                                </li>
                                <li>
                                    <a href="/#sobre-nosotros" className="text-gray-700 hover:text-cyan-500" onClick={() => { toggleMenu(); scrollToElement('sobre-nosotros'); }}>
                                        Sobre nosotros
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default CompShowHeader;
