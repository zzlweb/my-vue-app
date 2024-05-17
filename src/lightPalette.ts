import  Color from 'color'
import { hS ,maxS, minS, maxV, minV } from './defaultSetting'
import { getColorString, cubicBezier  } from './utils'

export const lightPalette = (color:string, index: number, format: string) => {
    // 将color 转换为hsv
    const baseColor = Color(color);
    const hsvbaseColor = Color(color).hsv()
    const h = baseColor.hue(); 
    const s = baseColor.saturationv();
    const v = baseColor.value()

    // h [60 - 240 ] 为暖色调 其他为冷色调

    const getHue = (ispre: boolean , index:number, defaultIndex?:index ) => {
        let Hue 
        // 如果是暖色系
        if( h >= 60 || h <= 240) {
            // 主色为暖色调
            // 1-10色相变化 => 色相从大到小 => 色相顺时针旋转 => 更暖
            // index < 6 色相曲线调节
            // const tPrime1= cubicBezier(index/ 5 ,  [0,0],[0.5, 0],[1,0.5],[1,1])
            // Hue = ispre ? h - Math.min(hS * Math.sin((index - 1 ) * Math.PI / 4)* 2 , 1) : h +  hS * tPrime1 * 5
            return h
        } else {
            // 冷色系
            // 1-10色相变化 => 色相从小到大 => 色相逆时针旋转 => 更冷
            Hue = ispre ? h + hS * index : h - hS * index
        }
        if (Hue < 0) {
            Hue += 360;
          } else if (Hue >= 360) {
            Hue -= 360;
          }
          return Math.round(Hue);
    }

    const getSue = (ispre: boolean , index:number, defaultIndex?: number) => {
        const TValue = (-0.031*Math.pow(defaultIndex, 3) - 0.177*Math.pow(defaultIndex,2) + 13.11*defaultIndex  - 2.633 )  
        const ds6 = (-0.031*Math.pow(6, 3) - 0.177*Math.pow(6,2) + 13.11*6  - 2.633 )
        return (TValue - ds6) / ds6 * s + s 
    }

    const getVue  = (ispre: boolean , index:number,  defaultIndex?: number) => {
        const TSvalue = (-0.0002914*Math.pow(defaultIndex, 4) + 0.102*Math.pow(defaultIndex,3) - 2.344*Math.pow(defaultIndex, 2) + 6.039*defaultIndex + 95 )  
        const dv6 = (-0.0002914*Math.pow(6, 4) + 0.102*Math.pow(6,3) - 2.344*Math.pow(6, 2) + 6.039*6 + 95 )  
        return (TSvalue - dv6) / dv6 * v + v 
      }

    const ispre = index < 6 
    const calcIndex = ispre ? 6 - index : index - 6;
    const retColor = index === 6
        ? hsvbaseColor
        : Color({
            h: getHue(ispre, calcIndex, index),
            s: getSue(ispre, calcIndex, index),
            v: getVue(ispre, calcIndex, index),
        });
    // 将hsv 转换为 
    return retColor
    return getColorString(retColor, format);
    
}