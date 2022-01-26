<template>
  <div>
    <div class="comment__data">
      <p class="bold comment__author">{{ comment.author }}</p>
      <p class="light">{{ time }}</p>
    </div>
    <p class="comment__text">{{ comment.text }}</p>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
    },
  },
  computed: {
    time() {
      const today = dayjs(this.comment.time).format("HH:mm");
      const is_today = dayjs().isSame(this.comment.time, 'day')
      return  is_today ? `today at ${today}` : this.comment.time;
    }
  }
}
</script>
