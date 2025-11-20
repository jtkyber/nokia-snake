import { MoveEnum } from './enums';
import type { NextTurn, Piece, Turn } from './types';

export default class Snake {
	ctx: CanvasRenderingContext2D;
	GRID_W: number;
	GRID_H: number;
	end: () => void;
	play: () => void;
	body: Piece[] = [
		{
			col: 0,
			row: 0,
			xDir: MoveEnum.RIGHT,
			yDir: MoveEnum.STATIC,
			turns: [],
		},
	];
	pieceAdded: Piece | null = null;
	keydown: boolean = false;
	nextTurn: NextTurn | null = null;

	constructor(
		ctx: CanvasRenderingContext2D,
		GRID_W: number,
		GRID_H: number,
		end: () => void,
		play: () => void
	) {
		this.ctx = ctx;
		this.GRID_W = GRID_W;
		this.GRID_H = GRID_H;
		this.end = end;
		this.play = play;

		document.addEventListener('keydown', this.handleKeyDown);
	}

	update() {
		this.addTurn();
		this.applyTurns();
		this.move();

		if (this.pieceAdded) {
			const head = this.body[0] as Piece;

			if (this.nextTurn) {
				this.pieceAdded.turns = [
					...this.pieceAdded.turns,
					{
						col: head.col - this.nextTurn.xDir,
						row: head.row - this.nextTurn.yDir,
						xDir: this.nextTurn.xDir,
						yDir: this.nextTurn.yDir,
					},
				];
			}

			this.body = [...this.body, this.pieceAdded];
			this.pieceAdded = null;
		}

		this.nextTurn = null;
	}

	move() {
		for (let i = 0; i < this.body.length; i++) {
			const piece = this.body[i] as Piece;

			piece.col += piece.xDir;
			piece.row += piece.yDir;

			if (piece.col < 0 || piece.col >= this.GRID_W || piece.row < 0 || piece.row >= this.GRID_H) {
				console.log('WALL COLLISION!');
				this.end();
			}
		}
	}

	applyTurns = () => {
		for (let i = 0; i < this.body.length; i++) {
			const piece = this.body[i] as Piece;
			const nextTurn = { ...piece.turns[0] } as Turn;

			if (nextTurn) {
				if (piece.col === nextTurn.col && piece.row === nextTurn.row) {
					piece.xDir = nextTurn.xDir;
					piece.yDir = nextTurn.yDir;

					piece.turns.shift();
				}
			}
		}
	};

	handleKeyDown = (e: KeyboardEvent) => {
		const key = e.key;
		switch (key) {
			case 'ArrowRight':
				this.nextTurn = {
					xDir: MoveEnum.RIGHT,
					yDir: MoveEnum.STATIC,
				};
				break;
			case 'ArrowLeft':
				this.nextTurn = {
					xDir: MoveEnum.LEFT,
					yDir: MoveEnum.STATIC,
				};
				break;
			case 'ArrowUp':
				this.nextTurn = {
					xDir: MoveEnum.STATIC,
					yDir: MoveEnum.UP,
				};
				break;
			case 'ArrowDown':
				this.nextTurn = {
					xDir: MoveEnum.STATIC,
					yDir: MoveEnum.DOWN,
				};
				break;
		}
	};

	addTurn = () => {
		if (!this.nextTurn) return;

		const head = this.body[0] as Piece;

		for (let i = 0; i < this.body.length; i++) {
			const piece = this.body[i] as Piece;

			piece.turns = [
				...piece.turns,
				{
					col: head.col,
					row: head.row,
					xDir: this.nextTurn.xDir,
					yDir: this.nextTurn.yDir,
				},
			];
		}
	};

	grow() {
		const tail = structuredClone(this.body[this.body.length - 1]);
		if (tail) this.pieceAdded = tail;
	}

	checkForCollisions() {
		const occupied: [number, number][] = [];
		for (let i = 0; i < this.body.length; i++) {
			const piece = this.body[i] as Piece;
			const col = piece.col;
			const row = piece.row;

			for (let j = 0; j < occupied.length; j++) {
				if (col === occupied[j]?.[0] && row === occupied[j]?.[1]) {
					console.log('BODY COLLISION!');
					this.end();
					return;
				}
			}

			occupied.push([col, row]);
		}
	}

	draw(cell_w: number, cell_h: number) {
		// for (let i = 0; i < this.GRID_W; i++) {
		// 	for (let j = 0; j < this.GRID_H; j++) {
		// 		const x_start: number = i * cell_w;
		// 		const y_start: number = j * cell_h;

		// 		this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
		// 		this.ctx.strokeRect(x_start, y_start, cell_w, cell_h);
		// 	}
		// }

		for (let i = 0; i < this.body.length; i++) {
			const { col, row } = this.body[i] as Piece;

			const x_start: number = col * cell_w;
			const y_start: number = row * cell_h;

			this.ctx.fillStyle = 'black';
			this.ctx.fillRect(x_start, y_start, cell_w, cell_h);
		}
	}
}
