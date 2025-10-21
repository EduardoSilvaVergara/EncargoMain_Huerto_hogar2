import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/effect-fade';

//Data
import Products from './../json/ProductFrutas.json';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// imagenes
import subBanner1 from './../assets/Banner-1.jpg';
import subBanner2 from './../assets/Banner-2.jpg';

import sericeImg1 from './../assets/service-icon-1.svg';
import sericeImg2 from './../assets/service-icon-2.svg';
import sericeImg3 from './../assets/service-icon-3.svg';
import sericeImg4 from './../assets/service-icon-4.svg';

import brand1 from './../assets/brand-1.png';
import brand2 from './../assets/brand-2.png';
import brand3 from './../assets/brand-3.png';

import femalebanner from './../assets/banner-frutas.jpg';

import discover1 from './../assets/discover-1.jpg'
import discover2 from './../assets/discover-2.jpg'

import socialImage1 from './../assets/social-image-1.jpg'
import socialImage2 from './../assets/social-image-2.jpg'
import socialImage3 from './../assets/social-image-3.jpg'
import socialImage4 from './../assets/social-image-4.jpg'
import socialImage5 from './../assets/social-image-5.jpg'
import socialImage6 from './../assets/social-image-6.jpg'


function Index() {

    const [filterSortOption, setFilterSortOption] = useState('all');

    const navigate = useNavigate();

    const addToWishlist = (product) => {
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.some(p => p.id === product.id)) {
            const updated = [...existing, product];
            localStorage.setItem('wishlist', JSON.stringify(updated));
            window.dispatchEvent(new Event('wishlistUpdated'));
            toast.success(`${product.Productname} agregado a tu lista de deseos`);
        }
        else {
            toast.info(`${product.Productname} ya está en tu lista de deseos`);
        }

    }
    const addToCart = (product) => {
        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        const alreadyInCart = existing.find(p => p.id === product.id);

        if (!alreadyInCart) {
            const updatedProduct = { ...product, quantity: 1 };
            const updatedCart = [...existing, updatedProduct];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${product.Productname} ¡agregado a tu carrito!`);
        }
        else {
            toast.info(`${product.Productname} ¡Ya esta en tu carrito!`);
        }

    }
    return (
        <>
            {/* Hero */}
            <div className="hero">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    loop={true}
                    autoplay={{
                        delay: 3000
                    }}>
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap1">
                            <div className="hero-content">
                                <h5>- Nueva Colección</h5>
                                <h1>Verduras frescas para tu mesa</h1>
                                <p className="my-3">Cultivadas de manera natural y saludable, nuestras verduras están llenas de sabor y nutrientes</p>
                                <Link to='shopVerduras' className='btn hero-btn mt-3'>Comprar Ahora</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap2">
                            <div className="hero-content">
                                <h5>- Fresco y Saludable</h5>
                                <h1>Frutas <br /> Directo de la Naturaleza</h1>
                                <p className="my-3">Seleccionadas en su punto óptimo de madurez, nuestras frutas son frescas, jugosas y llenas de sabor natural</p>
                                <Link to='/shopFrutas' className='btn hero-btn mt-3'>Comprar Ahora</Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero-wrap hero-wrap3">
                            <div className="hero-content">
                                <h5>- Desde Nuestro Huerto</h5>
                                <h1>Lo mejor <br /> de la granja a tu hogar</h1>
                                <p className="my-3">Cultivamos frutas y verduras frescas en nuestro huerto, con amor y cuidado para tu familia</p>
                                <p className="my-3">Descubre noticias, consejos de cultivo y más en nuestro blog.</p>
                                <a href="#seccion-bajar" className='btn hero-btn mt-3'>Ir al Boletin</a>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/*  Products */}
            <div className="product-container py-5 my-5">
                <div className="container position-relative">
                    <div className="row">
                        <div className="section-title mb-5 product-title text-center">
                            <h2 className="fw-semibold fs-1"> Nuestros productos destacados </h2>
                            <p className="text-muted">Disfruta la dulzura y frescura de nuestras frutas</p>
                        </div>
                    </div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        modules={[Navigation]}
                        navigation={{ nextEl: ".product-swiper-next", prevEl: "product-swiper-prev" }}
                        breakpoints={{
                            1399: { slidesPerView: 4 },
                            1199: { slidesPerView: 3 },
                            991: { slidesPerView: 2 },
                            767: { slidesPerView: 1.5 },
                            0: { slidesPerView: 1 },
                        }}
                        className='mt-4 swiper position-relative'
                    >
                        {Products.filter(product => product.id >= 5 && product.id <= 10).map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="product-item text-center position-relative">
                                    <div className="product-image w-100 position-relative overflow-hidden">
                                        <img src={product.image} className='img-fluid' alt="" />
                                        <img src={product.secondImage} className='img-fluid' alt="" />
                                        <div className="product-icons gap-3">
                                            <div className="product-icon" title='Add to Wishlist' onClick={() => addToWishlist(product)}>
                                                <i className="bi bi-heart fs-5"></i>

                                            </div>
                                            <div className="product-icon" title='Add to Cart' onClick={() => addToCart(product)}>
                                                <i className="bi bi-cart3 fs-5"></i>
                                            </div>
                                        </div>
                                        <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                                            {product.tag}
                                        </span>
                                    </div>
                                    <Link to={`/productFrutas/${product.id}`} className='text-decoration-none text-black'>
                                        <div className="product-content pt-3">
                                            <span className="price text-decoration-none">${product.price}</span>
                                            <h3 className="title pt-1">{product.Productname}</h3>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Banner */}
            <div className="banners py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 banner-card overflow-hidden position-relative">
                            <img src={subBanner1} alt="" className="img-fluid rounded banner-img" />
                            <div className="banner-content position-absolute">
                                <h3>NUEVA COSECHA 🍓</h3>
                                <h1>Huerto Fresco+ <br /> Frutas y Verduras de Temporada
                                <br /></h1>
                                <a href="#"><button className="btn banner-btn">DESCUBRE MÁS</button></a>
                            </div>
                        </div>
                        <div className="col-lg-6 banner-card overflow-hidden position-relative banner-mt">
                            <img src={subBanner2} alt="" className="img-fluid rounded banner-img" />
                            <div className="banner-content banner-content2 position-absolute">
                                <h3>DISFRUTA</h3>
                                <h1>25% de descuento en todo 🌿</h1>
                                <p>Productos frescos y orgánicos con una amplia variedad para cada hogar.</p>
                                <a href="#"><button className="btn banner-btn">COMPRA AHORA</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service */}
            <div className="container py-5 my-5">
                <div className="row text-center">
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={sericeImg1} alt="" className='img-fluid'/>
                        <h4 className="mt-3 mb-1">Envío Gratis</h4>
                        <p className="text-muted fs-6 fw-semibold">Envío gratuito para pedidos superiores a $50.000</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={sericeImg2} alt="" className='img-fluid'/>
                        <h4 className="mt-3 mb-1">Devoluciones</h4>
                        <p className="text-muted fs-6 fw-semibold">Dentro de los 30 días para un cambio</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={sericeImg3} alt="" className='img-fluid'/>
                        <h4 className="mt-3 mb-1">Atención en Línea</h4>
                        <p className="text-muted fs-6 fw-semibold">Las 24 horas del día, los 7 días de la semana</p>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4">
                        <img src={sericeImg4} alt="" className='img-fluid'/>
                        <h4 className="mt-3 mb-1">Pago Flexible</h4>
                        <p className="text-muted fs-6 fw-semibold">Paga con múltiples tarjetas de crédito</p>
                    </div>
                </div>
            </div>

            {/* Seen in */}
            <div className="text-center my-5 seen-in">
                <div className="container">
                    <h1 className="mb-5 fw-semibold">Visto en Huerto Hogar🌿</h1>
                    <div className="row pt-3 justify-content-center">
                        <div className="col-md-4 mb-4 seen-card">
                            <img src={brand1} alt="" className="img-fluid" />
                            <p className="text-dark fs-5 mt-2 fw-semibold"> "Además, la atención al cliente es excelente. Sin duda volvería a comprar mis productos aquí."
                            </p>
                        </div>
                        <div className="col-md-4 mb-4 seen-card">
                            <img src={brand2} alt="" className="img-fluid" />
                            <p className="text-dark fs-5 mt-2 fw-semibold"> "Gran variedad de frutas, verduras y lácteos frescos. El personal es muy amable y servicial."
                            </p>
                        </div>
                        <div className="col-md-4 mb-4 seen-card">
                            <img src={brand3} alt="" className="img-fluid" />
                            <p className="text-dark fs-5 mt-2 fw-semibold"> "¿Buscas alimentos orgánicos y saludables a un precio justo? No busques más — Huerto Hogar lo tiene todo."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* favourite beauty */}
            <div className="favourite-beauty py-5 my-5">
                <div className="container">
                    <div className="row">
                        <div className="section-title mb-5 favorite-beauty-title text-center">
                            <h2 className="fw-semibold fs-1">Los favoritos del huerto 🌱</h2>
                            <p className="text-muted">Frescos, orgánicos y de origen local — en Huerto Hogar, llevamos lo mejor de la naturaleza directo a tu mesa.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-5">
                            <div className="favourite-beauty-banner mb-lg-0 mb-5 position-relative">
                                <img src={femalebanner} className='img-fluid' alt="" />
                                <div className="favourite-beauty-banner-title">
                                    <h3 className="fs-2">Cuida tu bienestar</h3>
                                    <p className="fs-6">Llénate de energía natural con frutas, verduras y productos orgánicos frescos.</p>
                                    <a href="#"><button className="btn btn-default">Descubre Más</button></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                {Products
                                    .filter(product => product.id >= 10 && product.id <= 15)
                                    .map(product => (
                                        <div className='col-md-4 mb-0'>
                                            <div key={product.id}>
                                                <div className="product-item mb-5 text-center position-relative">
                                                    <div className="product-image w-100 position-relative overflow-hidden">
                                                        <img src={product.image} className='img-fluid' alt="product" />
                                                        <img src={product.secondImage} className='img-fluid' alt="product" />
                                                        <div className="product-icons gap-3">
                                                            
                                                            <div className="product-icon" title='Add to Wishlist' onClick={() => addToWishlist(product)}>
                                                                <i className="bi bi-heart fs-5"></i>

                                                            </div>
                                                            <div className="product-icon" title='Add to Cart' onClick={() => addToCart(product)}>
                                                                <i className="bi bi-cart3 fs-5"></i>
                                                            </div>
                                                        </div>
                                                        <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                                                            {product.tag}
                                                        </span>
                                                    </div> 
                                                    <Link to={`/productFrutas/${product.id}`} className='text-decoration-none text-black'>
                                                        <div className="product-content pt-3">
                                                            <span className="price">${product.price}</span>
                                                            <h3 className="title pt-1">{product.Productname}</h3>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Discover */}
            <div className="discover container py-5">
                <div className="section-title mb-5 favorite-beauty-title text-center">
                    <h2 className="fw-semibold fs-1">Mucho Más por Descubrir</h2>
                    <p className="text-center">Ofrecemos lo mejor en frutas, verduras, Lacteos y productos orgánicos, cuidando tu salud y tu bolsillo con Huerto Hogar.</p>
                </div>
                <div className="row g-5">
                    <div className="col-md-6 discover-card text-center">
                        <div className="discover-img section-image rounded">
                            <img src={discover1} alt="Summer Collection" className="img-fluid" />
                        </div>
                        <div className="discover-info mt-3">
                            <div>Lacteos 🥛</div>
                            <Link to='shopLacteos' className='btn mt-2'>Comprar Ahora<i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </div>
                    <div className="col-md-6 discover-card text-center">
                        <div className="discover-img section-image rounded">
                            <img src={discover2} alt="From Our Blog" className="img-fluid" />
                        </div>
                        <div className="discover-info mt-3">
                            <div>Organicos 🌱</div>
                            <Link to='shopOrg' className='btn mt-2'>Comprar Ahora<i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Social image */}
            <div className="social-image-container py-5 px-5 mx-auto" id='seccion-bajar'>
                <div className="row g-4">
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage1} alt="" className="img-fluid"/>
                            <i className="bi bi-telegram fs-1"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage2} alt="" className="img-fluid"/>
                            <i className="bi bi-facebook"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage3} alt="" className="img-fluid"/>
                            <i className="bi bi-twitter-x"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage4} alt="" className="img-fluid"/>
                            <i className="bi bi-youtube"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage5} alt="" className="img-fluid"/>
                            <i className="bi bi-instagram"></i>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-4">
                        <div className="social-wrapper position-relative overflow-hidden">
                            <img src={socialImage6} alt="" className="img-fluid"/>
                            <i className="bi bi-whatsapp"></i>
                        </div>
                    </div>
                </div>
            </div>


            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar= {false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                
            />

        </>
    )
}

export default Index