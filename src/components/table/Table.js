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
    selector.innerHTML = createTable(4)
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
      const cTt = $target.getBoundingClientRect()
      const coords = $parent.getBoundingClientRect()
      // const currentPageX = event.pageX;
      // (2) отследить позиционирование на элементе
      const offsetX = event.offsetX;
      console.log(offsetX)
      console.log('parent: ', coords)
      document.onmousemove = e => {
        if (event.target.dataset.resize === 'col') {
          // из расстояния от левого края страницы до курсора отнимаем
          // расстояние от левшго края страницы до крайней-правой координаты колонки
          // и прибавляем разницу между шириной блока и координаты курсора от левого края блока
          // и прибавляем +1 (ширина бордера колонки)
          const delta = e.pageX - coords.right + cTt.width - offsetX + 1
          const value = coords.width + delta
          $parent.style.width = value + 'px'
          console.log(e.pageX)
        } else if (event.target.dataset.resize === 'row') {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.style.height = value + 'px'
        }
      }

      document.addEventListener('mouseup', () => {
        document.onmousemove = null
      })
    }
    // document.onmousemove = e => {
    //   console.log(document.onmousemove)
    //   const delta = e.pageY - coords.right
    //   const value = coords.height + delta
    //   $parent.style.height = value + 'px'
    // }

    // document.addEventListener('mouseup', () => {
    //   document.onmousemove = null
    // })
  }

  // onMousemove(event) {
  //   console.log('mousemove', event.target)
  // }

  // onMouseup(event) {
  //   console.log('mouseup', event.target)
  // }
}
