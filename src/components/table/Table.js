import { ExcelComponent } from '../../core/ExcelComponent'

export class Table extends ExcelComponent {
  static className = 'excel-table'

  toHTML(selector) {
    selector.innerHTML = `
      <div class="excel-table__row">
        <div class="excel-table__row-info"></div>
        <div class="excel-table__row-data">
          <div class="excel-table__column">A</div>
          <div class="excel-table__column">B</div>
          <div class="excel-table__column">C</div>
          <div class="excel-table__column">A</div>
          <div class="excel-table__column">B</div>
          <div class="excel-table__column">C</div>
          <div class="excel-table__column">A</div>
          <div class="excel-table__column">B</div>
          <div class="excel-table__column">C</div>
        </div>
      </div>
      <div class="excel-table__row">
        <div class="excel-table__row-info">1</div>
        <div class="excel-table__row-data">
          <div class="excel-table__cell selected" contenteditable="contenteditable">21</div>
          <div class="excel-table__cell" contenteditable="contenteditable">21</div>
          <div class="excel-table__cell" contenteditable="contenteditable">21</div>
        </div>
      </div>
      <div class="excel-table__row">
        <div class="excel-table__row-info">2</div>
        <div class="excel-table__row-data">
          <div class="excel-table__cell" contenteditable="contenteditable">22</div>
          <div class="excel-table__cell" contenteditable="contenteditable">22</div>
          <div class="excel-table__cell" contenteditable="contenteditable">22</div>
        </div>
      </div>
    `
    return selector
  }
}
