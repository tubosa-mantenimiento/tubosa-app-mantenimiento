 const URL_API =
"https://script.google.com/macros/s/AKfycbzeqAn-7ljMVh6lWLY2EsbQUyPIfXPGiQi8DGhMaULr8smReTfUm2BzGgXFFoPyJdI5DA/exec";

function cargarHoja(nombreHoja) {

  return new Promise((resolve, reject) => {

    const callbackName = "callback_" + Date.now();

    window[callbackName] = function(data){
      resolve(data);
      delete window[callbackName];
    };

    const script = document.createElement("script");

    script.src =
      URL_API +
      "?accion=listar" +
      "&hoja=" + encodeURIComponent(nombreHoja) +
      "&callback=" + callbackName;

    alert(script.src);

    script.onload = function(){
      console.log("JSONP cargado");
    };

    script.onerror = function(){
      alert("ERROR SCRIPT");
      reject("Error cargando hoja " + nombreHoja);
    };

    document.head.appendChild(script);

  });

}

async function cargarEquipos() {
  const resultado = await cargarHoja("Equipos");
  return resultado.ok ? resultado.datos : [];
}

async function cargarUsuarios() {
  const resultado = await cargarHoja("Usuarios");
  return resultado.ok ? resultado.datos : [];
}

async function cargarCatalogo(nombreCatalogo) {
  const resultado = await cargarHoja(nombreCatalogo);
  return resultado.ok ? resultado.datos : [];
}
