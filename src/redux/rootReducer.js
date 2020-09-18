import { TABLE_RESIZE, CHANGE_TEXT, APPLY_STYLE,
  CHANGE_STYLES, CHANGE_TITLE, UPDATE_DATE } from './types'

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
      field = 'stylesState'
      newState = state[field] || {}
      action.data.ids.forEach(id => {
        newState[id] = {...newState[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: newState,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }

    case CHANGE_STYLES: // МЕНЯЕТСЯ STORE и перерисовывается toolbar - при выборе ячейки
      return {...state, currentStyles: action.data}

    case CHANGE_TITLE: // МЕНЯЕТСЯ STORE и перерисовывается в header название таблицы - при загрузке страницы
      return {...state, titleTable: action.data}

    case UPDATE_DATE:
      return {...state, openedDate: new Date().toJSON()}

    default: return state
  }
}
