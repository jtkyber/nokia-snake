import Food from './food';
import Snake from './snake';

export default class App {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	phoneEl: HTMLDivElement;
	displayEl: HTMLDivElement;
	gameOverDiv: HTMLDivElement;
	startGameDiv: HTMLDivElement;
	scoreEl: HTMLHeadingElement;
	MAX_FPS: number = 7;
	FRAME_INTERVAL: number = 1000 / this.MAX_FPS;
	then: number = 0;
	accumulator: number = 0;

	hadFirstStart: boolean = false;
	playing: boolean = false;

	GRID_W: number = 20;
	GRID_H: number = 11;

	cell_w: number = 0;
	cell_h: number = 0;

	snake: Snake;
	food: Food;

	score: number = 0;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.phoneEl = document.querySelector('.phone') as HTMLDivElement;
		this.displayEl = document.querySelector('.display') as HTMLDivElement;
		this.gameOverDiv = document.querySelector('.game_over_screen') as HTMLDivElement;
		this.startGameDiv = document.querySelector('.start_game_screen') as HTMLDivElement;
		this.scoreEl = document.querySelector('.score') as HTMLHeadingElement;

		this.snake = new Snake(this.ctx, this.GRID_W, this.GRID_H, this.end, this.play);
		this.food = new Food(this.ctx, this.GRID_W, this.GRID_H);

		document.addEventListener('keydown', e => {
			if (!this.playing && e.code === 'Space') this.reset();
		});
	}

	init() {
		const { width, height } = this.displayEl.getBoundingClientRect();
		this.canvas.width = width;
		this.canvas.height = height;

		this.cell_w = width / this.GRID_W;
		this.cell_h = height / this.GRID_H;

		this.phoneEl.style.visibility = 'visible';
	}

	resize() {
		const { width, height } = this.displayEl.getBoundingClientRect();
		this.canvas.width = width;
		this.canvas.height = height;

		this.cell_w = Math.floor(width / this.GRID_W);
		this.cell_h = Math.floor(height / this.GRID_H);
	}

	start = () => {
		this.then = performance.now();
		requestAnimationFrame(this.update);
	};

	end = () => {
		this.playing = false;
		this.scoreEl.innerText = this.score.toString();
		this.canvas.style.display = 'none';
		this.gameOverDiv.style.display = 'flex';
	};

	play = () => {
		this.playing = true;
		this.canvas.style.display = 'block';
		this.gameOverDiv.style.display = 'none';
	};

	reset = () => {
		this.playing = true;
		this.canvas.style.display = 'block';
		this.gameOverDiv.style.display = 'none';
		this.startGameDiv.style.display = 'none';
		this.snake = new Snake(this.ctx, this.GRID_W, this.GRID_H, this.end, this.play);
		this.food = new Food(this.ctx, this.GRID_W, this.GRID_H);
		this.score = 0;
	};

	update = () => {
		requestAnimationFrame((now: number) => {
			const deltaTime = now - this.then;
			if (deltaTime >= this.FRAME_INTERVAL) {
				if (this.playing) {
					this.snake.update();
					this.snake.checkForCollisions();

					if (this.food.isEaten(this.snake.body[0])) {
						this.score += 1;
						this.food.chooseNewCell(this.snake.body);
						this.snake.grow();
					}
				}

				this.then = now - (deltaTime % this.FRAME_INTERVAL);
			}

			this.ctx.clearRect(0, 0, this.GRID_W * this.cell_w, this.GRID_H * this.cell_h);

			if (this.playing) {
				this.food.draw(this.cell_w, this.cell_h);
				this.snake.draw(this.cell_w, this.cell_h);
			}

			this.update();
		});
	};
}
