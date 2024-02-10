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

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

function eliminarReserva(reservaId) {
  const transaccion = db.transaction(["Reservas"], "readwrite");
  const objectStore = transaccion.objectStore("Reservas");

  const solicitud = objectStore.delete(reservaId);

  solicitud.onsuccess = () => {
    console.log("Reserva eliminada correctamente");
    window.location.reload();
  };

  solicitud.onerror = () => {
    console.error("Error al eliminar la reserva");
  };
}

function mostrarFormularioModificar(reserva) {
  const modifyForm = document.getElementById('modifyForm');
  modifyForm.fecha.value = reserva.fecha;
  modifyForm.hora.value = reserva.hora;

  const modifyModal = new bootstrap.Modal(document.getElementById('modifyModal'));
  modifyModal.show();

  const transaccion = db.transaction(["Reservas"], "readonly");
  const objectStore = transaccion.objectStore("Reservas");
  
  let solicitudReserva = objectStore.get(reserva.id)



  solicitudReserva.onsuccess = () => {
    const sendEdit = document.getElementById('sendEdit');
    sendEdit.addEventListener('click', () => {
      let data = {
        id: reserva.id,
        centro: reserva.centro,
        user: reserva.user,
        hora: modifyForm.hora.value,
        fecha: modifyForm.fecha.value,
      }
      const transaccion = db.transaction(["Reservas"], "readwrite");
      const objectStore = transaccion.objectStore("Reservas");    
      objectStore.put(data)
    })
  }

  solicitudReserva.onerror = () => {
    console.log('error');
  }
}

function addEventListeners() {
  const añadirBoton = document.getElementById("añadir");
  const byNameButton = document.getElementById("byName");

  if (añadirBoton) {
    añadirBoton.addEventListener("click", añadirReserva);
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
    successReserva.style.display = 'block';
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
      <td class="align-middle">
        <button id="modifyButton" type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#modifyModal" data-toggle="tooltip" data-placement="top" title="Editar Reserva">
          <i class="bi bi-pencil-fill"></i>
        </button>
        <!-- Modal para modificar reserva -->
<div class="modal fade" id="modifyModal" tabindex="-1" aria-labelledby="modifyModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modifyModalLabel">Modificar Reserva</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="modifyForm">
          <div class="mb-3">
            <label for="fecha" class="form-label">Fecha:</label>
            <input type="date" class="form-control" id="fecha" name="fecha" required>
          </div>
          <div class="mb-3">
            <label for="hora" class="form-label">Hora:</label>
            <input type="time" class="form-control" id="hora" name="hora" required>
          </div>
          <button id="sendEdit" type="submit" class="btn btn-primary">Guardar cambios</button>
        </form>
      </div>
    </div>
  </div>
</div>

        <button id="deleteButton" type="button" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Borrar Reserva">
          <i class="bi bi-calendar-x-fill"></i>
        </button>
      </td>`;

      if (tablaReservas) {
        tablaReservas.appendChild(fila);
      }

      const deleteButton = fila.querySelector("#deleteButton");
      const modifyButton = fila.querySelector("#modifyButton");

      deleteButton.addEventListener("click", () => eliminarReserva(reserva.id));
      modifyButton.addEventListener("click", () => mostrarFormularioModificar(reserva));

});
}


document.addEventListener("DOMContentLoaded", initDB);
