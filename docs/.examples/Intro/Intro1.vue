<template>
  <div>
    <div class="text-center">
      <div v-if="$s.state.message">{{ $s.state.message }}</div>
      <small v-else>Message not set</small>
    </div>
    <div>
      <button
        class="btn btn-primary"
        @click="$s.set('state.message', 'Hello from component 1!')"
      >
        Set message
      </button>
    </div>
  </div>
</template>
