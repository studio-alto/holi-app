# holi-push

Worker de Cloudflare que envía las notificaciones push reales de HOLÍ
(medicamentos, bloqueador solar, agua, ejercicio). No hay cuentas ni email:
el endpoint de suscripción del navegador de cada persona es su único
identificador en KV.

Probado localmente con `wrangler dev` — el flujo completo (firma VAPID vía
Web Crypto + envío real a los servidores de push del navegador) funciona
de punta a punta. Falta desplegarlo a tu cuenta de Cloudflare.

## 1. Instalar dependencias

```bash
cd worker
npm install
```

## 2. Generar tus propias llaves VAPID

```bash
npm run vapid
```

Esto imprime una **Public Key** (para el frontend) y una **Private Key**
en formato JWK (para el Worker). Guarda ambas — no reuses las de este
repo ni las compartas.

## 3. Crear el namespace de KV

```bash
npx wrangler kv namespace create HOLI_PUSH
```

Copia el `id` que te devuelve y pégalo en `wrangler.toml`, reemplazando
`REPLACE_WITH_KV_NAMESPACE_ID`.

## 4. Guardar la llave privada como secreto

```bash
npx wrangler secret put VAPID_PRIVATE_KEY
```

Pega el JSON completo del JWK (la Private Key del paso 2) cuando te lo pida.

## 5. Desplegar

```bash
npm run deploy
```

Wrangler te da la URL del Worker (algo como
`https://holi-push.<tu-subdominio>.workers.dev`).

## 6. Conectar el frontend

En la raíz de `holi-app/`, copia `.env.example` a `.env.local` y llena:

```
VITE_VAPID_PUBLIC_KEY=<la Public Key del paso 2>
VITE_PUSH_WORKER_URL=<la URL del paso 5>
```

Vuelve a construir (`npm run build`) o reinicia `npm run dev`. Al activar
"Activar notificaciones" en Configuración, el navegador pedirá permiso y,
si lo aceptas, empezará a llegar la notificación real a la hora
configurada de cada medicamento/recordatorio — aunque la app esté cerrada.

## Notas

- El Cron Trigger corre cada minuto (`* * * * *` en `wrangler.toml`) para
  que la hora programada (ej. "08:00") coincida exacto. Cloudflare permite
  esto sin costo en el plan gratuito.
- Si un envío responde 404/410 (la suscripción del navegador ya no existe,
  ej. el usuario desinstaló la PWA), el Worker borra esa entrada de KV solo.
- Agua, Piel y Ejercicio usan una sola hora de recordatorio al día
  (`waterReminderTime`, `skincare.spfReminderTime`, `exerciseReminderTime`
  en el estado del frontend, con valores por defecto). Hoy no hay una
  pantalla para que la persona cambie esas horas — solo Medicamentos tiene
  hora real por ítem. Si quieres que sean editables, es un siguiente paso.
