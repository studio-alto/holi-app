import FixedOverlayLayer from './FixedOverlayLayer';

export default function ToastStack({ toasts }) {
  if (!toasts.length) return null;
  return (
    <FixedOverlayLayer zIndex={100}>
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: '100%',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: '#1a1a1a',
              color: '#fff',
              fontSize: 13,
              fontWeight: 500,
              padding: '11px 18px',
              borderRadius: 999,
              boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
              animation: 'toastIn 0.3s ease',
              maxWidth: '86%',
              textAlign: 'center',
            }}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </FixedOverlayLayer>
  );
}
