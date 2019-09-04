/**
 * 处理 localStorage 配置
 * @param {object} opts
 * @param {string} opts.configKey 当前 configKey 值
 * @param {string} opts.guiName localStorage 前缀
 * @param {object} opts.loadData 官方配置数据
 */

export default function ({ configKey = '', guiName = '', loadData = {} }) {
  const localData = JSON.parse(localStorage.getItem(`${guiName || document.location.href}.gui`))

  if (!localData) return { remembered: { ...loadData } }

  if (localData.preset) {
    localData.preset = configKey
  }

  if (localData.remembered) {
    localData.remembered = { ...loadData, ...localData.remembered }
  }

  localStorage.setItem(`${guiName || document.location.href}.gui`, JSON.stringify(localData))

  return localData
}
