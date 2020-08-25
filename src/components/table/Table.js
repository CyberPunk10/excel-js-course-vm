import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel-table'

  toHTML(selector) {
    selector.innerHTML = createTable()
    return selector
  }
}
