// Crear base de datos
const db = new Dexie("MiDB");
db.version(1).stores({
  personas: "++id,nombre,apellidos,anio,mes"
});

document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const anio = parseInt(document.getElementById("anio").value);
  const mes = parseInt(document.getElementById("mes").value);

  const esBisiesto = (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
  const mesPar = mes % 2 === 0;

  await db.personas.add({ nombre, apellidos, anio, mes });

  document.getElementById("resultado").innerHTML = `
    <p>El año ${anio} ${esBisiesto ? "es bisiesto" : "no es bisiesto"}.</p>
    <p>El mes ${mes} es ${mesPar ? "par" : "impar"}.</p>
  `;
});
