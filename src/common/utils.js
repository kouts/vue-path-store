export function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}

export function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str))
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function splitPath(str) {
  const regex = /(\w+)|\[([^\]]+)\]/g
  const result = []
  let path

  while ((path = regex.exec(str || ''))) {
    if (str[path.index] === '[') {
      result.push(path[2])
    } else {
      result.push(path[1])
    }
  }

  return result
}

export function getByPath(obj, path) {
  const parts = splitPath(path)
  const length = parts.length
  for (let i = 0; i < length; i++) {
    if (typeof obj[parts[i]] === 'undefined') {
      return undefined
    }
    obj = obj[parts[i]]
  }
  return obj
}
