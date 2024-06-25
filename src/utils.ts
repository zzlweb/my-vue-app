import Color from 'color'
import * as math from 'mathjs'

const formats = ['hex', 'rgb', 'hsl'];

function getFormat(format: string) {
  if (!format || formats.indexOf(format) < 0) {
    return 'hex';
  }
  return format;
}

export const getColorString = function (color: any, format: string) {
  const innerFormat = getFormat(format);

  if (innerFormat === 'hex') {
    return color[innerFormat]();
  }
  return color[innerFormat]().round().string();
}

/**
 * @desc 三阶贝塞尔
 * @param {number} t 当前百分比
 * @param {Array} p1 起点坐标
 * @param {Array} p2 终点坐标
 * @param {Array} cp1 控制点1
 * @param {Array} cp2 控制点2
 */
export const cubicBezier = (t: number, p1: number[] = [0, 0], cp1: number[], cp2: number[], p2: number[] = [1, 1]) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [cx1, cy1] = cp1;
  const [cx2, cy2] = cp2;
  const x =
    x1 * (1 - t) * (1 - t) * (1 - t) +
    3 * cx1 * t * (1 - t) * (1 - t) +
    3 * cx2 * t * t * (1 - t) +
    x2 * t * t * t;
  const y =
    y1 * (1 - t) * (1 - t) * (1 - t) +
    3 * cy1 * t * (1 - t) * (1 - t) +
    3 * cy2 * t * t * (1 - t) +
    y2 * t * t * t;
  return y;
}

export const polynomialFit = (x: number[], y: number[], degree: number) => {
  let X = [];
  for (let i = 0; i <= degree; i++) {
    X.push(x.map(val => Math.pow(val, i)));
  }
  X = math.transpose(X);
  const Y = y;
  const coefficients = math.multiply(math.inv(math.multiply(math.transpose(X), X)), math.multiply(math.transpose(X), Y));
  return coefficients;
} 