// ===== Todas las mecánicas sueltas pasan a una subcategoría =====
Object.assign(GROUPS,{
mbase:['Control básico','Las formas fundamentales de mover a un personaje.'],plat:['Plataformas','Superficies que se mueven o que se pueden atravesar.'],autorun:['Movimiento automático','El personaje avanza solo y el jugador decide cuándo actuar.'],
turn:['Combate por turnos y estadísticas','Turnos, tiempo activo, debilidades, críticos y estados.'],read:['Leer al enemigo','Avisos y patrones que el jugador aprende a esquivar.'],
proj:['Proyectiles y colisiones','Lanzar, golpear y rebotar.'],forces:['Fuerzas y campos','Flotar, atraer, caer en órbita o ser empujado.'],rope:['Cuerdas y estructuras','Cosas que cuelgan, se cortan o se apilan.'],
classic:['Puzles clásicos','Rompecabezas de toda la vida convertidos en videojuego.'],tiles:['Fichas y colores','Combinar, ordenar y conectar piezas.'],space:['Puzles espaciales y de entorno','Mover objetos y manipular el escenario para abrir camino.'],
timing:['Pulsar en el momento justo','Medir el tiempo de una sola acción.'],dext:['Destreza y aguante','Mantener, machacar y equilibrar.'],
prog:['Niveles y atributos','Cómo crece el personaje.'],loot:['Botín y equipo','Objetos que se consiguen, se gastan y se mejoran.'],
idle:['Incrementales','Números que crecen solos.'],trade:['Comercio','Comprar barato y vender caro.'],prod:['Producción y recursos','Cultivar, recolectar y transformar.'],
rts:['Estrategia en tiempo real','Unidades, oleadas y territorio sin pausa.'],tact:['Táctica por turnos y cartas','Planificar cada movimiento.'],
nav:['Orientación y visibilidad','Saber dónde estás y qué ves.'],gate:['Progreso por el mapa','Lo que abre, guarda y conecta el mundo.'],wstruct:['Estructura del mundo','Cómo se genera y cambia el espacio.'],
aib:['Comportamiento básico','Los algoritmos de base para que algo se mueva con intención.'],
tctrl:['Controlar el tiempo','Rebobinar, frenar, congelar o repetir.'],tlim:['Contra el reloj','El tiempo como límite y como rival.'],
vspec:['Vehículos especiales','Naves, tanques y vehículos construidos por el jugador.'],
sand:['Sandbox de bloques y materiales','Construir, destruir y pintar el mundo.'],autom:['Automatización','Sistemas que funcionan solos una vez montados.'],
skillg:['Habilidad manual','Pulso, trazo y precisión.'],hobby:['Oficios y aficiones','Actividades tranquilas con su propio reto.'],
rel:['Relaciones y decisiones','Cómo te ven los demás y qué consecuencias tiene lo que haces.'],
needs:['Necesidades del cuerpo','Comer, beber, descansar y abrigarse.'],fear:['Miedo y oscuridad','Recursos que sostienen la calma.'],
juice:['Impacto y respuesta','Que cada acción se note.'],motion:['Movimiento y profundidad','Cómo se mueve la imagen.'],
arcA:['Disparos arcade','Naves, invasores y lluvia de amenazas.'],arcB:['Pelota y piezas','Rebotes, ladrillos y piezas que caen.'],arcC:['Esquivar y recorrer','Laberintos, serpientes y obstáculos.'],
runs:['Partidas y rejugabilidad','Lo que se guarda, se repite o se arriesga entre partidas.'],score:['Puntuación y dificultad','Medir y ajustar el rendimiento.'],
sim:['Simulación del entorno','Sistemas que reaccionan entre sí sin el jugador.'],
cards:['Cartas','Barajas, manos e iniciativa.'],dice:['Dados y tablero','Tiradas, dados mejorables y casillas.'],
ball:['Fútbol','Pasar, chutar y regatear.'],bat:['Béisbol, baloncesto y tenis','Atrapar, lanzar y golpear en el momento justo.']});
GROUPS.obs=['Observación y memoria','Mirar con atención, recordar lo que se vio y encontrar lo que se esconde.'];
GROUPS.logic=['Lógica y reglas','Puzles en los que la respuesta se deduce o se programa a partir de reglas.'];
tag('mbase',0,['Movimiento en 8 direcciones','Movimiento por casillas','Control tipo tanque','Acometida (dash)']);
tag('plat',0,['Plataformas móviles','Plataformas atravesables']);
tag('autorun',0,['Carrera automática','Cambio de carril','Moverse con un toque']);
tag('turn','com',['Combate por turnos','Barra de tiempo activo (ATB)','Debilidades elementales','Golpes críticos y números de daño','Estados alterados']);
tag('throw',0,['Bumerán','Daño en área (explosivos)']);
tag('read',0,['Ataques telegrafiados','Patrones de balas (bullet hell)']);
tag('proj',0,['Tirachinas','Billar y colisiones elásticas','Restitución (rebote)','Pinball','Golf (golpe con fuerza)','Explosiones con onda expansiva']);
tag('forces',0,['Flotabilidad','Imanes','Gravedad orbital','Corrientes de aire','Masa y empuje','Portales']);
tag('rope',0,['Cortar cuerdas','Cuerdas y telas (Verlet)','Apilar bloques']);
tag('body',0,['Ragdoll']);
tag('classic',0,['Puzle deslizante','Apagar luces','Buscaminas','Nonograma','Torres de Hanói','Sudoku']);
tag('tiles',0,['Combinar tres (match-3)','Inundar de color','Unir puntos de colores','Ordenar por colores','Girar tuberías','2048']);
tag('space',0,['Empujar cajas (Sokoban)','Deslizar sobre hielo','Placas de presión','Láseres y espejos','Apilar cajas para subir','Engranajes','Cambio de dimensión','Sombras y siluetas','Perspectiva forzada']);
tag('logic',0,['Programar al robot','Reglas que se reescriben']);
tag('obs',0,['Memoria de parejas','Secuencia de memoria']);
tag('timing',0,['Barra de potencia en tres toques','Detener en la zona','Prueba de reflejos','Mantener y soltar','Recarga activa','Eventos rápidos (QTE)']);
tag('dext',0,['Machacar el botón','Mantener el equilibrio']);
tag('music',0,['Notas que caen (ritmo)','Moverse al ritmo']);
tag('prog',0,['Experiencia y niveles','Árbol de habilidades','Reparto de atributos']);
tag('loot',0,['Botín aleatorio por rareza','Durabilidad','Mejora con riesgo','Tiradas gacha con garantía']);
tag('mstruct','mis',['Misiones y registro']);
tag('idle',0,['Clicker','Generadores pasivos (idle)','Prestigio (renacer)']);
tag('trade',0,['Mercado con precios fluctuantes','Precio y demanda']);
tag('prod',0,['Granja: plantar, regar, cosechar','Recolección con reaparición','Cadena de producción']);
tag('rts',0,['Defensa de torres','Selección de unidades (RTS)','Triángulo de ventajas','Conquista de planetas']);
tag('tact',0,['Táctica por casillas','Construcción de mazo','Combate automático (autobattler)','Turnos simultáneos']);
tag('nav',0,['Niebla de guerra','Minimapa','Indicador de objetivo fuera de pantalla','Visibilidad limitada']);
tag('gate',0,['Llaves y puertas','Habilidad que abre caminos','Coleccionables y secretos','Puntos de control','Viaje rápido']);
tag('wstruct',0,['Generación procedural','Mundo envolvente','Ciclo de día y noche']);
tag('aib',0,['Perseguir, huir, deambular e interceptar','Búsqueda de caminos','Enjambres (boids)']);
tag('tctrl',0,['Rebobinar el tiempo','Cámara lenta','Detener el tiempo','El tiempo avanza si te mueves','Bucle temporal con ecos']);
tag('tctrl','tie',['Bucle temporal con conocimiento']);
tag('tlim',0,['Contrarreloj con fantasma','Cuenta atrás con bonificaciones']);
tag('vspec',0,['Aterrizaje con propulsor','Tanque con torreta independiente']);
tag('vspec','veh',['Construir vehículos con piezas']);
tag('sand',0,['Poner y quitar bloques','Simulación de materiales','Terreno destructible','Pintar territorio','Dibujar el nivel']);
tag('autom',0,['Circuitos lógicos','Cintas transportadoras']);
tag('skillg',0,['Cortar con gestos','Trazar con precisión','Lanzar con pulso tembloroso','Máquina de garra','Golpear al topo']);
tag('hobby',0,['Cocinar en su punto','Rascar y excavar','Fotografía']);
tag('rel',0,['Afinidad con personajes','Reputación con facciones','Decisiones con consecuencias']);
tag('story',0,['Investigación y deducción']);
tag('needs',0,['Hambre y sed','Aguante (estamina)','Temperatura','Salud regenerativa o botiquines']);
tag('fear',0,['Cordura','Linterna con batería']);
tag('juice',0,['Temblor de pantalla','Parada de impacto (hitstop)','Partículas de feedback','Estirar y aplastar']);
tag('motion',0,['Curvas de suavizado (easing)','Paralaje']);
tag('arcA',0,['Matamarcianos','Asteroides','Defender ciudades','Esquivar lo que cae']);
tag('arcB',0,['Pong','Rompeladrillos','Piezas que caen']);
tag('arcC',0,['Serpiente','Aleteo de un botón','Cruzar la carretera','Laberinto de puntos','Crecer comiendo','Vuelo en cueva']);
tag('runs',0,['Progresión entre partidas (roguelite)','Semilla aleatoria','Guardar y cargar','Arriesgar o plantarse']);
tag('score',0,['Multiplicador de combo','Dificultad adaptativa','Logros']);
tag('sim',0,['Clima que cambia el juego','Ecosistema de depredadores y presas','Reacciones en cadena']);
tag('cards',0,['Blackjack (21)','Manos de póker con multiplicador','Cartas de iniciativa']);
tag('dice',0,['Asignar dados a cartas','Dado mejorable','Casillas de tablero']);
tag('ball',0,['Pase con potencia','Tiro con efecto','Regate con sprint']);
tag('bat',0,['Atrapar la bola alta','Tiro a canasta con timing','Golpe de tenis con timing']);
// orden: las subcategorías más básicas, primero
{const FIRST=['mbase','plat','jump','turn','read','proj','forces','classic','tiles','space','timing','dext','prog','loot','idle','trade','prod','rts','tact','nav','gate','wstruct','aib','tctrl','tlim','sand','autom','skillg','hobby','rel','needs','fear','juice','motion','arcA','arcB','arcC','runs','score','sim','cards','dice','ball','bat'];const old=Object.assign({},GROUPS);for(const k in GROUPS)delete GROUPS[k];for(const k of FIRST)GROUPS[k]=old[k];for(const k in old)if(!(k in GROUPS))GROUPS[k]=old[k]}
