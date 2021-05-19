## set

Sets one or many a reactive properties by using either `path, value` or a map of `path: value` pairs.
It will create intermediate objects and arrays depending on the type of the key (string or number) in the path.
`set` uses [Vue.set](https://vuejs.org/v2/api/#Vue-set) internally, ensuring that new properties are also reactive.

### Syntax

- `set(path, value)`
- `set(map)`

### Parameters

- `path (string)`: The path of the data we're changing, e.g.
  - user
  - user.name
  - user.friends[1] or user.friends.1
- `value (any)`: The value we're changing it to. Can be a primitive or an object (or array).
- `map (Object)`: A map of `path: value` pairs.

### Example
```js
// Example using PathStore inside an instance method as $s

$s.set('state.bar.baz', 'New value')
// This will set state.bar.baz to 'New value'
// If intermediate objects don't exist 
// they will get automatically created

$s.set({
  'state.bar.baz', 'New value',
  'state.qux': 'Another value'
})
// Use a map of path/values to set multiple properties
```

## get

Returns the value at `path` or `undefined` if no value is found.

### Syntax

- `get(path)`

### Parameters

- `path (string)`: The path of the data to retrieve. If omitted, returns the store's data.

### Returns

- `(any)`: Returns the data that exists at the given path, or the store's data if no path is given.

### Example
```js
// Example using PathStore inside an instance method as $s
/*
Assuming the data inside store is
{
  state: {
    bar: 'baz'
  },
  arr: ['test1', 'test2']
}
*/

$s.get('state.bar')
// This will return 'baz'

$s.get('arr[1]')
// or
$s.get('arr.1')
// Will return 'test2'

$s.get('foo.qux')
// This will return undefined
```

## toggle

Toggles the given `path`.
In other words, if `foo` is truthy, then `toggle('foo')` will make it false, and vice-versa.

### Syntax

- `toggle(path)`

### Parameters

- `path (string)`:  The path to toggle the value of.

### Example
```js
// Example using PathStore inside an instance method as $s
/*
Assuming the data inside store is
{
  state: {
    bar: false
  }
}
*/
$s.toggle('state.bar')
// This will set state.bar to true
```