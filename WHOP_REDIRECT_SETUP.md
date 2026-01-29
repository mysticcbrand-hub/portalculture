# Configuración de Whop Redirect Seguro

## Problema Resuelto
Antes, cualquiera podía acceder a `/pago-exitoso` y ver el link de Discord sin pagar.

Ahora, **solo usuarios que hayan completado el pago** pueden acceder.

## Cómo Funciona

1. Usuario paga en Whop
2. Whop redirige a: `https://portalculture.vercel.app/api/generate-access-token` (GET)
3. El endpoint genera un token único de un solo uso (válido 5 minutos)
4. Redirige a: `https://portalculture.vercel.app/pago-exitoso?token=xxx`
5. La página valida el token con el backend
6. Si es válido y no usado → Muestra link de Discord
7. Si es inválido/expirado/usado → Acceso denegado

## Configuración en Whop

1. Ve a tu producto en Whop Dashboard
2. Settings → Checkout Settings
3. En **Success Redirect URL**, pon:
   ```
   https://portalculture.vercel.app/api/generate-access-token
   ```

## Lo que pasa en el backend

**`/api/generate-access-token` (GET)**
- Genera token criptográfico aleatorio (64 chars hex)
- Lo marca con expiración de 5 minutos
- Redirige a `/pago-exitoso?token=xxx`

**`/api/generate-access-token` (POST)**
- Valida que el token existe, no está expirado, y no fue usado
- Lo marca como usado (solo se puede usar una vez)
- Retorna `{ valid: true }` o `{ valid: false, error: '...' }`

**`/pago-exitoso?token=xxx`**
- Llama al POST endpoint para validar
- Si válido → Muestra página de éxito con link de Discord
- Si inválido → Muestra error y botón para volver a `/acceso`

## Seguridad

✅ Token de un solo uso (no se puede reutilizar)  
✅ Expira en 5 minutos  
✅ Token criptográficamente seguro (32 bytes random)  
✅ No se puede acceder sin token válido  
✅ Tokens expirados se limpian automáticamente  

## Notas de Producción

**Limitación actual**: Los tokens se guardan en memoria del servidor (se pierden en redeploy).

**Para producción real**, considera:
- Redis/Upstash para tokens persistentes
- Base de datos con tabla `access_tokens`
- Rate limiting en generación de tokens

**Alternativa más robusta**: Integrar Whop Webhooks para verificar compras directamente contra su API.
