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