<template>
  <div>
    <div class="text-center">
      <h3 v-if="$s.state.message">{{ $s.state.message }}</h3>
      <small v-else>Message not set</small>
    </div>
    <div>
      <button
        class="btn btn-primary"
        @click="$s.set('state.message', 'Hello from component 2!')"
      >
        Set message
      </button>
    </div>
  </div>
</template>
