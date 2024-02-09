const request = indexedDB.open("Reservas", 1);

let db;

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

  const añadirBoton = document.getElementById("añadir");
  const nombre = document.getElementById("nombre");
  const centro = document.getElementById("centro");
  const hora = document.getElementById("hora");
  const date = document.getElementById("date");

  if (añadirBoton) {
    añadirBoton.addEventListener("click", () => {
      const transaccion = db.transaction(["Reservas"], "readwrite");
      const objectStore = transaccion.objectStore("Reservas");
      usuarioLog = localStorage.getItem("userLog");
      userJSON = JSON.parse(usuarioLog);
      const nuevaReserva = {
        name: nombre.value,
        centro: {
          name: centro.value,
          lat: centro.options[centro.selectedIndex].getAttribute(
            "data-latitud"
          ),
          lon: centro.options[centro.selectedIndex].getAttribute(
            "data-longitud"
          ),
        },
        hora: hora.value,
        fecha: date.value,
        user: userJSON[0].name,
      };

      const solicitud = objectStore.add(nuevaReserva);

      solicitud.onsuccess = () => {
        console.log("Reserva añadida correctamente");
      };

      solicitud.onerror = () => {
        console.error("Error al añadir la reserva");
      };
    });
  }

  //MÍO
  let verTodo = document.getElementById("verTodo");
  if (verTodo) {
    verTodo.addEventListener("click", () => {
      const transaccion = db.transaction(["Reservas"], "readonly");
      const objectStore = transaccion.objectStore("Reservas");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (ev) {
        const reservas = ev.target.result;
        const tablaReservas = document.getElementById("tablaReservas");

        // Limpiar la tabla antes de agregar nuevas filas
        tablaReservas.innerHTML = "";

        // Agregar una fila por cada reserva
        reservas.forEach((reserva) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
                    <td class="align-middle">${reserva.fecha}</td>
                    <td class="align-middle">${reserva.hora}</td>
                    <td class="align-middle">${reserva.centro.name}</td>
                    <td class="align-middle">
                        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="bi bi-gear-fill"></i>
                        </button>
                        <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i class="bi bi-calendar-x-fill"></i>
                        </button>
                    </td>`;

          tablaReservas.appendChild(fila);
        });
      };

      getAllRequest.onerror = function (ev) {
        console.error("Error fetching data:", ev.target.error);
      };
    });
  }
  
  byNameButton = document.getElementById("byName");
  if (byNameButton) {
    byNameButton.addEventListener("click", () => {
      usuarioLog = localStorage.getItem("userLog");
      userJSON = JSON.parse(usuarioLog);
      const usuarioActual = userJSON[0].name;
      const transaccion = db.transaction(["Reservas"], "readwrite");
      const objectStore = transaccion.objectStore("Reservas");
      const index = objectStore.index("userIndex");
      const getAllRequest = objectStore.index('userIndex').getAll();
      getAllRequest.onsuccess = (ev) => {
        const cursor = ev.target.result;
        console.log(cursor);
        cursor.forEach(reserva => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                      <td class="align-middle">${reserva.fecha}</td>
                      <td class="align-middle">${reserva.hora}</td>
                      <td class="align-middle">${reserva.centro.name}</td>
                      <td class="align-middle">
                          <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <i class="bi bi-person-fill-add"></i>
                          </button>
                          <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <i class="bi bi-person-fill-gear"></i>
                          </button>
                          <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                              <i class="bi bi-person-fill-gear"></i>
                          </button>
                      </td>`;
  
            tablaReservas.appendChild(fila);
          });
      };
    });
  }
};

// MIO HASTA AQUÍ
const ver = () => {};

const actualizar = () => {};

const eliminar = () => {};
