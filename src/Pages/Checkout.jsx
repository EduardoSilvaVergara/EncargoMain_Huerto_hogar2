import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {

    const [deliveryOption, setDeliveryOption] = useState('ship');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;
        setShowOrderModal(true);
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return acc + price * item.quantity;
    }, 0);

    const estimatedTax = (totalPrice * 0.1).toFixed();

    return (
        <>
            <div className="container my-5 pt-1">
                <div className="row g-4 mt-5">
                    <div className="col-lg-7">
                        <h5>Contacto</h5>
                        <div className="mb-3">
                            <input type="text" className='form-control' placeholder='Correo electrónico o número de teléfono' />
                        </div>
                        <div className="form-check mb-4">
                            <input className='form-check-input' type="checkbox" id='newsCheck' />
                            <label className="form-check-label" htmlFor="newsCheck" >
                                Envíame noticias y ofertas por correo
                            </label>
                        </div>
                        <h5>Entrega</h5>
                        <div>
                            <div className="mb-3">
                                <div className="btn-group btn-form w-100" role='group'>
                                    <input
                                        type="radio"
                                        className='btn-check'
                                        name='deliveryOption'
                                        id='ship'
                                        checked={deliveryOption === 'ship'}
                                        onChange={() => setDeliveryOption('ship')}
                                    />
                                    <label className='btn ship-btn' htmlFor="ship">Envío</label>

                                    <input
                                        type="radio"
                                        className='btn-check'
                                        name='deliveryOption'
                                        id='pickup'
                                        checked={deliveryOption === 'pickup'}
                                        onChange={() => setDeliveryOption('pickup')}
                                    />
                                    <label className='btn pickup-btn' htmlFor="pickup">
                                        Recoger en tienda
                                    </label>
                                </div>
                            </div>

                            {deliveryOption === 'ship' && (
                                <div className="row mb-3">
                                    <div className="mb-3">
                                        <select className='form-select'>
                                            <option>Santiago</option>
                                            <option>Valparaiso</option>
                                            <option>Punta Arenas</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <input type="text"
                                            className='form-control'
                                            placeholder='Nombre (opcional)'
                                        />
                                    </div>
                                    <div className="col">
                                        <input type="text"
                                            className='form-control'
                                            placeholder='Apellido (opcional)'
                                        />
                                    </div>
                                </div>
                            )}

                            {deliveryOption === 'pickup' && (
                                <div className="container my-4">
                                    <div className="d-flex justify-content-between align-items-ceneter mb-2">
                                        <h6 className="fw-semibold mb-0">Ubicación de la tienda</h6>
                                        <a href="#" className='text-decoration-none small'>
                                            Cambiar ubicación
                                        </a>
                                    </div>

                                    <div className="alert alert-danger d-flex flex-column rounded-3" role='alert'
                                        style={{
                                            color: '#7b1c1c',
                                            backgroundColor: '#fef6f6',
                                            border: '1px solid rgba(145, 137, 137, 0.59)'
                                        }}
                                    >
                                        <div className="d-flex align-items-center mb-1">
                                            <i className="bi bi-exclamation-circle-fill me-2"></i>
                                            <strong>No hay tiendas disponibles con tus artículos</strong>
                                        </div>
                                        <div>
                                            <a
                                                href="#"
                                                className='text-decoration-underline'
                                                style={{ color: '#7b1c1c' }}
                                            >Enviar a dirección</a> {' '}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <input type="text" className='form-control' placeholder='Dirección' />
                        </div>
                        <div className="mb-3">
                            <input type="text" className='form-control' placeholder='Apartamento, suite, etc. (opcional)' />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input type="text" className='form-control' placeholder='Ciudad' />
                            </div>
                            <div className="col">
                                <input type="text" className='form-control' placeholder='Código Postal (opcional)' />
                            </div>
                        </div>
                        <div className="form-check mb-4">
                            <input type="checkbox" className='form-check-input' id='saveInfo' />
                            <label htmlFor="saveInfo" className='form-check-label'>
                                Guardar esta información para la próxima vez
                            </label>
                        </div>
                        <h6>Método de envío</h6>

                        <div className="rounded p-3 d-flex justify-content-between align-items-center" style={{ border: "1px solid darkblue", backgroundColor: "#f0f5ff" }}>
                            <span>Estándar</span>
                            <span className='text-success'>Gratis</span>
                        </div>

                        <div className="container my-5">
                            <h4 className="fw-semibold">Pago</h4>
                            <p className="text-muted mb-3">Todas las transacciones son seguras y están encriptadas</p>

                            <div className="border rounded">
                                <div className="bg-light border-bottom d-flex justify-content-between align-items-center p-3">
                                    <span className='fw-semibold'>Tarjeta de crédito</span>
                                    <div className="bg-warning text-white rounded px-2 py-1 fw-bold" style={{ fontSize: "0.9rem" }}>B</div>
                                </div>

                                <div className="p-3 bg-light">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder='Número de tarjeta' />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" placeholder="Fecha de vencimiento (MM / AA)" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input type="text" className="form-control" placeholder="Código de seguridad" />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Nombre en la tarjeta" />
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="billingCheck" checked />
                                        <label className="form-check-label" for="billingCheck" >
                                            Usar la dirección de envío como dirección de facturación
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button className="btn w-100 mt-4 py-2 fw-semibold">Pagar ahora</button>

                            <div className="mt-5 border-top pt-3">
                                <a href="#" className="text-decoration-none small text-decoration-underline">Política de privacidad</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <h5 className="fw-bold mb-3">
                                <i className="ri-shopping-cart-2-line me-2 text-info"></i> Resumen del pedido
                            </h5>
                            {cartItems.length === 0 ? (
                                <p className="text-muted">¡Tu carrito está vacío!</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                                        <img src={item.image} className='rounded' width='60' height='60' style={{ objectFit: 'cover', marginRight: '10px' }} alt="" />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">{item.Productname}</h6>
                                            <small className="text-muted">Cant. : {item.quantity}</small>
                                        </div>
                                        <div className="fw-semibold">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed()}</div>
                                    </div>
                                ))
                            )}
                            <hr />
                            <div className="d-flex justify-content-between small mb-1">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed()}</span>
                            </div>
                            <div className="d-flex justify-content-between small mb-1">
                                <span>Envío</span>
                                <span>Ingresar dirección</span>
                            </div>
                            <div className="d-flex justify-content-between small mb-1">
                                <span>Impuesto estimado</span>
                                <span>${estimatedTax}</span>
                            </div>
                            <div className="d-flex justify-content-between fw-bold border-top pt-2">
                                <span>Total</span>
                                <span>${(totalPrice + parseFloat(estimatedTax)).toFixed()}</span>
                            </div>
                            <button className="btn w-100 mt-3" onClick={handlePlaceOrder}>
                                <i className="ri-secure-payment-line me-2"></i> Realizar pedido
                            </button>

                            <Link to='/cart' className='btn mt-2 text-decoration-none'>
                                <i className="ri-arrow-left-line me-1"></i> ¡Volver al carrito!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Boleta */}
            <div className={`modal fade ${showOrderModal ? 'show d-block' : ''}`} tabIndex="-1" aria-labelledby="orderModalLabel" aria-hidden={!showOrderModal} style={{ backgroundColor: showOrderModal ? 'rgba(0,0,0,0.5)' : '' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="orderModalLabel">Boleta de tu pedido</h5>
                        </div>
                        <div className="modal-body">
                            <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                            <hr />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => {
                                        const priceNum = parseFloat(item.price.replace('$', ''));
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.Productname}</td>
                                                <td>{item.quantity}</td>
                                                <td>${priceNum.toFixed()}</td>
                                                <td>${(priceNum * item.quantity).toFixed()}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <hr />
                            <div className="d-flex justify-content-end flex-column gap-1">
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <span>${totalPrice.toFixed()}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Impuesto estimado (10%):</span>
                                    <span>${estimatedTax}</span>
                                </div>
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total:</span>
                                    <span>${(totalPrice + parseFloat(estimatedTax)).toFixed()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {/* Este botón vacía carrito y redirige al inicio */}
                            {/* Input y botón para enviar boleta por correo */}
                            <div className="w-100 mb-3">
                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingresa tu correo electrónico"
                                    // Asumiendo que tienes un estado para el email, por ejemplo: value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary"
                                    // Aquí iría la lógica para enviar el email, por ejemplo: onClick={handleSendEmail}
                                    >
                                        Enviar Boleta por Correo
                                    </button>
                                </div>
                            </div>
                            <Link
                                to='/'
                                className="btn btn-success w-100"
                                onClick={() => {
                                    localStorage.removeItem('cart');
                                    setCartItems([]);
                                    window.dispatchEvent(new Event('cartUpdated'));
                                    setShowOrderModal(false);
                                }}
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>



            <ToastContainer />
        </>
    )
}

export default Checkout