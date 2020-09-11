import { TABLE_RESIZE, CHANGE_TEXT, APPLY_STYLE,
  CHANGE_STYLES } from './types'

// Action Creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function applyStyle(data) { // по нажатию btns in toolbar применяются стили к выбранной ячейке
  return {
    type: APPLY_STYLE,
    data
  }
}

export function changeStyles(data) { // МЕНЯЕТСЯ STORE и перерисовывается toolbar - при выборе ячейки
  return {
    type: CHANGE_STYLES,
    data
  }
}
