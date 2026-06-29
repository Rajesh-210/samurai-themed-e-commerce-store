import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { adminAPI } from '../api/client'
import toast from 'react-hot-toast'

const TABS = [
  { key: 'dashboard', label: 'DASHBOARD' },
  { key: 'products', label: 'PRODUCTS' },
  { key: 'orders', label: 'ORDERS' },
  { key: 'users', label: 'USERS' },
  { key: 'bundles', label: 'BUNDLES' },
]

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const MOCK_STATS = { total_users: 2847, total_orders: 1293, total_revenue: 412589.44, total_products: 20, pending_orders: 47, low_stock_products: 5 }

export default function Admin() {
  const { user, isAdmin, isLoading } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) navigate('/')
  }, [user, isAdmin, isLoading, navigate])

  useEffect(() => {
    if (!isAdmin) return
    adminAPI.stats().then(r => setStats(r.data)).catch(() => setStats(MOCK_STATS))
  }, [isAdmin])

  useEffect(() => {
    if (!isAdmin) return
    if (tab === 'products') { setLoading(true); adminAPI.listProducts().then(r => setProducts(Array.isArray(r?.data?.products) ? r.data.products : Array.isArray(r?.data) ? r.data : [])).catch(() => setProducts([])).finally(() => setLoading(false)) }
    else if (tab === 'orders') { setLoading(true); adminAPI.listOrders().then(r => setOrders(Array.isArray(r?.data?.orders) ? r.data.orders : Array.isArray(r?.data) ? r.data : [])).catch(() => setOrders([])).finally(() => setLoading(false)) }
    else if (tab === 'users') { setLoading(true); adminAPI.listUsers().then(r => setUsers(Array.isArray(r?.data?.users) ? r.data.users : Array.isArray(r?.data) ? r.data : [])).catch(() => setUsers([])).finally(() => setLoading(false)) }
  }, [tab, isAdmin])

  const handleStatusChange = async (orderId, status) => {
    try { await adminAPI.updateOrderStatus(orderId, status); setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o)); toast.success('Order status updated') } catch { toast.error('Failed to update status') }
  }

  const handleRoleChange = async (userId, role) => {
    try { await adminAPI.updateUserRole(userId, role); setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u)); toast.success('User role updated') } catch { toast.error('Failed to update role') }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return
    try { await adminAPI.deleteProduct(id); setProducts(prev => prev.filter(p => p.id !== id)); toast.success('Product deleted') } catch { toast.error('Failed to delete product') }
  }

  if (isLoading || !isAdmin) return null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', flex: 1 }}>
        <div style={{ background: 'linear-gradient(135deg, #1a0005, #0a0009)', borderBottom: '1px solid #8B0000', padding: '1.5rem 0' }}>
          <div className="page-container">
            <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.7rem', letterSpacing: '0.3em', marginBottom: '0.3rem' }}>RESTRICTED ACCESS</p>
            <h1 className="font-heading" style={{ color: '#F5E6C8', fontSize: '1.8rem', fontWeight: 700, letterSpacing: '0.08em' }}>ADMIN COMMAND CENTER</h1>
          </div>
        </div>
        <div style={{ background: '#0d0012', borderBottom: '1px solid #2A2A3A', overflowX: 'auto' }}>
          <div className="page-container">
            <div style={{ display: 'flex' }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  style={{ background: 'none', border: 'none', borderBottom: tab === t.key ? '2px solid #8B0000' : '2px solid transparent', color: tab === t.key ? '#F5E6C8' : '#A89880', padding: '1rem 1.5rem', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="page-container" style={{ padding: '2rem 1.5rem' }}>
          {tab === 'dashboard' && stats && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {[{ label: 'TOTAL REVENUE', value: `$${stats.total_revenue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, color: '#C9A84C' }, { label: 'TOTAL ORDERS', value: stats.total_orders?.toLocaleString(), color: '#F5E6C8' }, { label: 'TOTAL USERS', value: stats.total_users?.toLocaleString(), color: '#F5E6C8' }, { label: 'PRODUCTS', value: stats.total_products, color: '#F5E6C8' }, { label: 'PENDING ORDERS', value: stats.pending_orders, color: '#C9A84C' }, { label: 'LOW STOCK', value: stats.low_stock_products, color: '#8B0000' }].map((stat, i) => (
                  <div key={i} className="card" style={{ padding: '1.5rem' }}>
                    <p className="font-ui" style={{ color: '#A89880', fontSize: '0.7rem', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{stat.label}</p>
                    <p className="font-heading" style={{ color: stat.color, fontSize: '1.8rem', fontWeight: 700 }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'products' && (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td style={{ color: '#A89880' }}>#{p.id}</td>
                      <td>{p.name}</td>
                      <td style={{ color: '#A89880' }}>{p.category}</td>
                      <td style={{ color: '#C9A84C' }}>${parseFloat(p.price).toFixed(2)}</td>
                      <td><span style={{ color: p.stock <= 5 ? '#8B0000' : p.stock <= 10 ? '#C9A84C' : '#4ade80' }}>{p.stock}</span></td>
                      <td style={{ color: '#C9A84C' }}>★ {parseFloat(p.rating).toFixed(1)}</td>
                      <td><button onClick={() => handleDeleteProduct(p.id)} style={{ background: '#1a0005', color: '#8B0000', border: '1px solid #8B0000', padding: '0.3rem 0.75rem', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.75rem' }}>DELETE</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'orders' && (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ color: '#A89880' }}>#{o.id}</td>
                      <td>{o.user_email || o.user?.email || 'Guest'}</td>
                      <td style={{ color: '#A89880' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td style={{ color: '#C9A84C' }}>${parseFloat(o.total).toFixed(2)}</td>
                      <td>
                        <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)}
                          style={{ background: '#0a0009', border: '1px solid #2A2A3A', color: '#F5E6C8', padding: '0.25rem 0.5rem', fontSize: '0.8rem', fontFamily: 'Rajdhani, sans-serif', cursor: 'pointer' }}>
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'users' && (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td style={{ color: '#A89880' }}>#{u.id}</td>
                      <td>{u.username}</td>
                      <td style={{ color: '#A89880' }}>{u.email}</td>
                      <td><span style={{ color: u.role === 'admin' ? '#8B0000' : '#C9A84C', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>{u.role}</span></td>
                      <td style={{ color: '#A89880' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td>
                        <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)}
                          style={{ background: '#0a0009', border: '1px solid #2A2A3A', color: '#F5E6C8', padding: '0.25rem 0.5rem', fontSize: '0.8rem', fontFamily: 'Rajdhani, sans-serif', cursor: 'pointer' }}>
                          <option value="user">user</option><option value="admin">admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'bundles' && (
            <div>
              <p className="font-body" style={{ color: '#A89880', fontSize: '1rem', marginBottom: '1rem' }}>Bundle management is available when the API is connected.</p>
              {['The Ronin\'s Arsenal — $299.99', 'The Warrior\'s Identity — $179.99', 'The Dojo Master — $349.99', 'The Shadow Collector — $849.99'].map((b, i) => (
                <div key={i} className="card" style={{ padding: '1rem 1.5rem', marginBottom: '0.75rem' }}>
                  <span className="font-heading" style={{ color: '#F5E6C8', fontSize: '0.95rem' }}>{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
