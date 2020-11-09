const storage = {}

module.exports = {
  get: async key => new Promise(resolve => resolve(storage[key])),
  store: async (key, item) => new Promise(resolve => resolve((storage[key] = item)))
}
