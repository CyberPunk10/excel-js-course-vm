import { ExcelComponent } from '../../core/ExcelComponent'
import { defaultTitle } from '../../constans'
import { changeTitle } from '../../redux/actions'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  static className = 'excel-header'

  toHTML() {
    const title = this.store.getState().titleTable || defaultTitle
    return `
      <input class="excel-header__input" type="text" value="${title}" />
      <div class="excel-header__buttons">
        <div class="excel-header__button"><span class="material-icons">delete</span></div>
        <div class="excel-header__button"><span class="material-icons">exit_to_app</span></div>
      </div>
    `
  }

  onInput(event) {
    console.log('[Header] Listener: input', event.target.value.trim())
    // console.log(event.target.textContent)
    this.$dispatch(changeTitle(event.target.value.trim()))
  }

  onClick(event) {
    console.log('[Header] Listener: click', event.target)
    // console.log(event.target.textContent)
  }
}
