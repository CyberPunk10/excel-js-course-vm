import { ExcelComponent } from '../../core/ExcelComponent'

export class Header extends ExcelComponent {
  // constructor (selector) {
  //   this.$el = selector
  // }
  static className = 'excel-header'

  toHTML(selector) {
    selector.innerHTML = `
      <input class="excel-header__input" type="text" value="Новая таблица" />
      <div class="excel-header__buttons">
        <div class="excel-header__button"><span class="material-icons">delete</span></div>
        <div class="excel-header__button"><span class="material-icons">exit_to_app</span></div>
      </div>
    `
    return selector
  }
}
