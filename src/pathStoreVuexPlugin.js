import { setOne, setMany, deleteMany } from 'vue-set-path'
import { getByPath, isArray } from 'vue-set-path/dist/es/utils'
import { ARRAY_METHODS } from './constants.js'

const pathStoreVuexPlugin = (store) => {
  const methods = {
    set(path, value) {
      store.commit('set', { path, value })
    },
    toggle(path) {
      store.commit('toggle', { path })
    },
    get(path) {
      return path ? getByPath(store.state, path) : store.state
    },
    del(path) {
      store.commit('del', { path })
    },
    ...ARRAY_METHODS.reduce((acc, method) => {
      const fn = (...args) => {
        const path = args.shift()
        return store.commit(method, { path, args })
      }
      return Object.assign(acc, { [method]: fn })
    }, {})
  }

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
    },
    ...ARRAY_METHODS.reduce((acc, method) => {
      const fn = (state, info) => {
        const { path, args } = info
        const arr = getByPath(state, path)
        if (!isArray(arr)) {
          throw Error('Argument must be an array.')
        }
        return arr[method](...args)
      }
      return Object.assign(acc, { [method]: fn })
    }, {})
  }

  for (const type in mutations) {
    const entry = store._mutations[type] || (store._mutations[type] = [])
    entry.push(function wrappedMutationHandler(payload) {
      mutations[type].call(store, store.state, payload)
    })
  }

  return Object.assign(store, methods)
}

export { pathStoreVuexPlugin }
