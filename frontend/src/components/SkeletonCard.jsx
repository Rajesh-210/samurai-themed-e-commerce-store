export default function SkeletonCard() {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="skeleton" style={{ aspectRatio: '4/3', width: '100%' }} />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="skeleton" style={{ height: '12px', width: '40%' }} />
        <div className="skeleton" style={{ height: '20px', width: '85%' }} />
        <div className="skeleton" style={{ height: '16px', width: '60%' }} />
        <div className="skeleton" style={{ height: '24px', width: '50%' }} />
        <div className="skeleton" style={{ height: '40px', width: '100%', marginTop: '0.5rem' }} />
      </div>
    </div>
  )
}
