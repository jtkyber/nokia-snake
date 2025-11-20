/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./food */ \"./src/food.ts\");\n/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake */ \"./src/snake.ts\");\n\n\nclass App {\n    constructor(canvas) {\n        this.MAX_FPS = 7;\n        this.FRAME_INTERVAL = 1000 / this.MAX_FPS;\n        this.then = 0;\n        this.accumulator = 0;\n        this.playing = true;\n        this.GRID_W = 20;\n        this.GRID_H = 11;\n        this.cell_w = 0;\n        this.cell_h = 0;\n        this.score = 0;\n        this.start = () => {\n            this.then = performance.now();\n            requestAnimationFrame(this.update);\n        };\n        this.end = () => {\n            this.playing = false;\n            this.scoreEl.innerText = this.score.toString();\n            this.canvas.style.display = 'none';\n            this.menuEl.style.display = 'flex';\n        };\n        this.play = () => {\n            this.playing = true;\n            this.canvas.style.display = 'block';\n            this.menuEl.style.display = 'none';\n        };\n        this.reset = () => {\n            this.playing = true;\n            this.canvas.style.display = 'block';\n            this.menuEl.style.display = 'none';\n            this.snake = new _snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx, this.GRID_W, this.GRID_H, this.end, this.play);\n            this.food = new _food__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.GRID_W, this.GRID_H);\n            this.score = 0;\n        };\n        this.update = () => {\n            requestAnimationFrame((now) => {\n                const deltaTime = now - this.then;\n                if (deltaTime >= this.FRAME_INTERVAL) {\n                    if (this.playing) {\n                        this.snake.update();\n                        this.snake.checkForCollisions();\n                        if (this.food.isEaten(this.snake.body[0])) {\n                            this.score += 1;\n                            this.food.chooseNewCell(this.snake.body);\n                            this.snake.grow();\n                        }\n                    }\n                    this.then = now - (deltaTime % this.FRAME_INTERVAL);\n                }\n                this.ctx.clearRect(0, 0, this.GRID_W * this.cell_w, this.GRID_H * this.cell_h);\n                if (this.playing) {\n                    this.food.draw(this.cell_w, this.cell_h);\n                    this.snake.draw(this.cell_w, this.cell_h);\n                }\n                this.update();\n            });\n        };\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n        this.displayEl = document.querySelector('.display');\n        this.menuEl = document.querySelector('.menu');\n        this.scoreEl = document.querySelector('.score');\n        this.snake = new _snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx, this.GRID_W, this.GRID_H, this.end, this.play);\n        this.food = new _food__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.GRID_W, this.GRID_H);\n        document.addEventListener('keydown', e => {\n            if (!this.playing && e.code === 'Space')\n                this.reset();\n        });\n    }\n    init() {\n        const { width, height } = this.displayEl.getBoundingClientRect();\n        this.canvas.width = width;\n        this.canvas.height = height;\n        this.cell_w = width / this.GRID_W;\n        this.cell_h = height / this.GRID_H;\n    }\n    resize() {\n        const { width, height } = this.displayEl.getBoundingClientRect();\n        this.canvas.width = width;\n        this.canvas.height = height;\n        this.cell_w = Math.floor(width / this.GRID_W);\n        this.cell_h = Math.floor(height / this.GRID_H);\n    }\n}\n\n\n//# sourceURL=webpack://nokia-snake-game/./src/app.ts?\n}");

/***/ }),

/***/ "./src/enums.ts":
/*!**********************!*\
  !*** ./src/enums.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveEnum: () => (/* binding */ MoveEnum)\n/* harmony export */ });\nconst MoveEnum = {\n    LEFT: -1,\n    RIGHT: 1,\n    UP: -1,\n    DOWN: 1,\n    STATIC: 0,\n};\n\n\n//# sourceURL=webpack://nokia-snake-game/./src/enums.ts?\n}");

/***/ }),

/***/ "./src/food.ts":
/*!*********************!*\
  !*** ./src/food.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Food)\n/* harmony export */ });\nclass Food {\n    constructor(ctx, GRID_W, GRID_H) {\n        this.col = 4;\n        this.row = 0;\n        this.allCells = [];\n        this.ctx = ctx;\n        this.GRID_W = GRID_W;\n        this.GRID_H = GRID_H;\n        for (let i = 0; i < GRID_W; i++) {\n            for (let j = 0; j < GRID_H; j++) {\n                this.allCells.push({\n                    col: i,\n                    row: j,\n                });\n            }\n        }\n    }\n    isEaten(head) {\n        if (!head)\n            return false;\n        if (head.col === this.col && head.row === this.row)\n            return true;\n        return false;\n    }\n    chooseNewCell(body) {\n        const availableCells = this.allCells.filter(cell => {\n            let onSnake = false;\n            for (const piece of body) {\n                if (cell.col === piece.col && cell.row === piece.row) {\n                    onSnake = true;\n                    break;\n                }\n            }\n            return !onSnake;\n        });\n        const randomIndex = Math.floor(Math.random() * availableCells.length);\n        const randomCell = availableCells[randomIndex];\n        if (randomCell) {\n            this.col = randomCell.col;\n            this.row = randomCell.row;\n        }\n    }\n    draw(cell_w, cell_h) {\n        const x = this.col * cell_w + cell_w / 2;\n        const y = this.row * cell_h + cell_h / 2;\n        this.ctx.fillStyle = 'black';\n        this.ctx.beginPath();\n        this.ctx.ellipse(x, y, cell_w / 3, cell_h / 3, 2 * Math.PI, 0, 2 * Math.PI);\n        this.ctx.fill();\n    }\n}\n\n\n//# sourceURL=webpack://nokia-snake-game/./src/food.ts?\n}");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.ts\");\n\nconst canvas = document.getElementById('display_canvas');\nconst app = new _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\napp.init();\napp.start();\nwindow.addEventListener('resize', () => app.resize());\n\n\n//# sourceURL=webpack://nokia-snake-game/./src/index.ts?\n}");

