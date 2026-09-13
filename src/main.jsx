import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { registerServiceWorker } from './utils/push'
import { setupAppHeightVar } from './utils/viewportHeight'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Registered unconditionally (not just when the person opts into push) so
// the app is installable — Android/Chrome expect an active service worker
// with a fetch handler before offering "Add to Home Screen".
registerServiceWorker()

setupAppHeightVar()
