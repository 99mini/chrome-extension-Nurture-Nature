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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function() {

eval("var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nfunction getSunsetTime(latitude, longitude) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const response = yield fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);\n        const data = yield response.json();\n        const sunsetTime = new Date(data.results.sunset);\n        return sunsetTime.toLocaleTimeString();\n    });\n}\nfunction displaySunsetTime() {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const position = yield new Promise((resolve, reject) => {\n                navigator.geolocation.getCurrentPosition(resolve, reject);\n            });\n            const sunsetTime = yield getSunsetTime(position.coords.latitude, position.coords.longitude);\n            document.getElementById(\"sunset-time\").textContent = sunsetTime;\n        }\n        catch (error) {\n            console.error(error);\n            document.getElementById(\"sunset-time\").textContent = \"unknown\";\n        }\n    });\n}\ndisplaySunsetTime();\n\n\n//# sourceURL=webpack://chrome-extension-app/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;