/***/ }),

/***/ "./src/snake.ts":
/*!**********************!*\
  !*** ./src/snake.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Snake)\n/* harmony export */ });\n/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ \"./src/enums.ts\");\n\nclass Snake {\n    constructor(ctx, GRID_W, GRID_H, end, play) {\n        this.body = [\n            {\n                col: 0,\n                row: 0,\n                xDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.RIGHT,\n                yDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.STATIC,\n                turns: [],\n            },\n        ];\n        this.pieceAdded = null;\n        this.keydown = false;\n        this.nextTurn = null;\n        this.applyTurns = () => {\n            for (let i = 0; i < this.body.length; i++) {\n                const piece = this.body[i];\n                const nextTurn = { ...piece.turns[0] };\n                if (nextTurn) {\n                    if (piece.col === nextTurn.col && piece.row === nextTurn.row) {\n                        piece.xDir = nextTurn.xDir;\n                        piece.yDir = nextTurn.yDir;\n                        piece.turns.shift();\n                    }\n                }\n            }\n        };\n        this.handleKeyDown = (e) => {\n            const key = e.key;\n            switch (key) {\n                case 'ArrowRight':\n                    this.nextTurn = {\n                        xDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.RIGHT,\n                        yDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.STATIC,\n                    };\n                    break;\n                case 'ArrowLeft':\n                    this.nextTurn = {\n                        xDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.LEFT,\n                        yDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.STATIC,\n                    };\n                    break;\n                case 'ArrowUp':\n                    this.nextTurn = {\n                        xDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.STATIC,\n                        yDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.UP,\n                    };\n                    break;\n                case 'ArrowDown':\n                    this.nextTurn = {\n                        xDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.STATIC,\n                        yDir: _enums__WEBPACK_IMPORTED_MODULE_0__.MoveEnum.DOWN,\n                    };\n                    break;\n            }\n        };\n        this.addTurn = () => {\n            if (!this.nextTurn)\n                return;\n            const head = this.body[0];\n            for (let i = 0; i < this.body.length; i++) {\n                const piece = this.body[i];\n                piece.turns = [\n                    ...piece.turns,\n                    {\n                        col: head.col,\n                        row: head.row,\n                        xDir: this.nextTurn.xDir,\n                        yDir: this.nextTurn.yDir,\n                    },\n                ];\n            }\n        };\n        this.ctx = ctx;\n        this.GRID_W = GRID_W;\n        this.GRID_H = GRID_H;\n        this.end = end;\n        this.play = play;\n        document.addEventListener('keydown', this.handleKeyDown);\n    }\n    update() {\n        this.addTurn();\n        this.applyTurns();\n        this.move();\n        if (this.pieceAdded) {\n            const head = this.body[0];\n            if (this.nextTurn) {\n                this.pieceAdded.turns = [\n                    ...this.pieceAdded.turns,\n                    {\n                        col: head.col - this.nextTurn.xDir,\n                        row: head.row - this.nextTurn.yDir,\n                        xDir: this.nextTurn.xDir,\n                        yDir: this.nextTurn.yDir,\n                    },\n                ];\n            }\n            this.body = [...this.body, this.pieceAdded];\n            this.pieceAdded = null;\n        }\n        this.nextTurn = null;\n    }\n    move() {\n        for (let i = 0; i < this.body.length; i++) {\n            const piece = this.body[i];\n            piece.col += piece.xDir;\n            piece.row += piece.yDir;\n            if (piece.col < 0 || piece.col >= this.GRID_W || piece.row < 0 || piece.row >= this.GRID_H) {\n                console.log('WALL COLLISION!');\n                this.end();\n            }\n        }\n    }\n    grow() {\n        const tail = structuredClone(this.body[this.body.length - 1]);\n        if (tail)\n            this.pieceAdded = tail;\n    }\n    checkForCollisions() {\n        var _a, _b;\n        const occupied = [];\n        for (let i = 0; i < this.body.length; i++) {\n            const piece = this.body[i];\n            const col = piece.col;\n            const row = piece.row;\n            for (let j = 0; j < occupied.length; j++) {\n                if (col === ((_a = occupied[j]) === null || _a === void 0 ? void 0 : _a[0]) && row === ((_b = occupied[j]) === null || _b === void 0 ? void 0 : _b[1])) {\n                    console.log('BODY COLLISION!');\n                    this.end();\n                    return;\n                }\n            }\n            occupied.push([col, row]);\n        }\n    }\n    draw(cell_w, cell_h) {\n        // for (let i = 0; i < this.GRID_W; i++) {\n        // \tfor (let j = 0; j < this.GRID_H; j++) {\n        // \t\tconst x_start: number = i * cell_w;\n        // \t\tconst y_start: number = j * cell_h;\n        // \t\tthis.ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';\n        // \t\tthis.ctx.strokeRect(x_start, y_start, cell_w, cell_h);\n        // \t}\n        // }\n        for (let i = 0; i < this.body.length; i++) {\n            const { col, row } = this.body[i];\n            const x_start = col * cell_w;\n            const y_start = row * cell_h;\n            this.ctx.fillStyle = 'black';\n            this.ctx.fillRect(x_start, y_start, cell_w, cell_h);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://nokia-snake-game/./src/snake.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;