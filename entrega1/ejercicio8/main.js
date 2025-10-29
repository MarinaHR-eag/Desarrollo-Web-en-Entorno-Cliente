/* ejercicio 8 */
let numMesas = 0;
let estadoMesas = [];

// Pedimos el número de mesas
do{
    let numMesasString = prompt(`Introduce el número de mesas del restaurante`);
    numMesas = parseInt(numMesasString);
}while(isNaN(numMesas))

// Inicializamos el estado de las mesas aleatoriamente
for (let i = 0; i < numMesas; i++){
    estadoMesas[i] = Math.floor(Math.random() * 5);
}

console.log(estadoMesas);

do{
    let numComensales = 0;
    do{
        let numComensalesString = prompt(`¿Cuántos comensales sois?`);
        numComensales = parseInt(numComensalesString);
    }while(isNaN(numComensales))

    if(numComensales < 0){
        continue
    }
    else if (numComensales > 4){
        alert("No podemos atender a más de 4 personas, venid en otro momento por favor");
    }
    else{
        let mesaEncontrada = false;
        let mesaAsignada;

        for(i = 0; i < numMesas && !mesaEncontrada; i++){
            if(estadoMesas[i] === 0){
                mesaEncontrada = true;
                mesaAsignada = i;
                estadoMesas[i] = numComensales;
            }
        }

        if(!mesaEncontrada){
            for(i = 0; i < numMesas && !mesaEncontrada; i++){
                if(estadoMesas[i] + numComensales <= 4){
                    mesaEncontrada = true;
                    mesaAsignada = i;
                    estadoMesas[i] += numComensales;
                }
            }
        }

        if(mesaEncontrada){
            console.log(`Podeis sentaros en la mesa ${mesaAsignada} `);
            console.log(estadoMesas);
        }
        else{
            console.log("No entrais en el restaurante, muchas gracias por venir ");
        }


    }
}while(numComensales > 0)