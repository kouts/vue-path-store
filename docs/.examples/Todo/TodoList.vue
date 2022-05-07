<template>
  <div class="list-group">
    <div
      v-for="(todo, index) in $store.state.todos"
      :key="index"
      class="list-group-item d-flex"
    >
      <div :class="[todo.active ? 'w-100' : 'mr-auto']">
        <div v-if="!todo.active" class="d-flex">
          <div class="custom-control custom-checkbox mr-sm-2">
            <input
              :id="`check-${index}`"
              type="checkbox"
              class="custom-control-input"
              :checked="todo.completed"
              @input="$store.toggle(`todos.${index}.completed`)"
            />
            <label :for="`check-${index}`" class="custom-control-label">
              <span class="sr-only"></span>
            </label>
          </div>
          <div
            :class="[todo.completed && 'strike-through']"
            @click="setActive(index)"
          >
            {{ todo.description }}
          </div>
        </div>
        <input
          v-if="todo.active && !todo.completed"
          v-model="editingTodo"
          v-todo-focus="todo.active === true"
          type="text"
          class="form-control"
          @keyup.enter="onEnter(index)"
          @keyup.esc="$store.set(`todos.${index}.active`, false)"
        />
      </div>
      <div
        v-if="!todo.active"
        class="delete cursor-pointer"
        @click="$store.splice('todos', index, 1)"
      >
        delete
      </div>
    </div>
    <div v-if="!$store.state.todos.length" class="text-center">No todos</div>
  </div>
</template>

<script>
export default {
  directives: {
    'todo-focus': {
      inserted: function (el, binding) {
        setTimeout(() => {
          el.focus()
          el.select()
        }, 10)
      }
    }
  },
  data() {
    return {
      editingTodo: null
    }
  },
  methods: {
    setActive(index) {
      if (this.$store.get(`todos.${index}.completed`)) {
        return
      }
      const inactiveTodos = this.$store.get('todos').map((item) => {
        item.active = false

        return item
      })

      this.$store.set({
        todos: inactiveTodos,
        [`todos.${index}.active`]: true
      })
      this.editingTodo = this.$store.get(`todos.${index}.description`)
    },
    onEnter(index) {
      if (!this.editingTodo) {
        return
      }
      this.$store.set(`todos.${index}`, {
        description: this.editingTodo,
        active: false,
        completed: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.strike-through {
  text-decoration: line-through;
}

.list-group-item {
  .delete {
    display: none;
  }
  &:hover {
    .delete {
      display: block;
    }
  }
}
</style>
