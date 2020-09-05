export function resizeHandler($root) {
  // eslint-disable-next-line func-call-spacing
  return new Promise (resolve => {
    const type = event.target.dataset.resize // col || row
    const $target = event.target
    const $parent = $target.closest('[data-type="resizable"]') // const $parent = $target.parentElement
    const targetCol = $parent.getAttribute('data-number-col') // номер колонки
    const targetRow = $parent.getAttribute('data-number-row') // номер строки
    const targetColCells = $root.querySelectorAll(`[data-number-col="${targetCol}"`) // массив ячеек нужной колонки
    const targetRowCells = $parent.querySelectorAll(`[data-row-col="${targetRow}:${targetCol}"`) // массив ячеек нужной колонки

    const coords = $parent.getBoundingClientRect()
    const coordsTt = $target.getBoundingClientRect()
    const offsetX = event.offsetX // отследить позиционирование на элементе
    const offsetY = event.offsetY // отследить позиционирование на элементе

    let value = null

    document.onmousemove = e => {
      if (type === 'col') {
        // из расстояния от левого края страницы до курсора отнимаем
        // расстояние от левшго края страницы до крайней-правой координаты колонки
        // и прибавляем разницу между шириной блока и координаты курсора от левого края блока
        // и прибавляем +1 (ширина бордера колонки)
        const delta = e.clientX - coords.right + coordsTt.width - offsetX + 1
        value = coords.width + delta
        $parent.style.width = value + 'px'
        targetColCells.forEach(element => {
          element.style.width = value + 'px'
          element.style.borderRight = '1px solid #3c74ff'
        })
      } else {
        const delta = e.clientY - coords.bottom + coordsTt.height - offsetY + 1
        value = coords.height + delta
        $parent.style.height = value + 'px'
        targetRowCells.forEach(element => {
          element.style.borderBottom = '1px solid #3c74ff'
        })
      }
    }

    document.addEventListener('mouseup', () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        targetColCells.forEach(element => {
          element.style.borderRight = null
        })
        resolve({
          target: targetCol,
          value: value < 40 ? 40 : value,
          type
        })
      } else {
        targetRowCells.forEach(element => {
          element.style.borderBottom = null
        })
        resolve({
          target: targetRow,
          value: value < 24 ? 24 : value,
          type
        })
      }
    })
  })
}


// Для оптимизации можно реализвать mousemove только для линии рейсайза, а не изменять ширину ячейки в моменте
