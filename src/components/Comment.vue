<template>
  <div>
    <div class="comment__data">
      <p class="bold comment__author">{{ comment.author }}</p>
      <p class="light">{{ comment.time }}</p>
    </div>
    <p class="comment__text">{{ comment.text }}</p>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
    },
  },
}
</script>
