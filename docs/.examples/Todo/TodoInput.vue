<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Add todo</h5>
      <input
        v-model="todo"
        type="text"
        class="form-control"
        @keyup.enter="
          $store.push('todos', {
            description: todo,
            active: false,
            completed: false
          })
          todo = ''
        "
      />
    </div>
    <div class="card-footer">
      <template v-if="todosNumber && itemsLeft">
        {{ itemsLeft }} todo{{ itemsLeft > 1 ? 's' : '' }} left
      </template>
      <template v-if="todosNumber && !itemsLeft">
        All todos completed
      </template>
      <template v-if="!todosNumber"> Add a todo </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: ''
    }
  },
  computed: {
    itemsLeft() {
      return this.$store.get('todos').filter((item) => !item.completed).length
    },
    todosNumber() {
      return this.$store.get('todos').length
    }
  }
}
</script>
