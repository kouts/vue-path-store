'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

var ARRAY_METHODS = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
  var regex = /([\w\s-]+)|\[([^\]]+)\]/g;
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
          Vue__default["default"].set(obj, prop, objValue);
        } // Array to object transformation
        // Check if parent path is an array, we are not on the last item
        // and the next key in the path is not a number


        if (isArray(objValue) && !isNumeric(path[index + 1])) {
          Vue__default["default"].set(obj, prop, {});
        }
      } else {
        // Create an empty object or an empty array based on the next path entry
        if (isNumeric(path[index + 1])) {
          Vue__default["default"].set(obj, prop, []);
        } else {
          Vue__default["default"].set(obj, prop, {});
        }
      }
    } else {
      // If we are on the last index then we just assign the the value to the data object
      // Note: If we used obj[prop] = value; arrays wouldn't be updated.
      Vue__default["default"].set(obj, prop, value);
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
  Vue__default["default"]["delete"](getByPath(obj, path), prop);
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

var pathStoreVuexPlugin = function pathStoreVuexPlugin(store) {
  var methods = _objectSpread2({
    set: function set(path, value) {
      store.commit('set', {
        path: path,
        value: value
      });
    },
    toggle: function toggle(path) {
      store.commit('toggle', {
        path: path
      });
    },
    get: function get(path) {
      return path ? getByPath(store.state, path) : store.state;
    },
    del: function del(path) {
      store.commit('del', {
        path: path
      });
    }
  }, ARRAY_METHODS.reduce(function (acc, method) {
    var fn = function fn() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var path = args.shift();
      return store.commit(method, {
        path: path,
        args: args
      });
    };

    return Object.assign(acc, _defineProperty({}, method, fn));
  }, {}));

  var mutations = _objectSpread2({
    set: function set(state, info) {
      var path = info.path,
          value = info.value;
      setMany(state, path, value);
    },
    toggle: function toggle(state, info) {
      var path = info.path;
      setOne(state, path, !getByPath(state, path));
    },
    del: function del(state, info) {
      var path = info.path;
      deleteMany(state, path);
    }
  }, ARRAY_METHODS.reduce(function (acc, method) {
    var fn = function fn(state, info) {
      var path = info.path,
          args = info.args;
      var arr = getByPath(state, path);

      if (!isArray(arr)) {
        throw Error('Argument must be an array.');
      }

      return arr[method].apply(arr, _toConsumableArray(args));
    };

    return Object.assign(acc, _defineProperty({}, method, fn));
  }, {}));

  var _loop = function _loop(type) {
    var entry = store._mutations[type] || (store._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      mutations[type].call(store, store.state, payload);
    });
  };

  for (var type in mutations) {
    _loop(type);
  }

  return Object.assign(store, methods);
};

exports.pathStoreVuexPlugin = pathStoreVuexPlugin;
