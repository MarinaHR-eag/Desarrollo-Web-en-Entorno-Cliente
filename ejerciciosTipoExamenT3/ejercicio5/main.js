// Creamos una un objeto estado en el que guardamos el estado actual de la página
const estado = {
    // contadorCajas de cajas creadas
    contadorCajas: 0, 
    // Id de número de caja creada
    idCaja: 0,
    // Número máximo de cajas permitidas
    maxCajas: 10,
    // Contenedor donde se añaden las cajas
    contenedorCajas: document.getElementById("contenedor-cajas"),
    // Elemento para mostrar avisos
    seccionAvisos: document.getElementById("aviso")
};

// FUNCIONES DE VALIDACIÓN
// Función para validar que los elementos del DOM existan antes de usarlos
function validarEstado({ contenedorCajas, seccionAvisos }) {
    if(!contenedorCajas){
        console.error("Error: no se encontró el contenedor de cajas");
        return false;
    }
    if(!seccionAvisos){
        console.error("Error: no se encontró la sección de avisos");
        return false;
    }
    return true;
}

// Función para validar si aún se pueden crear cajas
function validarMaximo({ contadorCajas, maxCajas }){
    return contadorCajas < maxCajas;
}

// FUNCIONES AUXILIARES
// Función para añadir un nuevo mensaje a la sección de avisos
// Desestructuramos el objeto estado al pasarlo como argumento
function mostrarAviso({ seccionAvisos }, mensaje){
    seccionAvisos.textContent = mensaje;
}

// Función para limpiar la sección de avisos
function limpiarAviso({ seccionAvisos }){
    seccionAvisos.textContent = "";
}

// Función para añadir los listeners al elemento caja
function agregarEventosCaja(caja, estado){
    // Añadimos un listener para el evento mouseenter
    // Cambiamos el color de la caja cuando el ratón pasa por encima
    caja.addEventListener("mouseenter", () => caja.classList.add("hover"));
    // Añadimos un listener para el evento mouseleave
    // Cuando pasa este evento devolvemos la caja a su color original
    caja.addEventListener("mouseleave", () => caja.classList.remove("hover"));
    // Añadimos un listener para el evento click
    // Cuando pulsamos sobre una caja, la eliminamos del DOM
    caja.addEventListener("click", () => {
        caja.remove();
        estado.contadorCajas--;
        limpiarAviso(estado);
    });
}

// Función para crear nuevas cajas
function crearCaja(estado){
    // Comprobamos que no se ha superado el número máximo de cajas permitido
    // En el caso de que superemos el máximo de cajas permitidas, mostramos el aviso y salimos de la función
    if(!validarMaximo(estado)){
        mostrarAviso(estado, "Se ha alcanzado el máximo, no se pueden crear más cajas");
        return;
    }

    // En el caso de que no se haya superado el número máximo de cajas, quitamos el aviso si es que lo había
    limpiarAviso(estado);

    // Aumentamos el contadorCajas de cajas y creamos un nuevo elemento caja para añadir al DOM
    estado.contadorCajas++;
    estado.idCaja++;
    const caja = document.createElement("div");
    caja.className = "caja";
    caja.textContent = "Caja " + estado.idCaja;

    // Agregamos los eventos de la caja
    agregarEventosCaja(caja, estado);

    // Añadimos la caja al DOM
    estado.contenedorCajas.appendChild(caja);
}

// Antes de ejecutar el programa, validamos que el DOM está bien construido
// Lanzamos una excepción en caso de que no sea así
if(!validarEstado(estado)){
    throw new Error("El estado inicial no es válido. Revisa el HTML.")
}

// Añadimos un listener a nivel de document para las teclas
document.addEventListener("keydown", (evento) => {

    // Si se ha pulsado la tecla C se crea una caja nueva
    if (evento.key.toLowerCase() === "c") {
        crearCaja(estado);
    }
});