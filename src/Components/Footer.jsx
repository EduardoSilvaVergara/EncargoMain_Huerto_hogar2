import React from 'react'

import paryment1 from './../assets/payment-1.svg'
import paryment2 from './../assets/payment-2.svg'
import paryment3 from './../assets/payment-3.svg'
import paryment4 from './../assets/payment-4.svg'
import paryment5 from './../assets/payment-5.svg'
import paryment6 from './../assets/payment-6.svg'

function Footer() {
  return (
    <>
        <div className="footer mt-5 py-5">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-4">
                                <h3 className="mb-3">Compañia</h3>
                                <p className="mb-0">Encuentra la ubicación más cercana</p>
                                <p className="mb-4">a ti.<strong> Mira nuestras tiendas.</strong></p>
                                <p className="mb-0"><strong>+56 911223344</strong></p>
                                <p>hh@huertoh.com</p>
                            </div>

                            <div className="col-md-4">
                                <h3 className="mb-3">Enlaces útiles</h3>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Producto Nuevos</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Más Vendidos</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Combos y Ahorra</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Tarjeta de Regalo en Línea</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-4">
                                <h3 className="mb-3">Información</h3>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Iniciar una Devolución</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Contáctanos</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Preguntas Frecuentes de Envío</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Términos y Condiciones</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#" className='text-decoration-none'>- Política de Privacidad</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h3 className="mb-4">Boletin.</h3>
                        <p className="mb-5">Ingresa tu correo electrónico abajo para ser el primero en enterarte de todas las novedades, ofertas y noticias.</p>
                            <div className="subscribe-box d-flex">
                                <input type="email" className="form-control" placeholder="Ingresa tu dirección de correo electrónico"/>
                                <button className="btn">Suscribirse</button>
                            </div>
                    </div>
                </div>

                <div className="footer-bottom mt-5">
                    <div className="row align-start">
                        <div className="col-lg-4">
                            <div className="footer-icon-text d-flex gap-3 justify-content-center 
                            justify-content-lg-end">
                                <p>© Huerto Hogar 2025 | Creado por Huerto Hogar</p>
                                <div className="footer-icons d-flex gap-2">
                                    <i className="ri-instagram-line"></i>
                                    <i className="ri-twitter-x-line"></i>
                                    <i className="ri-facebook-circle-fill"></i>
                                    <i className="ri-youtube-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="footer-logo text-center">
                                <a href="#" className="navbar-brand mx-auto order-0">
                                    <h2 className="m-0 fw-bold" style={{letterSpacing:'2px'}}>Huerto Hogar</h2>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="payment-img mt-4 mt-xl-0 d-flex gap-2 justify-content-center 
                            justify-content-lg-end">
                                <img src={paryment1} alt="" className='img-fluid'/>
                                <img src={paryment2} alt="" className='img-fluid'/>
                                <img src={paryment3} alt="" className='img-fluid'/>
                                <img src={paryment4} alt="" className='img-fluid'/>
                                <img src={paryment5} alt="" className='img-fluid'/>
                                <img src={paryment6} alt="" className='img-fluid'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer