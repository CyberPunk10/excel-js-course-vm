import { storage, clone } from '../core/utils'
import { defaultStyles, defaultTitle } from '../constans'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {1:1: 'text'}
  stylesState: {}, // {1:1: {'fontWeight': 'bold'}}
  currentText: '',
  currentStyles: defaultStyles, // текущие стили ячейки
  titleTable: defaultTitle,
  openedDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

// export const initialState = storage('excel-state')
//   ? normalize(storage('excel-state'))
//   : defaultState

export function initialState(params) {
  console.log(defaultState)
  return storage('excel:' + params)
    ? normalize(storage('excel:' + params))
    : clone(defaultState) // передаём клон, т.к. если будет происходить обращение к defaultState без перезагрузки страницы, то он будет мутированный
}
