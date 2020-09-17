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
    const params = this.params ? this.params : Date.now().toString() // url - .../#excel/123423641876

    const store = createStore(rootReducer, initialState(params))

    const stateListener = debounce(state => {
      // console.log('App', state)
      storage(`excel:${params}`, state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    // console.log('afterRender:')
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
