<template>
  <button :disabled="disabled" @click="handleClick" @keypress="keypress" class="button clickable">
    <div class="button-background"></div>
    <div class="button-content">
      <slot v-if="$slots.default"/>
      <span v-if="label">{{ label }}</span>
    </div>
  </button>
</template>

<script>
export default {
name: 'Button',
  props: {
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disable_keypress: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
    keypress(e) {
      if (!this.disable_keypress && e.code === 'Enter') {
        this.handleClick(e);
      }
    },
  },
}
</script>
