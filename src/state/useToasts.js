import { useCallback, useState } from 'react';

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  return { toasts, addToast };
}
