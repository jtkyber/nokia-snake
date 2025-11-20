export type MoveDir = -1 | 0 | 1;
export type Turn = {
    col: number;
    row: number;
    xDir: MoveDir;
    yDir: MoveDir;
};
export type Piece = {
    col: number;
    row: number;
    xDir: MoveDir;
    yDir: MoveDir;
    turns: Turn[];
};
export type NextTurn = {
    xDir: MoveDir;
    yDir: MoveDir;
};
//# sourceMappingURL=types.d.ts.map