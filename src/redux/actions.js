import { TABLE_RESIZE, CHANGE_TEXT, APPLY_STYLE,
  CURRENT_STYLE_CELL } from './types'

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

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function currentStyleCell(data) {
  return {
    type: CURRENT_STYLE_CELL,
    data
  }
}
