<template>
  <div class="select">
    <label class="select__label">{{ customLabel }}</label>
    <multiselect
        :value="value"
        :options="options"
        :multiple="false"
        :placeholder="placeholder"
        :label="label"
        :class="{ error: error }"
        :selectLabel="selectLabel"
        :selectedLabel="selectedLabel"
        :deselectLabel="deselectLabel"
        @input="handleChange"
        ref="select"
        :searchable="false"
        :allow-empty="false"
    >
    </multiselect>
    <div class="error__container">
      <span class="error__message" v-if="error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
export default {
  name: "Select",
  components: { Multiselect },
  props: {
    value: {
      default: null,
    },
    customLabel: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: 'label',
    },
    placeholder: {
      type: String,
      default: 'Select option',
    },
    error: {
      type: [Boolean, String, Number],
      default: false,
    },
    selectLabel: {
      type: String,
      default: '',
    },
    selectedLabel: {
      type: String,
      default: '',
    },
    deselectLabel: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value);
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
