import  Color from 'color'
import { hS } from './defaultSetting'
import { getHSVList } from './colorCurve'

export const lightPalette = (color:string, index: number, format: string) => {
    // 将color 转换为hsv
    const baseColor = Color(color);
    const HsvBaseColor = Color(color).hsv()
    const h = baseColor.hue(); 
    const s = baseColor.saturationv();
    const v = baseColor.value()

    // 获取曲线色板
    const lineHSV = getHSVList();
    // h [60 - 240 ] 为冷色调
    const getHue = (isPre: boolean , index:number, defaultIndex?:number ) => {
        let Hue 
        if( h >= 60 || h <= 240) {
            return h
        } else {
            Hue = isPre ? h + hS * index : h - hS * index
        }
        if (Hue < 0) {
            Hue += 360;
          } else if (Hue >= 360) {
            Hue -= 360;
          }
          return Math.round(Hue);
    }

    const getSue = (nowIndex: number) => {
        return (lineHSV.lineSue[nowIndex-1] - lineHSV.lineSue[5]) / lineHSV.lineSue[5] * s + s 
    }

    const getVue  = (nowIndex: number) => {
        return (lineHSV.lineVue[nowIndex-1] - lineHSV.lineVue[5]) / lineHSV.lineVue[5] * v + v 
    }

    const isPre = index < 6 
    const calcIndex = isPre ? 6 - index : index - 6;
    const retColor = index === 6
        ? HsvBaseColor
        : Color({
            h: getHue(isPre, calcIndex, index),
            s: getSue(index),
            v: getVue(index),
        });
    return retColor
    // 16进制
    // return getColorString(retColor, format);
}