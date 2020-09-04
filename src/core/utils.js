// pure function

export function firstLetterUpperCase(string) {
  return string[0].toUpperCase() + string.slice(1)
}

// create array заполненный от start до end (if (start: 2, end: 5) то получим [2,3,4,5])
export function range(start, end) {
  const lengthArr = (start <= end) ? end - start + 1 : start - end + 1
  const firstNum = (start <= end) ? start : end
  return new Array(lengthArr) // в скобках задаем длину массива
      .fill('')
      .map( (_, index) => firstNum + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}
