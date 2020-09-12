import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header'
import { Toolbar } from './components/toolbar/Toolbar'
import { Formula } from './components/formula/Formula'
import { Table } from './components/table/Table'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { storage } from './core/utils'
import { initialState } from './redux/initialState'
import './main.sass'

const store = createStore(rootReducer, initialState)

store.subscribe(state => {
  // console.log('App', state)
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()


// 1. при кастомных стилях после обновления страницы в тулбаре не подсвечиваются стили ячейки 1:1 (ИСПРАВЛЕНО, но диспатчится при обновлении лишний раз CHANGE_STYLES)
// 3. не нравится что дефолтные стили прописываются в каждой ячейке (думается, что их можно убрать и делать проверку на их наличие при необходимости)
