<template>
  <div class="textarea">
    <label for="textarea" v-if="label">{{label}}</label>
    <textarea
        :class="{error}"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="value"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        class="textarea-box"
        ref="textarea"
    >
    </textarea>
    <div class="error__container">
      <span class="error__message" v-if="error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: [Boolean, String, Number],
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    handleBlur() {
      this.$emit('blur');
    },
    handleFocus() {
      this.$emit('focus');
    },
  },
}
</script>
