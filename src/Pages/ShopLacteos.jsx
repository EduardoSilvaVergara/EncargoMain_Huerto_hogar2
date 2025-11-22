// frontend/src/pages/ShopLacteos.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getProductos } from '../api'

function ShopLacteos() {
  const [filterSortOption, setFilterSortOption] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getName = (p) => p?.Productname || p?.productname || p?.name || p?.nombre || ''
  const getPriceNum = (p) => {
    if (typeof p?.price === 'number') return p.price
    const s = String(p?.price ?? '')
    const n = Number(s.replace(/[^0-9.,]/g, '').replace('.', '').replace(',', '.'))
    return isNaN(n) ? 0 : n
  }
  const getOldPriceNum = (p) => {
    if (typeof p?.oldprice === 'number') return p.oldprice
    const s = String(p?.oldprice ?? '')
    const n = Number(s.replace(/[^0-9.,]/g, '').replace('.', '').replace(',', '.'))
    return isNaN(n) ? null : n
  }
  const getSecondImage = (p) => p?.secondImage || p?.secondimage || p?.image2 || p?.image
  const formatCLP = (n) => { try { return n.toLocaleString('es-CL') } catch { return String(n) } }

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProductos('Lacteos')
        setProductos(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
        setError('Error al cargar productos')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const displayedProducts = useMemo(() => {
    let filtered = [...productos]
    if (['new', 'sale', 'New', 'Sale'].includes(filterSortOption)) {
      filtered = filtered.filter(p => (p.tag || '').toString().toLowerCase() === filterSortOption.toLowerCase())
    }
    if (filterSortOption === 'low') filtered.sort((a, b) => getPriceNum(a) - getPriceNum(b))
    if (filterSortOption === 'high') filtered.sort((a, b) => getPriceNum(b) - getPriceNum(a))
    if (searchTerm.trim() !== '') filtered = filtered.filter(p => getName(p).toLowerCase().includes(searchTerm.toLowerCase()))
    return filtered
  }, [productos, filterSortOption, searchTerm])

  const addToWishlist = (product) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || []
    if (!existing.some(p => p.id === product.id)) {
      const updated = [...existing, product]
      localStorage.setItem('wishlist', JSON.stringify(updated))
      window.dispatchEvent(new Event('wishlistUpdated'))
      toast.success(`${getName(product) || 'Producto'} agregado a tu lista de deseos`)
    } else {
      toast.info(`${getName(product) || 'Producto'} ya está en tu lista de deseos`)
    }
  }

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || []
    const productWithCategory = { ...product, category: 'lacteos' }
    const alreadyInCart = existing.find(p => p.id === product.id && p.category === productWithCategory.category)
    if (!alreadyInCart) {
      const updatedProduct = { ...productWithCategory, quantity: 1 }
      const updatedCart = [...existing, updatedProduct]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      window.dispatchEvent(new Event('cartUpdated'))
      toast.success(`${getName(product) || 'Producto'} ¡agregado a tu carrito!`)
    } else {
      const updatedCart = existing.map(p =>
        p.id === product.id && p.category === productWithCategory.category
          ? { ...p, quantity: (p.quantity || 1) + 1 }
          : p
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      window.dispatchEvent(new Event('cartUpdated'))
      toast.info(`${getName(product) || 'Producto'} ¡cantidad incrementada en tu carrito!`)
    }
  }

  if (loading) return <p className="text-center">Cargando productos...</p>
  if (error) return <p className="text-center" style={{ color: 'red' }}>Error: {error}</p>

  return (
    <>
      <ol className="section-banner py-3 position-relative">
        <li className="position-relative"><Link to='/'>Inicio</Link></li>
        <li className="position-relative active"><span className="ps-5">Productos</span></li>
      </ol>

      <div className="shop-container">
        <div className="container">
          <h1 className="text-center py-4 fw-semibold">🥛 Lácteos 🥛</h1>

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
                {filterSortOption === 'all' ? 'Todos' : filterSortOption}
                "
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

          <div className="row">
            {displayedProducts.length > 0 ? (
              displayedProducts.map(product => {
                const name = getName(product)
                const price = getPriceNum(product)
                const oldprice = getOldPriceNum(product)
                const img1 = product?.image
                const img2 = getSecondImage(product)
                return (
                  <div className='col-md-3 mb-4' key={product.id}>
                    <div className="product-item mb-5 text-center position-relative">
                      <div className="product-image w-100 position-relative overflow-hidden">
                        <img src={img1} className='img-fluid' alt={name || 'producto'} />
                        {img2 && <img src={img2} className='img-fluid' alt="" />}
                        <div className="product-icons gap-3">
                          <div className="product-icon" title='Add to Wishlist' onClick={() => addToWishlist(product)}>
                            <i className="bi bi-heart fs-5"></i>
                          </div>
                          <div className="product-icon" title='Add to Cart' onClick={() => addToCart(product)}>
                            <i className="bi bi-cart3 fs-5"></i>
                          </div>
                        </div>
                        {!!product?.tag && (
                          <span className={`tag badge text-white ${product.tag === 'New' ? 'bg-danger' : 'bg-success'}`}>
                            {product.tag}
                          </span>
                        )}
                      </div>
                      <Link to={`/productLacteos/${product.id}`} className='text-decoration-none text-black'>
                        <div className="product-content pt-3">
                          {oldprice ? (
                            <div className="price">
                              <span className="text-muted text-decoration-line-through me-2">
                                ${formatCLP(oldprice)}
                              </span>
                              <span className="fw-bold text-muted">
                                ${formatCLP(price)}
                              </span>
                            </div>
                          ) : (
                            <span className='price'>${formatCLP(price)}</span>
                          )}
                          <h3 className="title pt-1">{name || 'Producto'}</h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-center text-muted fs-5">No se encontraron productos que coincidan con tu búsqueda.</p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default ShopLacteos
