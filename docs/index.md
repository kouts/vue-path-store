# vue-path-store

`vue-path-store` is a lightweight **shared** state management solution for Vue.  
At it's heart lays a simple reactive store, that uses the dot notation path syntax for data mutation.  

It also comes with a **Vuex plugin** flavor so that you can use dot notation along with the
full power of Vuex (actions, getters, modules) as well.

#### Quick shared state example

```js
import Vue from 'vue
import { createPathStore } from 'vue-path-store'

// Initialize vue-path-store and provide it to all components
Vue.prototype.$s = createPathStore({
  state: {}
})

```

**Component 1**
<vue-example file="Intro/Intro1" class="mt-1 mb-2" />

**Component 2**
<vue-example file="Intro/Intro2" class="mt-1" />