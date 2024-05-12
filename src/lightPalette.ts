import  Color from 'color'
import { hS ,maxS, minS, maxV, minV } from './defaultSetting'
import { getColorString } from './utils'
export const lightPalette = (color:string, index: number, format: string) => {
    // 将color 转换为hsv
    const baseColor = Color(color);
    const hsvbaseColor = Color(color).hsv()
    const h = baseColor.hue(); 
    const s = baseColor.saturationv();
    const v = baseColor.value()

    // h [60 - 240 ] 为暖色调 其他为冷色调

    const getHue = (ispre: boolean , index:number ) => {
        // 进行色相调整
        let Hue 
        // 如果是暖色系
        if( h >= 60 || h <= 240) {
            // 主色为暖色调
            // 1-10色相变化 => 色相从大到小 => 色相顺时针旋转 => 更暖
            Hue = ispre ? h - hS * index : h +  hS * index 
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

    

    const ispre = index < 6 
    const calcIndex = index ? 6 - index : index - 6;

    const retColor = index === 6
        ? hsvbaseColor
        : Color({
            h: getHue(ispre, calcIndex),
            s: 100,
            v: 200,
        });
    // 将hsv 转换为 
    return retColor
    // return getColorString(retColor, format);
    
}