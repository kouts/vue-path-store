PathStore Vuex Plugin brings PathStore's [API](../path-store/api/) to Vuex.  
All methods from PathStore's API are registered as Vuex methods that trigger 
equivalent mutations.

This way you get a simplified overall Vuex development experience, while still having
devtools monitoring.

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
  </div>
  <div>
    <button @click="$store.set('state.message', 'New message')">
      Set message
    </button>
  </div>
</template>
```