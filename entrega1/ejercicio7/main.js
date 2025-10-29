(/* Ejercicio 7 */

let arrayNumeros = [];

// Pedir 10 números por pantalla
for(let i= 0; i < 10; i++){
    do{
        let numString = prompt(`Introduce el número ${i+1} de 10 `);
        let num = parseInt(numString);
    }while(isNaN(num))
    arrayNumeros.push(num);
}

console.log(arrayNumeros);

// Pedir las posiciones inicial y final y comprobar que son correctas
let inicial = 0, final = 0;
do{
    alert("Los valores inicial y final tienen que estar entre 0 y 9, e inicial tiene que ser menor que final");
    do{
        let inicialString = prompt(`Introduce la posición inicial `);
        inicial = parseInt(inicialString);
    }while(isNaN(inicial))

    do{
        let finalString = prompt(`Introduce la posición final `);
        final = parseInt(finalString);
    }while(isNaN(final))
}while(inicial < 0 || inicial > 9 || final < 0 || final > 9 || inicial > final)

// Realizamos el desplazamiento del array
let valorInicial = arrayNumeros[inicial];

let arrayFinal = [...arrayNumeros];
arrayFinal.splice(final, 0, valorInicial);
let ultimoelemento = arrayFinal.pop();
arrayFinal.unshift(ultimoelemento);
arrayFinal.splice(inicial + 1, 1);

console.log(arrayFinal);