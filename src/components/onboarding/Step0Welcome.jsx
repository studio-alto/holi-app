const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Step0Welcome({ state, update, onNext, onSkip }) {
  const invalid = !state.obName.trim() || !isValidEmail(state.obEmail);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--grad-welcome)', padding: '48px 30px 34px' }}>
      <div className="celebrate" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 0 }}>
        <svg viewBox="0 0 120 150" width={108} height={108} fill="none" style={{ filter: 'drop-shadow(0 6px 14px rgba(20,60,90,0.18))' }}>
          <path d="M20 8c8 0 14 6 14 14v30c9-9 20-13 30-13 16 0 26 11 26 27v46c0 8-6 14-14 14s-14-6-14-14V70c0-6-4-10-10-10s-12 5-18 13v40c0 8-6 14-14 14s-14-6-14-14V22c0-8 6-14 14-14z" fill="#ffffff" />
          <circle cx="98" cy="30" r="12" fill="#ffffff" />
        </svg>
        <div style={{ fontWeight: 500, fontSize: 19, color: '#ffffff', letterSpacing: 9, marginTop: 16 }}>HOLI</div>
        <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.5)', marginTop: 16 }} />
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.88)', marginTop: 16, fontWeight: 400, letterSpacing: 0.2 }}>
          Tu día, tu espacio, tu bienestar
        </div>
      </div>

      <div
        className="fade-in-up"
        style={{
          background: 'rgba(255,255,255,0.14)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: 26,
          padding: '26px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 12px 32px rgba(20,60,90,0.12)',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 17, color: '#ffffff', textAlign: 'center', letterSpacing: 0.3 }}>Bienvenidos a HOLÍ</div>

        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: 0.3 }}>¿CUÁL ES TU NOMBRE?</label>
          <input
            aria-label="Tu nombre"
            placeholder="Tu nombre..."
            value={state.obName}
            onChange={(e) => update({ obName: e.target.value })}
            style={{ width: '100%', marginTop: 7, padding: '14px 16px', borderRadius: 156, border: 'none', fontSize: 16, background: 'rgba(255,255,255,0.92)', color: '#1a1a1a' }}
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: 0.3 }}>TU CORREO</label>
          <input
            aria-label="Tu correo"
            type="email"
            placeholder="tu@correo.com"
            value={state.obEmail}
            onChange={(e) => update({ obEmail: e.target.value })}
            style={{ width: '100%', marginTop: 7, padding: '14px 16px', borderRadius: 305, border: 'none', fontSize: 16, background: 'rgba(255,255,255,0.92)', color: '#1a1a1a' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          <button
            aria-label="Siguiente"
            disabled={invalid}
            onClick={onNext}
            style={{
              width: '100%',
              padding: 15,
              background: invalid ? 'rgba(0,0,0,0.35)' : '#000000',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              cursor: invalid ? 'not-allowed' : 'pointer',
              letterSpacing: 0.2,
              boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
            }}
          >
            Siguiente
          </button>
          <button
            aria-label="Saltar"
            onClick={onSkip}
            style={{ width: '100%', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 500, cursor: 'pointer', padding: 4 }}
          >
            Saltar
          </button>
        </div>
      </div>
    </div>
  );
}
