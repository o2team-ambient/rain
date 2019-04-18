import Preloader from './preload'
import TweenMax from 'gsap/TweenMax'

import { getRandomInt, getRgba } from './util'

import { O2_AMBIENT_CONFIG } from './const'
class Rain {
  constructor(conf) {
    this._setConf()
    this.unitSet = []
    this.isInit = false
    this.isCanvas = this.mode === 'canvas'


    this.play()
  }
  // 获取窗口尺寸
  _getWindowSize() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
  }
  // 加载图片
  _loadImages(cb) {
    let manifest = []
    this.images.map((item, idx) => {
      manifest.push({
        id: idx,
        src: item
      })
    })
    this.loader = new Preloader({
      manifest,
      onComplete: () => {
        cb && cb()
      }
    })
  }
  // 获取对应缓动函数
  _getEaseFn(ease) {
    let easeFn
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
  // 设置配置的参数
  _setConf() {
    let conf = window[O2_AMBIENT_CONFIG]

    this.num = conf.num || 10
    this.mode = conf.mode || 'canvas'
    this.offset = conf.offset || 0
    this.durtaion = conf.durtaion || 5
    this.stagger = conf.stagger || 0
    this.clickable = conf.clickable || false
    this.ease = conf.ease || 'linear'
    this.images = (() => {
      let arr = []
      for (let key in conf.textures) {
        arr.push(conf.textures[key])
      }
      return arr
    })()
    this.bgColor = conf.bgColor || '000000'
    this.bgOpacity = conf.bgOpacity || 0
  }
  // 初始化
  _init() {
    this._getWindowSize()
    this._loadImages(() => {
      this.isCanvas ? this._initCanvas() : this._initDom()
      this.isInit = true
    })
  }
  // 初始化 canvas 模式
  _initCanvas() {
    const domMain = document.querySelector('.o2team_ambient_main')
    const canvas = domMain.querySelector('canvas')
    this.canvas = canvas
    this.canvas.setAttribute('id', 'canvas')

    this.ctx = this.canvas.getContext('2d')
    this._setCanvasBg()
    this._setCanvasSize()
    this._createUnitSet()
    this._startAni()
  }
  // 设置 canvas 背景色
  _setCanvasBg() {
    this.canvas.setAttribute('style', `background-color: ${getRgba(this.bgColor, this.bgOpacity)}`)
  }
  // 设置 canvas 尺寸
  _setCanvasSize() {
    this.canvas.width = this.windowWidth
    this.canvas.height = this.windowHeight
  }
  // 初始化 dom 模式
  _initDom() {}
  // 生成一个表情元素
  _createUnit() {
    // 随机选择一个图片
    const idx = ~~(Math.random() * this.images.length)
    const isPositive = getRandomInt(0, 2)
    const img = new Image()
    img.src = this.images[idx]
    const imgWidth = img.width
    const imgHeight = img.height

    // 随机设置初始位置
    const posX = getRandomInt(0, this.windowWidth - imgWidth)
    const posY = -imgHeight
    img.posX = posX
    img.posY = posY
    img.isPos = isPositive

    this.unitSet.push(img)
  }
  // 生成表情元素集合
  _createUnitSet() {
    for (let i = 0; i < this.num; i++) {
      this._createUnit()
    }
  }
  // 开始动画
  _startAni() {
    if (this.isCanvas) {
      TweenMax.staggerTo(this.unitSet, this.durtaion, {
        posX: (i, img) => {
          return img.isPos ? img.posX + this.offset : img.posX - this.offset
        },
        posY: (i, img) => {
          return this.ease === 'bounce' ? this.windowHeight - img.height : this.windowHeight
        },
        ease: this._getEaseFn(this.ease)
      }, this.stagger)
      TweenMax.ticker.addEventListener('tick', () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.unitSet.forEach(img => {
          this.ctx.drawImage(img, img.posX, img.posY, img.width, img.height)
        })
      })
    } else {}
  }
  // 开始播放动画
  play() {
    !this.isInit && this._init()
  }
  toggle() {
    this.reset()
  }
  // 重新播放动画
  reset() {
    this._setConf()
    this.unitSet = []
    this._setCanvasBg()
    this._createUnitSet()
    this._startAni()
  }
}

export default Rain