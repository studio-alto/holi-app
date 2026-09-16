import FixedOverlayLayer from './FixedOverlayLayer';

export default function UpdateBanner({ onRefresh }) {
  return (
    <FixedOverlayLayer zIndex={200}>
      <div
        style={{
          position: 'absolute',
          top: 'calc(10px + env(safe-area-inset-top, 0px))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: 568,
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: 16,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
            animation: 'toastIn 0.3s ease',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500 }}>Hay una nueva versión de Holí lista</span>
          <button
            onClick={onRefresh}
            style={{
              background: '#fff',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: 999,
              padding: '7px 14px',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Actualizar
          </button>
        </div>
      </div>
    </FixedOverlayLayer>
  );
}
