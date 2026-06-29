import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Attach JWT token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('bushido_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bushido_token')
      localStorage.removeItem('bushido_user')
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ─── Auth ───────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) =>
    client.post('/auth/register', data),
  login: (data) =>
    client.post('/auth/login', data),
  me: () => client.get('/auth/me'),
}

// ─── Products ───────────────────────────────────────────────────────
export const productsAPI = {
  list: (params) =>
    client.get('/products', { params }),
  get: (id) => client.get(`/products/${id}`),
  related: (id) => client.get(`/products/${id}/related`),
}

// ─── Bundles ────────────────────────────────────────────────────────
export const bundlesAPI = {
  list: () => client.get('/bundles'),
  get: (id) => client.get(`/bundles/${id}`),
}

// ─── Cart ────────────────────────────────────────────────────────────
export const cartAPI = {
  get: () => client.get('/cart'),
  addItem: (data) =>
    client.post('/cart/items', data),
  updateItem: (id, quantity) =>
    client.put(`/cart/items/${id}`, { quantity }),
  removeItem: (id) => client.delete(`/cart/items/${id}`),
  addBundle: (bundleId) => client.post(`/cart/bundle/${bundleId}`),
  clear: () => client.delete('/cart'),
}

// ─── Orders ─────────────────────────────────────────────────────────
export const ordersAPI = {
  place: (data) => client.post('/orders', data),
  list: () => client.get('/orders'),
  get: (id) => client.get(`/orders/${id}`),
}

// ─── Admin ───────────────────────────────────────────────────────────
export const adminAPI = {
  stats: () => client.get('/admin/stats'),
  // Products
  listProducts: () => client.get('/admin/products'),
  createProduct: (data) => client.post('/admin/products', data),
  updateProduct: (id, data) => client.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => client.delete(`/admin/products/${id}`),
  // Bundles
  listBundles: () => client.get('/admin/bundles'),
  createBundle: (data) => client.post('/admin/bundles', data),
  updateBundle: (id, data) => client.put(`/admin/bundles/${id}`, data),
  deleteBundle: (id) => client.delete(`/admin/bundles/${id}`),
  // Orders
  listOrders: () => client.get('/admin/orders'),
  updateOrderStatus: (id, status) =>
    client.put(`/admin/orders/${id}/status`, { status }),
  // Users
  listUsers: () => client.get('/admin/users'),
  updateUserRole: (id, role) =>
    client.put(`/admin/users/${id}/role`, { role }),
}

export default client
