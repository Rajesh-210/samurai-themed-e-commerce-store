import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(form.username, form.email, form.password)
      toast.success('Welcome to the dojo, warrior ⚔')
      navigate('/')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, #120018 0%, #0a0009 70%)', padding: '80px 1.5rem 3rem' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: '#8B0000' }}>⚔</div>
            <h1 className="font-logo" style={{ color: '#F5E6C8', fontSize: '1.4rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>BUSHIDO</h1>
            <p className="font-ui" style={{ color: '#A89880', fontSize: '0.75rem', letterSpacing: '0.2em' }}>BEGIN YOUR WARRIOR'S PATH</p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" value={form.username} onChange={e => update('username', e.target.value)} placeholder="Katsuro" className="input-field" required minLength={2} />
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="warrior@dojo.com" className="input-field" required />
              <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="At least 6 characters" className="input-field" required minLength={6} />
              <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)} placeholder="Repeat password" className="input-field" required />
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'FORGING YOUR IDENTITY...' : '⚔ JOIN THE DOJO'}
              </button>
            </form>
            <p className="font-body" style={{ textAlign: 'center', color: '#A89880', marginTop: '1.5rem' }}>
              Already a warrior? <Link to="/login" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
