const initialState = {
  modal_visible: false,
  modal_type: '',
  single_task: {},
  task_list: [],
};

const getters = {
  task_list: (state) => state.task_list,
  single_task: (state) => state.single_task,
  modal_visible: (state) => state.modal_visible,
  modal_type: (state) => state.modal_type,
};

const actions = {
  addTask({ commit }, { task }) {
    commit('ADD_TASK', task)
  },
  editTask({ commit }, { edited_task }) {
    commit('EDIT_TASK', edited_task)
  },
  showModal({ commit }, { type, id }) {
    commit('SET_MODAL_DATA', id);
    commit('SHOW_MODAL', true);
    commit('SET_MODAL_TYPE', type);
  },
  hideModal({ commit }, { type }) {
    commit('SHOW_MODAL', false);
    commit('SET_MODAL_TYPE', type);
    commit('CLEAR_MODAL_DATA');
  },
  addComment({ commit }, { comment }) {
    commit('ADD_COMMENT', {comment})
  },
  toggleTaskStatus({ commit }, { id }) {
    commit('CHANGE_TASK_STATUS', {id})
  }
};

const mutations = {
  ADD_TASK(state, task) {
    state.task_list = [...state.task_list, task]
  },
  EDIT_TASK(state, edited_task) {
    const tasks = [...state.task_list];
    const index = tasks.findIndex((el)=> el.id === edited_task.id);
    tasks[index] = {
      ...tasks[index],
      ...edited_task
    }
    state.task_list = tasks
  },
  CHANGE_TASK_STATUS(state, id) {
    const tasks = [...state.task_list];
    const index = tasks.findIndex((el)=> el.id === id.id);
    tasks[index] = {
      ...tasks[index],
      done: !tasks[index].done
    }
    state.task_list = tasks
  },
  SHOW_MODAL(state, modal_state) {
    state.modal_visible = modal_state;
  },
  SET_MODAL_TYPE(state, modal_type) {
    state.modal_type = modal_type;
  },
  SET_MODAL_DATA(state, id) {
    state.single_task = state.task_list.find((el) => el.id === id)
  },
  CLEAR_MODAL_DATA(state) {
    state.single_task = {};
  },
  ADD_COMMENT(state, comment) {
    const new_comment = comment.comment;
    state.single_task.comments = [...state.single_task.comments, new_comment];
  },
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
