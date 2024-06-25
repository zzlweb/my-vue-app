interface GenerateOptions {
    index?: number;
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
export declare const generate: (color: string, options?: GenerateOptions) => any;
export {};
