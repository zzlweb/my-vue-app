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

    const getHue = (ispre: boolean , index:number ) => {
        // 使用cubic Bézier曲线生成一个介于0和1之间的t'值 
        // const tPrime = cubicBezier(index / 10 , 0, 0.5, 0.5, 1)
        // 进行色相调整
        let Hue 
        // 如果是暖色系
        if( h >= 60 || h <= 240) {
            // 主色为暖色调
            // 1-10色相变化 => 色相从大到小 => 色相顺时针旋转 => 更暖
            // index < 6 色相曲线调节
            const tPrime1= cubicBezier(index/ 5 ,  [0,0],[0.5, 0],[1,0.5],[1,1])
            Hue = ispre ? h - Math.min(hS * Math.sin((index - 1 ) * Math.PI / 4)* 2 , 1) : h +  hS * tPrime1 * 5
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

    const getSue = (ispre: boolean , index:number) => {
        let Sue
        if (ispre) {
            Sue = s <= minS ? s : s - ((s - minS) / 5) * index;
          } else {
            // index > 6 饱和度曲线调节  5 4 4 2
            const tPrime = cubicBezier(index / 5 ,[0,0],[0.05,0.5],[0.5,0.95],[1,1])
            Sue = s + ((maxS - s) / 5) * tPrime * 3.5
          }
        return Sue;
    }

    const getVue  = (ispre: boolean , index:number) => {
      const tPrime1 = cubicBezier(index / 10 ,[0,0],[0,1],[1,0],[1,1])
      return ispre ? (v> maxV ? maxV : (v + ((maxV - v) / 5) * index * 2.5 *(tPrime1)) ) : (v <= minV ? minV : (v - ((v - minV) / 5) * index * 1.25  ) + Math.sin(index * Math.PI/2));
      }

    const ispre = index < 6 
    const calcIndex = ispre ? 6 - index : index - 6;

    const retColor = index === 6
        ? hsvbaseColor
        : Color({
            h: getHue(ispre, calcIndex),
            s: getSue(ispre, calcIndex),
            v: getVue(ispre, calcIndex),
        });
    // 将hsv 转换为 
    // return retColor
    return getColorString(retColor, format);
    
}