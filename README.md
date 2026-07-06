# Tōroku — formularios que se coleccionan

Landing de portfolio y captación de leads con estética de **tarjeta de registro japonesa de los 90** (はがき / hagaki): papel crema, tinta de sello, tipografía retro y detalles tipográficos en japonés.

**Demo en producción:** [toroku-rho.vercel.app](https://toroku-rho.vercel.app)

## Qué es

Tōroku convierte un formulario web aburrido en una experiencia coleccionable. El usuario rellena una postal de registro, estampa su sello con puntería y participa en un sorteo garapon — todo en una sola página, sin framework ni build step.

Pensado como pieza de portfolio para mostrar diseño de producto, microinteracciones y una integración ligera de IA.

## Qué incluye

- **Formulario hagaki** — Nombre, email, tipo de jugador y furigana generado en vivo.
- **Katakana con IA** — Al escribir el nombre, una función serverless llama a Claude (Haiku) para transcribirlo a katakana con fonética correcta. Si la API no está disponible, un transliterador mock en el cliente actúa como fallback instantáneo.
- **Toroku-nyan** — Mascota pixel dibujada en SVG inline (sin assets externos), con diálogo estilo RPG.
- **Minijuegos** — Sello de precisión al enviar el formulario y máquina garapon con premios aleatorios.
- **Selector de tinta** — Tres paletas de marca (verde NEC, rojo sello, azul Sega) aplicadas vía CSS custom properties.

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | HTML, CSS y JavaScript vanilla (cero dependencias) |
| Backend | Vercel Serverless Function (`api/katakana.js`, Node 18+) |
| IA | Anthropic Messages API (`claude-haiku-4-5`) |
| Deploy | Vercel + GitHub |

## Estructura del repo

```
toroku/
├── index.html       # Landing completa (UI, lógica y minijuegos)
├── api/katakana.js  # POST → transliteración a katakana
├── .gitignore
└── README.md
```

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

1. Conecta el repositorio en [vercel.com](https://vercel.com).
2. En **Settings → Environment Variables**, añade:

   | Variable | Valor |
   |----------|--------|
   | `ANTHROPIC_API_KEY` | Tu clave de la API de Anthropic |

3. Despliega (o redeploy si añades la variable después). Vercel sirve `index.html` como sitio estático y `api/katakana.js` como función serverless.

## Licencia

Proyecto de portfolio personal. Código abierto para consulta; reutilízalo con atribución si te sirve de referencia.
