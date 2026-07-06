# Tōroku — landing demo

Formulario de captación con estética de tarjeta de registro japonesa de los 90. La transliteración a katakana usa la API de Anthropic vía una función serverless en Vercel.

## Desarrollo local

1. Instala la [CLI de Vercel](https://vercel.com/docs/cli): `npm i -g vercel`
2. Clona el repo y entra en la carpeta del proyecto.
3. Crea un archivo `.env` en la raíz (no lo subas a git):

   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

4. Arranca el entorno local:

   ```bash
   vercel dev
   ```

5. Abre la URL que muestra la CLI (normalmente `http://localhost:3000`) y escribe un nombre en el formulario. El campo furigana se actualizará con la respuesta de `/api/katakana`.

Sin `ANTHROPIC_API_KEY`, la página sigue funcionando con la transliteración mock en el cliente.

## Deploy en Vercel

1. Sube el repositorio a GitHub (o conecta la carpeta con `vercel`).
2. Importa el proyecto en [vercel.com](https://vercel.com).
3. En **Settings → Environment Variables**, añade:

   | Variable | Valor |
   |----------|--------|
   | `ANTHROPIC_API_KEY` | Tu clave de la API de Anthropic |

4. Despliega. Vercel detecta `index.html` como sitio estático y `api/katakana.js` como función serverless (Node 18+).
