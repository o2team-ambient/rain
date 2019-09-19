/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_CLASSNAME
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'
import processLocalConfig from './utils/processLocalConfig'

import configKeys from './configs/keys'
// import configNationalDay1 from './configs/configNationalDay1'
// import configNationalDay2 from './configs/configNationalDay2'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const configKeyVal = getParameterByName('configKey')
const configKey = configKeys[configKeyVal] || configKeys['default']

window.localStorage.removeItem('o2_ambient_rain.isLocal')
window.localStorage.removeItem('o2_ambient_rain.gui')

let controlInit = () => {
  const loadData = {
    '默认': {
      '0': {...window[O2_AMBIENT_CONFIG]}
    },
    '2018吃货节': {
      '0': {...window[O2_AMBIENT_CONFIG]}
    },
    // '国庆氛围1': {
    //   '0': {...configNationalDay1}
    // },
    // '国庆氛围2': {
    //   '0': {...configNationalDay2}
    // }
  }
  const allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })

  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    otherConfig
    allLoadData = {
      remembered: {}
    }

    constructor () {
      super()
      this.dataInit()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.initTextureGUI()
    }

    dataInit () {
      const loadData = {
        '默认': {
          '0': {...window[O2_AMBIENT_CONFIG]}
        },
        '2018吃货节': {
          '0': {...window[O2_AMBIENT_CONFIG]}
        },
        '国庆氛围1': {
          '0': {...configNationalDay1}
        },
        '国庆氛围2': {
          '0': {...configNationalDay2}
        }
      }
      Object.keys(loadData).forEach(key => {
        const data = loadData[key]['0']
        loadData[key]['0'] = {
          ...window[O2_AMBIENT_CONFIG],
          ...data
        }
      })
      this.allLoadData = processLocalConfig({ configKey, guiName: O2_AMBIENT_CLASSNAME, loadData })
    }

    initBaseGUI () {
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI({
        name: O2_AMBIENT_CLASSNAME,
        preset: configKey,
        load: {
          'remembered': { ...this.allLoadData.remembered }
        }
      })
      // gui.useLocalStorage = true
      // gui.remember(config)
      gui.addCallbackFunc(this.resetCanvas.bind(this))
      
      gui.add(otherConfig, 'play').name('重播')
      gui.add(config, 'duration', 1, 10, 1).name('掉落时长').onFinishChange(() => {
        this.resetCanvas()
      })
      gui.add(config, 'num', 3, 100, 1).name('粒子数量').onFinishChange(val => {
        this.resetCanvas()
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)

      setTimeout(() => {
        this.resetCanvas()
      }, 1000)
    }

    initTextureGUI () {
      // demo code
      const gui = this.gui
      const config = this.config
      const texturesFolder = gui.addFolder('纹理')
      texturesFolder.addGroup(config, 'textures').name(`纹理列表`).onFinishChange(val => {
        this.resetCanvas()
      })
      texturesFolder.open()

      this.texturesFolder = texturesFolder
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
