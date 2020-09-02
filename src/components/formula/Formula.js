import { ExcelComponent } from '../../core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel-formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options
    })
  }

  toHTML(selector) {
    selector.innerHTML = `
      <div class="excel-formula__info">fx</div>
      <div class="excel-formula__input" contenteditable spellcheck="false"></div>
    `
    return selector
  }

  onInput() {
    const text = event.target.textContent.trim()
    this.emitter.emit('it is working', text)
  }
}

