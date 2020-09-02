export function getNextCell($root, rowsCount, colsCount) {
  const key = event.key
  const $target = event.target
  const row = getCurrentRow($target) // '1'
  const col = getCurrentCol($target) // '1'

  return $root.querySelector(getDataRowCol(key, row, col, rowsCount, colsCount))
}

function getDataRowCol(key, row, col, rowsCount, colsCount) {
  // 1 способ
  // if (key === 'ArrowRight' || key === 'Tab') {
  //   return (col == colsCount) ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${row}:${++col}"]`
  // } else if (key === 'ArrowLeft') {
  //   return (col === '1') ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${row}:${--col}"]`
  // } else if (key === 'ArrowDown' || key === 'Enter') {
  //   return (row == rowsCount) ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${++row}:${col}"]`
  // } else if (key === 'ArrowUp') {
  //   return (row === '1') ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${--row}:${col}"]`
  // }

  // 2 способ
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      return (row == rowsCount) ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${++row}:${col}"]`
    case 'Tab':
    case 'ArrowRight':
      return (col == colsCount) ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${row}:${++col}"]`
    case 'ArrowLeft':
      return (col === '1') ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${row}:${--col}"]`
    case 'ArrowUp':
      return (row === '1') ? `[data-row-col="${row}:${col}"]` : `[data-row-col="${--row}:${col}"]`
  }
}

function getCurrentRow($target) {
  return $target.dataset.rowCol.split(':')[0]
}
function getCurrentCol($target) {
  return $target.dataset.rowCol.split(':')[1]
}
