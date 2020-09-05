import { TABLE_RESIZE, CHANGE_TEXT } from './types'

export function rootReducer(state, action) {
  let newState
  let field
  // console.log('Action: ', action)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      newState = state[field] || {}
      newState[action.data.target] = action.data.value
      return {...state, [field]: newState} // value, target

    case CHANGE_TEXT:
      newState = state['dataState'] || {}
      newState[action.data.id] = action.data.text
      return {...state, currentText: action.data.text, dataState: newState}

    default: return state
  }
}
