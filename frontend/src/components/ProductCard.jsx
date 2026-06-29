import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductSVG } from './ProductSVGs'

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: '0.75rem', color: i <= Math.round(rating) ? '#C9A84C' : '#2A2A3A' }}>★</span>
      ))}
      <span className="font-ui" style={{ color: '#A89880', fontSize: '0.75rem', marginLeft: '4px' }}>{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const hasDiscount = product.original_price && product.original_price > product.price
  const isLowStock = product.stock > 0 && product.stock <= 10
  const isOutOfStock = product.stock === 0
  const imageKey = product.image_key || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {hasDiscount && <span className="badge badge-sale">SALE</span>}
        {isLowStock && !isOutOfStock && <span className="badge badge-low">LOW STOCK</span>}
        {isOutOfStock && <span className="badge" style={{ background: '#1a1a2a', color: '#A89880' }}>SOLD OUT</span>}
      </div>
      <Link to={`/product/${product.id}`} style={{ display: 'block', aspectRatio: '4/3', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', background: '#0a0009' }}>
          {getProductSVG(imageKey, product.name)}
        </div>
      </Link>
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {product.category && (
          <span className="font-ui" style={{ color: '#8B0000', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{product.category}</span>
        )}
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="font-heading" style={{ color: '#F5E6C8', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.03em', lineHeight: 1.3, margin: 0 }}>{product.name}</h3>
        </Link>
        <StarRating rating={product.rating} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
          <span className="font-ui" style={{ color: '#C9A84C', fontSize: '1.2rem', fontWeight: 700 }}>${product.price.toFixed(2)}</span>
          {hasDiscount && <span className="font-ui" style={{ color: '#A89880', fontSize: '0.9rem', textDecoration: 'line-through' }}>${product.original_price.toFixed(2)}</span>}
        </div>
        <button onClick={() => !isOutOfStock && addItem(product.id)} disabled={isOutOfStock}
          className="btn btn-primary"
          style={{ marginTop: 'auto', width: '100%', opacity: isOutOfStock ? 0.5 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer', fontSize: '0.8rem', padding: '0.6rem 1rem' }}>
          {isOutOfStock ? 'OUT OF STOCK' : '+ ADD TO CART'}
        </button>
      </div>
    </div>
  )
}
