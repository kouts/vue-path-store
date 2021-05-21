## set

Sets one or many a reactive properties by using either `path, value` or a map of `path: value` pairs.
It will create intermediate objects and arrays depending on the type of the key (string or number) in the path.
`set` uses [Vue.set](https://vuejs.org/v2/api/#Vue-set) internally, ensuring that new properties are also reactive
and that view updates are triggered.

### Syntax

- `set(path, value)`
- `set(map)`

### Parameters

- `path (string)`: The path of the data we're changing, e.g.
  - user
  - user.name
  - user.friends[1] or user.friends.1
- `value (any)`: The value we're changing it to. It can be a primitive or an object (or array).
- `map (Object)`: A map of `path: value` pairs.

### Example
```js
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

Returns the value at `path`.

### Syntax

- `get(path)`

### Parameters

- `path (string)`: The path of the data to retrieve. If omitted, it returns the store's data.

### Returns

- `(any)`: Returns the data that exists at the given path, or the store's data if no path is given.  
 It returns `undefined` if no value is found at the given path, the path does not exist, or its invalid.

### Example
```js
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
// Will return 'baz'

$s.get('arr[1]')
// or
$s.get('arr.1')
// Will return 'test2'

$s.get('foo.qux')
// Will return undefined
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

## del

Deletes one or many object properties or array elements by using either `path, value` or an array of `path`s.
`del` uses [Vue.delete](https://vuejs.org/v2/api/#Vue-delete) internally, to ensure that the deletion triggers view updates.

### Syntax

- `del(path)`
- `del(array)`

### Parameters

- `path (string)`: The path of the data we're deleteing, e.g.
  - user.name
  - user.friends[1] or user.friends.1
- `map (Array)`: An array of `path`s to delete.

### Example
```js
$s.del('state.bar.baz')
// This will delete the state.bar.baz property

$s.del('state.bar.baz', 'state.qux'])
// Delete multiple properties by using an array of paths
```

## pop

Equivalent to `Array.pop`, removes an element from the end of the array at the given path.  
Only works on arrays.

### Syntax

- `pop(path)`

### Parameters

- `path (string)`: The path of the array to remove the element from, e.g. `list` or `order.items`.

### Returns

- `(any)`: Returns the removed array element.

### Example
```js
/*
Assuming the data inside store is
{
  arr: ['test1', 'test2']
}
*/

const removed = $s.pop('arr')
// This will remove the element element of the array.
// removed will now be 'test2'
```

## push

Equivalent to `Array.push`, appends one or more elements to the end of the array at the given path.  
Only works on arrays.

### Syntax

- `push(path, value[, ...valueN])`

### Parameters

- `path (string)`: The path of the array to insert the element to, e.g. `list` or `order.items`.
- `value (any)`: The value to append to the end of the array. One or more values may be supplied.

### Returns

- `(number)`: The new length property of the array upon which the method was called.

### Example
```js
/*
Assuming the data inside store is
{
  arr: ['test1', 'test2']
}
*/

$s.push('arr', 'test3', 'test4')
// This will append 'test3' and 'test4' to the arr array.
// arr will now be ['test1', 'test2', 'test3', 'test4']
```

## reverse

Equivalent to `Array.reverse`, reverses the array at the given path.  
Only works on arrays.

### Syntax

- `reverse(path)`

### Parameters

- `path (string)`: The path of the array to reverse, e.g. `list` or `order.items`.

### Returns

- `(Array)`: The reversed array.

### Example
```js
/*
Assuming the data inside store is
{
  arr: ['test1', 'test2', 'test3']
}
*/

$s.reverse('arr')
// arr will now be ['test3', 'test2', 'test1']
```

## shift

Equivalent to `Array.shift`, removes an element from the beginning of the array at the given path.  
Only works on arrays.

### Syntax

- `shift(path)`

### Parameters

- `path (string)`: The path of the array to remove the element from, e.g. `list` or `order.items`.

### Returns

- `(any)`: Returns the removed array element.

### Example
```js
/*
Assuming the data inside store is
{
  arr: ['test1', 'test2']
}
*/

const removed = $s.shift('arr')
// This will remove the first element from the array.
// removed will now be 'test1'
```

## sort

Equivalent to `Array.sort`, sorts the array at the given path.  
Only works on arrays.

### Syntax

- `sort(path[, compareFunction])`

### Parameters

- `path (string)`: The path of the array to sort, e.g. `list` or `order.items`.
- `compareFunction (Function)`: A function that defines the sort order.

### Returns

- `(Array)`: The sorted array.

### Example
```js
/*
Assuming the data inside store is
{
  arr: ['c', 'b', 'a', 'd', 'f' ]
}
*/

$s.sort('arr')
// arr will now be ['a', 'b', 'c', 'd', 'f']
```

## splice

Equivalent to `Array.splice`, removes or replaces existing elements and/or adds new elements in place at the given path.  
Only works on arrays.

### Syntax

- `splice(path, index, [removeCount[, add]])`

### Parameters

- `path (string)`: The path of the array to splice, e.g. `list` or `order.items`.
- `index (number)`:  The index at which to start the operation.
- `[removeCount] (number)`:  The number of elements to remove starting with the element at `index`.
This may be 0 if you don't want to remove any elements.
- `[add] (any)`:  Any elements to insert into the array starting at `index`.
There can be 0 or more elements passed to add to the array.

### Returns

- `(Array)`: An array containing the deleted elements.  
If no elements are removed, an empty array is returned.

### Example
```js
/*
Assuming the data inside store is
{
  arr: ['test1', 'test2', 'test3']
}
*/

const removed = $s.splice('arr', 0, 1)
// arr will now be ['test2', 'test3']
// removed will be ['test1']
```

## unshift

Equivalent to `Array.unshift`, adds one or more elements to the beginning of an array at the given path.  
Only works on arrays.

### Syntax

- `unshift(path, value[, ...valueN])`

### Parameters

- `path (string)`: The path of the array to add the element(s) to, e.g. `list` or `order.items`.
- `value (any)`: The value to prepend to the beginning of the array. One or more values may be supplied.

### Returns

- `(number)`: The new length property of the array upon which the method was called.

### Example
```js
/*
Assuming the data inside store is
{
  arr: ['test3', 'test4']
}
*/

$s.unshift('arr', 'test1', 'test2')
// arr will now be ['test1', 'test2', 'test3', 'test4']
```
