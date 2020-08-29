import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
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
      const $target = event.target
      // const $parent = $target.parentElement
      const $parent = $target.closest('[data-type="resizable"]')
      const targetCol = $parent.getAttribute('data-number-col') // номер колонки
      const targetColCells = this.$root.querySelectorAll(`[data-number-col="${targetCol}"`) // массив ячеек нужной колонки

      const coords = $parent.getBoundingClientRect()
      const coordsTt = $target.getBoundingClientRect()
      const offsetX = event.offsetX // отследить позиционирование на элементе
      const offsetY = event.offsetY // отследить позиционирование на элементе

      document.onmousemove = e => {
        if (event.target.dataset.resize === 'col') {
          // из расстояния от левого края страницы до курсора отнимаем
          // расстояние от левшго края страницы до крайней-правой координаты колонки
          // и прибавляем разницу между шириной блока и координаты курсора от левого края блока
          // и прибавляем +1 (ширина бордера колонки)
          const delta = e.pageX - coords.right + coordsTt.width - offsetX + 1
          const value = coords.width + delta
          $parent.style.width = value + 'px'
          targetColCells.forEach(element => {
            element.style.width = value + 'px'
            element.style.borderRight = '1px solid #3c74ff'
          })
        } else if (event.target.dataset.resize === 'row') {
          const delta = e.pageY - coords.bottom + coordsTt.height - offsetY + 1
          const value = coords.height + delta
          $parent.style.height = value + 'px'
        }
      }

      document.addEventListener('mouseup', () => {
        targetColCells.forEach(element => {
          element.style.borderRight = null
        })
        document.onmousemove = null
      })
    }
  }

  // onMousemove(event) {
  //   console.log('mousemove', event.target)
  // }

  // onMouseup(event) {
  //   console.log('mouseup', event.target)
  // }
}

// 74 msScripting
// 245 msRendering
// 77 msPainting
// 58 msSystem

// 63 msLoading
// 499 msScripting
// 79 msRendering
// 19 msPainting
// 119 msSystem
// 86 msIdle
// 866 msTotal
