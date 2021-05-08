import Vue from 'vue';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
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
  var parts = splitPath(path);
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
          Vue.set(obj, prop, objValue);
        } // Array to object transformation
        // Check if parent path is an array, we are not on the last item
        // and the next key in the path is not a number


        if (isArray(objValue) && !isNumeric(path[index + 1])) {
          Vue.set(obj, prop, {});
        }
      } else {
        // Create an empty object or an empty array based on the next path entry
        if (isNumeric(path[index + 1])) {
          Vue.set(obj, prop, []);
        } else {
          Vue.set(obj, prop, {});
        }
      }
    } else {
      // If we are on the last index then we just assign the the value to the data object
      // Note: If we used obj[prop] = value; arrays wouldn't be updated.
      Vue.set(obj, prop, value);
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

var ARRAY_METHODS = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

var createPathStore = function createPathStore(state) {
  var store = Vue.observable(state);

  store.set = function (path, value) {
    setMany(store, path, value);
  };

  store.toggle = function (path) {
    setOne(store, path, !getByPath(store, path));
  };

  store.get = function (path) {
    return path ? getByPath(store, path) : store;
  };

  ARRAY_METHODS.forEach(function (method) {
    store[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var path = args.shift();
      var arr = getByPath(store, path);

      if (!isArray(arr)) {
        throw Error('Argument must be an array.');
      }

      arr[method].apply(arr, args);
    };
  });
  return store;
};

export { createPathStore };
