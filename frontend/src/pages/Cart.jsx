import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { getProductSVG } from '../components/ProductSVGs'

export default function Cart() {
  const { items, total, updateItem, removeItem } = useCart()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', flex: 1 }}>
        <div style={{ borderBottom: '1px solid #2A2A3A', padding: '2rem 0 1.5rem' }}>
          <div className="page-container">
            <h1 className="font-heading" style={{ color: '#F5E6C8', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.08em' }}>YOUR ARSENAL</h1>
            <p className="font-ui" style={{ color: '#A89880', fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{items.length === 0 ? 'EMPTY' : `${items.length} ITEM${items.length > 1 ? 'S' : ''}`}</p>
          </div>
        </div>
        <div className="page-container" style={{ padding: '2rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚔</div>
              <h2 className="font-heading" style={{ color: '#A89880', fontSize: '1.5rem', marginBottom: '1rem' }}>Your arsenal is empty</h2>
              <p className="font-body" style={{ color: '#A89880', marginBottom: '2rem' }}>A warrior without weapons is merely a wanderer. Begin your collection.</p>
              <Link to="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>⚔ ENTER THE SHOP</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              <div>
                {items.map(item => (
                  <div key={item.id} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ width: '100px', flexShrink: 0, border: '1px solid #2A2A3A' }}>
                      <div style={{ aspectRatio: '4/3', background: '#0a0009' }}>{getProductSVG(item.image_key || item.name, item.name)}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 className="font-heading" style={{ color: '#F5E6C8', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h3>
                      <p className="font-ui" style={{ color: '#C9A84C', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>${item.price?.toFixed(2)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <button className="qty-btn" onClick={() => updateItem(item.id, item.quantity - 1)}>−</button>
                          <input type="number" value={item.quantity} onChange={e => updateItem(item.id, parseInt(e.target.value) || 1)} className="qty-input" />
                          <button className="qty-btn" onClick={() => updateItem(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <span className="font-ui" style={{ color: '#A89880', fontSize: '0.85rem' }}>Subtotal: <span style={{ color: '#F5E6C8' }}>${(item.price * item.quantity).toFixed(2)}</span></span>
                        <button onClick={() => removeItem(item.id)} className="font-ui" style={{ background: 'none', border: 'none', color: '#8B0000', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.08em', marginLeft: 'auto' }}>✕ REMOVE</button>
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="/shop" className="font-ui" style={{ color: '#A89880', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>← CONTINUE SHOPPING</Link>
              </div>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h2 className="font-heading" style={{ color: '#C9A84C', fontSize: '1rem', letterSpacing: '0.12em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>Order Summary</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="font-ui" style={{ color: '#A89880', fontSize: '0.9rem' }}>Subtotal</span>
                  <span className="font-ui" style={{ color: '#F5E6C8', fontSize: '0.9rem', fontWeight: 600 }}>${total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="font-ui" style={{ color: '#A89880', fontSize: '0.9rem' }}>Shipping</span>
                  <span className="font-ui" style={{ color: total >= 100 ? '#4ade80' : '#F5E6C8', fontSize: '0.9rem' }}>{total >= 100 ? 'FREE' : '$9.99'}</span>
                </div>
                <div className="divider" />
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0 1.5rem' }}>
                  <span className="font-heading" style={{ color: '#F5E6C8', fontWeight: 700 }}>Total</span>
                  <span className="font-heading" style={{ color: '#C9A84C', fontSize: '1.3rem', fontWeight: 700 }}>${(total + (total >= 100 ? 0 : 9.99)).toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none', fontSize: '0.9rem', display: 'block', textAlign: 'center' }}>⚔ PROCEED TO CHECKOUT</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
