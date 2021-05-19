## set

Sets one or many a reactive properties by using either `path, value` or a map of `path: value` pairs.
It will create intermediate objects and arrays depending on the type of the key (string or number) in the path.

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

```js
// Example using PathStore inside an instance method as $s

$s.set('foo.bar.baz', 'New value')
// This will set obj.foo.bar.baz to 'New value'
// If intermediate objects don't exist 
// they will get automatically created

$s.set({
  'foo.bar.baz', 'New value',
  'qux': 'Another value'
})
// Use a map of path/values to set multiple properties
```