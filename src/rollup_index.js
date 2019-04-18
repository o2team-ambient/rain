import './css/package.scss'

import { O2_AMBIENT_CONFIG } from './js/utils/const'
import initAmbient from './js/ambient'
import './config'

export default function (opts) {
  opts && Object.keys(window[O2_AMBIENT_CONFIG]).forEach(key => {
    if (typeof opts[key] === 'undefined') return
    window[O2_AMBIENT_CONFIG][key] = opts[key]
  })

  initAmbient()
}
