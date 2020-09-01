export function createTable(rowsCount = 21) {
  let html = ''
  for (let i = 0; i <= rowsCount; i++) {
    html += createRow(i) // numberRow
  }
  return html
}

const CODES = {
  'A': 65,
  'Z': 90,
  'varForIndex': 64
}

function toChar(charCode) {
  return String.fromCharCode(charCode)
}

function createRow(numberRow) {
  const colsCount = CODES.Z - CODES.A
  let fullCol = ''

  for (let i = 0; i <= colsCount; i++) {
    fullCol += createCol(numberRow, CODES.A + i)
  }

  const html = `
    <div class="excel-table__row" ${numberRow ? 'data-type="resizable"' : ''} data-number-row="${numberRow}" id="row-${numberRow}">
      <div class="excel-table__row-info">
        ${numberRow ? numberRow : ''}
        ${numberRow ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="excel-table__row-data">${fullCol}</div>
    </div>
  `
  return html
}

function createCol(numberRow, charCode) {
  const numberCol = charCode - CODES.varForIndex
  if (!numberRow) { // если это 0-вая строка, то записывем в неё charCode
    return `
      <div class="excel-table__column" data-type="resizable" data-number-col="${numberCol}">
        ${toChar(charCode)}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `
  }
  return `
  <div class="excel-table__cell" contenteditable data-number-col="${numberCol}" data-row-col="${numberRow}:${numberCol}"></div>
`
}
