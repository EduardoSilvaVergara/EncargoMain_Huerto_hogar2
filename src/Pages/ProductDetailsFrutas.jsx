import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getProductos } from '../api'

function ProductDetailsFrutas() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const getName = (p) =>
        p?.Productname || p?.productname || p?.name || p?.nombre || 'Producto';

    const getPriceNum = (p) => {
        if (typeof p?.price === 'number') return p.price;
        const s = String(p?.price ?? '');
        const n = Number(s.replace(/[^0-9.,]/g, '').replace('.', '').replace(',', '.'));
        return isNaN(n) ? 0 : n;
    };
    const formatCLP = (n) => {
        try {
            return n.toLocaleString('es-CL');
        } catch {
            return String(n);
        }
    };

    const getSecondImage = (p) =>
        p?.secondImage || p?.secondimage || p?.image2 || null;

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const data = await getProductos("Frutas Frescas");
                const productos = Array.isArray(data) ? data : [];
                
                const foundProduct = productos.find((p) => p.id == id);
                
                if (foundProduct) {
                    setProduct(foundProduct);
                    setMainImage(foundProduct.image);
                    
                    const secondImg = getSecondImage(foundProduct);
                    setImages([foundProduct.image, secondImg].filter(Boolean));
                    setQuantity(1);
                } else {
                    setError("Producto no encontrado");
                }
            } catch (e) {
                console.error(e);
                setError("Error al cargar el producto");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProduct();
        }
    }, [id]);

    const addToCart = (product) => {
        if (!product) return;

        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        const productWithCategory = { ...product, category: 'frutas' };
        const alreadyInCart = existing.find(
            p => p.id === product.id && p.category === productWithCategory.category
        );

        if (!alreadyInCart) {
            const updatedProduct = { ...productWithCategory, quantity: quantity };
            const updatedCart = [...existing, updatedProduct];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${getName(product)} ¡agregado a tu carrito!`);
        } else {
            const updatedCart = existing.map(p =>
                p.id === product.id && p.category === productWithCategory.category
                    ? { ...p, quantity: p.quantity + quantity }
                    : p
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.info(`${getName(product)} ¡cantidad incrementada en tu carrito!`);
        }
    };

    if (loading) {
        return <p className="text-center py-5">Cargando producto...</p>;
    }

    if (error) {
        return <p className="text-center py-5" style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (!product) {
        return <p className="text-center py-5">Producto no encontrado</p>;
    }

    const productName = getName(product);
    const productPrice = getPriceNum(product);

    return (
        <>
            <ol className="section-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Inicio</Link></li>
                <li className="position-relative active"><Link to='/shopFrutas' className='ps-5'>Frutas</Link></li>
                <li className="position-relative active"><span className='ps-5'>{productName}</span></li>
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
                            <img src={mainImage} className='img-fluid' alt={productName} />
                        </div>
                    </div>

                    <div className="col-xl-6">
                        <h5 className="fw-bold">${formatCLP(productPrice)}</h5>
                        <h2 className="mb-4 fw-semibold">{productName}</h2>

                        <p className="fw-semibold mb-1">Cantidad</p>
                        <div className="d-flex align-items-center gap-3 mb-4 quantity">
                            <div className="d-flex align-items-center Quantity-box" style={{ maxWidth: '200px' }}>
                                <button 
                                    className="btn-count border-0"
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
                                <button 
                                    className="btn-count border-0"
                                    onClick={() => setQuantity((q) => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="btn-custome w-100" onClick={() => addToCart(product)}>
                                Agregar al carrito
                            </button>
                        </div>
                        <button className="btn-custome2 w-100 border-0">
                            <Link to='/cart' className='link-clean2'>Comprar ahora</Link>
                        </button>

                        <hr />
                        {product.seller && <p><strong>Vendedor: </strong>{product.seller}</p>}
                        {product.collection && <p><strong>Colecciones: </strong>{product.collection}</p>}
                        <p><strong>Código: </strong>Fr-{product.id}</p>
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
                            Descripción
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
                            {product.description || 'Producto fresco y de alta calidad.'}
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

                    <div className="tab-pane fade" id="shipping" role="tabpanel">
                        <hr />
                        <p>
                            <strong>Envíos:</strong> Realizamos envíos a todo Chile.
                            <br /><strong>Tiempo estimado de entrega:</strong> 1 a 3 días hábiles.
                            <br />Todos nuestros productos se entregan en empaques que garantizan frescura y protección durante el transporte.
                        </p>
                        <p>
                            <strong>Devoluciones:</strong> Aceptamos devoluciones por productos dañados o en mal estado dentro de las 24 horas siguientes a la entrega.
                            <br />Para iniciar un proceso de devolución, contáctanos a nuestro correo de soporte o vía WhatsApp.
                        </p>
                        <p>
                            <strong>Nota:</strong> Al tratarse de productos frescos, no aceptamos devoluciones por cambio de opinión, pero siempre buscamos soluciones para asegurar tu satisfacción.
                        </p>
                        <hr />
                    </div>
                </div>
            </div>

            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
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

export default ProductDetailsFrutas