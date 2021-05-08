import Vuex from 'vuex'
import { getByPath, isArray } from './common/utils.js'
import { setOne, setMany } from './common/set.js'
import { ARRAY_METHODS } from './common/constants.js'

const createVuexPathStore = (options) => {
  const mutations = {
    set(state, info) {
      const { path, value } = info
      setMany(state, path, value)
    },
    toggle(state, info) {
      const { path } = info
      setOne(state, path, !getByPath(state, path))
    }
  }

  ARRAY_METHODS.forEach((method) => {
    mutations[method] = (state, info) => {
      const { path, args } = info
      const arr = getByPath(state, path)
      if (!isArray(arr)) {
        throw Error('Argument must be an array')
      }
      arr[method](...args)
    }
  })

  options.mutations = Object.assign({}, options.mutations || {}, mutations)

  const store = new Vuex.Store(options)

  store.set = (path, value) => {
    store.commit('set', { path, value })
  }

  store.toggle = (path) => {
    store.commit('toggle', { path })
  }

  ARRAY_METHODS.forEach((method) => {
    store[method] = (...args) => {
      const path = args.shift()
      store.commit(method, { path, args })
    }
  })

  return store
}

export { createVuexPathStore }
