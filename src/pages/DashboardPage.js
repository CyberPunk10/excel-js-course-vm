import { Page } from '../core/Page'
import { $ } from '@core/dom'
import { getAllRecords } from './dashboard.function'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()

    const $root = $.create('div', 'dashboard')
    $root.innerHTML = `
      <div class="db">
        <div class="db__header">
          <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, tempora!</h1>
        </div>
        <div class="db__new">
          <div class="db__view"><a class="db__create" href="#excel/${now}">Новая таблица</a></div>
        </div>
        <div class="db__table">
          <div class="db__list-header"><span>Название</span><span>Дата открытия</span></div>
          <ul class="db__list">
            ${ getAllRecords() }
          </ul>
        </div>
      </div>
    `
    return $root
  }
}
