import { storage } from '../core/utils'
import { defaultStyles } from '../constans'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {1:1: 'text'}
  currentText: '',
  currentStyles: defaultStyles // текущие стили ячейки
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
