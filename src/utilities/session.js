export default {
  store: (key, item) => {
    return new Promise((resolve, reject) => {
      try {
        const storable = { [key]: item }

        chrome.storage.sync.set(storable, function() {
          console.log('stored', storable)

          resolve(true)
        })
      } catch (e) {
        reject(e)
      }
    })
  },

  get: key => {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, function(item) {
          console.log('fetched', key)
          console.log('returned', item[key])

          const returnable = unserialize(item[key])

          resolve(returnable)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

const unserialize = s => {
  const json = isJSON(s)

  return json ?? s
}

const isJSON = s => {
  try {
    return JSON.parse(s)
  } catch (e) {
    return false
  }
}
