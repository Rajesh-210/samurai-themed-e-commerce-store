import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import { productsAPI } from '../api/client'
import { MOCK_ALL_PRODUCTS } from '../data/mockProducts'

const CATEGORIES = ['All', 'Katanas', 'Samurai Tees', 'Armor Sets', 'Accessories', 'Training Gear']
const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A-Z' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)

  const category = searchParams.get('category') || 'All'
  const sort = searchParams.get('sort') || 'default'
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const [searchInput, setSearchInput] = useState(search)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const params = { page, sort }
        if (category !== 'All') params.category = category
        if (search) params.search = search
        const res = await productsAPI.list(params)
        setProducts(Array.isArray(res?.data?.products) ? res.data.products : Array.isArray(res?.data) ? res.data : [])
        setTotalPages(res?.data?.pages || 1)
      } catch {
        let filtered = [...MOCK_ALL_PRODUCTS]
        if (category !== 'All') filtered = filtered.filter(p => p.category === category)
        if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price)
        else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price)
        else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating)
        else if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name))
        setProducts(filtered)
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category, sort, page, search])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value && value !== 'All' && value !== 'default') next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setSearchParams(next)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateParam('search', searchInput)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', flex: 1 }}>
        <div style={{ background: 'linear-gradient(135deg, #1a0005 0%, #0a0009 100%)', borderBottom: '1px solid #2A2A3A', padding: '3rem 0 2rem' }}>
          <div className="page-container">
            <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.5rem' }}>THE ARSENAL</p>
            <h1 className="font-heading" style={{ color: '#F5E6C8', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1.5rem' }}>SHOP ALL</h1>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px' }}>
              <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Search weapons, tees..." className="input-field" style={{ flex: 1 }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem', whiteSpace: 'nowrap' }}>SEARCH</button>
            </form>
          </div>
        </div>
        <div className="page-container" style={{ padding: '2rem 1.5rem' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <aside style={{ minWidth: '200px', flex: '0 0 200px' }}>
              <div style={{ position: 'sticky', top: '80px' }}>
                <h3 className="font-heading" style={{ color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', borderBottom: '1px solid #2A2A3A', paddingBottom: '0.5rem' }}>Category</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '2rem' }}>
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => updateParam('category', cat)} className="font-ui"
                      style={{ background: category === cat ? '#8B0000' : 'transparent', color: category === cat ? '#F5E6C8' : '#A89880', border: 'none', padding: '0.6rem 0.75rem', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.08em', borderLeft: category === cat ? '2px solid #C9A84C' : '2px solid transparent' }}>
                      {cat}
                    </button>
                  ))}
                </div>
                <h3 className="font-heading" style={{ color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', borderBottom: '1px solid #2A2A3A', paddingBottom: '0.5rem' }}>Sort By</h3>
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => updateParam('sort', opt.value)} className="font-ui"
                    style={{ display: 'block', width: '100%', background: sort === opt.value ? '#1a1a2a' : 'transparent', color: sort === opt.value ? '#C9A84C' : '#A89880', border: 'none', padding: '0.6rem 0.75rem', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </aside>
            <main style={{ flex: 1, minWidth: 0 }}>
              <p className="font-ui" style={{ color: '#A89880', fontSize: '0.8rem', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>
                {loading ? 'Loading...' : `${products.length} products found`}{category !== 'All' && ` in ${category}`}
              </p>
              {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem' }}>
                  {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚔</div>
                  <p className="font-heading" style={{ color: '#A89880', fontSize: '1.2rem' }}>No products found</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem' }}>
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => updateParam('page', String(p))} className="font-ui"
                      style={{ width: '40px', height: '40px', background: page === p ? '#8B0000' : '#120018', color: page === p ? 'white' : '#A89880', border: `1px solid ${page === p ? '#8B0000' : '#2A2A3A'}`, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
