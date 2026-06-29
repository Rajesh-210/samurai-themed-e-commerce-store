import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function BundleCard({ bundle }) {
  const { addBundle } = useCart()
  const savingsPercent = Math.round((bundle.savings / bundle.retail_price) * 100)

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 className="font-heading" style={{ color: '#F5E6C8', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>{bundle.name}</h3>
          <span className="badge badge-sale" style={{ whiteSpace: 'nowrap', fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}>SAVE {savingsPercent}%</span>
        </div>
        <p className="font-body" style={{ color: '#A89880', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>{bundle.description}</p>
      </div>
      <div style={{ borderTop: '1px solid #2A2A3A', borderBottom: '1px solid #2A2A3A', padding: '0.75rem 0' }}>
        <p className="font-ui" style={{ color: '#C9A84C', fontSize: '0.7rem', letterSpacing: '0.15em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Includes:</p>
        {bundle.items?.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span className="font-body" style={{ color: '#F5E6C8', fontSize: '0.9rem' }}>⚔ {item.product_name}</span>
            <span className="font-ui" style={{ color: '#A89880', fontSize: '0.85rem' }}>${item.product_price?.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
          <span className="font-ui" style={{ color: '#C9A84C', fontSize: '1.5rem', fontWeight: 700 }}>${bundle.bundle_price?.toFixed(2)}</span>
          <span className="font-ui" style={{ color: '#A89880', fontSize: '1rem', textDecoration: 'line-through' }}>${bundle.retail_price?.toFixed(2)}</span>
        </div>
        <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.8rem', letterSpacing: '0.05em', margin: 0 }}>YOU SAVE ${bundle.savings?.toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
        <button onClick={() => addBundle(bundle.id)} className="btn btn-primary" style={{ width: '100%', fontSize: '0.8rem' }}>⚔ ADD BUNDLE TO CART</button>
        <Link to={`/bundles`} className="btn btn-outline" style={{ width: '100%', fontSize: '0.8rem', textDecoration: 'none', textAlign: 'center' }}>VIEW DETAILS</Link>
      </div>
    </div>
  )
}
