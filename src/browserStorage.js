const hasLocalStorage = !!typeof (localStorage)
const storagekey = 'gradebook-ui'
export default {
  set (data) {
    if (hasLocalStorage) {
      const currentData = this.get()

      const newData = Object.assign({}, currentData || {}, data)

      localStorage.setItem(storagekey, JSON.stringify(newData))
    }
  },
  get (key) {
    const data = hasLocalStorage ? JSON.parse(localStorage.getItem(storagekey)) : null

    return key && data ? data[key] : data
  },
  clear () {
    localStorage.clear()
  }
}
