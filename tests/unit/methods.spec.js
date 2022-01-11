import { createPathStoreMethods } from '@/methods.js'
import { ARRAY_METHODS } from '@/constants'

describe('methods', () => {
  it.each(ARRAY_METHODS)('should fail when an the %s method is not called with an array argument', (method) => {
    const methods = createPathStoreMethods()
    const test = () => {
      methods[method]('test')
    }
    expect(test).toThrow('Argument must be an array.')
  })

  it.each(ARRAY_METHODS)('should call the %s method on the array', (method) => {
    const methods = createPathStoreMethods()
    methods.arr = [1, 2, 3]
    const arr = [1, 2, 3]
    let expectedRes = []

    if (method === 'push') {
      methods[method]('arr', 4)
      arr[method](4)
    } else {
      methods[method]('arr')
      arr[method]()
    }
    expectedRes = arr

    expect(methods.arr).toEqual(expectedRes)
  })
})
