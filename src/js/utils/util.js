function getRandom(min, max) {
  return (Math.random() * (max - min)) + min
}

function getRgba(color, opacity){
  return `rgba(${parseInt(color.slice(-6, -4), 16)}, ${parseInt(color.slice(-4, -2), 16)}, ${parseInt(color.slice(-2), 16)}, ${opacity/100})`
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href
  /* eslint-disable no-useless-escape */
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function getDevicePixelRatio() {
  let result = 1
  if (window.devicePixelRatio) {
    result = window.devicePixelRatio >= 2 ? 2 : 1
  }
  return result
}

function degToRad(deg) {
  return (Math.PI / 180) * deg
}

function radToDeg(rad) {
  return (180 / Math.PI) * rad
}

export {
  getRandom,
  getRandomInt,
  getParameterByName,
  getDevicePixelRatio,
  degToRad,
  radToDeg,
  getRgba
}