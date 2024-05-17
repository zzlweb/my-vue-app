import { baseHueList, baseSueList, baseVueList, NUM_POINTS } from './defaultSetting'
import { polynomialFit } from './utils'

// 拟合曲线
const getPoly = (
  baseHue: number[] = baseHueList,
  baseSue: number[] = baseSueList,
  baseVue: number[] = baseVueList,
  degree: number = 3
) => {
  const indexs = Array.from({ length: NUM_POINTS }, (_, i) => i + 1)
  const polyH = polynomialFit(indexs, baseHue, degree)
  const polyS = polynomialFit(indexs, baseSue, degree)
  const polyV = polynomialFit(indexs, baseVue, degree)

  return {
    polyH,
    polyS,
    polyV
  }
}

// 获取曲线上的色板值
export const getHSVList = (
  baseHue: number[] = baseHueList,
  baseSue: number[] = baseSueList,
  baseVue: number[] = baseVueList,
  degree: number = 3) => {
  const ploy = getPoly(baseHue, baseSue, baseVue, degree)
  const indexs = Array.from({ length: NUM_POINTS }, (_, i) => i + 1)
  const lineHue: number[] = [];
  const lineSue: number[] = [];
  const lineVue: number[] = [];
  indexs.forEach((x) => {
    let HValue: number = 0
    ploy.polyH.map((item, i) => {
      HValue += item * Math.pow(x, i)
    })
    lineHue.push(HValue)

    let SValue: number = 0
    ploy.polyS.map((item, i) => {
      SValue += item * Math.pow(x, i)
    })
    lineSue.push(SValue)

    let VValue: number = 0
    ploy.polyV.map((item, i) => {
      VValue += item * Math.pow(x, i)
    })
    lineVue.push(VValue)
  })
  return {
    lineHue,
    lineSue,
    lineVue
  }
}