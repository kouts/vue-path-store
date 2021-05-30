##### PathStore Vuex Plugin brings PathStore's [API](../path-store/api/) to [Vuex](https://vuex.vuejs.org/).  

All methods from PathStore's API are registered as Vuex methods that trigger 
equivalent **generic mutations**. This way you get a reduced boilerplate Vuex development experience, while still having
full visibility of Vuex mutations history in Vue Devtools.

Since Vuex modules use the root Vuex state, you can use PathStore Vuex Plugin's methods to set/get the state
of **Vuex modules** as well.

You can use **all** Vuex features as before (getters/actions/mutations etc) along with PathStore Vuex Plugin's methods.

## Vuex Methods

Here's a quick list of the methods that are added to Vuex with the PathStore Vuex Plugin.  
For more details you can refer to the [PathStore API section](../path-store/api/)

| Method                                     | Short description                                | Mutation |
|--------------------------------------------|--------------------------------------------------|----------|
| `set(path, value)` or `set(map)`           | Sets one or multiple values                      | set      |
| `get(path)`                                | Retrieves a value                                | get      |
| `toggle(path)`                             | Toggles a value to true/false                    | toggle   |
| `del(path)` or `del(array)`                | Deletes one or multiple properties               | del      |
| `pop(path)`                                | Removes and returns the last element of an array | pop      |
| `push(path, value[, ...valueN])`           | Appends elements to the end of an array          | push     |
| `reverse(path)`                            | Reverses an array                                | reverse  |
| `shift(path)`                              | Removes and returns the first element of an array| shift    |
| `sort(path[, compareFunction])`            | Sorts an array                                   | sort     |
| `splice(path, index, [removeCount[, add]])`| Removes or replaces array elements               | splice   |
| `unshift(path, value[, ...valueN])`        | Inserts elements to the beginning of an array    | unshift  |

## Installation 

### Basic

Download the repo, extract ```pathStoreVuexPlugin.min.js``` out of the ```dist/umd``` folder
and insert it in your page.

``` html
<script type="text/javascript" src="pathStoreVuexPlugin.min.js"></script>
```

### Module System

Install it via npm
```sh
npm i vue-path-store
```

Use the ```import``` statement to include it into your js
``` js
import { pathStoreVuexPlugin } from 'vue-path-store/dist/es/pathStoreVuexPlugin.js'
```

## Usage 

PathStore Vuex Plugin is registered like any other Vuex plugin.

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { pathStoreVuexPlugin } from 'vue-path-store/dist/es/pathStoreVuexPlugin.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [pathStoreVuexPlugin],
  state: {
    count: 0,
    message: ''
  },
  // You can register mutations as usual
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  store
})
```

Using it inside components
```vue
<template>
  <div>
    {{ $store.state.message }}
    <button @click="$store.set('message', 'New message')">
      Set message
    </button>
  </div>
</template>
```