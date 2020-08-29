export function resizeHandler($root) {
  const type = event.target.dataset.resize // col || row
  const $target = event.target
  const $parent = $target.closest('[data-type="resizable"]') // const $parent = $target.parentElement
  const targetCol = $parent.getAttribute('data-number-col') // номер колонки
  const targetRow = $parent.textContent.trim() // номер строки
  const targetColCells = $root.querySelectorAll(`[data-number-col="${targetCol}"`) // массив ячеек нужной колонки
  const targetRowCells = $root.querySelectorAll(`[data-number-row="${targetRow}"`) // массив ячеек нужной колонки

  const coords = $parent.getBoundingClientRect()
  const coordsTt = $target.getBoundingClientRect()
  const offsetX = event.offsetX // отследить позиционирование на элементе
  const offsetY = event.offsetY // отследить позиционирование на элементе

  document.onmousemove = e => {
    if (type === 'col') {
      // из расстояния от левого края страницы до курсора отнимаем
      // расстояние от левшго края страницы до крайней-правой координаты колонки
      // и прибавляем разницу между шириной блока и координаты курсора от левого края блока
      // и прибавляем +1 (ширина бордера колонки)
      const delta = e.clientX - coords.right + coordsTt.width - offsetX + 1
      const value = coords.width + delta
      $parent.style.width = value + 'px'
      targetColCells.forEach(element => {
        element.style.width = value + 'px'
        element.style.borderRight = '1px solid #3c74ff'
      })
    } else {
      const delta = e.clientY - coords.bottom + coordsTt.height - offsetY + 1
      const value = coords.height + delta
      $parent.style.height = value + 'px'
      targetRowCells.forEach(element => {
        element.style.borderBottom = '1px solid #3c74ff'
      })
    }
  }

  document.addEventListener('mouseup', () => {
    if (type === 'col') {
      targetColCells.forEach(element => {
        element.style.borderRight = null
      })
    } else {
      targetRowCells.forEach(element => {
        element.style.borderBottom = null
      })
    }
    document.onmousemove = null
    document.onmouseup = null
  })
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


// ROW
// 58 msLoading
// 397 msScripting
// 57 msRendering
// 7 msPainting
// 130 msSystem
// 128 msIdle
// 777 msTotal


// Для оптимизации можно реализвать mousemove только для линии рейсайза, а не изменять ширину ячейки в моменте
