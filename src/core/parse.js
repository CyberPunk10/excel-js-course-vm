export function parse(value = '') {
  if (value.startsWith('=')) {
    if (value == '=') {
      return value
    }
    try {
      return eval(value.slice(1))
    } catch (error) {
      return value
    }
  }
  return value
}
