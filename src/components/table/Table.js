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
      const coordsTt = $target.getBoundingClientRect()
      const coords = $parent.getBoundingClientRect()
      console.log(coords)
      document.onmousemove = e => {
        if (event.target.dataset.resize === 'col') {
          const delta = e.pageX - (coords.right - coordsTt.x + coordsTt.width)
          console.log(e.pageX, coords.right, coordsTt)
          const value = coords.width + delta
          $parent.style.width = value + 'px'
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
