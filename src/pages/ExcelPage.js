import { Page } from '../core/Page'
import { rootReducer } from '../redux/rootReducer'
import { createStore } from '../core/createStore'
import { initialState } from '../redux/initialState'
import { storage, debounce } from '../core/utils'
import { Excel } from '../components/excel/Excel'
import { Header } from '../components/header/Header'
import { Toolbar } from '../components/toolbar/Toolbar'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'


export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState)

    const stateListener = debounce(state => {
      // console.log('App', state)
      storage('excel-state', state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    console.log('afterRender:')
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
