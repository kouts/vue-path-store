<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Add todo</h5>
      <input
        v-model="todo"
        type="text"
        class="form-control"
        @keyup.enter="$store.push('todos', {
          description: todo,
          active: false,
          completed: false
        }); todo = ''"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>