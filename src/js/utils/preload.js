export default class Preloader {
  constructor(options) {
    this.options = options
    this.manifest = options.manifest
    if (!this.manifest || !this.manifest.length) {
      return
    }
    this.total = this.manifest.length
    this.count = 0
    this.onProgress = options.onProgress
    this.onComplete = options.onComplete
    this.result = {}
    this.load()
  }
  
  load() {
    this.manifest.forEach((item) => {
      let img = new Image()
      img.src = item.src
      img.onload = img.onerror = img.onabort = () => {
        this.result[item.id] = img
        this.updateProcess(img)
      }
    })
  }

  updateProcess(img) {
    this.count++
    let percent = Math.round(this.count / this.total * 100)
    if (typeof this.onProgress === 'function') {
      this.onProgress(percent, img)
    }
    if (this.count === this.total && typeof this.onComplete === 'function') {
      this.onComplete()
    }
  }

  getResult(id) {
    return id ? this.result[id] : this.result
  }
  
}
