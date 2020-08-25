import { firstLetterUpperCase } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new ErrorEvent('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const handler = getNameHandler(firstLetterUpperCase(listener))
      if (!this[handler]) {
        console.log(this)
        throw new Error(`Method ${handler} is not emplemented in ${this.name || ''} Component`)
      }
      this[handler] = this[handler].bind(this) // привязываем контекст, чтобы он сохранился при использовании removeDOMListeners
      this.$root.addEventListener(listener, this[handler])
      // console.log(this.$root)
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const handler = getNameHandler(firstLetterUpperCase(listener))
      if (!this[handler]) {
        console.log(this)
        throw new Error(`Method ${handler} is not emplemented in ${this.name || ''} Component`)
      }
      this.$root.removeEventListener(listener, this[handler])
      // console.log(this.$root)
    })
  }
}


function getNameHandler(eventName) {
  return 'on' + eventName
}
