import Vue from 'vue'
import Vuex from 'vuex'
import { pathStoreVuexPlugin } from '../../src/pathStoreVuexPlugin.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [pathStoreVuexPlugin],
  state: {
    todos: [
      {
        description: 'Todo 1',
        active: false,
        completed: false
      },
      {
        description: 'Todo 2',
        active: false,
        completed: false
      },
      {
        description: 'Todo 3',
        active: false,
        completed: false
      }
    ]
  }
})
