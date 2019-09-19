/**
 * @desc 公用控制面板
 * 注：通用代码，请勿在不知情的情况下进行修改
 */

import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CONFIG_KEY,
  O2_AMBIENT_IS_CONFIG_RESET
} from './const'
import { getParameterByName } from './util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop') // 是否循环播放
const isShowController = getParameterByName('controller') // 是否展示控制面板
const isAmbientPlat = getParameterByName('platform') === '1' // 是否平台环境

class Controller {
  constructor () {
    this.config = window[O2_AMBIENT_CONFIG] || {}
    this.isShowController = isShowController
    this.isAmbientPlat = isAmbientPlat

    if (this.isAmbientPlat) {
      // 平台环境，获取 iframe dom
      this.transferMonPC = document.getElementById('transferMon_pc')
      this.transferMonM = document.getElementById('transferMon_m')
    } else {
      // demo 环境，监听 postmessage
      this.bindMsg()
    }

    if (!this.isShowController && !this.isAmbientPlat) {
      this.setControllerHide()
    }

    if (window[O2_AMBIENT_CONFIG_KEY]) return
    window[O2_AMBIENT_CONFIG_KEY] = O2_AMBIENT_CONFIG
  }

  // 监听 postmessage
  bindMsg () {
    window.addEventListener('message', (msg) => {
      if (msg.data.type !== 'reset') return
      window[O2_AMBIENT_CONFIG] = Object.assign(window[O2_AMBIENT_CONFIG], msg.data.data)
      this.resetCanvas()
    })
  }

  // 添加隐藏控制面板样式
  setControllerHide () {
    let style = document.createElement('style')
    style.innerHTML = '.dg.ac {visibility: hidden;}'
    document.getElementsByTagName('head')[0].appendChild(style)
  }

  // 设置控制板层级
  setGUIzIndex (zIndex) {
    this.gui.domElement.parentElement.style.zIndex = zIndex
  }

  // 设置页面背景色
  setBackgroundColor (color) {
    document.body.style.backgroundColor = color
  }

  // 传送数据
  transMsg (dom) {
    let transWin = dom.contentWindow
    transWin.postMessage({
      type: 'reset',
      data: window[O2_AMBIENT_CONFIG]
    }, `${window.location.protocol}${dom.getAttribute('src')}`)
  }

  // iframe dom
  transferProcess () {
    if (!this.transferMonPC) {
      this.transferMonPC = document.getElementById('transferMon_pc')
    }
    if (!this.transferMonM) {
      this.transferMonM = document.getElementById('transferMon_m')
    }

    this.transferMonPC && this.transMsg(this.transferMonPC)
    this.transferMonM && this.transMsg(this.transferMonM)
  }

  // 重置画布
  resetCanvas (opts) {
    if (this.isAmbientPlat) {
      this.transferProcess()

      if (window[O2_AMBIENT_IS_CONFIG_RESET]) return
      window[O2_AMBIENT_IS_CONFIG_RESET] = true

      return
    }
    window[O2_AMBIENT_MAIN] && window[O2_AMBIENT_MAIN].reset && typeof window[O2_AMBIENT_MAIN].reset === 'function' && window[O2_AMBIENT_MAIN].reset(opts)
  }
}

export default Controller
