import Utils from '../utils';

class TodoModel {
    constructor(key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    }
};

TodoModel.prototype.subscribe = function (onChange) {
    this.onChanges.push(onChange);
};

TodoModel.prototype.inform = function () {
    Utils.store(this.key, this.todos);
    console.log('inform: ', this.todos)
    const _todos = this.todos;
    this.onChanges.forEach(function (cb) { cb(_todos); });
};

TodoModel.prototype.addTodo = function (title) {
    this.todos = this.todos.concat({
        id: Utils.uuid(),
        title: title,
        completed: false
    });

    this.inform();
};

TodoModel.prototype.toggleAll = function (checked) {
    this.todos = this.todos.map(function (todo) {
        return Utils.extend({}, todo, { completed: checked });
    });

    this.inform();
};

TodoModel.prototype.toggle = function (todoToToggle) {
    this.todos = this.todos.map(function (todo) {
        return todo !== todoToToggle ?
            todo :
            Utils.extend({}, todo, { completed: !todo.completed });
    });

    this.inform();
};

TodoModel.prototype.destroy = function (todo) {
    this.todos = this.todos.filter(function (candidate) {
        return candidate !== todo;
    });

    this.inform();
};

TodoModel.prototype.save = function (todoToSave, text) {
    this.todos = this.todos.map(function (todo) {
        return todo !== todoToSave ? todo : Utils.extend({}, todo, { title: text });
    });

    this.inform();
};

TodoModel.prototype.clearCompleted = function () {
    this.todos = this.todos.filter(function (todo) {
        return !todo.completed;
    });

    this.inform();
};

export default TodoModel;