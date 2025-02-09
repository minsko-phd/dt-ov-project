export interface IMouseFilter {
    getX(): number;
    getY(): number;
    update(x: number, y: number, ts: number): boolean;
}
export declare class NullMouseFilter implements IMouseFilter {
    x: number;
    y: number;
    getX(): number;
    getY(): number;
    update(x: number, y: number, _ts: number): boolean;
}
export declare class MouseFilter implements IMouseFilter {
    lastX: number;
    lastY: number;
    lastTs: number;
    estimatedAccelX: number;
    estimatedAccelY: number;
    ignoredX: number;
    ignoredY: number;
    oldX: number;
    oldY: number;
    consecutiveZero: boolean;
    getX(): number;
    getY(): number;
    update(x: number, y: number, ts: number): boolean;
}
