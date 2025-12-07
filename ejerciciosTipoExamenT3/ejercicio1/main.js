// Creamos una un objeto estado en el que guardamos el estado actual de la página
const estado = {
    botones: document.querySelectorAll("#tabs button"),
    paneles: document.querySelectorAll(".panel")
}

// FUNCIONES DE VALIDACIÓN
// Pasamos como parámetro el objeto estado desestructurado
function validarEstado({ botones, paneles }){
    // Comprobamos que haya botones creados en el html
    if(!botones || botones.length === 0){
        console.error("Error: no se encontraron botones de pestañas");
        return false;
    }

    // Comprobamos que haya paneles creados en el html
    if(!paneles || paneles.length === 0){
        console.error("Error: no se encontraron paneles");
        return false;
    }

    // Comprobamos que el número de botones es igual al de paneles
    if(botones.length !== paneles.length){
        console.warn("Aviso: el número de pestañas no coincide con el número de paneles");
    }

    return true;
}

// FUNCIONES AUXILIARES
// Función para quitar la clase activo a todos los elementos pasados como argumento
function desactivarElementos(elementos){
    elementos.forEach(elemento => elemento.classList.remove('activo'));
}

// Función para desactivar todo, paneles y botones
function desactivarTodo({ botones, paneles }){
    desactivarElementos(botones);
    desactivarElementos(paneles);
}

// Función para activar un tab
function activarTab(boton, estado){
    const idObjetivo = boton.dataset.objetivo;
    const panel = document.getElementById(idObjetivo);

    // Desactivamos todos los paneles y los botones
    desactivarTodo(estado);

    // Marcamos el botón como activo
    boton.classList.add("activo");

    // Si el botón tiene un panel asociado, lo marcamos como activo también
    if(panel){
        panel.classList.add("activo");
    }
}

// Validamos el estado de la página antes de ejecutar 
if(!validarEstado(estado)){
    throw new Error("Estado inicial inválido. Revisa el HTML.");
}

// Añadimos un listener a cada uno de los botones que ejecute la función activarTab
estado.botones.forEach(btn => {
    btn.addEventListener('click', () => {
        activarTab(btn, estado)
    })
})