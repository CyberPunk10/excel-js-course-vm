import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header'
import { Toolbar } from './components/toolbar/Toolbar'
import { Formula } from './components/formula/Formula'
import { Table } from './components/table/Table'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { storage, debounce } from './core/utils'
import { initialState } from './redux/initialState'
import './main.sass'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
  // console.log('App', state)
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()


// 1. при кастомных стилях после обновления страницы в тулбаре не подсвечиваются стили ячейки 1:1 (ИСПРАВЛЕНО, но диспатчится при обновлении лишний раз CHANGE_STYLES)
// 3. не нравится что дефолтные стили прописываются в каждой ячейке (думается, что их можно убрать и делать проверку на их наличие при необходимости)
// 4. при наборе текста в ячейке, в формуле он не обновляется
// 5. продумать что делать, если контент не вмезается в ячейку
// 6. при выборе ячейки не отображается в формуле, но сохраняется в store (после обновления страницы работает)
// 7. не реализована возможность добавлять строки и столбцы
// 8. не понятно как будут копироваться несколько ячеек
// 9. нет выделения нескольких ячеек при удерживании мыши (только через shift)
// 10. не реализован выбор группы ячеек с помощью клавиши ctrl
// 11.
