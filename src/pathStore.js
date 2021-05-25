import Vue from 'vue'
import { createPathStoreMethods } from './methods'

export const createPathStore = (state) => Object.assign(Vue.observable(state), createPathStoreMethods())