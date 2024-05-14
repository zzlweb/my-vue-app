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

export const cubicBezier = ( t:number, p0 = 0, p1 = 0.5, p2 = 0.5, p3 = 1) => {  
    return Math.pow(1 - t, 3) * p0 +   
           3 * Math.pow(1 - t, 2) * t * p1 +   
           3 * (1 - t) * Math.pow(t, 2) * p2 +   
           Math.pow(t, 3) * p3;  
};  