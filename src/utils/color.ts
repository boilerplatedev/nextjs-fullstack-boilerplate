import lightOrDarkColor from '@check-light-or-dark/color'
import uniqolor from 'uniqolor'

const fromText = (word: string) => {
  const color = uniqolor(word)
  return {
    color: color.color,
    isLight: color.isLight,
  }
}

const isLightOrDarkColor = (color: string) => {
  return lightOrDarkColor(color)
}

export default {
  fromText,
  isLightOrDarkColor,
}
