# Biblia de mecánicas de videojuegos

Enciclopedia interactiva de mecánicas de juego, cada una con una pequeña demo jugable.

**Web:** https://yipikayeigit.github.io/BibliaMecanicas/

- `index.html`: la web completa (un solo archivo, la que publica GitHub Pages).
- `src/`: código fuente. `engine.js` (utilidades), `defs_*.js` (mecánicas), `gidx.js` (índice de juegos), `boot.js` (interfaz), `shell.html` (plantilla y estilos).
- `build.sh`: regenera `index.html` desde `src/`. `node src/test.js src/defs_*.js` prueba todas las demos.
