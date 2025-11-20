import type { Piece } from './types';
export default class Food {
    ctx: CanvasRenderingContext2D;
    GRID_W: number;
    GRID_H: number;
    col: number;
    row: number;
    allCells: {
        col: number;
        row: number;
    }[];
    constructor(ctx: CanvasRenderingContext2D, GRID_W: number, GRID_H: number);
    isEaten(head: Piece | undefined): boolean;
    chooseNewCell(body: Piece[]): void;
    draw(cell_w: number, cell_h: number): void;
}
//# sourceMappingURL=food.d.ts.map