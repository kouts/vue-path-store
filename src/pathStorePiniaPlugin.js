import { createPathStoreMethods } from './methods'

export const pathStorePiniaPlugin = ({ store }) => {
  const methods = createPathStoreMethods()

  Object.assign(store, methods)
}
