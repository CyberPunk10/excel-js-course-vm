import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  // этот метод выполняется до  метода init, а значит здесь мы можем подготовить данные для init
  prepare() {
    this.selection = new TableSelection(this.$root)
  }

  init() {
    super.init() // вызов родительского метода (иначе будет перезатирание)
    const $cell = this.$root.querySelector('[data-row-col="1:1"]')
    this.selection.select($cell)
  }
  toHTML(selector) {
    selector.innerHTML = createTable(24)
    return selector
  }

  // onClick(event) {
  //   console.log('click', event.target)
  // }

  onMousedown(event) {
    // console.log('mousedown', event.target.getAttribute('data-resize')) // возвращает строку
    // console.log('mousedown', event.target.dataset) // второй вариант, который возвращает объект с data-атрибутами
    if (event.target.dataset.resize) {
      resizeHandler(this.$root)
    } else if (event.target.dataset.rowCol) {
      if (event.shiftKey) {
        this.selection.selectGroup(event.target)
      } else {
        this.selection.select(event.target)
      }
    }
  }

  // onMousemove(event) {
  //   console.log('mousemove', event.target)
  // }

  // onMouseup(event) {
  //   console.log('mouseup', event.target)
  // }
}
