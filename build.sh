#!/bin/sh
# Construye index.html a partir de src/. Uso: sh build.sh
set -e
cd "$(dirname "$0")/src"
DEFS=$(ls defs_*.js | sort)
{ echo '(()=>{'; cat engine.js $DEFS gidx.js boot.js; echo '})();'; } > ../all.js
node --check ../all.js
python3 -c "s=open('shell.html').read();js=open('../all.js').read();assert '</script' not in js.lower();open('../index.html','w').write(s.replace('/*JS*/',js))"
rm ../all.js
echo "index.html generado"
