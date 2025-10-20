import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Data
import productsData from '../Product.json';

function Shop() {

    const [filterSortOption, setFilterSortOption] = useState('all')
    const navigate = useNavigate();

    const handleFilterSort = () => {
        let filtered = [...productsData];

        if (filterSortOption === 'new' || filterSortOption === 'Sale') {
            filtered = filtered.filter(product => product.tag === filterSortOption);
        }

        if (filterSortOption === 'low') {
            filtered.sort((a, b) =>
                parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
            )
        }

        if (filterSortOption === 'high') {
            filtered.sort((a, b) =>
                parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
            )
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
            toast.success(`${product.Productname} added to your wishlist`);
        }
        else {
            toast.info(`${product.Productname} is already in your wishlist`);
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
                <li className="position-relative active"><span className="ps-5">Productos</span></li>
            </ol>

            <div className="shop-container">
                <div className="container">
                    <h1 className="text-center py-4 fw-semibold">Productos</h1>

                    <div className="contianer my-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div className="text-muted" style={{ fontSize: "1.1rem" }}>
                                Showing <strong>{displayedProducts.length}</strong> product{displayedProducts.length != 1 && 's'} for "
                                {filterSortOption === 'all' ? 'All' : filterSortOption.charAt(0).toUpperCase() + filterSortOption.slice(1)}"
                            </div>
                            <div>
                                <select
                                    className='form-select py-2 fs-6'
                                    style={{ minWidth: "260px", backgroundColor: "f5f5f5", border: "0px" }}
                                    value={filterSortOption}
                                    onChange={(e) => setFilterSortOption(e.target.value)}
                                >
                                    <option value="all">All product</option>
                                    <option value="New">New product</option>
                                    <option value="Sale">Sale product</option>
                                    <option value="low">Price: Low to high</option>
                                    <option value="high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {displayedProducts.map(product => (
                                <div className='col-md-3 mb-4' key={product.id}>
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
                                            <Link to={`/product/${product.id}`} className='text-decoration-none text-black'>
                                                <div className="product-content pt-3">
                                                    {product.oldprice ? (
                                                        <div className="price">
                                                            <span className="text-muted text-decoration-line-through me-2">{product.oldprice}</span>
                                                            <span className="fw-bold text-muted">{product.price}</span>
                                                        </div>
                                                    ) : (
                                                        <span className='price'>{product.price}</span>
                                                    )}
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

export default Shop