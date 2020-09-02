export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей, если они есть
  // formula.emit('table:select', {a: value})
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false // если не массив, то ничего не делаем
    } else {
      this.listeners[eventName].forEach(listener => {
        listener(...args)
      })
    }
  }

  // on, listen
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [] // если в него ещё ничего не добавлено, то пустой массив
    this.listeners[eventName].push(fn)
    return () => {
      this.listeners[eventName] =
        this.listeners[eventName].filter(listener => listener !== fn)
    }
  }
}

// Example
// const emitter = new Emitter()

// emitter.subscribe('vladilen', data => console.log('Sub: ', data))

// emitter.emit('vladilen', 42)
