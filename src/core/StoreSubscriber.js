import { isEqual } from './utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    // получаем состояние
    this.prevState = this.store.getState()

    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.subscribe.includes(key)) {
              // console.log(component.subscribe, key)
              const changes = {[key]: state[key]}
              component.storeChanged(changes)
            }
          })
        }
      })
      // обновляем состояние, после изменения
      this.prevState = this.store.getState()
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}
