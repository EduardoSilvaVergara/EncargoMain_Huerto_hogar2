import React, { useState } from 'react'

import head from './../assets/naranja-1.png';
import about1 from './../assets/frutas-2.jpg';
import about2 from './../assets/frutas-3.jpg';

import client1 from './../assets/brand-logo-1.png';
import client2 from './../assets/brand-logo-2.png';
import client3 from './../assets/brand-logo-3.png';
import client4 from './../assets/brand-logo-4.png';
import client5 from './../assets/brand-logo-5.png';
import client6 from './../assets/brand-logo-6.png';

import team1 from './../assets/panda-ed.jpg';
import team2 from './../assets/gato-cr.jpg';
import team3 from './../assets/perro-fa.jpg';

const About = () => {
    const [quote, setQuote] = useState(
        '"Productos orgánicos de alta calidad a precios justos, ofreciendo la combinación perfecta entre frescura, salud y accesibilidad. Cada fruta, verdura y lácteo garantiza un excelente valor y un sabor naturalmente superior."'
    );

    return (
        <>
            {/* About Header */}
            <section className="about-glowing-section d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-md-start text-center">
                            <p className="text-uppercase small mb-2">Presentando</p>
                            <h1 className="fw-bold display-5">Huerto Hogar</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main About Content */}
            <section className="py-5">
                <div className="container text-center mb-5">
                    <img src={head} alt="decorative lead" />
                    <h2 className="fw-bold">
                        Nos esforzamos por ofrecer <br /> productos frescos y saludables con cariño y responsabilidad.
                    </h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                        En Huerto Hogar nos apasiona llevar lo mejor de la naturaleza directamente a tu mesa. Ofrecemos frutas y verduras frescas, productos lácteos de calidad y alimentos orgánicos, seleccionados cuidadosamente para que disfrutes de lo más sano y delicioso.
                        Creemos en un estilo de vida saludable, sostenible y consciente, porque cuidar de ti y del planeta es nuestra prioridad. 
                        Compra con confianza y disfruta de lo natural con Huerto Hogar.
                    </p>
                </div>

                {/* Face Image and Description */}
                <div className="container mb-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0 about-img1">
                            <img src={about1} alt="Face" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h4 className="fw-bold">Lo mejor de la naturaleza, en tu hogar</h4>
                            <p className="text-muted">
                                "Nutre tu bienestar con lo mejor de la naturaleza. 
                                Nuestros productos frescos y orgánicos están seleccionados cuidadosamente para cuidar tu cuerpo y tu salud, aportando equilibrio, vitalidad y energía todos los días. 
                                Disfruta de la combinación perfecta de frescura y calidad para un estilo de vida naturalmente saludable."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission and Product image */}
                <div className="container">
                    <div className="row align-items-center flex-md-row-reverse">
                        <div className="col-md-6 mb-4 mb-md-0 about-img1">
                            <img src={about2} alt="Products" className="img-fluid rounded" />
                        </div>
                        <div className="col-md-6">
                            <h4 className="fw-bold">Nuestra Misión</h4>
                            <p className="text-muted">
                                Creemos en llevar alimentos frescos, saludables y de calidad a todos los hogares. 
                                Seleccionamos cuidadosamente nuestras frutas, verduras, lácteos y productos orgánicos para nutrir tu cuerpo y cuidar tu bienestar. 
                                Nuestro compromiso es ofrecer lo mejor de la naturaleza, promoviendo un estilo de vida saludable, sostenible y lleno de sabor.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Client Logo Section */}
            <section className="container-fluid bg-light">
                <div className="container py-5 text-center">
                    <div className="mx-auto" style={{maxWidth:'800px'}}>
                        <p className="fs-4 mb-4 fw-bold">{quote}</p>
                    </div>

                    <div className="row justify-content-center align-items-center mt-5 gy-4">
                        <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                        onClick={() => setQuote('“Productos de calidad a excelentes precios, ofreciendo la combinación perfecta de economía y excelencia. Cada artículo garantiza una gran relación calidad-precio.”')} 
                        style={{cursor:'pointer'}}>
                            <img src={client1} alt="Grand Golden Gallery" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}}/>
                        </div>

                        <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                        onClick={() => setQuote('“Productos frescos y saludables a precios justos, llevando lo mejor de la naturaleza directamente a tu hogar.”')} 
                        style={{cursor:'pointer'}}>
                            <img src={client2} alt="Parker & Co." className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}}/>
                        </div>

                        <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                        onClick={() => setQuote('“Calidad y sabor en cada fruta, verdura y producto orgánico, con precios que cuidan tu bolsillo.”')} 
                        style={{cursor:'pointer'}}>
                            <img src={client3} alt="The Beast" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}}/>
                        </div>

                        <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                        onClick={() => setQuote('“Lo mejor de la naturaleza, accesible para todos. Frescura y excelencia en cada compra.”')} 
                        style={{cursor:'pointer'}}>
                            <img src={client4} alt="The Hayden" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}}/>
                        </div>

                        <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                        onClick={() => setQuote('“Productos seleccionados con cariño, ofreciendo máxima calidad a precios que hacen sonreír.”')} 
                        style={{cursor:'pointer'}}>
                            <img src={client5} alt="Good Mood" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}}/>
                        </div>

                        <div className="col-6 col-sm-4 col-md-2 d-flex justify-content-center brands-img"
                        onClick={() => setQuote('“Alimentos frescos, saludables y orgánicos, combinando calidad y economía para tu hogar.”')} 
                        style={{cursor:'pointer'}}>
                            <img src={client6} alt="Goodness" className="img-fluid" style={{maxHeight:'60px', objectFit:'contain'}}/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2 className="team-title">
                    ⭐ El mejor equipo ⭐
                </h2>

                <div className="team-row">
                    <div className="team-member">
                        <div className="team-image-wrapper">
                            <img src={team1} alt="Jennifer C." className="team-image" />
                            <div className="team-social">
                                <a href="#"><i className="ri-instagram-line"></i></a>
                                <a href="#"><i className="ri-twitter-x-line"></i></a>
                                <a href="#"><i className="ri-facebook-line"></i></a>
                                <a href="#"><i className="ri-youtube-line"></i></a>
                            </div>
                        </div>
                        <h3 className="team-name">Eduardo Silva V</h3>
                        <p className="team-role">- Founder, CEO</p>
                    </div>

                    <div className="team-member">
                        <div className="team-image-wrapper">
                            <img src={team2} alt="Jennifer C." className="team-image" />
                            <div className="team-social">
                                <a href="#"><i className="ri-instagram-line"></i></a>
                                <a href="#"><i className="ri-twitter-x-line"></i></a>
                                <a href="#"><i className="ri-facebook-line"></i></a>
                                <a href="#"><i className="ri-youtube-line"></i></a>
                            </div>
                        </div>
                        <h3 className="team-name">Cristian Collao A</h3>
                        <p className="team-role">- Founder, CEO</p>
                    </div>

                    <div className="team-member">
                        <div className="team-image-wrapper">
                            <img src={team3} alt="Jennifer C." className="team-image" />
                            <div className="team-social">
                                <a href="#"><i className="ri-instagram-line"></i></a>
                                <a href="#"><i className="ri-twitter-x-line"></i></a>
                                <a href="#"><i className="ri-facebook-line"></i></a>
                                <a href="#"><i className="ri-youtube-line"></i></a>
                            </div>
                        </div>
                        <h3 className="team-name">Fabrizio Gonzales R</h3>
                        <p className="team-role">- Founder, CEO</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About