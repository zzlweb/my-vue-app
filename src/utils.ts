import Color from 'color'

// export const getRgbStr = function(color: String) {
//   return Color(color)
//     .rgb()
//     .round()
//     .color
//     .join(',');
// }

const formats = ['hex', 'rgb', 'hsl'];

function getFormat(format:string) {
  if (!format || formats.indexOf(format) < 0) {
    return 'hex';
  }
  return format;
}

export const getColorString = function(color:any, format:string) {
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
export const cubicBezier = (t:number, p1:number[]= [0,0], cp1:number[], cp2:number[],p2:number[]= [1,1])=> {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [cx1, cy1] = cp1;
  const [cx2, cy2] = cp2;
  let x =
      x1 * (1 - t) * (1 - t) * (1 - t) +
      3 * cx1 * t * (1 - t) * (1 - t) +
      3 * cx2 * t * t * (1 - t) +
      x2 * t * t * t;
  let y =
      y1 * (1 - t) * (1 - t) * (1 - t) +
      3 * cy1 * t * (1 - t) * (1 - t) +
      3 * cy2 * t * t * (1 - t) +
      y2 * t * t * t;
  return y;
}