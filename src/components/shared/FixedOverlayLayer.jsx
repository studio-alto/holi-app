// .phone-card grows with page content (the app relies on body-level scroll),
// so plain `position: absolute` overlays (FAB, toasts, modals) drift off-screen
// on tall pages instead of staying pinned to the viewport. This layer uses
// `position: fixed` against the viewport, constrained to the same centered
// 600px column as .phone-card, so children can position themselves within it.
export default function FixedOverlayLayer({ children, zIndex = 40 }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex, pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 600, height: '100%' }}>{children}</div>
    </div>
  );
}
