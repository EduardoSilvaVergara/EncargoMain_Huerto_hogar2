import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

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
    const loadWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(storedWishlist);
    };

    loadWishlist();

    window.addEventListener('wishlistUpdated', loadWishlist);

    return () => {
      window.removeEventListener('wishlistUpdated', loadWishlist);
    };
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
    toast.error('Artículo eliminado de la lista de deseos!');
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
    window.dispatchEvent(new Event('wishlistUpdated'));
    toast.info('Lista de deseos vaciada completamente');
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const normalizedProduct = {
      ...product,
      Productname: getProductName(product),
      price: `$${formatCLP(getPriceNumber(product.price))}`,
      category: product.category || 'general'
    };

    const existingProduct = cart.find(
      item => item.id === product.id && item.category === normalizedProduct.category
    );

    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item.id === product.id && item.category === normalizedProduct.category
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      toast.info(`${getProductName(product)} ¡Cantidad incrementada en tu carrito!`);
    } else {
      updatedCart = [...cart, { ...normalizedProduct, quantity: 1 }];
      toast.success(`${getProductName(product)} ¡Agregado a tu carrito!`);
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const addAllToCart = () => {
    if (wishlist.length === 0) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = [...cart];
    let addedCount = 0;

    wishlist.forEach(product => {
      const normalizedProduct = {
        ...product,
        Productname: getProductName(product),
        price: `$${formatCLP(getPriceNumber(product.price))}`,
        category: product.category || 'general'
      };

      const existingProduct = updatedCart.find(
        item => item.id === product.id && item.category === normalizedProduct.category
      );

      if (!existingProduct) {
        updatedCart.push({ ...normalizedProduct, quantity: 1 });
        addedCount++;
      }
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    if (addedCount > 0) {
      toast.success(`${addedCount} producto(s) agregado(s) al carrito!`);
    } else {
      toast.info('Todos los productos ya están en el carrito');
    }
  };

  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative"><Link to='/'>Inicio</Link></li>
        <li className="position-relative active"><a href="#" className='ps-5'>Lista de deseos</a></li>
      </ol>

      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">❤️ Tu Lista de Deseos</h2>
          {wishlist.length > 0 && (
            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary btn-sm"
                onClick={addAllToCart}
              >
                <i className="bi bi-cart-plus me-1"></i>
                Agregar todo al carrito
              </button>
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={clearWishlist}
              >
                <i className="bi bi-trash me-1"></i>
                Limpiar lista
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-heart" style={{ fontSize: '5rem', color: '#ccc' }}></i>
            </div>
            <p className="lead text-muted mb-4">Tu lista de deseos está vacía.</p>
            <Link to='/' className='btn'>
              <i className="bi bi-shop me-2"></i>
              Explorar Productos
            </Link>
          </div>
        ) : (
          <>
            <div className="alert alert-info d-flex align-items-center mb-4">
              <i className="bi bi-info-circle-fill me-2"></i>
              <span>Tienes <strong>{wishlist.length}</strong> producto(s) en tu lista de deseos</span>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {wishlist.map((product, index) => {
                const productName = getProductName(product);
                const productPrice = getPriceNumber(product.price);
                const oldPrice = product.oldprice ? getPriceNumber(product.oldprice) : null;

                return (
                  <div className="col" key={`${product.id}-${index}`}>
                    <div className="card h-100 shadow-sm border-0 position-relative">
                      <button
                        className="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                        style={{ zIndex: 10, width: '35px', height: '35px' }}
                        onClick={() => removeFromWishlist(product.id)}
                        title="Eliminar de la lista"
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>

                      <div className="position-relative overflow-hidden" style={{height:'250px', backgroundColor:'#f8f9fa'}}>
                        <img 
                          src={product.image || '/placeholder.jpg'} 
                          className='card-img-top h-100 w-100' 
                          style={{ objectFit: 'cover' }}
                          alt={productName}
                        />
                        
                        {product.tag && (
                          <span className={`badge position-absolute top-0 start-0 m-2 ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                            {product.tag}
                          </span>
                        )}
                      </div>

                      <div className="card-body d-flex flex-column">
                        <div className="mb-2">
                          {oldPrice ? (
                            <div>
                              <span className="text-muted text-decoration-line-through me-2">
                                ${formatCLP(oldPrice)}
                              </span>
                              <span className="fs-5 fw-bold text-success">
                                ${formatCLP(productPrice)}
                              </span>
                            </div>
                          ) : (
                            <p className="fs-5 fw-bold text-dark mb-0">
                              ${formatCLP(productPrice)}
                            </p>
                          )}
                        </div>

                        <h6 className="card-title mb-3" style={{ minHeight: '40px' }}>
                          {productName}
                        </h6>

                        {product.category && (
                          <span className="badge bg-secondary mb-3 align-self-start">
                            {product.category}
                          </span>
                        )}

                        <div className="mt-auto">
                          <button 
                            className="btn btn-primary w-100"
                            onClick={() => addToCart(product)}
                          >
                            <i className="bi bi-cart-plus me-2"></i>
                            Agregar al carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
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

export default Wishlist;