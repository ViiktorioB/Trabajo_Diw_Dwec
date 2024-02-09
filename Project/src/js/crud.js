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



























































  
  let verTodo = document.getElementById("verTodo");
  if (verTodo) {
    verTodo.addEventListener("click", () => {
      const transaccion = db.transaction(["Reservas"], "readonly");
      const objectStore = transaccion.objectStore("Reservas");

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (ev) {
        const reservas = ev.target.result;
        reservas.forEach((reserva) => {
          console.log(reserva);
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

      const cursorRequest = index.openCursor(IDBKeyRange.only(usuarioActual));

      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const reserva = cursor.value;

          console.log(reserva);

          cursor.continue();
        }
      };
    });
  }
};
const ver = () => {};

const actualizar = () => {};

const eliminar = () => {};
