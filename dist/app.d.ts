import Food from './food';
import Snake from './snake';
export default class App {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    displayEl: HTMLDivElement;
    gameOverDiv: HTMLDivElement;
    startGameDiv: HTMLDivElement;
    scoreEl: HTMLHeadingElement;
    MAX_FPS: number;
    FRAME_INTERVAL: number;
    then: number;
    accumulator: number;
    hadFirstStart: boolean;
    playing: boolean;
    GRID_W: number;
    GRID_H: number;
    cell_w: number;
    cell_h: number;
    snake: Snake;
    food: Food;
    score: number;
    constructor(canvas: HTMLCanvasElement);
    init(): void;
    resize(): void;
    start: () => void;
    end: () => void;
    play: () => void;
    reset: () => void;
    update: () => void;
}
//# sourceMappingURL=app.d.ts.map