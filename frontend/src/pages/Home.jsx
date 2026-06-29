import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import BundleCard from '../components/BundleCard'
import SkeletonCard from '../components/SkeletonCard'
import { productsAPI, bundlesAPI } from '../api/client'
import { MOCK_ALL_PRODUCTS } from '../data/mockProducts'

const TESTIMONIALS = [
  { quote: "The Oni Slayer arrived and I understood immediately — this is not a product. It is a statement of intent.", author: "Katsuro T.", title: "Master Swordsman, Kyoto Dojo" },
  { quote: "I wore the Ronin Silhouette Tee to battle. No sword was needed. They yielded at the sight of it.", author: "Reika M.", title: "3rd Dan Kendo, Osaka Prefecture" },
  { quote: "The quality speaks the language of bushido. Every thread, every edge — forged with absolute intention.", author: "Hiroki N.", title: "Collector, Feudal Arms Society" },
]

function HeroKatana() {
  return (
    <div style={{ animation: 'katanaFloat 4s ease-in-out infinite' }}>
      <svg width="280" height="280" viewBox="0 0 280 280" style={{ filter: 'drop-shadow(0 0 20px rgba(139,0,0,0.4))' }}>
        <polygon points="140,10 148,230 132,230" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8"/>
        <ellipse cx="140" cy="234" rx="24" ry="10" fill="none" stroke="#C9A84C" strokeWidth="2"/>
        <ellipse cx="140" cy="234" rx="16" ry="6" fill="none" stroke="#8B0000" strokeWidth="1"/>
        <rect x="135" y="244" width="10" height="25" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      </svg>
    </div>
  )
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [bundles, setBundles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, bRes] = await Promise.all([
          productsAPI.list({ page: 1 }),
          bundlesAPI.list(),
        ])
        const featuredData = Array.isArray(pRes?.data?.products) ? pRes.data.products : Array.isArray(pRes?.data) ? pRes.data : []
        setFeatured(featuredData.slice(0, 4))
        const bundlesData = Array.isArray(bRes?.data?.bundles) ? bRes.data.bundles : Array.isArray(bRes?.data) ? bRes.data : []
        setBundles(bundlesData.slice(0, 3))
      } catch {
        setFeatured(MOCK_ALL_PRODUCTS.slice(0, 4))
        setBundles([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '64px', background: 'radial-gradient(ellipse at center, #1a000a 0%, #0a0009 70%)' }}>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '900px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}><HeroKatana /></div>
          <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.8rem', letterSpacing: '0.4em', marginBottom: '1rem', textTransform: 'uppercase' }}>── 武士道 ──</p>
          <h1 className="font-logo" style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', color: '#8B0000', lineHeight: 1.1, letterSpacing: '0.05em', marginBottom: '0.5rem', textShadow: '0 0 40px rgba(139,0,0,0.5)' }}>THE WAY OF</h1>
          <h1 className="font-logo" style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', color: '#F5E6C8', lineHeight: 1.1, letterSpacing: '0.05em', marginBottom: '1.5rem' }}>THE BLADE</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '60px', height: '1px', background: '#8B0000' }}/><span style={{ color: '#C9A84C', fontSize: '1.2rem' }}>⚔</span><div style={{ width: '60px', height: '1px', background: '#8B0000' }}/>
          </div>
          <p className="font-body" style={{ color: '#A89880', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>Premium samurai apparel and authentic warrior gear. Every piece is forged with the spirit of Bushido — discipline, honor, and relentless excellence.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem', textDecoration: 'none' }}>⚔ ENTER THE DOJO</Link>
            <Link to="/bundles" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem', textDecoration: 'none' }}>VIEW BUNDLES</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'var(--void)' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.75rem' }}>HAND-SELECTED FOR THE WORTHY</p>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>FEATURED ARSENAL</h2>
            <div className="gold-line" style={{ maxWidth: '200px', margin: '0 auto' }}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {loading ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />) : featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/shop" className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>VIEW ALL PRODUCTS →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: '#0d0012' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.75rem' }}>CURATED FOR THE COMPLETE WARRIOR</p>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>HONOR BUNDLES</h2>
            <div className="gold-line" style={{ maxWidth: '200px', margin: '0 auto' }}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {loading ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />) : bundles.map(b => <BundleCard key={b.id} bundle={b} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'var(--void)' }}>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.75rem' }}>WORDS FROM THE BATTLEFIELD</p>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>WARRIOR TESTIMONIALS</h2>
            <div className="gold-line" style={{ maxWidth: '200px', margin: '0 auto' }}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card" style={{ padding: '2rem' }}>
                <div style={{ color: '#8B0000', fontSize: '2.5rem', lineHeight: 1, marginBottom: '1rem', fontFamily: 'serif' }}>"</div>
                <p className="font-body" style={{ color: '#F5E6C8', fontSize: '1.05rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>{t.quote}</p>
                <div style={{ borderTop: '1px solid #2A2A3A', paddingTop: '1rem' }}>
                  <p className="font-heading" style={{ color: '#C9A84C', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.2rem' }}>{t.author}</p>
                  <p className="font-ui" style={{ color: '#A89880', fontSize: '0.75rem', letterSpacing: '0.08em' }}>{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 1.5rem', background: 'linear-gradient(135deg, #1a0005 0%, #0a0009 50%, #08001a 100%)', borderTop: '1px solid #2A2A3A', borderBottom: '1px solid #2A2A3A', textAlign: 'center' }}>
        <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '1rem' }}>THE PATH CALLS</p>
        <h2 className="font-logo" style={{ color: '#F5E6C8', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem', letterSpacing: '0.05em' }}>READY TO WALK THE WARRIOR'S PATH?</h2>
        <p className="font-body" style={{ color: '#A89880', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>Join thousands of modern warriors who carry the spirit of Bushido every day.</p>
        <Link to="/register" className="btn btn-gold" style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '1rem 2.5rem' }}>BEGIN YOUR JOURNEY</Link>
      </section>

      <Footer />
    </div>
  )
}
