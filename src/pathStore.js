import Vue from 'vue'
import { getByPath, isArray } from './utils'
import { setOne, setMany } from './set.js'
import { ARRAY_METHODS } from './constants.js'

const createPathStore = (state) => {
  const store = Vue.observable(state)

  store.set = (path, value) => {
    setMany(store, path, value)
  }

  store.toggle = (path) => {
    setOne(store, path, !getByPath(store, path))
  }

  store.get = (path) => {
    return path ? getByPath(store, path) : store
  }

  ARRAY_METHODS.forEach((method) => {
    store[method] = (...args) => {
      const path = args.shift()
      const arr = getByPath(store, path)
      if (!isArray(arr)) {
        throw Error('Argument must be an array.')
      }
      arr[method](...args)
    }
  })

  return store
}

export { createPathStore }
