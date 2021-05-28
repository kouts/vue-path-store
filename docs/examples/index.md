## Todo using [PathStore Vuex Plugin](../path-store-vuex-plugin/)

A Todo example using two components that access the same shared state.  
While playing with the example, check the Vuex tab of Vue devtools.

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { pathStoreVuexPlugin } from 'vue-path-store/dist/es/pathStoreVuexPlugin.js'

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
```

The components that access the shared state.  

<vue-example title="TodoInput Component" file="Todo/TodoInput" class="mt-1 mb-2" />
<vue-example title="TodoList Component" file="Todo/TodoList" class="mt-1 mb-2" />
