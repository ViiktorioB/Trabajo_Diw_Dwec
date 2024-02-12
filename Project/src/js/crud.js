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

  document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });


    const buscarboton = document.getElementById("buscarBtn")
    if(buscarboton){
      buscarboton.addEventListener("click", function(event) {
        event.preventDefault();
      
        var centro = document.getElementById("input1").value;
        var fecha = document.getElementById("input2").value;
        var hora = document.getElementById("input3").value;
      
        verificarDisponibilidad(centro, fecha, hora);
      });
    }
   
}


function verificarDisponibilidad(centro, fecha, hora) {
  const transaction = db.transaction(["Reservas"], "readonly");
  const objectStore = transaction.objectStore("Reservas");
  const getAllRequest = objectStore.index("userIndex").getAll();

  getAllRequest.onerror = function(event) {
      console.error("Error al verificar la disponibilidad:", event.target.errorCode);
  };

  getAllRequest.onsuccess = function(event) {
    console.log(event.target.result);
      const pistasOcupadas = event.target.result;
      let isAvailable = true;
      pistasOcupadas.forEach(pista => {
        if (pista) {
          const reserva = pista;
          console.log('INPUT 1');
          console.log(fecha);
          console.log(hora);
          console.log(centro);

          console.log('INPUT 2');
          console.log(reserva.fecha);
          console.log(reserva.hora);
          console.log(reserva.centro.name);
          if (reserva.fecha === fecha && reserva.hora === hora && reserva.centro.name === centro) {
              isAvailable = false;
          }
        }
      });
      if (isAvailable) {
        let successBuscar = document.getElementById("successBuscar");
        successBuscar.innerText = "Esta reserva esta disponible";
        successBuscar.style.display = "block";
      } else {
        let errorBuscar = document.getElementById("errorBuscar");
        errorBuscar.innerText = "Esta reserva no esta disponible";
        errorBuscar.style.display = "block";
      }
  };
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
  const modifyForm = document.getElementById("modifyForm");
  modifyForm.fecha.value = reserva.fecha;
  modifyForm.hora.value = reserva.hora;

  const modifyModal = new bootstrap.Modal(
    document.getElementById("modifyModal")
  );
  modifyModal.show();

  const transaccion = db.transaction(["Reservas"], "readonly");
  const objectStore = transaccion.objectStore("Reservas");

  let solicitudReserva = objectStore.get(reserva.id);

  solicitudReserva.onsuccess = () => {
    const sendEdit = document.getElementById("sendEdit");
    sendEdit.addEventListener("click", () => {
      let data = {
        id: reserva.id,
        centro: reserva.centro,
        user: reserva.user,
        hora: modifyForm.hora.value,
        fecha: modifyForm.fecha.value,
      };
      const transaccion = db.transaction(["Reservas"], "readwrite");
      const objectStore = transaccion.objectStore("Reservas");
      objectStore.put(data);
    });
  };

  solicitudReserva.onerror = () => {
    console.log("error");
  };
}

function addEventListeners() {
  const añadirBoton = document.getElementById("añadir");
  const byNameButton = document.getElementById("byName");

  if (añadirBoton) {
    añadirBoton.addEventListener("click", añadirReserva);
  }

  if (byNameButton) {
    byNameButton.addEventListener("click", () => {
      if (userJSON) {
        window.location.href = './perfil.html' 
        verReservasPorNombre();
      }
      else {
        let errorReserva = document.getElementById("errorReserva");
        errorReserva.innerText = "Para realizar esta acción debes iniciar sesión.";
        errorReserva.style.display = "block";      }
    });
  }
}

function añadirReserva() {
  const transaccion = db.transaction(["Reservas"], "readwrite");
  const objectStore = transaccion.objectStore("Reservas");
  usuarioLog = localStorage.getItem("userLog");
  userJSON = JSON.parse(usuarioLog);
  if (userJSON, date.value) {
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
      let successReserva = document.getElementById("successReserva");
      successReserva.innerText = "Reserva añadida correctamente.";
      successReserva.style.display = "block";
      errorReserva.style.display = 'none';
    };

    solicitud.onerror = () => {
      console.error("Error al añadir la reserva");
    };
  }

  else {
    if (!userJSON) {
      let errorReserva = document.getElementById("errorReserva");
      errorReserva.innerText = "Para realizar esta acción debes iniciar sesión.";
      errorReserva.style.display = "block";
  
    }

    else {
      let errorReserva = document.getElementById("errorReserva");
      errorReserva.innerText = "Debes introducir una fecha.";
      errorReserva.style.display = "block";

    }

  }
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
  const getAllRequest = objectStore.index("userIndex").getAll();

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
    fila.setAttribute('draggable', true)
    fila.classList.add('fila');
    fila.addEventListener('dragstart', drag);
    fila.addEventListener('dragover', allowDrop);
    fila.addEventListener('drop', drop);
    function drag(e) {
      e.target.classList.add('dragging');
      e.dataTransfer.setData('text',e.target.id);
    }
    
    function allowDrop(e) {
      e.preventDefault();
    }
    
    function drop(e) {
      e.preventDefault();
      const draggingElement = document.querySelector('.dragging');
      const dropTarget = e.target.closest('.fila');
    
      if (draggingElement && dropTarget && draggingElement !== dropTarget) {
        const parent = dropTarget.parentNode;
        const nextSibling = dropTarget.nextSibling === draggingElement ? dropTarget : dropTarget.nextSibling;
        parent.insertBefore(draggingElement, nextSibling);
      }

    
      document.querySelectorAll('.fila').forEach((fila) => fila.classList.remove('dragging'));
    }  
    fila.innerHTML = `
      <td class="align-middle">${reserva.fecha}</td>
      <td class="align-middle">${reserva.hora}</td>
      <td class="align-middle">${reserva.centro.name}</td>
      <td class="align-middle">
        <button id="modifyButton" type="button" class="btn btn-warning btn-sm" data-bs-toggle="modifyModal" data-bs-target="#modifyModal" data-toggle="tooltip" data-placement="top" title="Editar Reserva">
          <i class="bi bi-pencil-fill"></i>
        </button>
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
    modifyButton.addEventListener("click", () =>
      mostrarFormularioModificar(reserva)
    );
  });
}


document.addEventListener("DOMContentLoaded", initDB);
