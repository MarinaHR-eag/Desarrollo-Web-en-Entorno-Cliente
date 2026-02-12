const API = "https://pokeapi.co/api/v2";

// modelo
async function getDataFromApi(endpoint, filter) {
    // Construir la url
    url = `${API}/${endpoint}/${filter}`;

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Ese endpoint no está disponible. Es posible que es pokemon no exista");
        }

        const data = await response.json();

        return data;
    }
    catch(error){
        throw error;
    }
}

async function getSeveralPokemons(nombres){
    try{
        const promesas = nombres.map(nombre => 
            getDataFromApi('pokemon-species', nombre)
        );

        const resultados = await Promise.all(promesas);

        return resultados;
    }catch(error){
        throw error;
    }
}

async function postData(datos){
    url = `https://jsonplaceholder.typicode.com/posts`;

    try{
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: datos.title,
                body: datos.body,
                userId: datos.id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if(!response.ok){
            throw new Error("Ese endpoint no está disponible");
        }

        const data = await response.json();

        return data;
    }
    catch(error){
        throw error;
    }
}

/*async function getEvolutionChain(id){
    const data = await getDataFromApi('evolution-chain', id);


    chain.evolves_to[0].species.name
}*/

// Vista
function showDataByConsole(messages, data){
    for(let i=0; i<data.length; i++){
        console.log(`${messages[i]}: ${data[i]}`);
    }
}




// Controlador
async function execute(){
    try{
        const clefairyData = await getDataFromApi('pokemon-species', 'clefairy');
        console.log(clefairyData.id)
        /*const evolution = await getDataFromApi('evolution-chain', clefairyData.id);

        showDataByConsole(
            ["Evolution"],
            [evolution.keys]
        );*/

        const resultados = await getSeveralPokemons(['pikachu', 'charmander', 'clefairy']);

        datos = {
            title: "Información de Charmander",
            body: resultados[1],
            id: 1
        }

        const response = await postData(datos);

        console.log("RESPUESTA: " + response);

    } catch (error) {
        console.error("Error de ejecución: ", error.message);
    }
}

execute();

