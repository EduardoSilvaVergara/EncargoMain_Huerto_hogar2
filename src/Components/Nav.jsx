import React from 'react'

function Nav() {
  return (
    <>
      {/* Navbar */}
            <div className="nav w-100 fixed-top bg-white shadow-sm">
                <nav className="navbar navbar-expand-lg py-3 justify-content-between align-items-center w-100 nav-wrapper">
                    {/*  Toggle Button */}
                    <button
                        className="navbar-toggler"
                        type='button'
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls='navbarNav'
                        aria-expanded="false"
                        aria-label='Toggle navigation'
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Logo */}
                    <Link to='/' className='navbar-brand mx-auto order-0 d-lg-none d-flex'>
                        <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>Huerto Hogar</h2>
                    </Link>
                    {/* Icon */}
                    <ul className="d-lg-none d-flex align-items-center mt-2 ">
                        <li className="nav-item p-2 mt-3">
                            <Link to='/'>
                                <i className="bi bi-search fs-5 text-dark"></i>
                            </Link>
                        </li>
                        <li className="nav-item p-2 mt-3">
                            <a href="#" data-bs-toggle='modal' data-bs-target='#signupModal'>
                                <i className="bi bi-person fs-5 text-dark"></i>
                            </a>
                        </li>
                        <li className="nav-item position-relative p-2 mt-3">
                            <Link to='/wishlist'>
                                <i className="bi bi-heart fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">{wishlistCount}</span>
                            </Link>
                        </li>
                        <li className="nav-item position-relative p-2 mt-3">
                            <Link to='/cart'>
                                <i className="bi bi-cart3 fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">{cartCount}</span>
                            </Link>
                        </li>
                    </ul>

                    {/* Main navbar */}

                    <div className="collapse navbar-collapse justify-content-between" id='navbarNav'>
                        {/* Left nav link */}
                        <ul className="navbar-nav nav-menu align-items-center gap-4">
                            <li className="nav-item">
                                <Link to='/' className='nav-link'>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about' className='nav-link'>Acerca de</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="shopDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Catalogo
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                                    <li><Link className="dropdown-item" to="/shopFrutas">Frutas</Link></li>
                                    <li><Link className="dropdown-item" to="/shopVerduras">Verduras</Link></li>
                                    <li><Link className="dropdown-item" to="/shopLacteos">Productos Lacteos</Link></li>
                                    <li><Link className="dropdown-item" to="/shopOrg">Productos organicos</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to='/stores' className='nav-link'>Tiendas</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/blog' className='nav-link'>Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/contact' className='nav-link'>Contacto</Link>
                            </li>
                        </ul>

                        {/* Center Logo */}
                        <Link to='/' className='navbar-brand order-0 d-none d-lg-flex'>
                            <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>Huerto Hogar</h2>
                        </Link>

                        {/* Right Icon*/}
                        <ul className="navbar-nav d-none d-lg-flex align-items-center gap-4">
                            <li className="nav-item">
                                <a href="#">
                                    <i className="bi bi-search fs-5 text-dark"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a to='/' data-bs-toggle='modal' data-bs-target='#signupModal'>
                                    <i className="bi bi-person fs-5 text-dark"></i>
                                </a>
                            </li>
                            <li className="nav-item position-relative">
                                <Link to='/wishlist'>
                                    <i className="bi bi-heart fs-5 text-dark"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">{wishlistCount}</span>
                                </Link>
                            </li>
                            <li className="nav-item position-relative">
                                <Link to='/cart'>
                                    <i className="bi bi-cart fs-5 text-dark"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">{cartCount}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
    </>
  )
}

export default Nav