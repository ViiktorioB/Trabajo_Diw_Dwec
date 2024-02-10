/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/apiMaps.js":
/*!***************************!*\
  !*** ./src/js/apiMaps.js ***!
  \***************************/
/***/ (() => {

eval("function initMap() {\n    let lat, lon;\n  \n    function Ubication(lat, lon, acu) {\n      this.lat = lat;\n      this.lon = lon;\n      this.acu = acu;\n    }\n  \n    const ubicaciones = JSON.parse(localStorage.getItem(\"ubiii\")) || [];\n  \n    if (navigator.geolocation) {\n      navigator.geolocation.getCurrentPosition(function (position) {\n        lat = position.coords.latitude;\n        lon = position.coords.longitude;\n        acu = position.coords.accuracy;\n        \n  \n        const nuevaUbicacion = new Ubication(lat, lon, acu);\n  \n        ubicaciones.unshift(nuevaUbicacion);\n  \n  \n        ubicaciones.splice(4);\n  \n  \n        localStorage.setItem(\"ubiii\", JSON.stringify(ubicaciones));\n\n        // Marcadores centros \n\n        const ubicacionesCentrosNuevo = JSON.parse(localStorage.getItem(\"ubiCentros\")) || [];\n\n        const ubicacionesCentros = [\n            { \"lat\": 39.562722, \"lon\": 2.674083 },\n            { \"lat\": 39.585667, \"lon\": 2.620639 },\n            { \"lat\": 39.571556, \"lon\": 2.680361 }\n        ];\n\n        localStorage.setItem(\"ubiCentros\", JSON.stringify(ubicacionesCentros));\n\n        initializeMap(ubicaciones, ubicacionesCentrosNuevo);\n      });\n    } else {\n      const mapElement = document.getElementById(\"map\");\n      if (mapElement) {\n        mapElement.innerHTML = \"Geolocation is not supported by this browser.\";\n      }\n    }\n  }\n  \n  async function initializeMap(ubicaciones, centros) {\n    const map = new google.maps.Map(document.getElementById(\"map\"), {\n      zoom: 14,\n      center: { lat: ubicaciones[0].lat, lng: ubicaciones[0].lon },\n    });\n\n  \n    for (let i = 0; i < 4; i++) {\n      try {\n        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ubicaciones[i].lat},${ubicaciones[i].lon}&key=AIzaSyDI3Wnk0as89bj1u3vPxkis9QTPMUfHPWI`);\n        const data = await response.json();\n  \n        const label1 = {\n          text: \"Ubicacion Actual\",\n          color: \"black\",\n          fontSize: \"15px\",\n        };\n\n        const nombresCentro = [\n            \"Padel Portixol\",\n            \"Padel Palma\",\n            \"Padel Club Mallorca\"\n        ];\n\n        const image =\n    \"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png\";\n\n\n        // Marcadores de ubicaciones actuales\n        new google.maps.Marker({\n          position: { lat: ubicaciones[i].lat, lng: ubicaciones[i].lon },\n          map,\n          title: \"Ubicación \" + (i + 1),\n          label: label1,\n        });\n\n        // Marcadores de ubicaciones de centros\n        new google.maps.Marker({\n            position: { lat: centros[i].lat, lng: centros[i].lon },\n            map,\n            title: \"Ubicación Centro \" + (i + 1),\n            label: { text: nombresCentro[i], color: \"black\", fontSize: \"16px\"},\n            icon: image,\n        });\n  \n        // Circulos de ubicaciones actuales\n        new google.maps.Circle({\n          strokeColor: \"yellow\",\n          strokeOpacity: 0.5,\n          strokeWeight: 2,\n          fillColor: \"yellow\",\n          fillOpacity: 0.15,\n          map,\n          center: { lat: ubicaciones[i].lat, lng: ubicaciones[i].lon },\n          radius: ubicaciones[i].acu,\n        });\n      } catch (error) {\n        console.error(\"Error fetching or processing data:\", error);\n      }\n    }\n}\n\n  \nwindow.initMap = initMap;\n\n\n//# sourceURL=webpack://kittens_webpack/./src/js/apiMaps.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/apiMaps.js"]();
/******/ 	
/******/ })()
;