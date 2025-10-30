const productos = [
    {nombre: "Pokeball", precio: 200, stock: 5},
    {nombre: "Superball", precio: 600, stock: 3},
    {nombre: "Pocion", precio: 300, stock: 4},
    {nombre: "Antidoto", precio: 200, stock: 2},
    {nombre: "Revivir", precio: 2000, stock: 1}
];

const jugador = {
    nombre: "Marina",
    dinero: 2500,
    mochila: []
};

let opcionElegida = "";
let productosFiltrados = [];

// Función para mostrar el estado de la tienda con los productos disponibles
const mostrarTienda = (productos) => {
    console.log("Los productos disponibles son: ");
    productos.forEach(producto => {
        let {nombre, precio, stock} = producto;
        console.log(`${nombre} --- precio: ${precio} --- cantidad disponible: ${stock}`);
    });
}

// Función para borrar del inventario los productos que no tienen stock
const borrarObjetosSinStock = (productos) => {
    // La función filter devuelve un array con los productos filtrados, por lo que lo guardamos en una variable y luego la devolvemos
    let productosFiltrados = productos.filter(producto => producto.stock > 0)

    return productosFiltrados;
}

// Función para mostrar los objetos de la mochila
const mostrarMochila = (jugador) => {
    let {mochila} = jugador;
    mochila.forEach(productoComprado => {
        console.log(`${productoComprado.nombre}`);
    });
}

do{
    // Filtramos los productos para quitar los que no tienen stock
    productosFiltrados = borrarObjetosSinStock(productos);
    // Mostramos los productos de la tienda filtrados
    mostrarTienda(productosFiltrados);
    // Mostrar el dinero del jugador
    console.log(`${jugador.nombre} tienes ${jugador.dinero} pokeyenes`);

    do{
        opcionElegida = prompt("Introduce el objeto que quieres comprar o \"salir\" para salir de la tienda");
        opcionElegida = opcionElegida.trim().toLowerCase();
    }while(!opcionElegida);

    // Comprobamos si el objeto existe y si tiene stock
    let indiceProducto = productosFiltrados.findIndex(producto => producto.nombre.toLowerCase() == opcionElegida);

    if(indiceProducto >= 0){
        // Comprobamos si el jugador tiene dinero suficiente
        if(jugador.dinero >= productosFiltrados[indiceProducto].precio){
            let {precio} = productosFiltrados[indiceProducto];
            productosFiltrados[indiceProducto].stock--;
            jugador.dinero -= precio;
            jugador.mochila.push(productosFiltrados[indiceProducto]);
        }
        else{
            console.log(`Eres pobre, no puedes comprar ${opcionElegida}`);
        }
    }
    else{
        console.log(`Ese producto no existe `);
    }
    
}while(opcionElegida !== "salir" && jugador.dinero > 0 && productosFiltrados.length !== 0);

// Mostramos el estado final de la partida
console.log(`${jugador.nombre} tienes ${jugador.dinero} pokeyenes`);
console.log(`${jugador.nombre} has comprado todo esto:  \n`);
mostrarMochila(jugador);
mostrarTienda(productosFiltrados);