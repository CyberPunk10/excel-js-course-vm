import { TABLE_RESIZE, CHANGE_TEXT, APPLY_STYLE,
  CHANGE_STYLES } from './types'

export function rootReducer(state, action) {
  let newState
  let field
  console.log('Action: ', action)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      newState = state[field] || {}
      newState[action.data.target] = action.data.value
      return {...state, [field]: newState} // value, target

    case CHANGE_TEXT:
      field = 'dataState'
      newState = state[field] || {}
      newState[action.data.id] = action.data.text
      return {...state, currentText: action.data.text, dataState: newState}

    case APPLY_STYLE: // по нажатию btns in toolbar применяются стили к выбранной ячейке
      console.log(action)
      return {...state}

    case CHANGE_STYLES: // МЕНЯЕТСЯ STORE и перерисовывается toolbar - при выборе ячейки
      return {...state, currentStyles: action.data}

    default: return state
  }
}
