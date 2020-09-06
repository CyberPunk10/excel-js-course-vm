import { ExcelComponent } from './ExcelComponent';
// import { isEqual } from './utils';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) {
    this.state = {...initialState}
  }

  setState(newState) {
    console.log(this.state)
    console.log(newState)
    // this.state = {...this.state, ...newState}
    const key = Object.keys(newState)
    // Object.keys(this.state).forEach(key => {
    //   if (!isEqual(this.state[key], newState[key])) {
    //     this.state[key] = newState[key]
    //   }
    // })
    this.state[key] = newState[key]
    // this.$root.html(this.template)
  }
}


// Object.keys(state).forEach(key => {
//   if (!isEqual(this.prevState[key], state[key])) {
//     components.forEach(component => {
//       if (component.subscribe.includes(key)) {
//         // console.log(component.subscribe, key)
//         const changes = {[key]: state[key]}
//         component.storeChanged(changes)
//       }
//     })
//   }
// })
