import { ExcelStateComponent } from '../../core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel-toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
    this.initState(initialState)
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

  onClick(event) {
    const $target = event.target
    if ($target.getAttribute('data-type') === 'button') {
      const value = JSON.parse($target.dataset.value)
      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
      console.log(this.state)
    }
  }
}
