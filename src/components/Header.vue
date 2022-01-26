<template>
  <div class="header">
    <h1 class="header__title">PawaTask</h1>
    <Button @click="openModal">Add a new task</Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue'

export default {
  name: 'Header',
  components: {
    Button
  },
  methods: {
    ...mapActions('task', ['showModal']),
    openModal() {
      this.showModal({ type: 'task' });
    }
  }
}
</script>
