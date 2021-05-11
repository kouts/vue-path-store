'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Vuex = require('vuex');
var Vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vuex__default = /*#__PURE__*/_interopDefaultLegacy(Vuex);
var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function isObject(obj) {
  return _typeof(obj) === 'object' && !Array.isArray(obj) && obj !== null;
}

function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function isArray(arr) {
  return Array.isArray(arr);
}

function splitPath(str) {
  var regex = /(\w+)|\[([^\]]+)\]/g;
  var result = [];
  var path;

  while (path = regex.exec(str || '')) {
    if (str[path.index] === '[') {
      result.push(path[2]);
    } else {
      result.push(path[1]);
    }
  }

  return result;
}

function getByPath(obj, path) {
  var parts = isArray(path) ? path : splitPath(path);
  var length = parts.length;

  for (var i = 0; i < length; i++) {
    if (typeof obj[parts[i]] === 'undefined') {
      return undefined;
    }

    obj = obj[parts[i]];
  }

  return obj;
}

var setOne = function setOne(obj, pathStr, value) {
  var path = splitPath(pathStr);
  var length = path.length;
  var lastIndex = length - 1;

  for (var index = 0; index < length; index++) {
    var prop = path[index]; // If we are not on the last index
    // we start building the data object from the path

    if (index !== lastIndex) {
      var objValue = obj[prop]; // If objValue exists, is not primitive and is not observable, then make it so using Vue.set

      if (objValue && _typeof(objValue) === 'object') {
        // eslint-disable-next-line no-prototype-builtins
        if (!objValue.hasOwnProperty('__ob__')) {
          Vue__default['default'].set(obj, prop, objValue);
        } // Array to object transformation
        // Check if parent path is an array, we are not on the last item
        // and the next key in the path is not a number


        if (isArray(objValue) && !isNumeric(path[index + 1])) {
          Vue__default['default'].set(obj, prop, {});
        }
      } else {
        // Create an empty object or an empty array based on the next path entry
        if (isNumeric(path[index + 1])) {
          Vue__default['default'].set(obj, prop, []);
        } else {
          Vue__default['default'].set(obj, prop, {});
        }
      }
    } else {
      // If we are on the last index then we just assign the the value to the data object
      // Note: If we used obj[prop] = value; arrays wouldn't be updated.
      Vue__default['default'].set(obj, prop, value);
    }

    obj = obj[prop];
  }
};

var setMany = function setMany(obj, path, value) {
  if (typeof path === 'string') {
    setOne(obj, path, value);
  } else if (isObject(path)) {
    for (var key in path) {
      setOne(obj, key, path[key]);
    }
  } else {
    throw Error('Arguments must be either string or object.');
  }
};

var deleteOne = function deleteOne(obj, pathStr) {
  var path = splitPath(pathStr);
  var prop = path.pop();
  Vue__default['default']["delete"](getByPath(obj, path), prop);
};

var deleteMany = function deleteMany(obj, path) {
  if (typeof path === 'string') {
    deleteOne(obj, path);
  } else if (isArray(path)) {
    path.forEach(function (item) {
      deleteOne(obj, item);
    });
  } else {
    throw Error('Arguments must be either string or array.');
  }
};

var ARRAY_METHODS = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

var createVuexPathStore = function createVuexPathStore(options) {
  var mutations = {
    set: function set(state, info) {
      var path = info.path,
          value = info.value;
      setMany(state, path, value);
    },
    toggle: function toggle(state, info) {
      var path = info.path;
      setOne(state, path, !getByPath(state, path));
    },
    "delete": function _delete(state, info) {
      var path = info.path;
      deleteMany(state, path);
    }
  };
  ARRAY_METHODS.forEach(function (method) {
    mutations[method] = function (state, info) {
      var path = info.path,
          args = info.args;
      var arr = getByPath(state, path);

      if (!isArray(arr)) {
        throw Error('Argument must be an array');
      }

      arr[method].apply(arr, _toConsumableArray(args));
    };
  });
  options.mutations = Object.assign({}, options.mutations || {}, mutations);
  var store = new Vuex__default['default'].Store(options);

  store.set = function (path, value) {
    store.commit('set', {
      path: path,
      value: value
    });
  };

  store.toggle = function (path) {
    store.commit('toggle', {
      path: path
    });
  };

  store["delete"] = function (path) {
    store.commit('delete', {
      path: path
    });
  };

  ARRAY_METHODS.forEach(function (method) {
    store[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var path = args.shift();
      store.commit(method, {
        path: path,
        args: args
      });
    };
  });
  return store;
};

exports.createVuexPathStore = createVuexPathStore;
