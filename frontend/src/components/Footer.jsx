import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#050005', borderTop: '1px solid #2A2A3A', marginTop: 'auto' }}>
      <div className="gold-line" />
      <div className="page-container" style={{ padding: '3rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ color: '#8B0000', fontSize: '1.5rem' }}>⚔</span>
              <span className="font-logo" style={{ color: '#F5E6C8', fontSize: '1.1rem', letterSpacing: '0.1em' }}>BUSHIDO</span>
            </div>
            <p className="font-body" style={{ color: '#A89880', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '220px' }}>Forged in honor. Every blade, every garment carries the spirit of the warrior's path.</p>
          </div>
          <div>
            <h4 className="font-heading" style={{ color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '1rem', textTransform: 'uppercase' }}>Shop</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[{ to: '/shop?category=Katanas', label: 'Katanas' }, { to: '/shop?category=Samurai Tees', label: 'Samurai Tees' }, { to: '/shop?category=Armor Sets', label: 'Armor Sets' }, { to: '/shop?category=Accessories', label: 'Accessories' }, { to: '/bundles', label: 'Honor Bundles' }].map(link => (
                <Link key={link.to} to={link.to} className="font-body" style={{ color: '#A89880', textDecoration: 'none', fontSize: '0.95rem' }}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading" style={{ color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '1rem', textTransform: 'uppercase' }}>Account</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[{ to: '/login', label: 'Login' }, { to: '/register', label: 'Create Account' }, { to: '/orders', label: 'Order History' }, { to: '/cart', label: 'View Cart' }].map(link => (
                <Link key={link.to} to={link.to} className="font-body" style={{ color: '#A89880', textDecoration: 'none', fontSize: '0.95rem' }}>{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading" style={{ color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '1rem', textTransform: 'uppercase' }}>The Bushido Code</h4>
            {['義 Righteousness', '勇 Courage', '仁 Benevolence', '礼 Respect', '誠 Sincerity', '名誉 Honor', '忠義 Loyalty'].map((code, i) => (
              <span key={i} className="font-body" style={{ color: '#A89880', fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>{code}</span>
            ))}
          </div>
        </div>
        <div className="divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <p className="font-ui" style={{ color: '#A89880', fontSize: '0.8rem', letterSpacing: '0.08em' }}>© 2026 BUSHIDO BRAND. FORGED IN HONOR.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Shipping'].map((item, i) => (
              <span key={i} className="font-ui" style={{ color: '#A89880', fontSize: '0.75rem', letterSpacing: '0.05em', cursor: 'pointer' }}>{item.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
