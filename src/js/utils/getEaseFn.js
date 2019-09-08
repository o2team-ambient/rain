/**
 * 获取对应缓动函数
 * @param {string} ease
 */

export default function (ease) {
  let easeFn = ''

  switch (ease) {
    case 'linear':
      easeFn = 'Power0.easeNone'
      break
    case 'easeIn':
      easeFn = 'Power1.easeIn'
      break
    case 'easeOut':
      easeFn = 'Power1.easeOut'
      break
    case 'easeInOut':
      easeFn = 'Power1.easeInOut'
      break
    case 'bounce':
      easeFn = 'Bounce.easeOut'
      break
    default:
      easeFn = 'Power0.easeNone'
  }

  return easeFn
}
