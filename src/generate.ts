import { darkPalette } from "./darkPalette";  
import { lightPalette } from "./lightPalette"; 
  
// 定义 options 的类型  
interface GenerateOptions {  
    index?: number; // 默认为 undefined，但可以在函数内部提供一个默认值  
    dark?: boolean;  
    colorArray?: boolean;  
    format?: 'hex' | 'rgb' | 'hsl';  
}  
  
/**  
 * 生成颜色  
 *  
 * @param color 主色  
 * @param options 选项  
 * @returns 单一颜色字符串或颜色字符串数组  
 */  
export const generate = (color: string, options: GenerateOptions = {}) => {  
    const { dark = false, colorArray = false, index = 6, format = 'hex' } = options;  
    // 如果需要颜色数组  
    if (colorArray) {  
        const colors: String[] = []; // 使用明确的类型注解  
        const func = dark ? darkPalette : lightPalette;  
        for (let i = 1; i <= 10; i++) {  
            colors.push(func(color, i, format));  
        }  
        
        return colors;  
    }  
  
    // 返回单一颜色  
    return dark ? darkPalette(color, index, format) : lightPalette(color, index, format);  
};