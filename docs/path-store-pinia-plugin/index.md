##### PathStore Pinia Plugin brings PathStore's [API](../path-store/api/) to [Pinia](https://pinia.esm.dev/).  

All methods from PathStore's API are registered as Pinia actions.

This way you get a simplified overall Pinia development experience, while still having
basic devtools monitoring.

## Installation 

### Basic

Download the repo, extract ```pathStorePiniaPlugin.min.js``` out of the ```dist/umd``` folder
and insert it in your page.

``` html
<script type="text/javascript" src="pathStorePiniaPlugin.min.js"></script>
```

### Module System

Install it via npm
```sh
npm i vue-path-store
```

Use the ```import``` statement to include it into your js
``` js
import { pathStorePiniaPlugin } from 'vue-path-store/dist/es/pathStorePiniaPlugin.js'
```

## Usage 

PathStore Pinia Plugin is registered like any other Pinia plugin.

```js
// main.js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { PiniaPlugin, createPinia } from 'pinia'
import { pathStorePiniaPlugin } from './modules/path_store/pathStorePiniaPlugin'

Vue.use(VueCompositionApi)
Vue.use(PiniaPlugin)

const pinia = createPinia()
pinia.use(pathStorePiniaPlugin)

new Vue({
  el: '#app',
  pinia
})
```

```js
// store.js
import { defineStore } from 'pinia'

export const usePiniaStore = defineStore({
  id: 'pinia',
  state() {
    return {
      message: ''
    }
  }
})
```

Using it inside components
```vue
<template>
  <div>
    {{ $store.message }}
  </div>
  <div>
    <button @click="$store.set('message', 'New message')">
      Set message
    </button>
  </div>
</template>

<script>
import { usePiniaStore } from './store.js'

export default {
  setup() {
    const $store = usePiniaStore()

    return {
      $store
    }
  }
}
</script>

```