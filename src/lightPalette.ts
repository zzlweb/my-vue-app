import  Color from 'color'
import { baseHueList } from './defaultSetting'
import { getHSVList } from './colorCurve'
import { getColorString } from './utils';    
    
export const lightPalette = (color:string, index: number, format:string) => {
    // 将color 转换为hsv
    const baseColor = Color(color);
    const HsvBaseColor = Color(color).hsv()
    const h = baseColor.hue(); 
    const s = baseColor.saturationv();
    const v = baseColor.value()
    // 获取曲线色板
    const lineHSV = getHSVList();

    const getHue = (nowIndex: number) => {
      let nh:number = (baseHueList[nowIndex-1] - baseHueList[5]) + h;
      if(h < 0){
        nh = 360 + nh
      } else if(nh>360){
        nh = nh - 360
      }
      return nh;
    }

    const getSue = (nowIndex: number) => {
        return (lineHSV.lineSue[nowIndex-1] - lineHSV.lineSue[5]) / lineHSV.lineSue[5] * s + s 
    }

    const getVue  = (nowIndex: number) => {
        return (lineHSV.lineVue[nowIndex-1] - lineHSV.lineVue[5]) / lineHSV.lineVue[5] * v + v 
    }

    const retColor = index === 6
        ? HsvBaseColor
        : Color({
            h: getHue(index),
            s: getSue(index),
            v: getVue(index),
        });
    // return retColor
    // 16进制
    return getColorString(retColor, format);
}