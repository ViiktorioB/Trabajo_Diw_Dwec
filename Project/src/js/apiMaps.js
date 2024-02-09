function initMap() {
    let lat, lon;
  
    function Ubication(lat, lon, acu) {
      this.lat = lat;
      this.lon = lon;
      this.acu = acu;
    }
  
    const ubicaciones = JSON.parse(localStorage.getItem("ubiii")) || [];
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        acu = position.coords.accuracy;
        
  
        const nuevaUbicacion = new Ubication(lat, lon, acu);
  
        ubicaciones.unshift(nuevaUbicacion);
  
  
        ubicaciones.splice(4);
  
  
        localStorage.setItem("ubiii", JSON.stringify(ubicaciones));

        // Marcadores centros 

        const ubicacionesCentrosNuevo = JSON.parse(localStorage.getItem("ubiCentros")) || [];

        const ubicacionesCentros = [
            { "lat": 39.562722, "lon": 2.674083 },
            { "lat": 39.585667, "lon": 2.620639 },
            { "lat": 39.571556, "lon": 2.680361 }
        ];

        localStorage.setItem("ubiCentros", JSON.stringify(ubicacionesCentros));

        initializeMap(ubicaciones, ubicacionesCentrosNuevo);
      });
    } else {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        mapElement.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  }
  
  async function initializeMap(ubicaciones, centros) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: ubicaciones[0].lat, lng: ubicaciones[0].lon },
    });

  
    for (let i = 0; i < 4; i++) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ubicaciones[i].lat},${ubicaciones[i].lon}&key=AIzaSyDI3Wnk0as89bj1u3vPxkis9QTPMUfHPWI`);
        const data = await response.json();
  
        const label1 = {
          text: "Ubicacion Actual",
          color: "black",
          fontSize: "15px",
        };

        const nombresCentro = [
            "Padel Portixol",
            "Padel Palma",
            "Padel Club Mallorca"
        ];

        const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";


        // Marcadores de ubicaciones actuales
        new google.maps.Marker({
          position: { lat: ubicaciones[i].lat, lng: ubicaciones[i].lon },
          map,
          title: "Ubicación " + (i + 1),
          label: label1,
        });

        // Marcadores de ubicaciones de centros
        new google.maps.Marker({
            position: { lat: centros[i].lat, lng: centros[i].lon },
            map,
            title: "Ubicación Centro " + (i + 1),
            label: { text: nombresCentro[i], color: "black", fontSize: "16px"},
            icon: image,
        });
  
        // Circulos de ubicaciones actuales
        new google.maps.Circle({
          strokeColor: "yellow",
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: "yellow",
          fillOpacity: 0.15,
          map,
          center: { lat: ubicaciones[i].lat, lng: ubicaciones[i].lon },
          radius: ubicaciones[i].acu,
        });
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    }
}

  
window.initMap = initMap;
