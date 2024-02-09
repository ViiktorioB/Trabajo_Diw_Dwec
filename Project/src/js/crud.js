let db;

function initDB() {
  const request = indexedDB.open("Reservas", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    console.log("BD creada", db);
    const objectStore = db.createObjectStore("Reservas", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("userIndex", "user", { unique: false });
  };

  request.onerror = (event) => {
    console.log("Error", event);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    verReservasPorNombre();
    addEventListeners();
  };
}

function eliminarReserva(reservaID){

  const transaccion = db.transaction(["Reservas"], "readwrite");
  const objectStore = transaccion.objectStore("Reservas");

  const solicitud = objectStore.delete(reservaID);

  solicitud.onsuccess = () => {
    console.log("Reserva eliminada correctamente");
    window.location.reload();
  };

  solicitud.onerror = () => {
    console.error("Error al eliminar la reserva");
  };
}

function addEventListeners() {
  const añadirBoton = document.getElementById("añadir");
  const verTodo = document.getElementById("verTodo");
  const byNameButton = document.getElementById("byName");

  if (añadirBoton) {
    añadirBoton.addEventListener("click", añadirReserva);
  }

  if (verTodo) {
    verTodo.addEventListener("click", verTodasLasReservas);
  }

  if (byNameButton) {
    byNameButton.addEventListener("click", verReservasPorNombre);
  }
}


function añadirReserva() {
  const transaccion = db.transaction(["Reservas"], "readwrite");
  const objectStore = transaccion.objectStore("Reservas");
  usuarioLog = localStorage.getItem("userLog");
  userJSON = JSON.parse(usuarioLog);
  const nuevaReserva = {
    centro: {
      name: centro.value,
      lat: centro.options[centro.selectedIndex].getAttribute("data-latitud"),
      lon: centro.options[centro.selectedIndex].getAttribute("data-longitud"),
    },
    hora: hora.value,
    fecha: date.value,
    user: userJSON[0].name,
  };

  const solicitud = objectStore.add(nuevaReserva);

  solicitud.onsuccess = () => {
    console.log("Reserva añadida correctamente");
    let successReserva = document.getElementById('successReserva');
    successReserva.innerText = 'Reserva añadida correctamente.'
    successReserva.style.display = block;
  };

  solicitud.onerror = () => {
    console.error("Error al añadir la reserva");
  };
}

function verTodasLasReservas() {
  const transaccion = db.transaction(["Reservas"], "readonly");
  const objectStore = transaccion.objectStore("Reservas");
  const getAllRequest = objectStore.getAll();

  getAllRequest.onsuccess = function (ev) {
    mostrarReservas(ev.target.result);
  };

  getAllRequest.onerror = function (ev) {
    console.error("Error fetching data:", ev.target.error);
  };
}

function verReservasPorNombre() {
  const transaccion = db.transaction(["Reservas"], "readwrite");
  const objectStore = transaccion.objectStore("Reservas");
  const getAllRequest = objectStore.index('userIndex').getAll();

  getAllRequest.onsuccess = (ev) => {
    mostrarReservas(ev.target.result);
  };
}


function mostrarReservas(reservas) {

  const tablaReservas = document.getElementById("tablaReservas");
  if (tablaReservas) {
    tablaReservas.innerHTML = "";

  }

  reservas.forEach((reserva) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td class="align-middle">${reserva.fecha}</td>
      <td class="align-middle">${reserva.hora}</td>
      <td class="align-middle">${reserva.centro.name}</td>
    `;

      if (tablaReservas) {
        tablaReservas.appendChild(fila);
      }

  });
}


document.addEventListener("DOMContentLoaded", initDB);
