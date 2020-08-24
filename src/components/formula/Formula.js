import { ExcelComponent } from '../../core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel-formula'

  toHTML(selector) {
    selector.innerHTML = `
      <div class="excel-formula__info">fx</div>
      <div class="excel-formula__input" contenteditable="contenteditable" spellcheck="false"></div>
    `
    return selector
  }
}
