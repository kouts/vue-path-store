# vue-path-store

PathStore is a lightweight **shared** state management solution for Vue.  
At its heart lays a simple reactive store, which uses the dot notation path syntax for data mutation.  

It also comes with a **Vuex plugin** flavor so that you can use dot notation along with the
full power of Vuex (actions, getters, modules, devtools) as well.

## Features
- Share state easily between components using either the object or composition API
- Use dot (or bracket) notation for mutating state (set, delete)
- Creates intermediate reactive object/array structures if not available while setting state
- Avoid Vue [change detection caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
- Extra methods for `Array` manipulation
- Combine Vuex and dot notation by utilizing the PathStore Vuex Plugin

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## Quick shared state example

```js
import Vue from 'vue'
import { createPathStore } from 'vue-path-store'

// Initialize the store and provide it to all components
Vue.prototype.$s = createPathStore({
  state: {}
})

```

**Component 1**
<vue-example file="Intro/Intro1" class="mt-1 mb-2" />

**Component 2**
<vue-example file="Intro/Intro2" class="mt-1" />