import './css/base.scss'
import './css/package.scss'

import { O2_AMBIENT_CONFIG } from './js/utils/const'
import initAmbient from './js/ambient'

try {
  // 保证配置读取顺序
  let csi = setInterval(() => {
    if (!window[O2_AMBIENT_CONFIG]) return
    clearInterval(csi)
    initAmbient()
  }, 1000)
} catch (e) {
  console.log(e)
}
