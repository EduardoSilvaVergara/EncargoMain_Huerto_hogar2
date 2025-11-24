import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../api';

function AdminDashboard() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [producto, setProducto] = useState({
        Productname: '',
        description: '',
        price: '',
        oldprice: '',
        tag: '',
        seller: '',
        image: '',
        secondImage: '',
        category: '',
        collection: 'Frutas Frescas'
    });

    // Helper functions igual que en ShopFrutas
    const getName = (p) =>
        p?.Productname || p?.productname || p?.name || p?.nombre || '';

    const getPriceNum = (p) => {
        if (typeof p?.price === 'number') return p.price;
        const s = String(p?.price ?? '');
        const n = Number(s.replace(/[^0-9.,]/g, '').replace('.', '').replace(',', '.'));
        return isNaN(n) ? 0 : n;
    };

    const getOldPriceNum = (p) => {
        if (!p) return 0;
        const s = String(p);
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

    // Cargar productos al montar el componente
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        try {
            const data = await getProductos();
            setProductos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            alert('Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Campos básicos
            const productoData = {
                productname: producto.Productname,
                description: producto.description,
                price: producto.price ? String(producto.price) : "0",
                category: producto.category,
                image: producto.image,
                secondImage: producto.secondImage,
                collection: producto.collection
            };

            // Solo agregar campos extra al actualizar
            if (editingId) {
                if (producto.oldprice) productoData.oldprice = String(producto.oldprice);
                if (producto.tag) productoData.tag = producto.tag;
                if (producto.seller) productoData.seller = producto.seller;
            }

            console.log("Producto a enviar:", productoData);

            if (editingId) {
                await updateProducto(editingId, productoData);
                alert('Producto actualizado exitosamente');
            } else {
                await createProducto(productoData);
                alert('Producto agregado exitosamente');
            }

            // Resetear formulario
            setProducto({
                Productname: '',
                description: '',
                price: '',
                oldprice: '',
                tag: '',
                seller: '',
                image: '',
                secondImage: '',
                category: '',
                collection: 'Frutas Frescas'
            });
            setEditingId(null);
            cargarProductos();
        } catch (error) {
            console.error("Error real:", error.response?.data || error.message);
            alert(error.response?.data?.message || 'Error al agregar producto');
        } finally {
            setLoading(false);
        }
    };




    const handleEdit = (prod) => {
        setProducto({
            Productname: getName(prod),
            description: prod.description || '',
            price: getPriceNum(prod),
            category: prod.category || '',
            image: prod.image || '',
            collection: prod.collection || 'Frutas Frescas'
        });
        setEditingId(prod.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        setLoading(true);
        try {
            await deleteProducto(id);
            alert('Producto eliminado exitosamente');
            cargarProductos();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar producto');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setProducto({
            Productname: '',
            description: '',
            price: '',
            category: '',
            image: '',
            collection: 'Frutas Frescas'
        });
        setEditingId(null);
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col-12 mb-4">
                    <h1 className="fw-bold">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard Administrador
                    </h1>
                    <p className="text-muted">Gestiona los productos de tu tienda</p>
                </div>

                {/* Formulario */}
                <div className="col-lg-5 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">
                                {editingId ? 'Editar Producto' : 'Agregar Producto'}
                            </h5>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nombre del Producto *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={producto.Productname}
                                        onChange={(e) => setProducto({ ...producto, Productname: e.target.value })}
                                        placeholder="Ej: Manzana Fuji"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Descripción *</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={producto.description}
                                        onChange={(e) => setProducto({ ...producto, description: e.target.value })}
                                        placeholder="Describe el producto..."
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Precio ($) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        value={producto.price}
                                        onChange={(e) => setProducto({ ...producto, price: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Collection (Categoría Principal) *</label>
                                    <select
                                        className="form-control"
                                        value={producto.collection}
                                        onChange={(e) => setProducto({ ...producto, collection: e.target.value })}
                                    >
                                        <option value="Frutas Frescas">Frutas Frescas</option>
                                        <option value="Verduras">Verduras</option>
                                        <option value="Lácteos">Lácteos</option>
                                        <option value="Orgánicos">Orgánicos</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Categoría (opcional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={producto.category}
                                        onChange={(e) => setProducto({ ...producto, category: e.target.value })}
                                        placeholder="Ej: Premium, Orgánico"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tag (opcional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={producto.tag}
                                        onChange={(e) => setProducto({ ...producto, tag: e.target.value })}
                                        placeholder="Ej: New, Oferta"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Precio Anterior (opcional)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        value={producto.oldprice}
                                        onChange={(e) => setProducto({ ...producto, oldprice: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Vendedor (opcional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={producto.seller}
                                        onChange={(e) => setProducto({ ...producto, seller: e.target.value })}
                                        placeholder="Nombre del vendedor"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Segunda Imagen (opcional)</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        value={producto.secondImage}
                                        onChange={(e) => setProducto({ ...producto, secondImage: e.target.value })}
                                        placeholder="https://ejemplo.com/imagen2.jpg"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">URL de Imagen (opcional)</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        value={producto.image}
                                        onChange={(e) => setProducto({ ...producto, image: e.target.value })}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                    {producto.image && (
                                        <div className="mt-2">
                                            <img
                                                src={producto.image}
                                                alt="Vista previa"
                                                className="img-thumbnail"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        onClick={handleSubmit}
                                        className="btn btn-success"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <i className={`bi ${editingId ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
                                                {editingId ? 'Actualizar Producto' : 'Agregar Producto'}
                                            </>
                                        )}
                                    </button>

                                    {editingId && (
                                        <button
                                            className="btn btn-secondary"
                                            onClick={handleCancel}
                                        >
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Productos */}
                <div className="col-lg-7">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Productos Registrados</h5>
                            <span className="badge bg-light text-dark">{productos.length} productos</span>
                        </div>
                        <div className="card-body p-0">
                            {loading && productos.length === 0 ? (
                                <div className="text-center p-5">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                    <p className="mt-3 text-muted">Cargando productos...</p>
                                </div>
                            ) : productos.length === 0 ? (
                                <div className="text-center p-5">
                                    <i className="bi bi-inbox fs-1 text-muted"></i>
                                    <p className="mt-3 text-muted">No hay productos registrados</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Collection</th>
                                                <th>Precio</th>
                                                <th>OldPrice</th>
                                                <th>Tag</th>
                                                <th>Seller</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productos.map((prod) => (
                                                <tr key={prod.id}>
                                                    <td className="text-muted">#{prod.id}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {prod.image && (
                                                                <img
                                                                    src={prod.image}
                                                                    alt={getName(prod)}
                                                                    className="me-2"
                                                                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                                                />
                                                            )}
                                                            <strong>{getName(prod)}</strong>
                                                        </div>
                                                    </td>
                                                    <td><span className="badge bg-info">{prod.collection}</span></td>
                                                    <td className="fw-bold text-success">${formatCLP(getPriceNum(prod))}</td>
                                                    <td className="text-muted">{prod.oldprice ? `$${formatCLP(getOldPriceNum(prod.oldprice))}` : '-'}</td>
                                                    <td>{prod.tag || '-'}</td>
                                                    <td>{prod.seller || '-'}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={() => handleEdit(prod)}
                                                            title="Editar"
                                                            disabled={loading}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDelete(prod.id)}
                                                            title="Eliminar"
                                                            disabled={loading}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;