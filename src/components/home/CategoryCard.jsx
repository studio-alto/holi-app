export default function CategoryCard({ title, value, unit, iconBg, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: 'left',
        background: '#FFFFFF',
        border: '0.5px solid #EFE9D8',
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
      <div style={{ width: 46, height: 46, borderRadius: '50%', background: iconBg.bubble, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: value.length > 6 ? 15 : 22, fontWeight: 700, color: '#000000', lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: '#8A8474', marginTop: 3 }}>
          {title}{unit ? ` · ${unit}` : ''}
        </div>
      </div>
    </button>
  );
}
