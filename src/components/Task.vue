<template>
  <div class="task">
    <div class="task__content">
      <p class="task__title">{{task.title}}</p>
      <div class="task__date">
        <mdicon name="calendar-month"/>
        <p class="task__date--content">{{task.due_date}}</p>
      </div>
    </div>
    <div class="task__buttons">
      <Button @click="openCommentModal" class="task__button">
        <mdicon name="message-outline"/>
      </Button>
      <Button @click="openTaskModal" class="task__button">
        <mdicon name="pencil"/>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '@/components/Button';

export default {
  name: "Task",
  components: { Button },
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions('task', ['showModal']),
    openCommentModal() {
      this.showModal({ vm: this, type: 'comment', id: this.task.id });
    },
    openTaskModal() {
      this.showModal({ vm: this, type: 'task', id: this.task.id });
    }
  },
  computed: {
  }
}
</script>
