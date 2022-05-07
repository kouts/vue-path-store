import { ARRAY_METHODS } from '@/constants'
import { createPathStoreMethods } from '@/methods.js'

describe('methods', () => {
  it.each(ARRAY_METHODS)('should fail when the %s method is not called with an array argument', (method) => {
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

  it('sets a value on the given path', () => {
    const methods = createPathStoreMethods()

    methods.state = { key: 'value' }
    methods.set('state.key', 'value test')

    expect(methods.state).toEqual({ key: 'value test' })
  })

  it('toggles a value on the given path', () => {
    const methods = createPathStoreMethods()

    methods.state = { key: true }
    methods.toggle('state.key')

    expect(methods.state).toEqual({ key: false })
  })

  it('gets a value on the given path', () => {
    const methods = createPathStoreMethods()

    methods.state = { key: { sub: 'value' } }
    const res = methods.get('state.key.sub')

    expect(res).toEqual('value')
  })

  it('returns the whole object when no path is given', () => {
    const methods = createPathStoreMethods()

    methods.state = { key: { sub: 'value' } }
    const res = methods.get()

    expect(res).toEqual(methods)
  })

  it('deletes the value on the given path', () => {
    const methods = createPathStoreMethods()

    methods.state = { key: { sub: 'value' } }
    methods.del('state.key.sub')

    expect(methods.state).toEqual({ key: {} })
  })
})
