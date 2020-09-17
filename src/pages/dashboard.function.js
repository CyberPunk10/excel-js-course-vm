function toHTML() {
  return `
    <li class="db__record"><a href="#">Таблица номер 1</a><strong>23.08.20</strong></li>
  
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
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }

  return `
    <div class="db__table">
      <div class="db__list-header"><span>Название</span><span>Дата открытия</span></div>
      <ul class="db__list">
        ${ keys.map(toHTML).join('') }
      </ul>
    </div>
  `
}
