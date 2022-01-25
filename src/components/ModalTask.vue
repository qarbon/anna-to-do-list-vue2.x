<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h1 class="modal__title">{{ title }}</h1>
        <ButtonClose/>
      </div>
      <Input
          v-model="form.title"
          label="Title *"
          @blur="() => validation('title')"
          :error="errors.title"
      />
      <TextArea
          v-model="form.description"
          label="Description"
      />
      <div class="date-inputs">
        <Input
            v-model="form.due_date.day"
            label="Set due date *"
            placeholder="DD"
            :max_length="2"
            class="input-day"
            @blur="() => validation('day')"
            :error="errors.day"
            :min="1"
            :max="31"
            type="number"
        />
        <Input
            v-model="form.due_date.month"
            placeholder="MM"
            :max_length="2"
            class="input-month"
            @blur="() => validation('month')"
            :error="errors.month"
            :min="1"
            :max="12"
            type="number"
        />
        <Input
            v-model="form.due_date.year"
            placeholder="YYYY"
            :max_length="4"
            class="input-year"
            @blur="() => validation('year')"
            :error="errors.year"
            type="number"
        />
      </div>
      <Select
          v-model="form.priority"
          label="name"
          :options="priorities"
          customLabel="Priority"
      />
      <TextArea
          v-model="form.comments.text"
          label="Comments"
          v-if="!edit"
      />
      <div class="modal__button">
        <Button @click="submitForm" :disabled="not_valid">
          {{ buttonText }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonClose from '@/components/ButtonClose';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { mapActions, mapGetters } from 'vuex';
import dayjs from 'dayjs';

const priorities = [
  {
    name: 'High',
    value: 0
  },
  {
    name: 'Medium',
    value: 1
  },
  {
    name: 'Low',
    value: 2
  },
]
export default {
  name: "ModalTask",
  components: { Select, Button, TextArea, Input, ButtonClose },
  data() {
    return {
      priorities,
      form: {
        id: null,
        title: '',
        description: '',
        due_date: {
          day: null,
          month: null,
          year: null
        },
        priority: 1,
        comments: []
      },
      edit: false,
      not_valid: true,
      errors: {
        title: false,
        day: false,
        month: false,
        year: false,
      }
    }
  },
  computed: {
    ...mapGetters('task', ['single_task', 'task_list']),
    title() {
      return this.edit ? 'Edit task' : 'New task';
    },
    buttonText() {
      return this.edit ? 'Save' : 'Add a new task';
    }
  },
  methods: {
    ...mapActions('task', ['addTask', 'hideModal', 'editTask']),
    validation(key){
      if(key === 'day' || key === 'month' || key === 'year') {
        this.errors[key] = this.form.due_date[key] === null;
      } else {
        this.errors[key] = this.form[key] === '';
      }
      if(Object.values(this.errors).every((v) => v === false) && this.form.due_date.day !== null) {
        this.not_valid = false
      } else {
        this.not_valid = true
      }
    },
    submitForm() {
      const time = dayjs().format("DD MMM YYYY HH:mm:ss");
      if(this.form.comments.text) {
        this.form = {
          ...this.form,
          due_date: `${this.form.due_date.day}/${this.form.due_date.month}/${this.form.due_date.year}`,
          comments: [{
            text: this.form.comments.text,
            author: 'You',
            time: time
          }]
        };
      } else {
        this.form = {
          ...this.form,
          due_date: `${this.form.due_date.day}/${this.form.due_date.month}/${this.form.due_date.year}`,
        };
      }

      if (!this.edit) {
        this.form = {
          ...this.form,
          id: this.task_list.length + 1
        }
      }
      this.edit ? this.editTask({ vm: this, edited_task: this.form }) : this.addTask({
        vm: this,
        task: this.form
      });
      this.hideModal({ vm: this, type: '' });
    }
  },
  mounted() {
    if (this.single_task) {
      this.edit = true;
      const date = this.single_task.due_date.split('/');
      const due_date = {
        day: date[0],
        month: date[1],
        year: date[2],
      }
      this.form = { ...this.single_task, due_date };
    }
  }
}
</script>
