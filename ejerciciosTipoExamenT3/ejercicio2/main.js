// Creamos un objeto para guardar el estado de la aplicación
const estado = {
    // Obtenemos la lista e elementos del HTML
    lista: document.getElementById("items"),
    // Creamos una variable para poder saber cuál de los elementos de la lista
    // es el que se está arrastrando
    elementoArrastrado: null
}

// FUNCIONES DE VALIDACIÓN
function validarEstado({ lista }){
    // Comprobamos que existe el elemento lista dentro del html
    if(!lista){
        console.error("Error: no se encontró la lista de elementos");
        return false;
    }

    // Comprobamos que la lista tiene elementos dentro
    if(lista.children.length === 0) {
        console.warn("Aviso: la lista no tiene elementos <li> dentro. ");
    }

    return true;
}

// FUNCIONES AUXILIARES
// Función para guardar la referencia del elemento arrastrado
function iniciarArrastre(elemento, estado){
    estado.elementoArrastrado = elemento;
}

// Función para limpiar la referencia al finalizar el arrastre
function finalizarArrastre(elemento, estado){
    estado.elementoArrastrado = null;
}

// Función para intercambiar elementos en el DOM
function reordenar(elementoDestino, estado){
    const {elementoArrastrado, lista} = estado;

    // Hacemos que si arrastramos a un sitio que no sea un elemento de la lista
    // añada al final de la lista el elemento
    if(!elementoDestino){
        lista.appendChild(elementoArrastrado);
        return;
    }
    // Comprobamos que el elemento destino no sea el mismo que el arrastrado
    if(elementoDestino === elementoArrastrado) return;

    // Insertar antes del objetivo
    lista.insertBefore(elementoArrastrado, elementoDestino);
}

// Validamos el HTML antes de ejecutar
if(!validarEstado(estado)){
    throw new Error("Error: Estado inicial inválido. Revisa el HTML.");
}

// Añadimos un listener para el evento dragstart en la lista de elementos
estado.lista.addEventListener('dragstart', evento => {
    // Cogemos le elemento li más próximo al elemento arrastrado
    const li = evento.target.closest("li");
    if(li)
        iniciarArrastre(li, estado);
});

// Añadimos un listener para el evento dragend en la lista de elementos
estado.lista.addEventListener('dragend', evento => {
    // Cogemos le elemento li más próximo al elemento arrastrado
    const li = evento.target.closest("li");
    if(li)
        finalizarArrastre(li, estado);
});

/* Añadimos un listener para el evento dragover en la lista de elementos
Este evento se activa cuando un elemento se arrastra sobre un objetivo 
de caída válido */
estado.lista.addEventListener('dragover', evento => {
    evento.preventDefault(); // Necesario para permitir drop
});

// Añadimos un listener para el evento drop en la lista de elementos
estado.lista.addEventListener('drop', evento => {
    // Este preventDefault no es necesario, pero sí recomendable para evitar 
    // comportamientos por defecto como el que el navegador intente abrir archivos arrastrados
    evento.preventDefault();
    // Obtenemos el elemento sobre el que queremos soltar el arrastrado
    const destino = evento.target.closest("li");

    reordenar(destino, estado);
});
