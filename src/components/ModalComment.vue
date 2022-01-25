<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <div class="modal__header--text">
          <h1 class="modal__title">{{ single_task.title }}</h1>
          <p class="link clickable" @click="openModal">Edit task</p>
        </div>
        <ButtonClose/>
      </div>
      <div>{{ single_task.description }}</div>
      <div class="row">
        <p class="bold">
          Date:
          <span class="normal">
            {{ single_task.due_date }}
          </span>
        </p>
        <p class="bold">
          Priority:
          <span class="normal">
            {{ priority }}
          </span>
        </p>
      </div>
      <div v-if="comments.length" class="comment__content">
        <div v-for="(comment,index) in comments" :key="index">
          <Comment :comment="comment"/>
        </div>
      </div>
      <p v-else>No comment yet</p>
    </div>
    <div class="comment__box">
      <Input
          placeholder="Write a comment"
          v-model="text"
          class="comment__input"
      />
      <Button @click="addNewComment">Add comment</Button>
    </div>
  </div>
</template>

<script>
import ButtonClose from '@/components/ButtonClose';
import Comment from '@/components/Comment';
import { mapGetters, mapActions } from 'vuex';
import Button from '@/components/Button';
import Input from '@/components/Input';
import dayjs from 'dayjs';

export default {
  name: "ModalComment",
  components: { Input, Button, ButtonClose, Comment },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapGetters('task', ['single_task']),
    priority() {
      return this.single_task.priority ? this.single_task.priority.name : ''
    },
    comments() {
      return this.single_task.comments;
    }
  },
  methods: {
    ...mapActions('task', ['addComment', 'showModal']),
    addNewComment() {
      const time = dayjs().format("DD MMM YYYY HH:mm:ss");
      this.new_comment = {
        text: this.text,
        author: 'You',
        time: time
      };
      this.addComment({ vm: this, comment: this.new_comment });
      this.text = ""
    },
    openModal() {
      this.showModal({ vm: this, type: 'task', id: this.single_task.id });
    }
  }
}
</script>
