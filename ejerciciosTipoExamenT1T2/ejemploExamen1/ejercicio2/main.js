const PALABRAS = [
    "programacion",
    "arquitectura",
    "medicina",
    "arboleda",
    "desarrollo",
    "navegador",
    "carpeta",
    "impresora"
];

// Generamos una palabra aleatoria del array de palabras 
let posicionPalabraAleatoria = Math.floor(Math.random()*PALABRAS.length);
let palabra = PALABRAS[posicionPalabraAleatoria];

// Creamos un array para la palabra elegida y otro para el progreso
// Para crear el array de la palabra hacemos una desestructuración del string
let [...arrayPalabra] = palabra;
// Para crear el array de progreso podemos o usar un map o usar la función fill
// Con el map creamos un array nuevo que tenga el mismo número de elementos que arrayPalabra
// pero cambiamos todas las letras por _
let progreso = arrayPalabra.map(() => "_");

/* // La opción de usar la función fill nos crearía un array del mismo tamaño que arrayPalabra
// y lo llenaría de _ 
let progreso = Array(palabra.length).fill("_"); */

/* // También podríamos usar un bucle for para ir añadiendo elementos al array de progreso
let progreso = [];
for(let i=0; i<arrayPalabra.length ; i++){
    progreso[i] = "_";
    // O también valdría
    // progreso.push("_");
}*/

// Ahora creamos las variables que necesitamos para el transcurso de la partida
let vidas = 6;
let letrasUsadas = [];
let palabraAdivinada = false;

// Creamos una función para poder mostrar el estado de la partida, que nos muestre tanto la variable progreso como las vidas
const mostrarEstado = (progreso, vidas, letrasUsadas) => {
    console.log(
        `Palabra: ${progreso.join(" ")} \n
        Vidas: ${vidas} \n
        Letras usadas: ${letrasUsadas.join(", ") || "Ninguna"}`
    ); // El operador OR en este caso muestra el array letrasUsadas si no está vacío o el mensaje "Ninguna" en el caso de que sí esté vacío
}

// Creamos una función para comprobar si lo que tenemos en progreso es igual que la palabra o no
const comprobarProgreso = (progreso, palabra) => {
    // Hay que tener en cuenta que progreso es un array y palabra es un string, por eso se usa el join
    return progreso.join("") === palabra;
}

// Creamos una función para añadir una nueva letra al progreso
const aniadirLetraAProgreso = (letraIntroducida, progreso, arrayPalabra) => {
    // Usamos un forEach para actualizar la variable progreso
    arrayPalabra.forEach((letra, indice) => {
        if (letra === letraIntroducida) {
            progreso[indice] = letra;
        }
    });

    return progreso;
} 

// Creamos un bucle do while que nos maneje los turnos (mientras que nos queden vidas y no se adivine la palabra)
do{
    // Mostramos el estado de la partida
    let letra = "";
    let letraValida = false;
    mostrarEstado(progreso, vidas, letrasUsadas);
    
    // Pedimos al usuario que introduzca una letra
    do{
        letra = prompt("Introduzca una letra").trim().toLowerCase();
        // Comprobamos que el usuario haya introducido un carácter por lo menos
        if(!letra || letra.length != 1){
            alert("Por favor, introduce una sola letra válida");
        }
        // Comprobamos si la letra que se ha introducido se ha usado ya
        else if(letra in letrasUsadas){
            alert("Esa letra ya la has usado.")
        }
        // Si ha introducido los datos de forma correcta, añadimos la letra a las letras usadas
        else{
            letrasUsadas.push(letra);
            letraValida = true;
        }
    }while(!letraValida)
    
    // Comprobamos si la palabra incluye la letra que se ha introducido
    if(palabra.includes(letra)){
        progreso = aniadirLetraAProgreso(letra, progreso, arrayPalabra);
    } else{
        vidas--;
        alert("Letra incorrecta. Pierdes una vida");
    }
    // Comprobamos si se ha adivinado la palabra para poder salir del bucle
    palabraAdivinada = comprobarProgreso(progreso, palabra);
}while(vidas > 0 && !palabraAdivinada)

// Comprobamos si se ha ganado el juego o no
if(vidas > 0 && palabraAdivinada){
    alert(`¡Enhorabuena! Has ganado. La palabra era: ${palabra}`);
} else{
    alert(`Has perdido! La palabra era: ${palabra}`);
}