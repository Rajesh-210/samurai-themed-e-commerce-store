import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../api/client'
import { useCart } from '../context/CartContext'
import { getProductSVG } from '../components/ProductSVGs'
import { MOCK_ALL_PRODUCTS } from '../data/mockProducts'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setQuantity(1)
      try {
        const [pRes, rRes] = await Promise.all([productsAPI.get(id), productsAPI.related(id)])
        setProduct(pRes?.data && typeof pRes.data === 'object' && !Array.isArray(pRes.data) ? pRes.data : null)
        setRelated(Array.isArray(rRes?.data?.products) ? rRes.data.products : Array.isArray(rRes?.data) ? rRes.data : [])
      } catch {
        const mock = MOCK_ALL_PRODUCTS.find(p => p.id === parseInt(id))
        setProduct(mock || null)
        if (mock) setRelated(MOCK_ALL_PRODUCTS.filter(p => p.category === mock.category && p.id !== parseInt(id)).slice(0, 4))
      } finally {
        setLoading(false)
      }
    }
    load()
    window.scrollTo(0, 0)
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addItem(product.id, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#C9A84C', fontSize: '3rem', animation: 'katanaFloat 2s ease-in-out infinite' }}>⚔</div>
            <p className="font-ui" style={{ color: '#A89880', marginTop: '1rem', letterSpacing: '0.15em' }}>FORGING...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="font-heading" style={{ color: '#F5E6C8', fontSize: '1.5rem', marginBottom: '1rem' }}>Product not found</p>
          <Link to="/shop" className="btn btn-primary" style={{ textDecoration: 'none' }}>BACK TO SHOP</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const imageKey = product.image_key || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const hasDiscount = product.original_price && product.original_price > product.price
  const isOutOfStock = product.stock === 0

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', flex: 1 }}>
        <div style={{ borderBottom: '1px solid #2A2A3A', padding: '0.75rem 0' }}>
          <div className="page-container">
            <Link to="/" className="font-ui" style={{ color: '#A89880', textDecoration: 'none', fontSize: '0.8rem' }}>Home</Link>
            <span style={{ color: '#2A2A3A', margin: '0 0.5rem' }}>/</span>
            <Link to="/shop" className="font-ui" style={{ color: '#A89880', textDecoration: 'none', fontSize: '0.8rem' }}>Shop</Link>
            <span style={{ color: '#2A2A3A', margin: '0 0.5rem' }}>/</span>
            <span className="font-ui" style={{ color: '#F5E6C8', fontSize: '0.8rem' }}>{product.name}</span>
          </div>
        </div>
        <div className="page-container" style={{ padding: '3rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div>
              <div style={{ background: '#0a0009', border: '1px solid #2A2A3A', aspectRatio: '4/3', overflow: 'hidden' }}>
                {getProductSVG(imageKey, product.name)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h1 className="font-heading" style={{ color: '#F5E6C8', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: '1rem', color: i <= Math.round(product.rating) ? '#C9A84C' : '#2A2A3A' }}>★</span>)}
                <span className="font-ui" style={{ color: '#A89880', fontSize: '0.9rem', marginLeft: '6px' }}>{product.rating.toFixed(1)}</span>
              </div>
              <div style={{ borderTop: '1px solid #2A2A3A', borderBottom: '1px solid #2A2A3A', padding: '1rem 0' }}>
                <span className="font-heading" style={{ color: '#C9A84C', fontSize: '2rem', fontWeight: 700 }}>${product.price.toFixed(2)}</span>
                {hasDiscount && <><span className="font-ui" style={{ color: '#A89880', fontSize: '1.2rem', textDecoration: 'line-through', marginLeft: '1rem' }}>${product.original_price.toFixed(2)}</span><span className="badge badge-sale" style={{ marginLeft: '0.5rem' }}>SAVE ${(product.original_price - product.price).toFixed(2)}</span></>}
              </div>
              <p className="font-body" style={{ color: '#A89880', fontSize: '1.05rem', lineHeight: 1.8 }}>{product.description}</p>
              {!isOutOfStock && (
                <div>
                  <p className="font-ui" style={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>QUANTITY</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                    <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))} className="qty-input" />
                    <button className="qty-btn" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
                  </div>
                </div>
              )}
              <button onClick={handleAddToCart} disabled={isOutOfStock}
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '1rem', background: added ? '#2a5a1a' : isOutOfStock ? '#1a1a2a' : '#8B0000', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}>
                {isOutOfStock ? '⚔ OUT OF STOCK' : added ? '✓ ADDED TO CART' : '⚔ ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section style={{ borderTop: '1px solid #2A2A3A', padding: '4rem 0' }}>
            <div className="page-container">
              <h2 className="section-title" style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>RELATED ARSENAL</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {related.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  )
}
