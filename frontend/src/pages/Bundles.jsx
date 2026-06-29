import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SkeletonCard from '../components/SkeletonCard'
import { bundlesAPI } from '../api/client'
import { useCart } from '../context/CartContext'
import { getProductSVG } from '../components/ProductSVGs'

const MOCK_BUNDLES = [
  { id: 1, name: "The Ronin's Arsenal", description: 'Everything the lone warrior needs. The Oni Slayer katana paired with a solid oak wall mount and complete maintenance kit.', bundle_price: 299.99, retail_price: 373.97, savings: 73.98, items: [{ product_id: 1, product_name: 'Oni Slayer', product_price: 299.99, image_key: 'oni-slayer' }, { product_id: 15, product_name: 'Katana Wall Mount', product_price: 49.99, image_key: 'katana-wall-mount' }, { product_id: 17, product_name: 'Sword Maintenance Kit', product_price: 24.99, image_key: 'sword-maintenance-kit' }] },
  { id: 2, name: "The Warrior's Identity", description: 'The complete Bushido tee collection. All six signature designs.', bundle_price: 179.99, retail_price: 244.94, savings: 64.95, items: [{ product_id: 6, product_name: 'Ronin Silhouette Tee', product_price: 39.99, image_key: 'ronin-silhouette-tee' }, { product_id: 7, product_name: 'Bushido Code Tee', product_price: 34.99, image_key: 'bushido-code-tee' }, { product_id: 8, product_name: 'Cherry Blossom Warrior Tee', product_price: 44.99, image_key: 'cherry-blossom-warrior-tee' }, { product_id: 9, product_name: 'Void Swordsman Tee', product_price: 34.99, image_key: 'void-swordsman-tee' }, { product_id: 10, product_name: 'Dragon Temple Tee', product_price: 49.99, image_key: 'dragon-temple-tee' }, { product_id: 11, product_name: 'Last Stand Tee', product_price: 39.99, image_key: 'last-stand-tee' }] },
  { id: 3, name: "The Dojo Master", description: 'Ghost Blade paired with a complete training setup.', bundle_price: 349.99, retail_price: 444.97, savings: 94.98, items: [{ product_id: 4, product_name: 'Ghost Blade', product_price: 249.99, image_key: 'ghost-blade' }, { product_id: 19, product_name: 'Dojo Training Mat', product_price: 89.99, image_key: 'dojo-training-mat' }, { product_id: 18, product_name: 'Iaido Practice Bokken', product_price: 59.99, image_key: 'iaido-practice-bokken' }, { product_id: 20, product_name: 'Sparring Shinai Set', product_price: 44.99, image_key: 'sparring-shinai-set' }] },
  { id: 4, name: "The Shadow Collector", description: "The ultimate collector's arsenal. Shadow Reaper blade, Kage Chest Plate, Oni Mask Set, and full maintenance kit.", bundle_price: 849.99, retail_price: 1063.97, savings: 213.98, items: [{ product_id: 2, product_name: 'Shadow Reaper', product_price: 189.99, image_key: 'shadow-reaper' }, { product_id: 12, product_name: 'Kage Chest Plate', product_price: 599.99, image_key: 'kage-chest-plate' }, { product_id: 13, product_name: 'Oni Mask Set', product_price: 149.99, image_key: 'oni-mask-set' }, { product_id: 17, product_name: 'Sword Maintenance Kit', product_price: 24.99, image_key: 'sword-maintenance-kit' }] },
]

export default function Bundles() {
  const [bundles, setBundles] = useState([])
  const [loading, setLoading] = useState(true)
  const { addBundle } = useCart()

  useEffect(() => {
    bundlesAPI.list()
      .then(res => setBundles(Array.isArray(res?.data?.bundles) ? res.data.bundles : Array.isArray(res?.data) ? res.data : []))
      .catch(() => setBundles(MOCK_BUNDLES))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', flex: 1 }}>
        <div style={{ background: 'linear-gradient(135deg, #0d0012 0%, #0a0009 100%)', borderBottom: '1px solid #2A2A3A', padding: '4rem 0 3rem', textAlign: 'center' }}>
          <div className="page-container">
            <p className="font-ui" style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.75rem' }}>CURATED FOR THE COMPLETE WARRIOR</p>
            <h1 className="font-heading" style={{ color: '#F5E6C8', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '1rem' }}>HONOR BUNDLES</h1>
            <p className="font-body" style={{ color: '#A89880', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto' }}>Four curated collections for every path of the warrior. Save significantly when you commit to the complete arsenal.</p>
          </div>
        </div>
        <div className="page-container" style={{ padding: '4rem 1.5rem' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {bundles.map((bundle, bi) => {
                const savingsPercent = Math.round((bundle.savings / bundle.retail_price) * 100)
                return (
                  <div key={bundle.id} className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ background: bi % 2 === 1 ? 'linear-gradient(135deg, #1a0028, #0a0009)' : 'linear-gradient(135deg, #1a0005, #0a0009)', padding: '2rem', borderBottom: '1px solid #2A2A3A', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          <h2 className="font-heading" style={{ color: '#F5E6C8', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>{bundle.name}</h2>
                          <span className="badge badge-sale" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}>SAVE {savingsPercent}% — ${bundle.savings?.toFixed(2)}</span>
                        </div>
                        <p className="font-body" style={{ color: '#A89880', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6 }}>{bundle.description}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="font-heading" style={{ color: '#C9A84C', fontSize: '2rem', fontWeight: 700 }}>${bundle.bundle_price?.toFixed(2)}</div>
                        <div className="font-ui" style={{ color: '#A89880', fontSize: '0.9rem', textDecoration: 'line-through' }}>${bundle.retail_price?.toFixed(2)} retail</div>
                      </div>
                    </div>
                    <div style={{ padding: '2rem' }}>
                      <p className="font-ui" style={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>BUNDLE INCLUDES:</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        {bundle.items?.map((item) => (
                          <div key={item.product_id} style={{ background: '#0a0009', border: '1px solid #2A2A3A', overflow: 'hidden' }}>
                            <div style={{ aspectRatio: '4/3' }}>{getProductSVG(item.image_key || item.product_name, item.product_name)}</div>
                            <div style={{ padding: '0.75rem' }}>
                              <p className="font-heading" style={{ color: '#F5E6C8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{item.product_name}</p>
                              <p className="font-ui" style={{ color: '#C9A84C', fontSize: '0.9rem' }}>${item.product_price?.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => addBundle(bundle.id)} className="btn btn-primary" style={{ fontSize: '0.9rem' }}>⚔ ADD BUNDLE TO CART — ${bundle.bundle_price?.toFixed(2)}</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
