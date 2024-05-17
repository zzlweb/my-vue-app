export declare const getColorString: (color: any, format: string) => any;
/**
     * @desc 三阶贝塞尔
     * @param {number} t 当前百分比
     * @param {Array} p1 起点坐标
     * @param {Array} p2 终点坐标
     * @param {Array} cp1 控制点1
     * @param {Array} cp2 控制点2
     */
export declare const cubicBezier: (t: number, p1: number[] | undefined, cp1: number[], cp2: number[], p2?: number[]) => number;
export declare const polynomialFit: (x: number[], y: number[], degree: number) => number[];
