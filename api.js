 const URL_API =
"https://script.google.com/macros/s/AKfycbzeqAn-7ljMVh6lWLY2EsbQUyPIfXPGiQi8DGhMaULr8smReTfUm2BzGgXFFoPyJdI5DA/exec";

function cargarHoja(nombreHoja) {
  return new Promise((resolve, reject) => {
    const callbackName = "callback_" + Date.now();

    window[callbackName] = function(data) {
      resolve(data);
      delete window[callbackName];
      document.body.removeChild(script);
    };

    const script = document.createElement("script");

    script.src =
      URL_API +
      "?accion=listar&hoja=" +
      encodeURIComponent(nombreHoja) +
      "&callback=" +
      callbackName;

   script.onerror = function(e) {

  alert("ERROR SCRIPT");

  console.log(e);

  reject("Error cargando hoja " + nombreHoja);
};

    document.body.appendChild(script);
    alert(script.src);
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
