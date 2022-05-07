import { ARRAY_METHODS } from './constants.js'
import { deleteMany, setMany, setOne } from 'vue-set-path'
import { getByPath, isArray } from 'vue-set-path/dist/es/utils'

export function createPathStoreMethods() {
  return {
    set(path, value) {
      setMany(this, path, value)
    },
    toggle(path) {
      setOne(this, path, !getByPath(this, path))
    },
    get(path) {
      return path ? getByPath(this, path) : this
    },
    del(path) {
      deleteMany(this, path)
    },
    ...ARRAY_METHODS.reduce(function (acc, method) {
      const fn = function (...args) {
        const path = args.shift()
        const arr = getByPath(this, path)

        if (!isArray(arr)) {
          throw Error('Argument must be an array.')
        }

        return arr[method](...args)
      }

      return Object.assign(acc, { [method]: fn })
    }, {})
  }
}
