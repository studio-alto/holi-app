export default function CategoryCard({ title, value, unit, bg, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        background: bg,
        border: 'none',
        borderRadius: 20,
        padding: 16,
        cursor: 'pointer',
        position: 'relative',
        minHeight: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: value.length > 6 ? 15 : 22, fontWeight: 700, color: '#141414', lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(20,20,20,0.55)', marginTop: 3 }}>
          {title}{unit ? ` · ${unit}` : ''}
        </div>
      </div>
    </button>
  );
}
