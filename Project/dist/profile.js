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

/***/ "./src/js/profile.js":
/*!***************************!*\
  !*** ./src/js/profile.js ***!
  \***************************/
/***/ (() => {

eval("usuarioLog = localStorage.getItem('userLog');\nuserJSON = JSON.parse(usuarioLog);\nlet nombrePerfil = document.getElementById('nombrePerfil');\nlet mailPerfil = document.getElementById('mailPerfil');\nlet levelPerfil = document.getElementById('levelPerfil');\n\nif (nombrePerfil, mailPerfil, levelPerfil) {\n    nombrePerfil.innerText = userJSON[0].name;\n    mailPerfil.innerText = userJSON[0].email;\n    levelPerfil.innerText = userJSON[0].level;\n}\n\nlet backHome = document.getElementById('backHome');\nif (backHome) {\n    backHome.addEventListener('click', () => {\n        window.location.href = 'index.html'\n    })\n}\n\n\n//# sourceURL=webpack://kittens_webpack/./src/js/profile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/profile.js"]();
/******/ 	
/******/ })()
;