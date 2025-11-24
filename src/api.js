import axios from "axios"

console.log('🔥 VITE_API_URL:', import.meta.env.VITE_API_URL)
console.log('🔥 MODE:', import.meta.env.MODE)

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/v1`
    : "/api/v1",
})

console.log('🔥 baseURL final:', api.defaults.baseURL)

api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// ============ USUARIOS ============
export const getUsuarios = async () => {
  const res = await api.get("/usuario")
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? [])
  return data
}

export const getUsuario = (id) => api.get(`/usuario/${id}`)

export const createUsuario = (payload) => api.post("/usuario", payload)

export const updateUsuario = (id, payload) => api.put(`/usuario/${id}`, payload)

export const deleteUsuario = (id) => api.delete(`/usuario/${id}`)

// ⭐ NUEVA FUNCIÓN DE LOGIN
export const loginUsuario = async (credentials) => {
  const res = await api.post("/usuario/login", credentials)
  return res.data
}

// ============ PRODUCTOS ============
export const getProductos = async (collection = null) => {
  const url = collection ? `/producto?collection=${encodeURIComponent(collection)}` : "/producto"
  const res = await api.get(url)
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? [])
  return data
}

export const getProducto = (id) => api.get(`/producto/${id}`)

export const createProducto = (payload) => api.post("/producto", payload)

export const updateProducto = (id, payload) => api.put(`/producto/${id}`, payload)

export const deleteProducto = (id) => api.delete(`/producto/${id}`)

// ============ OTROS ============
export const createMensaje = (payload) => api.post("/mensaje", payload)

export const createBoletin = (email) => api.post("/boletin", { email })

export const createCheckout = (payload) => api.post("/checkout", payload)

export default api