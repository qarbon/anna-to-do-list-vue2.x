<template>
  <div class="text-input">
    <label v-if="label" :for="id" class="label">
      {{label}}
    </label>
    <input
        :class="{ error: error }"
        class="input"
        :id="id"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        :maxlength="max_length"
        :max="max"
        :min="min"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @keydown="handleKeydown"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    max_length: {
      type: Number,
      default: 100,
    },
    type: {
      type: String,
      default: 'text',
    },
    error: {
      type: [Boolean, String, Number],
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  methods: {
    checkMinMax(e) {
      const value = +e.target.value;
      if (!(this.allowEmpty && !value)) {
        // eslint-disable-next-line no-nested-ternary
        e.target.value = value < this.min ? this.min : value > this.max ? this.max : value;
      }
      return +e.target.value;
    },
    handleInput(e) {
      this.$emit('input', this.type === 'number'
          ? this.checkMinMax(e)
          : e.target.value.trim());
    },
    handleBlur(e) {
      this.$emit('blur', e.target.value.trim());
    },
    handleFocus(e) {
      this.$emit('focus', e.target.value.trim());
    },
    handleKeydown(e) {
      this.$emit('keydown', e);
    },
  },
}
</script>
