// Creamos los objetos jugador y enemigo con los valores por defecto que nos han dado
const jugador = {
  nombre: "Pikachu",
  vida: 100,
  ataques: [
    { nombre: "Impactrueno", danio: 20 },
    { nombre: "Placaje", danio: 10 },
    { nombre: "Rayo", danio: 30 }
  ]
};

const enemigo = {
  nombre: "Charmander",
  vida: 100,
  ataques: [
    { nombre: "Arañazo", danio: 10 },
    { nombre: "Ascuas", danio: 20 },
    { nombre: "Lanzallamas", danio: 30 }
  ]
};

const mostrarAtaquesDisponibles = (jugador) => {
    let {ataques} = jugador;
    console.log(`Tienes los siguientes ataques disponibles: \n`);
    let nombresAtaques = ataques.map((ataque) => ataque.nombre);
    console.log(nombresAtaques.join(", "));
}

// Función para obtener el daño que nos hace el enemigo con su ataque
const ataqueEnemigo = (enemigo) => {
    // Obtenemos un ataque aleatorio 
    let indiceAtaqueEnemigo = Math.floor(Math.random()*enemigo.ataques.length);
    // Obtenemos el daño que hace el enemigo con su ataque y lo restamos a la vida del jugador
    let danio = enemigo.ataques[indiceAtaqueEnemigo].danio;
    
    return danio;
}

// Creamos una función para mostrar las vidas de los pokémon, y que controla que si tienen valores negativos se muestre 0
const mostrarVidas = (jugador, enemigo) => {
    let vidaJugador = jugador.vida;
    let vidaEnemigo = enemigo.vida;
    if(vidaJugador < 0){
        vidaJugador = 0;
    }
    if(vidaEnemigo < 0){
        vidaEnemigo = 0;
    }
    console.log(`Tienes ${vidaJugador} HP`);
    console.log(`El enemigo tiene ${vidaEnemigo} HP`);
}
// Hacemos una función para saber cuál es el pokémon ganador o si ha habido un empate, e imprimimos por pantalla la vida que les que
const mostrarResultadoFinal = (jugador, enemigo) => {
    let vidaJugador = jugador.vida;
    let vidaEnemigo = enemigo.vida;
    
    // Calculamos quién ha sido el ganador del combate o si han empatado usando un operador ternario con doble comprobación
    /*
    let ganador = vidaJugador <= 0 && vidaEnemigo > 0 ? enemigo.nombre
        : vidaJugador > 0 && vidaEnemigo <= 0
        ? jugador.nombre
        : "Empate";*/

    // Calculamos quién ha sido el ganador usando bloques if else
    let ganador = "";
    if(vidaJugador <= 0 && vidaEnemigo > 0){
        ganador = enemigo.nombre;
    }
    else if(vidaJugador > 0 && vidaEnemigo <= 0){
        ganador = jugador.nombre;
    }
    else{
        ganador = "Empate";
    }

    return ganador;
}

// Funcionalidad principal
do{
    // Pedimos al usuario el ataque que quiere realizar
    let ataqueElegido = "a";
    do{
        mostrarAtaquesDisponibles(jugador);
        ataqueElegido = prompt(`¿Qué ataque quieres usar?`);
        ataqueElegido = ataqueElegido.trim().toLowerCase();
    }while(!ataqueElegido); // Usamos un valor falsy para valorar si hemos introducido un ataque correcto
    
    // Comprobamos que el ataque exista
    // Comprobamos si el objeto existe y si tiene stock
    let indiceAtaque = jugador.ataques.findIndex(
        ataque => ataque.nombre.toLowerCase() === ataqueElegido
    );

    if(indiceAtaque >= 0){
        let danioEnemigo = ataqueEnemigo(enemigo);
        jugador.vida -= danioEnemigo;
        // Obtenemos el daño que hacemos al enemigo con nuestro ataque
        let danio = jugador.ataques[indiceAtaque].danio;
        enemigo.vida -= danio;

        // Mostramos las vidas de los contrincantes
        mostrarVidas(jugador, enemigo);
    }
    else{
        console.log("Ese ataque no existe ");
    }
}while(jugador.vida > 0 && enemigo.vida > 0);

let ganador = mostrarResultadoFinal(jugador, enemigo);
console.log(`El ganador del combate es: ${ganador}`);