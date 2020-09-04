import { TABLE_RESIZE } from './types'

export function rootReducer(state, action) {
  let newState
  switch (action.type) {
    case TABLE_RESIZE:
      newState = state.colState || {}
      newState[action.data.target] = action.data.value
      return {...state, colState: newState} // value, target
    default: return state
  }
}
