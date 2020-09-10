import { ExcelStateComponent } from '../../core/ExcelStateComponent'
import { createToolbar } from './toolbar.template'
import { defaultStyles } from '../../constans'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel-toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles) // экспортируем значение по умолчанию из constants.js
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  // toHTML(selector) {
  //   selector.innerHTML = createToolbar()
  //   return selector
  // }

  storeChanged(changes) {
    console.log(changes)
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = event.target
    if ($target.getAttribute('data-type') === 'button') {
      const value = JSON.parse($target.dataset.value)
      this.$emit('toolbar:applyStyle', value)
      console.log(value)

      // const key = Object.keys(value)[0]
      // this.setState({[key]: value[key]})
    }
  }
}
