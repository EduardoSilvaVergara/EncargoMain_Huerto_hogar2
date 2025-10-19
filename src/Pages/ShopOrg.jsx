import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Data
import productsData from './../json/ProductOrganicos.json';

function ShopOrg() {
    const [filterSortOption, setFilterSortOption] = useState('all');
    const [searchTerm, setSearchTerm] = useState(''); // 🔍 Nuevo estado para la búsqueda
    const navigate = useNavigate();

    const handleFilterSort = () => {
        let filtered = [...productsData];

        // 🔹 Filtrado por tag (nuevo, oferta)
        if (filterSortOption === 'new' || filterSortOption === 'Sale') {
            filtered = filtered.filter(product => product.tag.toLowerCase() === filterSortOption.toLowerCase());
        }

        // 🔹 Orden por precio
        if (filterSortOption === 'low') {
            filtered.sort((a, b) =>
                parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
            );
        }
        if (filterSortOption === 'high') {
            filtered.sort((a, b) =>
                parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
            );
        }

        // 🔹 Filtro por nombre del producto (barra de búsqueda)
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(product =>
                product.Productname.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    const displayedProducts = handleFilterSort();

    const addToWishlist = (product) => {
        const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!existing.some(p => p.id === product.id)) {
            const updated = [...existing, product];
            localStorage.setItem('wishlist', JSON.stringify(updated));
            window.dispatchEvent(new Event('wishlistUpdated'));
            toast.success(`${product.Productname} agregado a tu lista de deseos`);
        } else {
            toast.info(`${product.Productname} ya está en tu lista de deseos`);
        }
    };

    const addToCart = (product) => {
        const existing = JSON.parse(localStorage.getItem('cart')) || [];
        const productWithCategory = { ...product, category: 'organicos' }; // 🔹 Agrega la categoría específica de esta tienda
        const alreadyInCart = existing.find(p => p.id === product.id && p.category === productWithCategory.category); // 🔹 Compara por id Y category
        if (!alreadyInCart) {
            // Si no existe en esta categoría, agrégalo con cantidad 1
            const updatedProduct = { ...productWithCategory, quantity: 1 };
            const updatedCart = [...existing, updatedProduct];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.success(`${product.Productname} ¡agregado a tu carrito!`);
        } else {
            // Si ya existe en esta categoría, incrementa la cantidad
            const updatedCart = existing.map(p =>
                p.id === product.id && p.category === productWithCategory.category
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));
            toast.info(`${product.Productname} ¡cantidad incrementada en tu carrito!`);
        }
    };

    

    return (
        <>
            <ol className="section-banner py-3 position-relative">
                <li className="position-relative"><Link to='/'>Inicio</Link></li>
                <li className="position-relative active"><span className="ps-5">Productos</span></li>
            </ol>

            <div className="shop-container">
                <div className="container">
                    <h1 className="text-center py-4 fw-semibold">🌱 Organicos 🌱</h1>

                    {/* 🔍 Barra de búsqueda */}
                    <div className="my-4 text-center">
                        <input
                            type="text"
                            className="form-control mx-auto"
                            style={{ maxWidth: "400px", padding: "10px" }}
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="container my-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div className="text-muted" style={{ fontSize: "1.1rem" }}>
                                Mostrando <strong>{displayedProducts.length}</strong> productos para "
                                {filterSortOption === 'all' ? 'Todos' : filterSortOption.charAt(0).toUpperCase() + filterSortOption.slice(1)}"
                            </div>
                            <div>
                                <select
                                    className='form-select py-2 fs-6'
                                    style={{ minWidth: "260px", backgroundColor: "#f5f5f5", border: "0px" }}
                                    value={filterSortOption}
                                    onChange={(e) => setFilterSortOption(e.target.value)}
                                >
                                    <option value="all">Todos los productos</option>
                                    <option value="New">Producto nuevo</option>
                                    <option value="Sale">Producto en oferta</option>
                                    <option value="low">Precio: de menor a mayor</option>
                                    <option value="high">Precio: de mayor a menor</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 Productos mostrados */}
                    <div className="row">
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map(product => (
                                <div className='col-md-3 mb-4' key={product.id}>
                                    <div className="product-item mb-5 text-center position-relative">
                                        <div className="product-image w-100 position-relative overflow-hidden">
                                            <img src={product.image} className='img-fluid' alt="product" />
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
                                        <Link to={`/productOrg/${product.id}`} className='text-decoration-none text-black'>
                                            <div className="product-content pt-3">
                                                {product.oldprice ? (
                                                    <div className="price">
                                                        <span className="text-muted text-decoration-line-through me-2">${product.oldprice}</span>
                                                        <span className="fw-bold text-muted">${product.price}</span>
                                                    </div>
                                                ) : (
                                                    <span className='price'>${product.price}</span>
                                                )}
                                                <h3 className="title pt-1">{product.Productname}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted fs-5">No se encontraron productos que coincidan con tu búsqueda.</p>
                        )}
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

export default ShopOrg
