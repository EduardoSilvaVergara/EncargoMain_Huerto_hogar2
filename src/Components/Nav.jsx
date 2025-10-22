import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [user, setUser] = useState(null); // Estado del usuario logueado

    const updateCounts = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(totalCartItems);
        setWishlistCount(wishlist.length);
    };

    useEffect(() => {
        updateCounts();
        const handleCartUpdate = () => updateCounts();
        const handleWishlistUpdate = () => updateCounts();
        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        // Cargar usuario desde localStorage
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) setUser(savedUser);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
        };
    }, []);

    // Función de login
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const savedUser = { name: "Usuario", email, password };
        localStorage.setItem('user', JSON.stringify(savedUser));
        setUser(savedUser);
        // Cerrar modal
        window.bootstrap.Modal.getInstance(document.getElementById('signinModal')).hide();
    };

    // Función de registro
    const handleSignup = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const newUser = { name, email, password };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        window.bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
    };

    // Función logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <>
            {/* Navbar */}
            <div className="nav w-100 fixed-top bg-white shadow-sm">
                <nav className="navbar navbar-expand-lg py-3 justify-content-between align-items-center w-100 nav-wrapper" data-testid="navbar">
                    <button className="navbar-toggler" type='button' data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Logo movil */}
                    <Link to='/' className='navbar-brand mx-auto order-0 d-lg-none d-flex' data-testid="nav-logo">
                        <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>Huerto Hogar</h2>
                    </Link>

                    {/* Main navbar */}
                    <div className="collapse navbar-collapse justify-content-between" id='navbarNav'>
                        <ul className="navbar-nav nav-menu align-items-center gap-4">
                            <li className="nav-item"><Link to='/' className='nav-link'>Inicio</Link></li>
                            <li className="nav-item"><Link to='/about' className='nav-link'>Acerca de</Link></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="shopDropdown" data-bs-toggle="dropdown">Catálogo</a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/shopFrutas">Frutas</Link></li>
                                    <li><Link className="dropdown-item" to="/shopVerduras">Verduras</Link></li>
                                    <li><Link className="dropdown-item" to="/shopLacteos">Lácteos</Link></li>
                                    <li><Link className="dropdown-item" to="/shopOrg">Orgánicos</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item"><Link to='/stores' className='nav-link'>Tiendas</Link></li>
                            <li className="nav-item"><Link to='/blog' className='nav-link'>Blog</Link></li>
                            <li className="nav-item"><Link to='/contact' className='nav-link'>Contacto</Link></li>
                        </ul>

                        {/* Logo desktop */}
                        <Link to='/' className='navbar-brand order-0 d-none d-lg-flex'>
                            <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>Huerto Hogar</h2>
                        </Link>

                        {/* Icons */}
                        <ul className="navbar-nav d-none d-lg-flex align-items-center gap-4">
                            {/* <li className="nav-item p-0 mt-0">
                                <button className="btn p-0 border-0 bg-transparent">
                                    <i className="bi bi-search fs-5 text-dark"></i> </button>
                            </li> */}
                            {!user ? (
                                <li className="nav-item">
                                    <a href="#" data-bs-toggle='modal' data-bs-target='#signinModal' data-testid="signin-link">
                                        <i className="bi bi-person fs-5 text-dark"></i>
                                    </a>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-dark" href="#" id="userDropdown" data-bs-toggle="dropdown">
                                        <i className="bi bi-person-circle fs-5"></i> {user.name}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#accountModal" href="#">Mi cuenta</a></li>
                                        <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar sesión</button></li>
                                    </ul>
                                </li>
                            )}

                            <li className="nav-item position-relative">
                                <Link to='/wishlist' data-testid="wishlist-link">
                                    <i className="bi bi-heart fs-5 text-dark"></i>
                                    <span data-testid="wishlist-count" className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">{wishlistCount}</span>
                                </Link>
                            </li>
                            <li className="nav-item position-relative">
                                <Link to='/cart' data-testid="cart-link">
                                    <i className="bi bi-cart fs-5 text-dark"></i>
                                    <span data-testid="cart-count" className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">{cartCount}</span>
                                </Link>
                            </li>
                        </ul>

                        {/* Iconos mobile */}
                        <ul className="d-lg-none d-flex align-items-center p-3 mt-2 gap-3">
                            {/* Buscador */}
                            {/* <li className="nav-item">
                                <button className="btn p-0 border-0 bg-transparent">
                                    <i className="bi bi-search fs-5 text-dark"></i>
                                </button>
                            </li> */}

                            {/* Usuario */}
                            <li className="nav-item">
                                {!user ? (
                                    <a href="#" data-bs-toggle='modal' data-bs-target='#signinModal'>
                                        <i className="bi bi-person fs-5 text-dark"></i>
                                    </a>
                                ) : (
                                    <a href="#" data-bs-toggle='dropdown'>
                                        <i className="bi bi-person-circle fs-5 text-dark"></i>
                                    </a>
                                )}
                            </li>

                            {/* Wishlist */}
                            <li className="nav-item position-relative">
                                <Link to='/wishlist'>
                                    <i className="bi bi-heart fs-5 text-dark"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">{wishlistCount}</span>
                                </Link>
                            </li>

                            {/* Carrito */}
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



            {/* Modal Registrarse */}
            <div className="modal fade" id='signupModal' tabIndex='-1' aria-hidden='true' role="dialog" aria-labelledby="signupModalLabel" data-testid="signupModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4">
                        <div className="modal-header border-0">
                            <h5 id="signupModalLabel" className="modal-title fw-bold">Registrarse</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label>Nombre</label>
                                    <input name="name" type="text" className="form-control" placeholder='Ingresa Tu Nombre' required data-testid="signup-name" />
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input name="email" type="email" className="form-control" placeholder='Ingresa Tu Email' required data-testid="signup-email" />
                                </div>
                                <div className="mb-3">
                                    <label>Contraseña</label>
                                    <input name="password" type="password" className="form-control" placeholder='Ingresa Tu Contraseña' required data-testid="signup-password" />
                                </div>
                                <p className="text-muted">
                                    <input type="checkbox" className='m-1' />
                                    Al registrarte, aceptas nuestros <a href="#" className='text-success'>Términos</a> y <a href="#" className='text-success'>Política de Privacidad</a>.
                                </p>
                                <button type='submit' className='btn btn-dark w-100' data-testid="signup-button">Registrarse</button>
                            </form>
                            <div className="text-center mt-3">
                                <p>¿Ya tienes una cuenta? <a href="#" className='text-success fw-bold' data-bs-toggle="modal" data-bs-target="#signinModal" data-bs-dismiss="modal">Iniciar sesión</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Iniciar Sesión */}
            <div className="modal fade" id="signinModal" tabIndex="-1" aria-hidden="true" role="dialog" aria-label="Iniciar Sesión" data-testid="signinModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">Iniciar Sesión</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input name="email" type="email" className="form-control" placeholder="Ingresa Tu Email" required data-testid="login-email" />
                                </div>
                                <div className="mb-3">
                                    <label>Contraseña</label>
                                    <input name="password" type="password" className="form-control" placeholder="Ingresa Tu Contraseña" required data-testid="login-password" />
                                </div>
                                <p className="text-end">
                                    <a href="#" className='text-success' data-bs-toggle="modal" data-bs-target="#recoverModal" data-bs-dismiss="modal">¿Olvidaste tu contraseña?</a>
                                </p>
                                <button type="submit" className="btn btn-dark w-100" data-testid="login-button">Iniciar Sesión</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <p>¿No tienes una cuenta? <a href="#" className="text-success fw-bold" data-bs-toggle="modal" data-bs-target="#signupModal" data-bs-dismiss="modal">Registrarse</a></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Recuperar Contraseña */}
            <div className="modal fade" id="recoverModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">Recuperar Contraseña</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Ingresa tu email" required />
                                </div>
                                <button type="submit" className="btn btn-dark w-100">Enviar enlace de recuperación</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal Mi Cuenta */}
            <div className="modal fade" id="accountModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">Mi Cuenta</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const name = e.target.name.value;
                            const password = e.target.password.value;
                            const updatedUser = { ...user, name, password };
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                            setUser(updatedUser);
                            window.bootstrap.Modal.getInstance(document.getElementById('accountModal')).hide();
                        }}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Nombre</label>
                                    <input name="name" type="text" className="form-control" defaultValue={user?.name || ''} required />
                                </div>
                                <div className="mb-3">
                                    <label>Contraseña</label>
                                    <input name="password" type="password" className="form-control" defaultValue={user?.password || ''} required />
                                </div>
                                <button type="submit" className="btn btn-dark w-100">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nav;
