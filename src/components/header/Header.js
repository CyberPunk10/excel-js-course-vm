import { ExcelComponent } from '../../core/ExcelComponent'
import { defaultTitle } from '../../constans'
import { changeTitle } from '../../redux/actions'
import { ActiveRoute } from '../../core/router/ActiveRoute'

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
        <div class="excel-header__button" data-btn-icon="delete">
          <span class="material-icons" data-btn-icon="delete">delete</span>
        </div>
        <div class="excel-header__button" data-btn-icon="exit-to-app">
          <span class="material-icons" data-btn-icon="exit-to-app">exit_to_app</span>
        </div>
      </div>
    `
  }

  onInput(event) {
    this.$dispatch(changeTitle(event.target.value.trim()))
  }

  onClick(event) {
    console.log('[Header] Listener: click', event.target)
    const $target = event.target
    if ($target.getAttribute('data-btn-icon') === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту страницу?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigation('')
      }
      console.log('delete')
    } else if ($target.getAttribute('data-btn-icon') === 'exit-to-app') {
      ActiveRoute.navigation('')
    }
  }
}
