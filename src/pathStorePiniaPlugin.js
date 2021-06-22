import { createPathStoreMethods } from './methods'

export const pathStorePiniaPlugin = (ctx) =>
  Object.assign((ctx.store.actions = ctx.store.actions || {}), createPathStoreMethods())
