import Preloader from './preload'
import TweenMax from 'gsap/TweenMax'

import { getRandomInt, getRgba } from './util'
import getEaseFn from './getEaseFn'

import { O2_AMBIENT_CONFIG } from './const'

class Rain {

  constructor () {
    this._setConf()
    this.imgInfo = []
    this.unitSet = []
    this.isInit = false
    this.isCanvas = this.mode === 'canvas'

    this.play()
  }

  // 获取窗口尺寸
  _getWindowSize () {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
  }

  // 加载图片
  _loadImages (cb) {
    const manifest = this.images.map((item, idx) => {
      return {
        id: idx,
        src: item
      }
    })

    this.loader = new Preloader({
      manifest,
      onProgress: (percent, img) => {
        this.imgInfo.push(img)
      },
      onComplete: () => {
        cb && cb()
      }
    })
  }

  // 设置配置的参数
  _setConf () {
    const conf = window[O2_AMBIENT_CONFIG]
    const defaultConf = {
      num: 10,
      mode: 'canvas',
      offset: 0,
      duration: 5,
      stagger: 0,
      clickable: false,
      ease: 'easeInOut',
      endCallback: () => {}
    }

    this.num = conf.num || defaultConf.num
    this.mode = conf.mode || defaultConf.mode
    this.offset = conf.offset || defaultConf.offset
    this.duration = conf.duration || defaultConf.duration
    this.stagger = conf.stagger || defaultConf.stagger
    this.clickable = conf.clickable || defaultConf.clickable
    this.ease = conf.ease || defaultConf.ease
    this.endCallback = conf.endCallback || defaultConf.endCallback
    this.images = (() => {
      const arr = []

      for (const key in conf.textures) {
        arr.push(conf.textures[key])
      }

      return arr
    })()
  }

  // 初始化
  _init () {
    this._getWindowSize()
    this._loadImages(() => {
      if (this.isCanvas) {
        this._initCanvas()
       } else {
         this._initDom()
       }
      this.isInit = true
    })
  }

  // 初始化 canvas 模式
  _initCanvas () {
    const domMain = document.querySelector('.o2team_ambient_main')
    const canvas = domMain.querySelector('canvas')

    this.canvas = canvas
    this.canvas.setAttribute('id', 'canvas')

    this.ctx = this.canvas.getContext('2d')
    // this._setCanvasBg()
    this._setCanvasSize()
    this._createUnitSet()
    this._startAni()
  }

  // 设置 canvas 背景色
  _setCanvasBg () {
    this.canvas.setAttribute('style', `background-color: ${getRgba(this.bgColor, this.bgOpacity)}`)
  }

  // 设置 canvas 尺寸
  _setCanvasSize () {
    this.canvas.width = this.windowWidth
    this.canvas.height = this.windowHeight
  }

  // 生成一个表情元素
  _createUnit () {
    // 随机选择一个图片
    const idx = ~~(Math.random() * this.imgInfo.length)
    const isPositive = getRandomInt(0, 2)
    const img = new Image()
    const imgInfo = this.imgInfo[idx]

    img.src = imgInfo.src
    const imgWidth = imgInfo.width
    const imgHeight = imgInfo.height

    // 随机设置初始位置
    const posX = getRandomInt(0, this.windowWidth - imgWidth)
    const posY = -imgHeight

    img.posX = posX
    img.posY = posY
    img.isPos = isPositive

    this.unitSet.push(img)
  }

  // 生成表情元素集合
  _createUnitSet () {
    for (let i = 0; i < this.num; i++) {
      this._createUnit()
    }
  }

  // 开始动画
  _startAni () {
    if (!this.isCanvas) return

    TweenMax.staggerTo(
      this.unitSet,
      this.duration,
      {
        posX: (i, img) => {
          return img.isPos ? img.posX + this.offset : img.posX - this.offset
        },
        posY: (i, img) => {
          return this.ease === 'bounce' ? this.windowHeight - img.height : this.windowHeight
        },
        ease: getEaseFn(this.ease)
      },
      this.stagger,
      0,
      () => {
        console.log('complete')
        typeof this.endCallback === 'function' && this.endCallback()
      })
    TweenMax.ticker.addEventListener('tick', () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.unitSet.forEach((img) => {
        this.ctx.drawImage(img, img.posX, img.posY, img.width, img.height)
      })
    })
  }

  // 开始播放动画
  play () {
    !this.isInit && this._init()
  }

  toggle () {
    this.reset()
  }

  // 重新播放动画
  reset () {
    this._setConf()
    this.imgInfo = []
    this.unitSet = []
    // this._setCanvasBg()
    this._init()
    this._createUnitSet()
    this._startAni()
  }
}

export default Rain
