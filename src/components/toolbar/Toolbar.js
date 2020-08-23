import { ExcelComponent } from '../../core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  toHTML() {
    return '<h1>Toolbar</h1>'
  }
}
