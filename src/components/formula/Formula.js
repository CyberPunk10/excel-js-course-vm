import { ExcelComponent } from '../../core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel-formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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
    const target = event.target
    // eslint-disable-next-line max-len
    const text = target.tagName === 'INPUT' ? target.value.trim() : target.textContent.trim()

    this.$emit('Formula:input', text)
  }

  onKeydown() {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('Formula:done')
    }
  }
}

