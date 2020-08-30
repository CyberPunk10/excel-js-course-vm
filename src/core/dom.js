class Dom {
  constructor(selector) {
    // #app || node-узел
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this // for chain (для чейна)
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, fn) {
    this.$el.addEventListener(eventType, fn)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return el
}

// принимает ячейку, возвращает объект, в котром укзано местоположение ячейки (row && col)
$.parsedRowCol = $el => {
  const parsed = $el.dataset.rowCol.split(':')
  return {
    row: +parsed[0],
    col: +parsed[1]
  }
}
