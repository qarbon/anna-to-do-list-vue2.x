<template>
  <div @click="closeModal" class="clickable">
    <mdicon name="close"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "ButtonClose",
  methods: {
    ...mapActions('task', ['hideModal']),
    closeModal() {
      this.hideModal({ vm: this, type: '' });
    }
  }
}
</script>
