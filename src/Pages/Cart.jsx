import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const getProductName = (item) => {
        return item?.Productname || item?.productname || item?.name || item?.nombre || 'Producto sin nombre';
    };

    const getPriceNumber = (priceStr) => {
        if (typeof priceStr === 'number') return priceStr;
        const cleanPrice = String(priceStr).replace(/[$.,\s]/g, '');
        const price = parseFloat(cleanPrice);
        return isNaN(price) ? 0 : price;
    };

    const formatCLP = (num) => {
        try {
            return num.toLocaleString('es-CL');
        } catch {
            return String(num);
        }
    };

    useEffect(() => {
        const loadCart = () => {
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(savedCart);
        };

        loadCart();

        window.addEventListener('cartUpdated', loadCart);

        return () => {
            window.removeEventListener('cartUpdated', loadCart);
        };
    }, []);

    const updateQuantity = (id, category, type) => {
        const updated = cartItems.map(item => {
            if (item.id === id && item.category === category) {
                if (type === 'increase') {
                    return { ...item, quantity: (item.quantity || 1) + 1 };
                } else if (type === 'decrease' && (item.quantity || 1) > 1) {
                    return { ...item, quantity: (item.quantity || 1) - 1 };
                }
            }
            return item;
        });
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeItem = (id, category) => {
        const updated = cartItems.filter(item => !(item.id === id && item.category === category));
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.error('Artículo eliminado del carrito!');
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.setItem('cart', JSON.stringify([]));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.info('Carrito vaciado completamente');
    };

    const totalPrice = cartItems.reduce((acc, item) => {
        const price = getPriceNumber(item.price);
        const quantity = item.quantity || 1;
        return acc + (price * quantity);
    }, 0);

    const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

    return (
        <>
            <ol className="section-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Inicio</Link></li>
                <li className="position-relative active"><a href="#" className='ps-5'>Carrito</a></li>
            </ol>

            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">❤️ Tu Carrito</h2>
                    {cartItems.length > 0 && (
                        <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={clearCart}
                        >
                            Vaciar carrito
                        </button>
                    )}
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="bi bi-cart-x" style={{ fontSize: '5rem', color: '#ccc' }}></i>
                        </div>
                        <p className="lead mb-4">¡Tu carrito está vacío!</p>
                        <Link to='/' className='btn'>Volver al inicio</Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        <div className="col-lg-8">
                            {cartItems.map((item, index) => {
                                const itemPrice = getPriceNumber(item.price);
                                const itemQuantity = item.quantity || 1;
                                const itemTotal = itemPrice * itemQuantity;
                                const productName = getProductName(item);

                                return (
                                    <div 
                                        key={`${item.id}-${item.category}-${index}`} 
                                        className="card shadow-sm border-0 rounded-4 mb-3 p-3"
                                    > 
                                        <div className="row align-items-center">
                                            <div className="col-3 col-md-2">
                                                <img 
                                                    src={item.image || '/placeholder.jpg'} 
                                                    alt={productName} 
                                                    className='img-fluid rounded-3'
                                                    style={{ objectFit: 'cover', aspectRatio: '1/1' }}
                                                />
                                            </div>
                                            <div className="col-9 col-md-10">
                                                <div className="row align-items-center">
                                                    <div className="col-md-6 mb-3 mb-md-0">
                                                        <h5 className="mb-2 fw-semibold">{productName}</h5>
                                                        <p className="text-muted mb-1 small">
                                                            <span className="badge bg-secondary">
                                                                {item.category || 'Sin categoría'}
                                                            </span>
                                                        </p>
                                                        <p className="text-muted mb-0">
                                                            Precio unitario: <strong>${formatCLP(itemPrice)}</strong>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="d-flex align-items-center justify-content-md-end gap-3 flex-wrap">
                                                            <div className="d-flex align-items-center gap-2">
                                                                <button 
                                                                    className="btn btn-sm btn-outline-secondary"
                                                                    onClick={() => updateQuantity(item.id, item.category, 'decrease')}
                                                                    disabled={itemQuantity <= 1}
                                                                >
                                                                    <i className="bi bi-dash"></i>
                                                                </button>
                                                                <span className="fw-bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                                                                    {itemQuantity}
                                                                </span>
                                                                <button 
                                                                    className='btn btn-sm btn-outline-secondary'
                                                                    onClick={() => updateQuantity(item.id, item.category, 'increase')}
                                                                >
                                                                    <i className="bi bi-plus"></i>
                                                                </button>
                                                            </div>
                                                            <div className="text-center" style={{ minWidth: '100px' }}>
                                                                <small className="text-muted d-block">Total</small>
                                                                <strong className="text-success">${formatCLP(itemTotal)}</strong>
                                                            </div>
                                                            <button 
                                                                className='btn btn-sm btn-outline-danger'
                                                                onClick={() => removeItem(item.id, item.category)}
                                                                title="Eliminar del carrito"
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 position-sticky" style={{ top: '20px' }}>
                                <h4 className="fw-bold mb-3">Resumen del Carrito</h4>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Total de Artículos</span>
                                    <span className="fw-semibold">{totalItems}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-semibold">${formatCLP(totalPrice)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                                    <span className="text-muted">Envío</span>
                                    <span className="text-success fw-semibold">Gratis</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5">Total</span>
                                    <span className='fw-bold fs-5 text-primary'>${formatCLP(totalPrice)}</span>
                                </div>
                                <Link to='/checkout' className='btn w-100 py-2 mb-2'>
                                    Proceder al Pago
                                </Link>
                                <Link to='/' className='btn btn-outline-secondary w-100 py-2'>
                                    Seguir Comprando
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
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
                theme='colored'
            />
        </>
    );
}

export default Cart;