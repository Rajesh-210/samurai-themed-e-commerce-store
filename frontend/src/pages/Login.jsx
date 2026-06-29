import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back, warrior ⚔')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, #120018 0%, #0a0009 70%)', padding: '80px 1.5rem 3rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: '#8B0000' }}>⚔</div>
            <h1 className="font-logo" style={{ color: '#F5E6C8', fontSize: '1.4rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>BUSHIDO</h1>
            <p className="font-ui" style={{ color: '#A89880', fontSize: '0.75rem', letterSpacing: '0.2em' }}>RETURN TO THE DOJO</p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="warrior@dojo.com" className="input-field" required autoComplete="email" />
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" className="input-field" required autoComplete="current-password" />
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'ENTERING THE DOJO...' : '⚔ ENTER THE DOJO'}
              </button>
            </form>
            <div style={{ background: '#0a0009', border: '1px solid #2A2A3A', padding: '0.75rem', margin: '1.5rem 0' }}>
              <p className="font-ui" style={{ color: '#A89880', fontSize: '0.72rem', letterSpacing: '0.05em' }}>Admin: admin@bushido.com / bushido2026</p>
            </div>
            <p className="font-body" style={{ textAlign: 'center', color: '#A89880' }}>
              New warrior? <Link to="/register" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>Create an account →</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
