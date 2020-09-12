import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { TableSelection } from './TableSelection'
import { getNextCell } from './table.functions'
import * as actions from '../../redux/actions'
import { defaultStyles } from '../../constans'
import { $ } from '../../core/dom'
import { parse } from '../../core/parse'
// import { storage } from '../../core/utils'

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

    this.$on('Formula:input', value => {
      // $(this.selection.startCell).attr('data-value', value)
      // this.selection.startCell.innerHTML = parse(value)
      this.renderTextInFormula(value)
      this.updateTextInStore(value)
    })

    this.$on('Formula:done', () => {
      this.selection.startCell.focus()
    })

    this.$on('Toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })

    const styles = $($cell).getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  toHTML() {
    return createTable(this.rowsCount, this.store.getState())
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
        // математические вычисления value в ячейке, с которой уходим
        const value = this.selection.startCell.textContent // Если тег INPUT, то надо брать значение из value, а не textContent
        this.renderTextInFormula(value)
        this.selection.select(event.target)
        this.$emit('Table:select', event.target)
        const styles = $(event.target).getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
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

      // математические вычисления value в ячейке, с которой уходим
      const value = this.selection.startCell.textContent // Если тег INPUT, то надо брать значение из value, а не textContent
      this.renderTextInFormula(value)

      // переход на следующую ячейку
      const $nextCell = getNextCell(this.$root, this.rowsCount, this.colsCount)
      this.selection.select($nextCell)
      $nextCell.focus()
      this.$emit('Table:select', $nextCell)

      const styles = $($nextCell).getStyles(Object.keys(defaultStyles))
      this.$dispatch(actions.changeStyles(styles))
    }
  }

  updateTextInStore(content) {
    this.$dispatch(actions.changeText({
      id: this.selection.startCell.getAttribute('data-row-col'),
      text: content
    }))
  }

  renderTextInFormula(content) {
    $(this.selection.startCell).attr('data-value', content)
    this.selection.startCell.innerHTML = parse(content)
  }

  onInput(event) {
    // this.$emit('Table:input', event.target) // обычный эмиттер (без store)
    this.updateTextInStore(event.target.textContent.trim())
  }

  // onMousemove(event) {
  //   console.log('mousemove', event.target)
  // }

  // onMouseup(event) {
  //   console.log('mouseup', event.target)
  // }
}
