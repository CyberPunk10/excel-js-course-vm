import { toInlineStyles } from '../../core/utils'
import { defaultStyles } from '../../constans'
import { parse } from '../../core/parse'

export function createTable(rowsCount = 21, state = {}) {
  let html = ''
  for (let i = 0; i <= rowsCount; i++) {
    html += createRow(i, state) // numberRow
  }
  return html
}

const CODES = {
  'A': 65,
  'Z': 90,
  'varForIndex': 64
}

// const DEFAULT_COL = 120
// const DEFAULT_ROW = 20

function toChar(charCode) {
  return String.fromCharCode(charCode)
}

// Create Row
function createRow(numberRow, state) {
  const colsCount = CODES.Z - CODES.A
  let fullCol = ''

  for (let i = 0; i <= colsCount; i++) {
    fullCol += createCol(numberRow, CODES.A + i, state)
  }

  const rowState = state.rowState
  const height = rowState[numberRow] ? `style="height: ${rowState[numberRow]}px"` : ''

  const html = `
    <div class="excel-table__row" ${numberRow ? 'data-type="resizable"' : ''} data-number-row="${numberRow}" ${height}>
      <div class="excel-table__row-info">
        ${numberRow ? numberRow : ''}
        ${numberRow ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="excel-table__row-data">${fullCol}</div>
    </div>
  `
  return html
}

// Create Col
function createCol(numberRow, charCode, state) {
  const numberCol = charCode - CODES.varForIndex

  const colState = state.colState
  const idCell = `${numberRow}:${numberCol}`
  const styles = toInlineStyles({
    ...defaultStyles,
    ...state.stylesState[idCell]
  })
  const width = colState[numberCol] ? `width: ${colState[numberCol]}px;` : ''

  if (!numberRow) { // если это 0-вая строка, то записывем в неё charCode
    return `
      <div 
        class="excel-table__column" 
        data-type="resizable"
        data-number-col="${numberCol}"
        style ="${width}"
        >
          ${toChar(charCode)}
          <div class="col-resize" data-resize="col"></div>
      </div>
    `
  }

  const data = state.dataState[idCell] || ''

  return `
  <div 
    class="excel-table__cell"
    contenteditable
    data-number-col="${numberCol}"
    data-row-col="${idCell}"
    data-value="${data}"
    style="${styles}; ${width}"
    >${parse(data)}</div>
`
}
