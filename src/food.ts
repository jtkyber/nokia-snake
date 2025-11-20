import type { Piece } from './types';

export default class Food {
	ctx: CanvasRenderingContext2D;
	GRID_W: number;
	GRID_H: number;
	col: number = 4;
	row: number = 0;
	allCells: {
		col: number;
		row: number;
	}[] = [];

	constructor(ctx: CanvasRenderingContext2D, GRID_W: number, GRID_H: number) {
		this.ctx = ctx;
		this.GRID_W = GRID_W;
		this.GRID_H = GRID_H;

		for (let i = 0; i < GRID_W; i++) {
			for (let j = 0; j < GRID_H; j++) {
				this.allCells.push({
					col: i,
					row: j,
				});
			}
		}
	}

	isEaten(head: Piece | undefined): boolean {
		if (!head) return false;

		if (head.col === this.col && head.row === this.row) return true;
		return false;
	}

	chooseNewCell(body: Piece[]) {
		const availableCells = this.allCells.filter(cell => {
			let onSnake = false;

			for (const piece of body) {
				if (cell.col === piece.col && cell.row === piece.row) {
					onSnake = true;
					break;
				}
			}

			return !onSnake;
		});

		const randomIndex: number = Math.floor(Math.random() * availableCells.length);
		const randomCell = availableCells[randomIndex];

		if (randomCell) {
			this.col = randomCell.col;
			this.row = randomCell.row;
		}
	}

	draw(cell_w: number, cell_h: number) {
		const x: number = this.col * cell_w + cell_w / 2;
		const y: number = this.row * cell_h + cell_h / 2;

		this.ctx.fillStyle = 'black';
		this.ctx.beginPath();
		this.ctx.ellipse(x, y, cell_w / 3, cell_h / 3, 2 * Math.PI, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}
