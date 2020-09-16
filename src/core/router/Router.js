import { ActiveRouter } from './ActiveRouter'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = selector
    this.routes = routes

    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    const currentRoute = ActiveRouter.path
    console.log(currentRoute)

    const $el = document.querySelector(this.$placeholder)
    const Page = this.routes.excel
    const page = new Page()

    $el.append(page.getRoot())
    // $el.innerHTML = page.getRoot()

    page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
