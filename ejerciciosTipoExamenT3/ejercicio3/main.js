// Creamos un objeto estado en el que se guarda el estado de la aplicación
const estado = {
    // Obtenemos el contador del HTML
    contador: document.getElementById("contador"),
    // Usamos una propiedad para ir actualizando el valor del contador
    valor: 0
}

// FUNCIONES DE VALIDACIÓN
function validarEstado({ contador }){
    if(!contador){
        console.error("Error: no se encontró el elemento contador");
        return false;
    }
    return true;
}

// FUNCIONES AUXILIARES
// Función que actualiza el contenido en pantalla
function actualizarVista({ contador, valor }){
    contador.textContent = valor;
}

//Función que modifica el valor según la tecla pulsada
function procesarTecla(evento, estado){
    switch(evento.key){
        // Si la tecla que hemos pulsado es la flecha hacia arriba, aumentamos el valor del contador
        case "ArrowUp":
            estado.valor++;
            break;
        // En el caso de que sea la flecha hacia abajo, reducimos el valor del contador
            case "ArrowDown":
            estado.valor--;
            break;
        // En el caso de que sea la tecla R (mayúscula o minúscula), reseteamos el valor del contador
        case "r":
        case "R":
            estado.valor = 0;
            break;
    }
    actualizarVista(estado);
}

// Validamos que el estado inicial sea correcto
if(!validarEstado(estado)){
    throw new Error("Estado inicial inválido. Revisa el HTML.");
}

// Añadimos un listener a nivel de document para el teclado
document.addEventListener('keydown', (evento) => {
    procesarTecla(evento, estado);
});
