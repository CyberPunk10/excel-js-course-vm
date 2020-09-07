import { ExcelComponent } from './ExcelComponent';
// import { isEqual } from './utils';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    // console.log(JSON.stringify(this.state, null, 2))
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) {
    this.state = {...initialState}
  }

  setState(newState) {
    // console.log(this.$root)
    this.state = {...this.state, ...newState}
    this.$root.innerHTML = this.template
  }
}
