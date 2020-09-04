import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { TableSelection } from './TableSelection'
import { getNextCell } from './table.functions'
import * as actions from '../../redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.rowsCount = 12
    this.colsCount = 26
  }

  // этот метод выполняется до  метода init, а значит здесь мы можем подготовить данные для init
  prepare() {
    this.selection = new TableSelection(this.$root)
  }

  init() {
    super.init() // вызов родительского метода (иначе будет перезатирание)
    const $cell = this.$root.querySelector('[data-row-col="1:1"]')
    this.selection.select($cell)
    this.$emit('Table:select', $cell)

    this.$on('Formula:input', text => {
      this.selection.startCell.innerHTML = text
      console.log('Formula:input', text)
    })

    this.$on('Formula:done', () => {
      this.selection.startCell.focus()
    })
  }

  toHTML(selector) {
    selector.innerHTML = createTable(this.rowsCount, this.store.getState())
    return selector
  }

  // onClick(event) {
  //   console.log('click', event.target)
  // }

  onMousedown(event) {
    // console.log('mousedown', event.target.getAttribute('data-resize')) // возвращает строку
    // console.log('mousedown', event.target.dataset) // второй вариант, который возвращает объект с data-атрибутами
    if (event.target.dataset.resize) {
      this.resizeTable()
    } else if (event.target.dataset.rowCol) {
      if (event.shiftKey) {
        this.selection.selectGroup(event.target)
      } else {
        this.selection.select(event.target)
      }
    }
  }

  async resizeTable() {
    try {
      const data = await resizeHandler(this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn('Resize error', error.message)
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const $nextCell = getNextCell(this.$root, this.rowsCount, this.colsCount)
      this.selection.select($nextCell)
      $nextCell.focus()
      this.$emit('Table:select', $nextCell)
    }
  }

  onInput(event) {
    this.$emit('Table:input', event.target)
  }

  // onMousemove(event) {
  //   console.log('mousemove', event.target)
  // }

  // onMouseup(event) {
  //   console.log('mouseup', event.target)
  // }
}

