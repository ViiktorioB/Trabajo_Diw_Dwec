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
  
  
        ubicaciones.splice(1);
  
  
        localStorage.setItem("ubiii", JSON.stringify(ubicaciones));
  
        initializeMap(ubicaciones);
      });
    } else {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        mapElement.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  }
  
  async function initializeMap(ubicaciones) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: ubicaciones[0].lat, lng: ubicaciones[0].lon },
    });
  
    for (let i = 0; i < 6; i++) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ubicaciones[i].lat},${ubicaciones[i].lon}&key=AIzaSyDI3Wnk0as89bj1u3vPxkis9QTPMUfHPWI`);
        const data = await response.json();
  
        const label1 = {
          text: data.results[0].formatted_address,
          color: "black",
          fontSize: "14px",
        };
  
        new google.maps.Marker({
          position: { lat: ubicaciones[i].lat, lng: ubicaciones[i].lon },
          map,
          title: "Ubicación " + (i + 1),
          label: label1
        });
  
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
  
  