import { Page } from '../core/Page'
import { $ } from '@core/dom'
import { createTableRecords } from './dashboard.function'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()

    const $root = $.create('div', 'dashboard')
    $root.innerHTML = `
      <div class="db">
        <div class="db__header">
          <h1>Таблицы</h1>
        </div>
        <div class="db__new">
          <div class="db__view"><a class="db__create" href="#excel/${now}">Новая таблица</a></div>
        </div>
        <div class="db__table">
          ${ createTableRecords() }
        </div>
      </div>
    `
    return $root
  }
}
