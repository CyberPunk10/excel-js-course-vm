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

  init() {
    super.init()
    this.$formula = this.$root.querySelector('.excel-formula__input')

    this.$on('Table:select', $cell => {
      // необходима проверка на тег (если input, то менять textContent на value)
      this.$formula.textContent = $cell.textContent
    })

    // this.$on('Table:input', $cell => {
    //   this.$formula.textContent = $cell.textContent
    // })

    this.$subscribe( state => {
      console.log('Formula', state)
      this.$formula.textContent = state.currentText
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
    const key = ['Enter', 'Tab']
    if (key.includes(event.key)) {
      event.preventDefault()
      this.$emit('Formula:done')
    }
  }
}

