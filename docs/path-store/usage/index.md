## Object API

Since PathStore is just an object, you can share it as any other object in Vue.  
You can use `Vue.prototype`, a `mixin`, `provide/inject`, `import/export` etc.

### Sharing the store via the `Vue.prototype`

In the app's entry point (e.g `main.js`)
```js
import Vue from 'vue'
import { createPathStore } from 'vue-path-store'

// Initialize the store and provide it to all components
Vue.prototype.$ps = createPathStore({
  state: {
    message: 'Hello world'
  }
})
```

Using it inside components
```vue
<template>
  <div>
    {{ $ps.state.message }}
    <button @click="$ps.set('state.message', 'New message')">
      Set message
    </button>
  </div>
</template>
```

### Sharing the store with `import/export`

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

Import it inside components
```vue
<template>
  <div>
    {{ store.state.message }}
    <button @click="store.set('state.message', 'New message')">
      Set message
    </button>
  </div>
</template>

<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  } 
}
</script>

```

## Composition API

You can use PathStore with the Vue [composition-api](https://github.com/vuejs/composition-api) with just `import/export`
or using a composable function.

### Sharing the store with a composable function

Create the store in a separate file (e.g `useStore.js`)
```js
import { createPathStore } from 'vue-path-store'

const store = createPathStore({
  state: {
    message: 'Hello world!'
  }
})

const useStore = () => store

export { useStore }

```

Import it inside components
```vue
<template>
  <div>
    {{ store.state.message }}
    <button @click="store.set('state.message', 'New message')">
      Set message
    </button>
  </div>
</template>

<script>
import { useStore } from './useStore.js'

export default {
  setup() {
    const store = useStore()

    return {
      store
    }
  }
}
</script>

```