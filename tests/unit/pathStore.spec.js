import { waitNT, dataOf } from '../utils'
import { createLocalVue, mount, enableAutoDestroy } from '@vue/test-utils'
import { createPathStore } from '@/pathStore'

enableAutoDestroy(afterEach)
const localVue = createLocalVue()

const TestComponent = {
  template: '<pre>{{ $s.data }}</pre>'
}

describe('pathStore', () => {
  let wrapper

  beforeEach(() => {
    localVue.prototype.$s = createPathStore({
      data: null
    })
    wrapper = mount(TestComponent, {
      localVue
    })
  })

  it('sets a string', async () => {
    wrapper.vm.$s.set('data', 'Test')
    await waitNT(wrapper.vm)
    expect(dataOf(wrapper)).toBe('Test')
  })
})
