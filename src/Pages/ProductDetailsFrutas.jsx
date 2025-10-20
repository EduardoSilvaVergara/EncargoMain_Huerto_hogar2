import React, { useEffect, useState } from 'react'


//Data
import products from './../ProductFrutas.json'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Link, useParams } from 'react-router-dom'

function ProductDetailsFrutas() {
  const { id } = useParams();
    const product = products.find((p) => p.id == id)

    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            setMainImage(product.image);
            setImages([product.image, product.secondImage].filter(Boolean));
            setQuantity(1)
        }
    }, [product]);

    const colors = ['#000000', '#7B3F00', '#9BBEC8']

    const addToCart = (product) => {
            const existing = JSON.parse(localStorage.getItem('cart')) || [];
            const alreadyInCart = existing.find(p => p.id === product.id);
    
            if (product) {
                const updatedProduct = { ...product, quantity: quantity };
                const updatedCart = [...existing, updatedProduct];
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                window.dispatchEvent(new Event('cartUpdated'));
                toast.success(`${product.Productname} added to your cart!`);
            }
            else {
                toast.info(`${product.Productname} is already in your cart!`);
            }
    
        }

    return (
        <>
            <ol className="section-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Inicio</Link></li>
                <li className="position-relative active"><a href="#" className='ps-5'>Frutas</a></li>
                <li className="position-relative active"><a href="#" className='ps-5'>{product.Productname}</a></li>
            </ol>

            <div className="container py-5">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="d-flex flex-column-reverse flex-md-row mb-4">
                            <div className="d-flex flex-column me-3 thumbnail-images">
                                {images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Thumb ${idx}`}
                                        onClick={() => setMainImage(img)}
                                        className={`img-thumbnail ${mainImage === img ? 'border-dark' : ''}`}
                                        style={{ width: 60, height: 80, objectFit: 'cover', cursor: 'pointer' }}
                                    />
                                ))}
                            </div>
                            <img src={mainImage} className='img-fluid' alt="" />
                        </div>
                    </div>


                    <div className="col-xl-6">
                        <h5 className="fw-bold">${product.price}</h5>
                        <h2 className="mb-4 fw-semibold">{product.Productname}</h2>

                        
                        <p className="fw-semibold mb-1"> Cantidad</p>
                        <div className="d-flex align-items-center gap-3 mb-4 quantity">
                            <div className="d-flex align-items-center Quantity-box" style={{ maxWidth: '200px' }}>
                                <button className="btn-count border-0"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    className='form-control text-center mx-2'
                                    value={quantity}
                                    readOnly
                                />
                                <button className="btn-count border-0"
                                    onClick={() => setQuantity((q) => Math.max(1, q + 1))}
                                >
                                    +
                                </button>
                            </div>
                            <button className="btn-custome w-100" onClick={() => addToCart(product)}> Agregar al carrito</button>
                        </div>
                        <button className="btn-custome2 w-100 border-0"><Link to='/cart' className='link-clean2'>Comprar ahora</Link></button>

                        <hr />
                        <p><strong>Vendedor: </strong>{product.seller}</p>
                        <p><strong>Colecciones: </strong>{product.collection}</p>
                        <p><strong>Codigo: </strong>Fr-{product.id}</p>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <ul className="nav nav-tabs border-0 justify-content-center mb-4" id='productTab' role='tablist'>
                    <li className="nav-item" role='presentation'>
                        <button
                            className="nav-link tab active border-0 fw-bold fs-4 text-capitalize"
                            id="description-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#description"
                            type="button"
                        >
                            Descripcion
                        </button>
                    </li>
                    <li className="nav-item" role='presentation'>
                        <button
                            className="nav-link tab border-0 text-muted fs-4 text-capitalize"
                            id="shipping-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#shipping"
                            type="button"
                        >
                            Envíos y Devoluciones
                        </button>
                    </li>
                </ul>

                <div className="tab-content" id="productTabContent">
                    <div className="tab-pane fade show active" id="description" role="tabpanel">
                        <h4><strong>Lo mejor de la naturaleza, directamente desde el campo hasta tu hogar.</strong></h4>
                        <p>
                            {product.description}
                        </p>
                        <h5 className="mt-4">Beneficios</h5>
                        <ul className="Benefits-list p-0">
                            <li className="position-relative">Productos 100% frescos y naturales</li>
                            <li className="position-relative">Cultivados sin químicos dañinos</li>
                            <li className="position-relative">Apoyas a productores locales</li>
                            <li className="position-relative">Conserva todos los nutrientes y el sabor original</li>
                            <li className="position-relative">Entrega rápida y segura hasta tu hogar</li>
                        </ul>
                    </div>

                    <div className="tab-pane fade text-center" id="shipping" role="tabpanel">
                        <hr />
                        <p>
                        <strong>agregar algo</strong>
                        </p>
                        <hr />
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDetailsFrutas