export default class Menu {
	ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	draw(cell_w: number, cell_h: number) {
		this.ctx.clearRect(0, 0, cell_w, cell_h);
	}
}
