import Vue from 'vue'
import { isNumeric, isArray, isObject, splitPath } from './utils.js'

export const setOne = (obj, pathStr, value) => {
  const path = splitPath(pathStr)
  const length = path.length
  const lastIndex = length - 1

  for (let index = 0; index < length; index++) {
    const prop = path[index]
    // If we are not on the last index
    // we start building the data object from the path
    if (index !== lastIndex) {
      const objValue = obj[prop]
      // If objValue exists, is not primitive and is not observable, then make it so using Vue.set
      if (objValue && typeof objValue === 'object') {
        // eslint-disable-next-line no-prototype-builtins
        if (!objValue.hasOwnProperty('__ob__')) {
          Vue.set(obj, prop, objValue)
        }
        // Array to object transformation
        // Check if parent path is an array, we are not on the last item
        // and the next key in the path is not a number
        if (isArray(objValue) && !isNumeric(path[index + 1])) {
          Vue.set(obj, prop, {})
        }
      } else {
        // Create an empty object or an empty array based on the next path entry
        if (isNumeric(path[index + 1])) {
          Vue.set(obj, prop, [])
        } else {
          Vue.set(obj, prop, {})
        }
      }
    } else {
      // If we are on the last index then we just assign the the value to the data object
      // Note: If we used obj[prop] = value; arrays wouldn't be updated.
      Vue.set(obj, prop, value)
    }
    obj = obj[prop]
  }
}

export const setMany = (obj, path, value) => {
  if (typeof path === 'string') {
    setOne(obj, path, value)
  } else if (isObject(path)) {
    for (const key in path) {
      setOne(obj, key, path[key])
    }
  } else {
    throw Error('Arguments must be either string or object.')
  }
}
