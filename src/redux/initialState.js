import { storage } from '../core/utils'
import { defaultStyles } from '../constans'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {1:1: 'text'}
  stylesState: {}, // {1:1: {'fontWeight': 'bold'}}
  currentText: '',
  currentStyles: defaultStyles // текущие стили ячейки
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
