import { Page } from '../core/Page'
import { $ } from '@core/dom'

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').innerHTML = `
      <div class="db">
        <div class="db__header">
          <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, tempora!</h1>
        </div>
        <div class="db__new">
          <div class="db__view"><a class="db__create" href="#">Новая таблица</a></div>
        </div>
        <div class="db__table">
          <div class="db__list-header"><span>Название</span><span>Дата открытия</span></div>
          <ul class="db__list">
            <li class="db__record"><a href="#">Таблица номер 1</a><strong>23.08.20</strong></li>
            <li class="db__record"><a href="#">Таблица номер 1</a><strong>23.08.20</strong></li>
            <li class="db__record"><a href="#">Таблица номер 1</a><strong>23.08.20</strong></li>
            <li class="db__record"><a href="#">Таблица номер 1</a><strong>23.08.20</strong></li>
          </ul>
        </div>
      </div>
    `
  }
}
