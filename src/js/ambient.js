import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './utils/const'

import Rain from './utils/Rain'


// 判断是否可点，被点中则隐藏
let wrapper = document.querySelector('.o2team_ambient_main')
if (!wrapper) {
  wrapper = document.createElement('div')
  wrapper.setAttribute('class', 'o2team_ambient_main')
  wrapper.setAttribute('id', 'o2team_ambient_main')
  wrapper.insertAdjacentElement('beforeend', document.createElement('canvas'))
  document.body.insertAdjacentElement('beforeend', wrapper)
}
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

// 初始化函数
export default function initAmbient () {
  // 主函数暴露
  window[O2_AMBIENT_MAIN] = new Rain()
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient
