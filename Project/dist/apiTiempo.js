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

/***/ "./src/js/apiTiempo.js":
/*!*****************************!*\
  !*** ./src/js/apiTiempo.js ***!
  \*****************************/
/***/ (() => {

eval("window.addEventListener('load', () => {\n    let lon;\n    let lat;\n\n    const temperaturaValor = document.getElementById('temperatura-valor')  \n    const ubicacion = document.getElementById('ubicacion');\n    const iconoAnimado = document.getElementById('icono-animado');\n    const vientoVelocidad = document.getElementById('viento-velocidad');\n    const key = \"47d56af836728057d1d332e08065d0a6\";\n\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(posicion => {\n            lon = posicion.coords.longitude;\n            lat = posicion.coords.latitude;\n\n            // ubicación actual    \n            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;\n\n            fetch(url)\n                .then(response => { return response.json() })\n                .then(data => {\n\n                    let temp = Math.round(data.main.temp)\n                    temperaturaValor.textContent = `${temp-273}`\n\n                    ubicacion.textContent = data.name;\n                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;\n\n                    switch (data.weather[0].main) {\n                        case 'Thunderstorm':\n                          iconoAnimado.src='./assets/animated/thunder.svg'\n                          break;\n                        case 'Drizzle':\n                          iconoAnimado.src='./assets/animated/rainy-2.svg'\n                          break;\n                        case 'Rain':\n                          iconoAnimado.src='./assets/animated/rainy-7.svg'\n                          break;\n                        case 'Snow':\n                          iconoAnimado.src='./assets/animated/snowy-6.svg'\n                          break;                        \n                        case 'Clear':\n                            iconoAnimado.src='./assets/animated/day.svg'\n                          break;\n                        case 'Atmosphere':\n                          iconoAnimado.src='./assets/animated/weather.svg'\n                            break;  \n                        case 'Clouds':\n                            iconoAnimado.src='./assets/animated/cloudy.svg'\n                            break;  \n                        default:\n                          iconoAnimado.src='./assets/animated/cloudy-day-1.svg'\n                      }\n                })\n                .catch(error => {\n                    console.error('Error fetching weather data:', error);\n                });\n        });\n    }\n});\n\n\n//# sourceURL=webpack://kittens_webpack/./src/js/apiTiempo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/apiTiempo.js"]();
/******/ 	
/******/ })()
;