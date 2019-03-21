/*
 * @desc 控制面板
 * 注：通用代码，请勿在不知情的情况下进行修改
 */

import controlInit from './js/controlinit'
import {
  O2_AMBIENT_CONFIG
} from './js/utils/const'

let csi = setInterval(() => {
  if (/* !window[O2_AMBIENT_INIT] && */!window[O2_AMBIENT_CONFIG]) return
  clearInterval(csi)
  controlInit()
}, 1000)
