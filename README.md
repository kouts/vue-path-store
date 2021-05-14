# vue-path-store <a href="https://npm.im/vue-path-store"><img src="https://badgen.net/npm/v/vue-path-store"></a> ![](https://img.badgesize.io/kouts/vue-path-store/main/dist/umd/pathStore.min.js.svg) ![](https://img.badgesize.io/kouts/vue-path-store/main/dist/umd/pathStore.min.js.svg?compression=gzip)

`vue-path-store` is a lightweight shared state management solution for Vue.
At it's heart lays a simple reactive store, that uses the dot notation path syntax for data mutation.  

It also comes with a Vuex plugin flavor so that you can use the dot notation to mutate state in Vuex.


## Install
```sh
npm install vue-path-store
```

## Example use of standalone

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import { createVuePathStore } from 'vue-path-store'

// Initialize pathStore
const store = createPathStore({
  message: 'Initial message'
})

// Provide pathStore to all Vue components
Vue.prototype.$s = store

new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <div>
      {{ $s.message }}
    </div>
    <button type="button" @click="$s.set('message', 'Hello world!')">
  </div>
</template>
```

## Example use of Vuex plugin

```js
// main.js
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { pathStoreVuexPlugin } from 'vue-path-store/dist/es/pathStoreVuexPlugin'

// Initialize Vuex with the pathStoreVuexPlugin
const store = createPathStore({
  plugins: [pathStoreVuexPlugin]
  state: {
    message: 'Initial message'
  }
})

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <div>
      {{ $store.state.message }}
    </div>
    <button type="button" @click="$store.set('message', 'Hello world!')">
  </div>
</template>
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions