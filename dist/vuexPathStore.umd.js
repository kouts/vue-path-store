!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("vuex"),require("vue")):"function"==typeof define&&define.amd?define(["exports","vuex","vue"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).vuexPathStore={},t.Vuex,t.Vue)}(this,(function(t,e,r){"use strict";function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var o=n(e),u=n(r);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t){return!isNaN(t)&&!isNaN(parseFloat(t))}function c(t){return Array.isArray(t)}function l(t){for(var e,r=/(\w+)|\[([^\]]+)\]/g,n=[];e=r.exec(t||"");)"["===t[e.index]?n.push(e[2]):n.push(e[1]);return n}function p(t,e){for(var r=l(e),n=r.length,o=0;o<n;o++){if(void 0===t[r[o]])return;t=t[r[o]]}return t}var y=function(t,e,r){for(var n=l(e),o=n.length,a=o-1,f=0;f<o;f++){var p=n[f];if(f!==a){var y=t[p];y&&"object"===i(y)?(y.hasOwnProperty("__ob__")||u.default.set(t,p,y),c(y)&&!s(n[f+1])&&u.default.set(t,p,{})):s(n[f+1])?u.default.set(t,p,[]):u.default.set(t,p,{})}else u.default.set(t,p,r);t=t[p]}},m=function(t,e,r){if("string"==typeof e)y(t,e,r);else{if(!function(t){return"object"===i(t)&&!Array.isArray(t)&&null!==t}(e))throw Error("Arguments must be either string or object.");for(var n in e)y(t,n,e[n])}},h=["pop","push","reverse","shift","sort","splice","unshift"];t.createVuexPathStore=function(t){var e={set:function(t,e){var r=e.path,n=e.value;m(t,r,n)},toggle:function(t,e){var r=e.path;y(t,r,!p(t,r))}};h.forEach((function(t){e[t]=function(e,r){var n=r.path,o=r.args,u=p(e,n);if(!c(u))throw Error("Argument must be an array");u[t].apply(u,a(o))}})),t.mutations=Object.assign({},t.mutations||{},e);var r=new o.default.Store(t);return r.set=function(t,e){r.commit("set",{path:t,value:e})},r.toggle=function(t){r.commit("toggle",{path:t})},h.forEach((function(t){r[t]=function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];var u=n.shift();r.commit(t,{path:u,args:n})}})),r},Object.defineProperty(t,"__esModule",{value:!0})}));
