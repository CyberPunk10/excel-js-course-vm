export function createTable(rowsCount = 21) {
  let html = ''
  for (let i = 0; i <= rowsCount; i++) {
    html += createRow(i) // numberRow
  }
  return html
}

const CODES = {
  'A': 65,
  'Z': 90
}

function toChar(charCode) {
  return String.fromCharCode(charCode)
}

function createRow(numberRow) {
  const colsCount = CODES.Z - CODES.A
  let fullCol = ''

  for (let i = 0; i <= colsCount; i++) {
    fullCol += (numberRow === 0) ? createCol(CODES.A + i) : createCol()
  }

  const html = `
    <div class="excel-table__row" ${numberRow ? 'data-type="resizable"' : ''}>
      <div class="excel-table__row-info">
        ${numberRow ? numberRow : ''}
        ${numberRow ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="excel-table__row-data">${fullCol}</div>
    </div>
  `
  return html
}

function createCol(charCode) {
  if (charCode) {
    return `
      <div class="excel-table__column" data-type="resizable">
        ${toChar(charCode)}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `
  }
  return `
    <div class="excel-table__cell" contenteditable></div>
  `
}
