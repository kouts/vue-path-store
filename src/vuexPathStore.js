import Vuex from 'vuex'
import { setOne, setMany, deleteMany } from 'vue-set-path'
import { getByPath, isArray } from 'vue-set-path/dist/es/utils'
import { ARRAY_METHODS } from './constants.js'

const createVuexPathStore = (options) => {
  const mutations = {
    set(state, info) {
      const { path, value } = info
      setMany(state, path, value)
    },
    toggle(state, info) {
      const { path } = info
      setOne(state, path, !getByPath(state, path))
    },
    del(state, info) {
      const { path } = info
      deleteMany(state, path)
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

  store.get = (path) => {
    return path ? getByPath(store.state, path) : store.state
  }

  store.del = (path) => {
    store.commit('delete', { path })
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
