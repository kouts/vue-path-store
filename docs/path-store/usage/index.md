## Object API

### Sharing the store via the `Vue.prototype`

In the app's entry point (e.g `main.js`)
```js
import Vue from 'vue
import { createPathStore } from 'vue-path-store'

// Initialize the store and provide it to all components
Vue.prototype.$s = createPathStore({
  state: {
    message: 'Hello world'
  }
})
```

Inside components
```vue
<template>
  <div>
    {{ $s.state.message }}
  </div>
  <div>
    <button @click="$s.set('state.message', 'New message')">
      Set message
    </button>
  </div>
</template>
```

### Sharing the store with `import` - `export`

Create the store in a separate file (e.g `store.js`)
```js
import { createPathStore } from 'vue-path-store'

// Initialize the store and export it
export const store = createPathStore({
  state: {
    message: 'Hello world'
  }
})
```

Inside components
```vue
<template>
  <div>
    {{ $s.state.message }}
  </div>
  <div>
    <button @click="$s.set('state.message', 'New message')">
      Set message
    </button>
  </div>
</template>

<script>
import { store } from './store.js'

export default {
  computed: {
    $s: () => store
  }
}
</script>

```