import { $ } from '@core/dom'

export class TableSelection {
  static className = 'selected'

  constructor($root) {
    this.$root = $root
    this.group = [] // место для хранения выбранных ячеек
    this.startCell = null // первая ячейка при выборе нескольких ячеек с помощью SHIFT
  }

  select($el) {
    this.clear()
    this.group.push($el)
    $el.classList.add(TableSelection.className)
    this.startCell = $el
  }

  // очищает массив выбранных ячеек и удаляет класс .selected
  clear() {
    this.group.forEach(el => {
      el.classList.remove('selected')
    })
    this.group = []
  }

  selectGroup(target) {
    // if (this.group.length > 1) {
    //   this.group.pop()
    //   this.group.push($el)
    //   console.log(this.group)
    // } else {
    //   this.group.push($el)
    //   console.log(this.group)
    // }
    const startParsed = ($.parsedRowCol(this.startCell))
    const targetParsed = ($.parsedRowCol(target))
    console.log(startParsed)
    console.log(targetParsed)
    const cols = range(startParsed.col, targetParsed.col)
    const rows = range(startParsed.row, targetParsed.row)
    console.log(cols, rows)

    const rowsC = []
    for (let i = 0; i <= rows; i++) {
      console.log(i)
      console.log(this.$root.querySelector(`[data-number-row="${i}"]`))
      // console.log(this.$root.querySelector(`[data-number-row="${i}"]`))
      // if (this.$root.querySelectorAll(`[data-number-row="${i}"]`)) {
      //   console.log(i)
      //   for (let j = cols; j <= cols; j++) {
      //     console.log(this.$root)
      //     this.$root.querySelectorAll(`[data-row-col="${i}:${j}"]`).classList.add('selected-group')
      //   }
      // }
    }
    console.log(rowsC)
    function range(start, end) {
      return new Array(end - start + 1)
          .fill('')
          .map( (_, index) => start + index)
    }
    // parsedRowCol($el) {
    //   const parsed = $el.dataset.rowCol.split(':')
    //   return {
    //     row: parsed[0],
    //     col: parsed[1]
    //   }
    // }
    // console.log(this.$root)

    // let startCol = startCol.slice(0, (startCol.indexOf(':')))
    // let finishCol = finishCol.slice((startCol.indexOf(':')))
    // $el.classList.add(TableSelection.className)
  }
}
