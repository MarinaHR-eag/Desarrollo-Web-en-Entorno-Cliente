// Creamos un objeto para guardar el estado de la aplicación
const estado = {
    // Obtenemos el elemento que indica la barra de progreso
    barra: document.getElementById("barra"),
    // Usamos una variable para gestionar la anchura de la barra de progreso
    progreso: 0,
    // Identificador del temporizador
    intervalo: null
}

// FUNCIONES DE VALIDACIÓN
function validarEstado({barra}){
    if(!barra){
        console.error("Error: no se encontró el elemento barra de progreso.");
        return false;
    }
    return true;
}

// FUNCIONES AUXILIARES
// Función que actualiza la barra visualmente 
function actualizarBarra({barra, progreso}){
    // Actualizamos el estilo del elemento barra del DOM, aumentando su anchura
    barra.style.width = progreso + "%";
}

// Función que cambia la barra a modo completado
// Cuando llega al 100% borramos el temporizador y cambiamos el color de la barra a verde
function finalizarBarra({barra, intervalo}){
    clearInterval(intervalo);
    barra.style.background = "green";
}

// Función que avanza un paso en la animación
function avanzar(estado){
    // Aumentamos la variable de progreso en 1
    estado.progreso++;

    // Actualizamos el estado de la barra
    actualizarBarra(estado);

    // Comprobamos si se ha llegado al 100%
    if(estado.progreso >= 100){
        finalizarBarra(estado);
    }
}

// Función para inicializar el temporizador
// Usamos la función setInterval para crear un temporizador que ejecute una función cada 100 milisegundos
// Como queremos que la animación tarde 10 segundos y son 100 pasos, necesitamos que la anchura aumente en 1
// cada 100 milisegundos: 100 milisegundos * 100 pasos = 10000 milisegundos = 10 segundos

function iniciarTemporizador(estado){
    // Este temporizador devuelve un identificador, el cual guardamos en intervalo para poder
    // borrar el temporizador cuando terminemos la animación
    estado.intervalo = setInterval(() => {
        // La función que se ejecuta cada 100 milisegundos es:
        avanzar(estado);
    }, 100);

}

// Validamos el estado inicial de la aplicación
if(!validarEstado(estado)){
    throw new Error("Estado inicial inválido. Revisa el HTML.");
}

// Iniciamos el temporizador y la animación de la barra
iniciarTemporizador(estado);