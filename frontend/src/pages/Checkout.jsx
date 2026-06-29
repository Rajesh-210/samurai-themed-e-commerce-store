import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../api/client'
import toast from 'react-hot-toast'

const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay']

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    shipping_address: '', shipping_city: '', shipping_zip: '', shipping_country: 'US',
    payment_method: 'Credit Card', card_number: '', card_name: '', card_expiry: '', card_cvv: '',
    email: user?.email || '',
  })

  const shipping = total >= 100 ? 0 : 9.99
  const finalTotal = total + shipping
  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handlePlaceOrder = async () => {
    if (!user) { toast.error('Please login to place an order'); navigate('/login'); return }
    setLoading(true)
    try {
      await ordersAPI.place({ shipping_address: form.shipping_address, shipping_city: form.shipping_city, shipping_zip: form.shipping_zip, shipping_country: form.shipping_country, payment_method: form.payment_method })
      clearCart()
      toast.success('Order placed! The blade is yours. ⚔')
      navigate('/orders')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Could not place order. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>ENTER THE SHOP</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', flex: 1 }}>
        <div style={{ borderBottom: '1px solid #2A2A3A', padding: '2rem 0 1.5rem' }}>
          <div className="page-container">
            <h1 className="font-heading" style={{ color: '#F5E6C8', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.08em' }}>CHECKOUT</h1>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {['Shipping', 'Payment', 'Review'].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: '24px', height: '24px', background: step >= i + 1 ? '#8B0000' : '#2A2A3A', color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </span>
                  <span className="font-ui" style={{ color: step === i + 1 ? '#F5E6C8' : '#A89880', fontSize: '0.8rem' }}>{s.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="page-container" style={{ padding: '2rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            <div className="card" style={{ padding: '2rem' }}>
              {step === 1 && (
                <div>
                  <h2 className="font-heading" style={{ color: '#C9A84C', fontSize: '1rem', letterSpacing: '0.12em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Shipping Information</h2>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="warrior@dojo.com" className="input-field" style={{ marginBottom: '1rem' }} />
                  <input type="text" value={form.shipping_address} onChange={e => update('shipping_address', e.target.value)} placeholder="123 Dojo Lane" className="input-field" style={{ marginBottom: '1rem' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input type="text" value={form.shipping_city} onChange={e => update('shipping_city', e.target.value)} placeholder="Kyoto" className="input-field" />
                    <input type="text" value={form.shipping_zip} onChange={e => update('shipping_zip', e.target.value)} placeholder="10001" className="input-field" />
                  </div>
                  <select value={form.shipping_country} onChange={e => update('shipping_country', e.target.value)} className="input-field" style={{ marginBottom: '1rem', cursor: 'pointer' }}>
                    {['US','CA','GB','AU','JP','DE','FR'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={() => { if (!form.shipping_address || !form.shipping_city || !form.shipping_zip) { toast.error('Please fill all shipping fields'); return } setStep(2) }} className="btn btn-primary">CONTINUE TO PAYMENT →</button>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="font-heading" style={{ color: '#C9A84C', fontSize: '1rem', letterSpacing: '0.12em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Payment Method</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                    {PAYMENT_METHODS.map(m => (
                      <button key={m} onClick={() => update('payment_method', m)}
                        style={{ padding: '0.75rem', background: form.payment_method === m ? '#1a0005' : 'transparent', border: `1px solid ${form.payment_method === m ? '#8B0000' : '#2A2A3A'}`, color: form.payment_method === m ? '#F5E6C8' : '#A89880', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                        {m}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ flex: 1 }}>← BACK</button>
                    <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 2 }}>REVIEW ORDER →</button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="font-heading" style={{ color: '#C9A84C', fontSize: '1rem', letterSpacing: '0.12em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Review Your Order</h2>
                  <p className="font-ui" style={{ color: '#C9A84C', fontSize: '0.7rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>SHIPPING TO</p>
                  <p className="font-body" style={{ color: '#F5E6C8', fontSize: '0.95rem', marginBottom: '1rem' }}>{form.shipping_address}, {form.shipping_city}, {form.shipping_zip}, {form.shipping_country}</p>
                  <p className="font-ui" style={{ color: '#C9A84C', fontSize: '0.7rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>PAYMENT</p>
                  <p className="font-body" style={{ color: '#F5E6C8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{form.payment_method}</p>
                  <div className="divider" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                    <span className="font-heading" style={{ color: '#F5E6C8', fontWeight: 700 }}>TOTAL</span>
                    <span className="font-heading" style={{ color: '#C9A84C', fontSize: '1.2rem', fontWeight: 700 }}>${finalTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => setStep(2)} className="btn btn-ghost" style={{ flex: 1 }}>← BACK</button>
                    <button onClick={handlePlaceOrder} disabled={loading} className="btn btn-primary" style={{ flex: 2, opacity: loading ? 0.7 : 1 }}>
                      {loading ? 'FORGING ORDER...' : '⚔ PLACE ORDER'}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-heading" style={{ color: '#C9A84C', fontSize: '0.9rem', letterSpacing: '0.12em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>Order Summary</h3>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="font-body" style={{ color: '#A89880', fontSize: '0.9rem' }}>{item.name} ×{item.quantity}</span>
                  <span className="font-ui" style={{ color: '#C9A84C', fontSize: '0.85rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                <span className="font-heading" style={{ color: '#F5E6C8', fontWeight: 700 }}>Total</span>
                <span className="font-heading" style={{ color: '#C9A84C', fontSize: '1.2rem', fontWeight: 700 }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
