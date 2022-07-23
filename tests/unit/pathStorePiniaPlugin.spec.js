import { PiniaVuePlugin, createPinia, defineStore, mapStores } from 'pinia'
import { createLocalVue, enableAutoDestroy, mount } from '@vue/test-utils'
import { dataOf, waitNT } from '../utils'
import { pathStorePiniaPlugin } from '@/pathStorePiniaPlugin'

enableAutoDestroy(afterEach)

const localVue = createLocalVue()

localVue.use(PiniaVuePlugin)

const pinia = createPinia()

pinia.use(pathStorePiniaPlugin)

const createTestComponent = (useTestStore) => ({
  template: '<pre>{{ testStore.data }}</pre>',
  computed: {
    ...mapStores(useTestStore)
  }
})

describe('pathStorePiniaPlugin', () => {
  let useTestStore
  let wrapper

  beforeEach(() => {
    useTestStore = defineStore({
      id: 'test',
      state() {
        return {
          data: null
        }
      }
    })
    const TestComponent = createTestComponent(useTestStore)

    wrapper = mount(TestComponent, { pinia, localVue })
  })

  it('sets a string', async () => {
    wrapper.vm.testStore.set('data', 'Test')
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

    wrapper.vm.testStore.set('data', obj)
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

    wrapper.vm.testStore.set('data', obj)
    wrapper.vm.testStore.set('data.bar.str', 'Updated')
    await waitNT(wrapper.vm)
    const data = dataOf(wrapper)

    expect(data.bar.str).toBe('Updated')
  })

  it('pops an array element', async () => {
    const arr = [1, 2, 3, 4]

    wrapper.vm.testStore.set('data', arr)
    wrapper.vm.testStore.pop('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3])
  })

  it('pushes an element into an array', async () => {
    const arr = [1, 2, 3]

    wrapper.vm.testStore.set('data', arr)
    wrapper.vm.testStore.push('data', 4)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })

  it('reverses an an array', async () => {
    const arr = [1, 2, 3]

    wrapper.vm.testStore.set('data', arr)
    wrapper.vm.testStore.reverse('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([3, 2, 1])
  })

  it('removes the first element of an array', async () => {
    const arr = [1, 2, 3, 4]

    wrapper.vm.testStore.set('data', arr)
    wrapper.vm.testStore.shift('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([2, 3, 4])
  })

  it('sorts an array', async () => {
    const arr = [2, 4, 1, 3]

    wrapper.vm.testStore.set('data', arr)
    wrapper.vm.testStore.sort('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })

  it('splices an array', async () => {
    const arr = [1, 2, 3, 4]

    wrapper.vm.testStore.set('data', arr)
    wrapper.vm.testStore.splice('data', 0, 2)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([3, 4])
  })

  it('adds elements to the beginning of an array', async () => {
    const arr = [3, 4]

    wrapper.vm.testStore.set('data', arr)
    wrapper.vm.testStore.unshift('data', 1, 2)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })
})
