import React, { useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CompShowHeader from "./header";
import ServiciosSection from "./servicios";
import AboutUs from "./aboutUs";
import Footer from "./footer";
import CompShowProductos from "./showNewestProds";

const CompShowInicio = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    // Animación para el texto y contenido principal
    const { ref: textRef, inView: textInView } = useInView();
    const textControls = useAnimation();

    useEffect(() => {
        if (textInView) {
            textControls.start({ opacity: 1, y: 0 });
        } else {
            textControls.start({ opacity: 0, y: 50 });
        }
    }, [textControls, textInView]);

    // Animación para las imágenes del slider
    const { ref: sliderRef, inView: sliderInView } = useInView();
    const sliderControls = useAnimation();

    useEffect(() => {
        if (sliderInView) {
            sliderControls.start("visible");
        } else {
            sliderControls.start("hidden");
        }
    }, [sliderControls, sliderInView]);

    const sliderVariants = {
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.9 }
    };

    return (
        <div>
            <CompShowHeader />
            <section className="flex flex-col lg:flex-row justify-center items-center mt-36 px-4 lg:px-10">
                {/* Slider Section */}
                <div className="w-full lg:w-2/5" ref={sliderRef}>
                    <Slider {...settings}>
                        <motion.div variants={sliderVariants} initial="hidden" animate="visible">
                            <img src="/aire.png" alt="Aire Acondicionado 1" />
                        </motion.div>
                        <motion.div variants={sliderVariants} initial="hidden" animate="visible">
                            <img src="/aire1.png" alt="Aire Acondicionado 2" />
                        </motion.div>
                    </Slider>
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-center lg:ml-10 lg:w-3/5 mt-12 lg:mt-0" ref={textRef}>
                    <motion.h1 className="text-3xl lg:text-4xl text-cyan-500" initial={{ opacity: 0, y: 50 }} animate={textControls}>
                        Instalación de aires acondicionados
                    </motion.h1>
                    <motion.p className="mt-5" initial={{ opacity: 0, y: 50 }} animate={textControls}>
                        ¿Cansado del calor? Instale un aire acondicionado con nuestra empresa, líderes en el mercado con más de 15 años de experiencia. Ofrecemos servicios de alta calidad, garantías y precios competitivos. ¡No sufra más en el calor, contáctenos hoy mismo!
                    </motion.p>
                </div>
            </section>

            <ServiciosSection />

            <CompShowProductos />
            <Link to={'/productos'}>
                <button className="mt-14 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
                    Ver más
                </button>
            </Link>

            <AboutUs />

            <Footer />
        </div>
    );
};

export default CompShowInicio;
