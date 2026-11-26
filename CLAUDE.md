# Notas para Claude
- Edita siempre en `src/`, nunca a mano en `index.html`. Después ejecuta `sh build.sh`.
- Los `defs_*.js` se concatenan en orden alfabético antes de `gidx.js` y `boot.js`; los nuevos van en un `defs_` posterior.
- Antes de subir: `cd src && node test.js $(ls defs_*.js | sort)` debe decir `fallos 0`.
- Canvas lógico 320x200; los botones de la tarjeta tapan la esquina superior derecha (x>236, y<28): no pongas HUD ahí.
- Textos en español. Sube los cambios a `main`; GitHub Pages publica desde la raíz de `main`.
