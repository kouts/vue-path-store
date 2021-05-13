import Vue from 'vue'
import { getByPath, isArray } from 'vue-set-path/dist/es/utils'
import { setOne, setMany, deleteMany } from 'vue-set-path'
import { ARRAY_METHODS } from './constants.js'

const createPathStore = (state) => {
  const store = Vue.observable(state)

  const methods = {
    set(path, value) {
      setMany(store, path, value)
    },
    toggle(path) {
      setOne(store, path, !getByPath(store, path))
    },
    get(path) {
      return path ? getByPath(store, path) : store
    },
    del(path) {
      deleteMany(store, path)
    }
  }

  const arrayMethods = ARRAY_METHODS.reduce((acc, method) => {
    const fn = (...args) => {
      const path = args.shift()
      const arr = getByPath(store, path)
      if (!isArray(arr)) {
        throw Error('Argument must be an array.')
      }
      arr[method](...args)
    }
    return Object.assign(acc, { [method]: fn })
  }, {})

  return Object.assign(store, methods, arrayMethods)
}

export { createPathStore }
