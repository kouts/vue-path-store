import { waitNT, dataOf } from '../utils'
import { createLocalVue, mount, enableAutoDestroy } from '@vue/test-utils'
import { ARRAY_METHODS } from '@/constants'
import Vuex from 'vuex'
import { pathStoreVuexPlugin } from '@/pathStoreVuexPlugin'

enableAutoDestroy(afterEach)
const localVue = createLocalVue()
localVue.use(Vuex)

const TestComponent = {
  template: '<pre>{{ $store.state.data }}</pre>'
}

describe('pathStoreVuexPlugin', () => {
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      plugins: [pathStoreVuexPlugin]
    })
    wrapper = mount(TestComponent, { store, localVue })
  })

  it('sets a string', async () => {
    wrapper.vm.$store.set('data', 'Test')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toBe('Test')
  })

  it('sets an object', async () => {
    const obj = {
      foo: {
        bar: {
          str: 'test',
          num: 10
        }
      }
    }
    wrapper.vm.$store.set('data', obj)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual(obj)
  })

  it('updates an object', async () => {
    const obj = {
      foo: {
        bar: {
          str: 'test',
          num: 10
        }
      }
    }
    wrapper.vm.$store.set('data', obj)
    wrapper.vm.$store.set('data.bar.str', 'Updated')
    await waitNT(wrapper.vm)
    const data = dataOf(wrapper)
    expect(data.bar.str).toBe('Updated')
  })

  it('pops an array element', async () => {
    const arr = [1, 2, 3, 4]
    wrapper.vm.$store.set('data', arr)
    wrapper.vm.$store.pop('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3])
  })

  it('pushes an element into an array', async () => {
    const arr = [1, 2, 3]
    wrapper.vm.$store.set('data', arr)
    wrapper.vm.$store.push('data', 4)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })

  it('reverses an an array', async () => {
    const arr = [1, 2, 3]
    wrapper.vm.$store.set('data', arr)
    wrapper.vm.$store.reverse('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([3, 2, 1])
  })

  it('removes the first element of an array', async () => {
    const arr = [1, 2, 3, 4]
    wrapper.vm.$store.set('data', arr)
    wrapper.vm.$store.shift('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([2, 3, 4])
  })

  it('sorts an array', async () => {
    const arr = [2, 4, 1, 3]
    wrapper.vm.$store.set('data', arr)
    wrapper.vm.$store.sort('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })

  it('splices an array', async () => {
    const arr = [1, 2, 3, 4]
    wrapper.vm.$store.set('data', arr)
    wrapper.vm.$store.splice('data', 0, 2)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([3, 4])
  })

  it('adds elements to the beginning of an array', async () => {
    const arr = [3, 4]
    wrapper.vm.$store.set('data', arr)
    wrapper.vm.$store.unshift('data', 1, 2)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })

  it('toggles a value on the given path', async () => {
    wrapper.vm.$store.set('data', true)
    wrapper.vm.$store.toggle('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual(false)
  })

  it('gets a value on the given path', async () => {
    const obj = { foo: { bar: { baz: 'test' } } }
    wrapper.vm.$store.set('data', obj)
    const res = wrapper.vm.$store.get('data.foo')
    await waitNT(wrapper.vm)

    expect(res).toEqual(obj.foo)
  })

  it('returns the whole object when no path is given', async () => {
    const obj = { foo: { bar: { baz: 'test' } } }
    wrapper.vm.$store.set('data', obj)
    const res = wrapper.vm.$store.get()
    await waitNT(wrapper.vm)

    expect(res).toEqual({ data: obj })
  })

  it('deletes the value on the given path', async () => {
    const obj = { foo: { bar: { baz: 'test' } } }
    wrapper.vm.$store.set('data', obj)
    wrapper.vm.$store.del('data.foo.bar')
    await waitNT(wrapper.vm)

    expect(dataOf(wrapper)).toEqual({ foo: {} })
  })

  it.each(ARRAY_METHODS)('should throw an error when the %s method is not called with an array argument', async (method) => {
    const test = () => {
      wrapper.vm.$store[method]('test')
    }
    await waitNT(wrapper.vm)

    expect(test).toThrow('Argument must be an array.')
  })
})
