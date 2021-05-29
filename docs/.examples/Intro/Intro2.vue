<template>
  <div>
    <div class="text-center">
      <h3 v-if="$ps.state.message">{{ $ps.state.message }}</h3>
      <small v-else>Message not set</small>
    </div>
    <div>
      <button
        class="btn btn-primary"
        @click="$ps.set('state.message', 'Hello from component 2!')"
      >
        Set message
      </button>
    </div>
  </div>
</template>
