Vue.component('todo-options', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'removetodo\')">Remove</button>\
      <button v-on:click="$emit(\'seteditinfo\')">Edit</button>\
      </li>\
    ',
  props: ['title']
})

new Vue({
  el: '#app',
  data: {
    newTodoText: '',
    editIndex: -1,
    todos: [],
    nextTodoId: 0,
  },

  computed: {
    changeButtonText() {
        return this.editIndex === -1 ? 'add' : 'finish edition';
    }
  },

  mounted() {
    this.todos = JSON.parse(localStorage.getItem('access_todos')) || [];
    var ids = [];
    for (const todo of this.todos){
      ids.push(todo.id);
    }
    const aryMax = function (a, b) {return Math.max(a, b);}
    let maxId = ids.reduce(aryMax);
    this.nextTodoId = maxId + 1;
  },

  methods: {
    addOrSet () {
      if(this.editIndex === -1) {
        this.addNewTodo();
      } else {
        this.editTodo();
      }
      this.resetInfo();
      this.saveTodos();
    },
    addNewTodo() {
      this.todos.push(
        {
          id: this.nextTodoId++,
          title: this.newTodoText,
        });
    },
    editTodo() {
      this.todos.splice(this.editIndex, 1, {
        id: this.editIndex,
        title: this.newTodoText,
      });
    },
    setEditInfo(index) {
        this.editIndex = index;
        this.newTodoText = this.todos[index].title;
        this.$refs.editor.focus();
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('access_todos', JSON.stringify(this.todos));
    },
    resetInfo() {
      this.newTodoText = '';
      this.editIndex = -1;
    },
  },
})
