// ======================================
// CONFIGURACION GENERAL
// ======================================

const URL_API =
"https://script.google.com/macros/s/AKfycbwXekczQdDzjVBLWC8GPefjtKWYc1_j8XwQLuFdDjEFuHaC3aiL3Ocixo7EL2nRJ3C0ag/exec";


// ======================================
// CONSULTAR CUALQUIER HOJA
// ======================================

async function cargarHoja(nombreHoja){

    try{

        const response = await fetch(
            URL_API +
            "?accion=listar&hoja=" +
            encodeURIComponent(nombreHoja)
        );

        const datos = await response.json();

        return datos;

    }catch(error){

        console.error(error);

        return {
            ok:false,
            datos:[]
        };

    }

}


// ======================================
// CARGAR EQUIPOS
// ======================================

async function cargarEquipos(){

    const resultado =
        await cargarHoja("Equipos");

    if(!resultado.ok){
        return [];
    }

    return resultado.datos;
}


// ======================================
// CARGAR USUARIOS
// ======================================

async function cargarUsuarios(){

    const resultado =
        await cargarHoja("Usuarios");

    if(!resultado.ok){
        return [];
    }

    return resultado.datos;
}


// ======================================
// CARGAR CATALOGOS
// ======================================

async function cargarCatalogo(nombreCatalogo){

    const resultado =
        await cargarHoja(nombreCatalogo);

    if(!resultado.ok){
        return [];
    }

    return resultado.datos;
}


// ======================================
// GUARDAR REGISTRO
// ======================================

async function guardarRegistro(datos){

    try{

        const params =
            new URLSearchParams(datos);

        const response =
            await fetch(
                URL_API + "?" + params.toString()
            );

        const resultado =
            await response.json();

        return resultado;

    }catch(error){

        console.error(error);

        return {
            ok:false,
            mensaje:error.toString()
        };

    }

}
