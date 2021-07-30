<template>
  <div id="app">
    <form v-on:submit.prevent="addOrSet">
      <label for="new-todo">Add a todo</label>
      <input
        v-model="newTodoText"
        ref="editor"
      >
      <button>{{ changeButtonText }}</button>
    </form>
    <ul>
      <li
        v-for="(todo, index) in todos"
        v-bind:key="todo.id">
      {{todo.title}}
        <span class="pull-right">
          <button v-on:click="removeTodo(index)">Remove</button>
          <button v-on:click="setEditInfo(index)">Edit</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  el: '#app',
  data: function () {
    return {
    newTodoText: '',
    editIndex: -1,
    todos: [],
    nextTodoId: 0
    }
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
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  max-width: 640px;
  margin: 0 auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}

button {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #0099e4;
  color: #fff;
  cursor: pointer;
}
</style>
