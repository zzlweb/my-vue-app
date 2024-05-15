import Color from 'color'
import { lightPalette } from './lightPalette';
import { getColorString } from './utils'
export const darkPalette = (originColor: string, i: number, format: string) => {
    // 将color 转换为hsv
    const lightColor = Color(lightPalette(originColor, 10 - i + 1));
    const originBaseColor = Color(originColor);

    const originBaseHue = originBaseColor.hue();
    const originBaseSaturation = originBaseColor.saturationv();
    const baseColor = Color({
        h: originBaseColor.hue(),
        s: getNewSaturation(6),
        v: originBaseColor.value(),
    });

    const baseSaturation = baseColor.saturationv();
    const step = Math.ceil((baseSaturation - 9) / 4);
    const step1to5 = Math.ceil((100 - baseSaturation) / 5);

    function getNewSaturation(_index) {
        if (_index < 6) {
            return baseSaturation + (6 - _index) * step1to5;
        }
        if (_index === 6) {
            if (originBaseHue >= 0 && originBaseHue < 50) {
                return originBaseSaturation - 15;
            }
            if (originBaseHue >= 50 && originBaseHue < 191) {
                return originBaseSaturation - 20;
            }
            if (originBaseHue >= 191 && originBaseHue <= 360) {
                return originBaseSaturation - 15;
            }
        }

        return baseSaturation - step * (_index - 6);
    }

    const retColor = Color({
        h: lightColor.hue(),
        s: getNewSaturation(i),
        v: lightColor.value(),
    });

    return getColorString(retColor, format);
}