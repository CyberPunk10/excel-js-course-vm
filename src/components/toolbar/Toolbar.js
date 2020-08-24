import { ExcelComponent } from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel-toolbar'

  toHTML(selector) {
    selector.innerHTML = `
      <div class="excel-toolbar__button"><span class="material-icons">format_bold</span></div>
      <div class="excel-toolbar__button"><span class="material-icons">format_italic</span></div>
      <div class="excel-toolbar__button"><span class="material-icons">format_underlined</span></div>
      <div class="excel-toolbar__button"><span class="material-icons">format_align_left</span></div>
      <div class="excel-toolbar__button"><span class="material-icons">format_align_center</span></div>
      <div class="excel-toolbar__button"><span class="material-icons">format_align_right</span></div>

    `
    return selector
  }
}
