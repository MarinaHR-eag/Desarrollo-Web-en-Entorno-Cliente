const ESTUDIANTES = [
    {nombre: "Ana", nota: 8},
    {nombre: "Raul", nota: 10},
    {nombre: "Pepe", nota: 0},
    {nombre: "Heidi", nota: 2},
    {nombre: "Mohamed", nota: 6}
];

// Mostrar lista completa de estudiantes y sus notas
const mostarNotasEstudiantes = (estudiantes) => {
    estudiantes.forEach(estudiante => {
        let {nombre, nota} = estudiante;
        console.log(`${nombre} - ${nota}`);
    });
}

// Calcular la nota media del grupo
const notaMediaGrupo = (estudiantes) => {
    let media = 0;
    // Opcion 1: reduce
    media = estudiantes.reduce(
        (sumaNotas, estudiante) => sumaNotas + estudiante.nota, 0)/estudiantes.length;
    return media;

    /*// Opcion 2: forEach y sumamos los valores a mano
    let sumaNotas = 0;
    estudiantes.forEach(estudiante => {
        sumaNotas += estudiante.nota;
    });
    media = sumaNotas/estudiantes.length;
    return media;*/
}

// Mostrar estudiantes aprobados
const estudiantesAprobados = (estudiantes) => {
    /*// Opcion 1: filter + forEach
    let estudiantesAprobados = [];
    estudiantesAprobados = estudiantes.filter(estudiante => estudiante.nota >= 5);
    console.log("Estudiantes aprobados: ")
    estudiantesAprobados.forEach(estudiante => {
        console.log(estudiante.nombre)
    })*/

    // Opcion 2: filter + map
    var estudiantesAprobados = estudiantes.filter(
        est => est.nota >= 5
    ).map(est => est.nombre);
    console.log(`Aprobados: ${estudiantesAprobados.join(", ")}`);
}

mostarNotasEstudiantes(ESTUDIANTES);
let media = notaMediaGrupo(ESTUDIANTES);
console.log(media);
estudiantesAprobados(ESTUDIANTES);

// Pedir al usuario un nombre de estudiante y mostrar su nota por pantalla
//let nombreEstudiante = prompt("Introduzca el nombre del estudiante ").toLowerCase().trim();
let nombreEstudiante = "pepe";
let encontrado = false;
let estudianteAMostrar;

/*// Opcion 1: forEach y buscamos el nombre
ESTUDIANTES.forEach(estudiante => {
     if(estudiante.nombre.toLowerCase() === nombreEstudiante){
        encontrado = true;
        estudianteAMostrar = estudiante;
     }        
})

if(encontrado){
    console.log(`${estudianteAMostrar.nombre} tiene una nota de ${estudianteAMostrar.nota}`);
} else{
    console.log(`El estudiante ${nombreEstudiante} no existe`);
} */

// Opcion 2: find
estudianteAMostrar = ESTUDIANTES.find(
    estudiante => estudiante.nombre.toLowerCase() === nombreEstudiante
);

if(estudianteAMostrar){
    console.log(`${estudianteAMostrar.nombre} tiene una nota de ${estudianteAMostrar.nota}`);
} else{
    console.log(`El estudiante ${nombreEstudiante} no existe`);
}