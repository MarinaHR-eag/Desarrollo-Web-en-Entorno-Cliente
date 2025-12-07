// Creamos una un objeto estado en el que guardamos el estado actual de la página
const estado = {
    // Obtenemos el elemento input del html
    entrada: document.getElementById("entrada"),
    // Obtenemos el elemento que va a contener las etiquetas que se generen
    contenedor: document.getElementById("contenedor-etiquetas"),
    // Obtenemos el elemento donde se van a poner los avisos
    aviso: document.getElementById("aviso"),
    // Creamos una propiedad para guardar las etiquetas generadas
    etiquetas: [],
    // Creamos otra propiedad para guardar el número de etiquetas generadas históricamente
    contador: 0,
    // Creamos otra propiedad para indicar qué etiqueta está seleccionada
    indiceSeleccionada: -1,
    // Creamos otra propiedad para guardar el número máximo de etiquetas que se pueden crear
    maxEtiquetas: 15
};

// FUNCIONES DE VALIDACIÓN
// Función para validar que los elementos del DOM existan antes de usarlos
function validarEstado({ entrada, contenedor, aviso }) {
    if(!entrada || !contenedor || !aviso){
        console.error("Error: faltan elementos en el HTML");
        return false;
    }
    return true;
}

// FUNCIONES AUXILIARES
// Función para añadir un nuevo mensaje a la sección de avisos
// Desestructuramos el objeto estado al pasarlo como argumento
function mostrarAviso({ aviso }, mensaje){
    aviso.textContent = mensaje;
}

// Función para limpiar la sección de avisos
function limpiarAviso({ aviso }){
    aviso.textContent = "";
}

// Función para crear una etiqueta nueva y añadirla al DOM
function crearEtiqueta(estado, texto){
    // Comprobamos que se ha introducido algo en el input y que no está vacío
    if(texto.trim() === ""){
        mostrarAviso(estado, "No se pueden crear etiquetas vacías");
        return;
    }

    // Antes de crear una etiqueta, comprobamos si no se ha superado el número máximo de etiquetas
    if(estado.etiquetas.length >= estado.maxEtiquetas){
        mostrarAviso(estado, "Máximo de etiquetas alcanzado");
        return;
    }

    // En caso de que no haya ningún problema, limpiamos la sección de avisos 
    limpiarAviso(estado);
    // Aumentamos le contador de etiquetas creadas
    estado.contador++;
    // Creamos un nuevo elemento para guardar la nueva etiqueta y lo añadimos al contenedor de etiquetas
    const etiqueta = document.createElement("div");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = `${texto} (Etiqueta ${estado.contador})`;

    estado.contenedor.appendChild(etiqueta);
    estado.etiquetas.push(etiqueta);

    // Si es la primera etiqueta, la seleccionamos automáticamente
    if(estado.etiquetas.length === 1){
        // guardamos el índice de la etiqueta que se está seleccionando
        estado.indiceSeleccionada = 0;
        // Actualizamos su clase css
        etiqueta.classList.add("seleccionada");
    }
}

// Función para actualizar la etiqueta seleccionada
function actualizarSeleccion(estado){
    // Quitamos primero la clase seleccionada a todas las etiquetas
    estado.etiquetas.forEach(etiqueta => {
        etiqueta.classList.remove("seleccionada")
    });

    // Si el índice de la etiqueta seleccionada es válido, le añadimos la clase seleccionada
    if(estado.indiceSeleccionada >= 0){
        estado.etiquetas[estado.indiceSeleccionada].classList.add("seleccionada");
    }
}

// Función para seleccionar la etiqueta anterior a la seleccionada
function seleccionarAnterior(estado){
    // Comprobamos que haya etiquetas antes de seleccionar la anterior
    if(estado.etiquetas.length === 0)
        return;

    // Para calcular el índice anterior, o el último en caso de estar seleccionada la primera etiqueta
    // sumamos la longitud del array de etiquetas al índice, y calculamos el resto con la longitud
    estado.indiceSeleccionada = 
        (estado.indiceSeleccionada - 1 + estado.etiquetas.length) % estado.etiquetas.length;

    actualizarSeleccion(estado);
}

// Función para seleccionar la etiqueta siguiente a la seleccionada
function seleccionarSiguiente(estado){
    // Comprobamos que haya etiquetas antes de seleccionar la siguiente
    if(estado.etiquetas.length === 0)
        return;

    estado.indiceSeleccionada = (estado.indiceSeleccionada + 1) % estado.etiquetas.length;

    actualizarSeleccion(estado);
}

// Función para eliminar la etiqueta seleccionada
function eliminarSeleccionada(estado){
    // Comprobamos primero que hay alguna etiqueta seleccionada
    if(estado.indiceSeleccionada < 0)
        return;
    // Obtenemos la etiqueta que está seleccionada usando el array de etiquetas
    const etiqueta = estado.etiquetas[estado.indiceSeleccionada];
    // Una vez tenemos la etiqueta, la borramos del DOM
    etiqueta.remove();

    // Ahora eliminamos esa etiqueta del array de etiquetas usando splice
    estado.etiquetas.splice(estado.indiceSeleccionada, 1);

    // Una vez hemos eliminado la etiqueta del array, ajustamos la etiqueta que está seleccionada
    // Primero comprobamos si el array de etiquetas se ha quedado vacío
    if(estado.etiquetas.length === 0){
        estado.indiceSeleccionada = -1;
        return;
    }

    // En caso de que la etiqueta seleccionada supere el tamaño del array (porque estuviera seleccionada la última)
    // elegimos la última del array actual
    if(estado.indiceSeleccionada >= estado.etiquetas.length){
        estado.indiceSeleccionada = estado.etiquetas.length - 1;
    }

    actualizarSeleccion(estado);
}

// Antes de ejecutar el programa, validamos que el DOM está bien construido
// Lanzamos una excepción en caso de que no sea así
if(!validarEstado(estado)){
    throw new Error("El estado inicial no es válido. Revisa el HTML.")
}

// Añadimos la gestión de loe eventos
// Añadimos un listener al input de entrada para el evento de teclado keydown con la tecla Enter
estado.entrada.addEventListener("keydown", evento => {
    if(evento.key === "Enter"){
        // Creamos una nueva etiqueta con el texto del input
        crearEtiqueta(estado, estado.entrada.value);
        // Borramos el texto del input
        estado.entrada.value = "";
    }
});

// Añadimos los eventos a nivel de document relacionados con la navegación entre etiquetas con el teclado
document.addEventListener("keydown", evento => {
    switch (evento.key) {
        // En caso de pulsar la flecha izquierda, se selecciona la etiqueta anterior
        case "ArrowLeft":
            seleccionarAnterior(estado);
            break;
        // En caso de pulsar la flecha derecha, se selecciona la etiqueta siguiente
        case "ArrowRight":
            seleccionarSiguiente(estado);
            break;
        // En caso de pulsar suprimir, se borra la etiqueta seleccionada
        case "Delete":
            eliminarSeleccionada(estado);
            break;
    }
});
