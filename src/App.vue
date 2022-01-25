<template>
  <div id="app" class="content">
    <Header/>
    <TaskList/>
    <ModalTask v-if="isTaskModalOpen"/>
    <ModalComments v-if="isCommentModalOpen"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from './components/Header.vue'
import TaskList from './components/TaskList.vue'
import ModalTask from './components/ModalTask.vue'
import ModalComments from './components/ModalComment.vue'

export default {
  name: 'App',
  components: {
    Header,
    TaskList,
    ModalTask,
    ModalComments
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('task', ['modal_visible', 'modal_type']),
    isTaskModalOpen() {
      return this.modal_visible && this.modal_type === 'task';
    },
    isCommentModalOpen() {
      return this.modal_visible && this.modal_type === 'comment';
    }
  },
  methods: {
  }
}
</script>
