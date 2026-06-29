import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../api/client'

const STATUS_COLORS = { pending: '#C9A84C', processing: '#4a90d9', shipped: '#8B0000', delivered: '#4ade80', cancelled: '#A89880' }

const MOCK_ORDERS = [
  { id: 1001, created_at: '2026-01-15T10:30:00Z', status: 'delivered', total: 339.97, shipping_address: '123 Dojo Lane, Kyoto, JP', items: [{ name: 'Oni Slayer', quantity: 1, price: 299.99 }, { name: 'Katana Wall Mount', quantity: 1, price: 49.99 }] },
  { id: 1002, created_at: '2026-02-03T14:15:00Z', status: 'shipped', total: 179.99, shipping_address: '456 Warrior Way, Tokyo, JP', items: [{ name: "The Warrior's Identity Bundle", quantity: 1, price: 179.99 }] },
]

export default function Orders() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!isLoading && !user) navigate('/login', { state: { from: { pathname: '/orders' } } })
  }, [user, isLoading, navigate])

  useEffect(() => {
    if (!user) return
    ordersAPI.list()
      .then(res => setOrders(Array.isArray(res?.data?.orders) ? res.data.orders : Array.isArray(res?.data) ? res.data : []))
      .catch(() => setOrders(MOCK_ORDERS))
      .finally(() => setLoading(false))
  }, [user])

  if (isLoading || !user) return null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', flex: 1 }}>
        <div style={{ borderBottom: '1px solid #2A2A3A', padding: '2.5rem 0 2rem' }}>
          <div className="page-container">
            <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.5rem' }}>YOUR BATTLES</p>
            <h1 className="font-heading" style={{ color: '#F5E6C8', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.08em' }}>ORDER HISTORY</h1>
          </div>
        </div>
        <div className="page-container" style={{ padding: '2rem 1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ color: '#C9A84C', fontSize: '2rem', animation: 'katanaFloat 2s ease-in-out infinite' }}>⚔</div>
              <p className="font-ui" style={{ color: '#A89880', marginTop: '1rem', letterSpacing: '0.15em' }}>LOADING ORDERS...</p>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚔</div>
              <h2 className="font-heading" style={{ color: '#A89880', fontSize: '1.5rem', marginBottom: '1rem' }}>No orders yet</h2>
              <Link to="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>⚔ ENTER THE SHOP</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.map(order => (
                <div key={order.id} className="card">
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', flexWrap: 'wrap', gap: '0.75rem' }}
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <div><p className="font-ui" style={{ color: '#A89880', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>ORDER</p><p className="font-heading" style={{ color: '#F5E6C8', fontSize: '1rem', fontWeight: 600 }}>#{order.id}</p></div>
                      <div><p className="font-ui" style={{ color: '#A89880', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>DATE</p><p className="font-body" style={{ color: '#F5E6C8', fontSize: '0.9rem' }}>{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p></div>
                      <div><p className="font-ui" style={{ color: '#A89880', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>TOTAL</p><p className="font-heading" style={{ color: '#C9A84C', fontSize: '1rem', fontWeight: 700 }}>${parseFloat(order.total).toFixed(2)}</p></div>
                      <div><p className="font-ui" style={{ color: '#A89880', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>STATUS</p><span className="font-ui" style={{ color: STATUS_COLORS[order.status] || '#A89880', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, padding: '0.2rem 0.5rem', border: `1px solid ${STATUS_COLORS[order.status] || '#2A2A3A'}` }}>{order.status}</span></div>
                    </div>
                    <span style={{ color: '#A89880', fontSize: '1.2rem', transition: 'transform 0.2s', transform: expanded === order.id ? 'rotate(180deg)' : 'none' }}>▼</span>
                  </div>
                  {expanded === order.id && (
                    <div style={{ borderTop: '1px solid #2A2A3A', padding: '1.5rem' }}>
                      {(order.items || []).map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span className="font-body" style={{ color: '#F5E6C8', fontSize: '0.95rem' }}>{item.name || item.product_name} × {item.quantity}</span>
                          <span className="font-ui" style={{ color: '#C9A84C', fontSize: '0.9rem' }}>${(parseFloat(item.price || item.unit_price || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
