import { createLocalVue, enableAutoDestroy, mount } from '@vue/test-utils'
import { createPathStore } from '@/pathStore'
import { dataOf, waitNT } from '../utils'

enableAutoDestroy(afterEach)
const localVue = createLocalVue()

const TestComponent = {
  template: '<pre>{{ $ps.data }}</pre>'
}

describe('pathStore', () => {
  let wrapper

  beforeEach(() => {
    localVue.prototype.$ps = createPathStore({
      data: null
    })
    wrapper = mount(TestComponent, {
      localVue
    })
  })

  it('sets a string', async () => {
    wrapper.vm.$ps.set('data', 'Test')
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

    wrapper.vm.$ps.set('data', obj)
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

    wrapper.vm.$ps.set('data', obj)
    wrapper.vm.$ps.set('data.bar.str', 'Updated')
    await waitNT(wrapper.vm)
    const data = dataOf(wrapper)

    expect(data.bar.str).toBe('Updated')
  })

  it('pops an array element', async () => {
    const arr = [1, 2, 3, 4]

    wrapper.vm.$ps.set('data', arr)
    wrapper.vm.$ps.pop('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3])
  })

  it('pushes an element into an array', async () => {
    const arr = [1, 2, 3]

    wrapper.vm.$ps.set('data', arr)
    wrapper.vm.$ps.push('data', 4)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })

  it('reverses an an array', async () => {
    const arr = [1, 2, 3]

    wrapper.vm.$ps.set('data', arr)
    wrapper.vm.$ps.reverse('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([3, 2, 1])
  })

  it('removes the first element of an array', async () => {
    const arr = [1, 2, 3, 4]

    wrapper.vm.$ps.set('data', arr)
    wrapper.vm.$ps.shift('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([2, 3, 4])
  })

  it('sorts an array', async () => {
    const arr = [2, 4, 1, 3]

    wrapper.vm.$ps.set('data', arr)
    wrapper.vm.$ps.sort('data')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })

  it('splices an array', async () => {
    const arr = [1, 2, 3, 4]

    wrapper.vm.$ps.set('data', arr)
    wrapper.vm.$ps.splice('data', 0, 2)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([3, 4])
  })

  it('adds elements to the beginning of an array', async () => {
    const arr = [3, 4]

    wrapper.vm.$ps.set('data', arr)
    wrapper.vm.$ps.unshift('data', 1, 2)
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toEqual([1, 2, 3, 4])
  })
})
