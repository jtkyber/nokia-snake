import type { NextTurn, Piece } from './types';
export default class Snake {
    ctx: CanvasRenderingContext2D;
    GRID_W: number;
    GRID_H: number;
    end: () => void;
    play: () => void;
    body: Piece[];
    pieceAdded: Piece | null;
    keydown: boolean;
    nextTurn: NextTurn | null;
    constructor(ctx: CanvasRenderingContext2D, GRID_W: number, GRID_H: number, end: () => void, play: () => void);
    update(): void;
    move(): void;
    applyTurns: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    addTurn: () => void;
    grow(): void;
    checkForCollisions(): void;
    draw(cell_w: number, cell_h: number): void;
}
//# sourceMappingURL=snake.d.ts.map