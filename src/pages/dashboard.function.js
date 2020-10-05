import { storage } from '../core/utils'

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]

  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.titleTable}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleTimeString()}
        ${new Date(model.openedDate).toLocaleDateString()}
      </strong>
    </li>
  
  `
}

export function getAllRecords() {
  return toHTML()
}

// excel:41234343511 (id таблицы)
function getAllKeys() {
  const keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (!key.includes('excel')) {
      continue
    }

    keys.push(key)
  }

  return keys
}

export function createTableRecords() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p class="text-align-center">Вы пока не создали ни одной таблицы.</p>`
  }

  return `
    <div class="db__list-header"><span>Название</span><span>Дата открытия</span></div>
    <ul class="db__list">
      ${ keys.map(toHTML).join('') }
    </ul>
  `
}
