export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new ErrorEvent('No $root provided for DomListener')
    }
    this.$root = $root
  }
}
