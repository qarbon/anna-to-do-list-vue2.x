<template>
  <div>
    <p v-if="!task_list.length" class="task-list__empty">
      You do not have any tasks
      <span class="link clickable" @click="openModal">
        add a new task
      </span>
    </p>
    <div v-for="task in task_list" :key="task.id">
      <Task :task="task"/>
    </div>
  </div>
</template>

<script>

import Task from './Task.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "TaskList",
  components: {
    Task
  },
  computed: {
    ...mapGetters('task', ['task_list'])
  },
  methods: {
    ...mapActions('task', ['showModal']),
    openModal() {
      this.showModal({ vm: this, type: 'task' });
    }
  }
  // data() {
  //   return {
  //     tasks
  //   };
  // },
}
</script>
