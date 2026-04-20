const nombre = document.getElementById("nombre");
const grupo = document.getElementById("grupo");
const fecha = document.getElementById("fecha");
const actividad = document.getElementById("actividad");
const descripcion = document.getElementById("descripcion");
const resultado = document.getElementById("resultado");
const conclusion = document.getElementById("conclusion");

const btnMostrar = document.getElementById("btnMostrar");
const btnGuardar = document.getElementById("btnGuardar");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnImprimir = document.getElementById("btnImprimir");

const salida = document.getElementById("salida");

function obtenerDatosFormulario() {
  return {
    nombre: nombre.value.trim(),
    grupo: grupo.value.trim(),
    fecha: fecha.value,
    actividad: actividad.value.trim(),
    descripcion: descripcion.value.trim(),
    resultado: resultado.value.trim(),
    conclusion: conclusion.value.trim()
  };
}

function validarDatos(datos) {
  if (
    !datos.nombre ||
    !datos.grupo ||
    !datos.fecha ||
    !datos.actividad ||
    !datos.descripcion ||
    !datos.resultado ||
    !datos.conclusion
  ) {
    alert("Por favor completa todos los campos.");
    return false;
  }
  return true;
}

function mostrarVistaPrevia(datos) {
  salida.textContent = `
BITÁCORA DIGITAL

Nombre: ${datos.nombre}
Grupo: ${datos.grupo}
Fecha: ${datos.fecha}

Actividad:
${datos.actividad}

Descripción:
${datos.descripcion}

Resultados:
${datos.resultado}

Conclusión:
${datos.conclusion}
  `;
}

btnMostrar.addEventListener("click", () => {
  const datos = obtenerDatosFormulario();
  if (!validarDatos(datos)) return;
  mostrarVistaPrevia(datos);
});

btnGuardar.addEventListener("click", async () => {
  const datos = obtenerDatosFormulario();
  if (!validarDatos(datos)) return;

  // Guardado local
  localStorage.setItem("bitacora_practica_06", JSON.stringify(datos));

  // 🔥 Guardado en Firebase
  try {
    await addDoc(collection(db, "bitacora"), datos);
    alert("Guardado en navegador y Firebase ✅");
  } catch (error) {
    console.error(error);
    alert("Error al guardar en Firebase ❌");
  }
});

btnLimpiar.addEventListener("click", () => {
  nombre.value = "";
  grupo.value = "";
  fecha.value = "";
  actividad.value = "";
  descripcion.value = "";
  resultado.value = "";
  conclusion.value = "";

  salida.textContent = "Aquí aparecerá la vista previa de tu bitácora.";

  localStorage.removeItem("bitacora_practica_06");
});

btnImprimir.addEventListener("click", () => {
  window.print();
});

window.addEventListener("load", () => {
  const borrador = localStorage.getItem("bitacora_practica_06");

  if (borrador) {
    const datos = JSON.parse(borrador);

    nombre.value = datos.nombre || "";
    grupo.value = datos.grupo || "";
    fecha.value = datos.fecha || "";
    actividad.value = datos.actividad || "";
    descripcion.value = datos.descripcion || "";
    resultado.value = datos.resultado || "";
    conclusion.value = datos.conclusion || "";

    mostrarVistaPrevia(datos);
  }
});