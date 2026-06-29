import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinks = [
    { to: '/shop', label: 'SHOP' },
    { to: '/bundles', label: 'BUNDLES' },
    { to: '/orders', label: 'ORDERS' },
  ]

  return (
    <nav
      style={{
        background: scrolled ? 'rgba(10,0,9,0.97)' : 'rgba(10,0,9,0.85)',
        borderBottom: scrolled ? '1px solid #8B0000' : '1px solid #2A2A3A',
        backdropFilter: 'blur(12px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
      }}
    >
      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#8B0000', fontSize: '1.4rem', lineHeight: 1 }}>⚔</span>
              <span className="font-logo" style={{ color: '#F5E6C8', fontSize: '1rem', letterSpacing: '0.08em', lineHeight: 1 }}>BUSHIDO</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="font-ui"
                style={{ color: location.pathname === link.to ? '#C9A84C' : '#A89880', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600, transition: 'color 0.2s', borderBottom: location.pathname === link.to ? '1px solid #C9A84C' : 'none', paddingBottom: '2px' }}>
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="font-ui"
                style={{ color: location.pathname === '/admin' ? '#8B0000' : '#A89880', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 600 }}>
                ADMIN
              </Link>
            )}
          </div>

          {/* Right section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/cart" style={{ position: 'relative', color: '#F5E6C8', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>⚔</span>
              {count > 0 && (
                <span className="font-ui" style={{ position: 'absolute', top: '-8px', right: '-10px', background: '#8B0000', color: 'white', fontSize: '0.65rem', fontWeight: 700, minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
                  {count}
                </span>
              )}
            </Link>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="font-ui" style={{ color: '#A89880', fontSize: '0.8rem', letterSpacing: '0.05em' }}>{user.username}</span>
                <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem' }}>LOGOUT</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-ghost" style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem' }}>LOGIN</Link>
                <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.75rem' }}>JOIN</Link>
              </div>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn"
              style={{ background: 'none', border: 'none', color: '#F5E6C8', cursor: 'pointer', padding: '4px', display: 'none' }} aria-label="Menu">
              <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ height: '2px', background: mobileOpen ? '#8B0000' : '#F5E6C8', display: 'block' }}/>
                <span style={{ height: '2px', background: mobileOpen ? '#8B0000' : '#F5E6C8', display: 'block' }}/>
                <span style={{ height: '2px', background: mobileOpen ? '#8B0000' : '#F5E6C8', display: 'block' }}/>
              </div>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ borderTop: '1px solid #2A2A3A', padding: '1rem 0' }} className="mobile-menu">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="font-ui"
                style={{ color: '#A89880', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.15em', fontWeight: 600, padding: '0.75rem 0', borderBottom: '1px solid #2A2A3A', display: 'block' }}>
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="font-ui"
                style={{ color: '#8B0000', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.15em', fontWeight: 600, padding: '0.75rem 0', display: 'block' }}>
                ADMIN
              </Link>
            )}
          </div>
        )}
      </div>
      <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } } @media (min-width: 769px) { .mobile-menu { display: none !important; } }`}</style>
    </nav>
  )
}
