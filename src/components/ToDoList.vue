<template>
    <div class="toDoList">
        <input type="text" v-model.lazy="taskText">
        <input type="time" v-model.lazy="taskTime">
        <button @click="addTask">Добавить</button>

        <ul>
            <li v-for="(task, index) in tasks">
                <div class="toDoList-item">
                    {{ task.taskText }} - {{ task.taskTime }}
                    <button @click="deleteTask(index)">Удалить</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                taskText: '',
                taskTime: '',
                tasks: []
            }
        },
        methods: {
            addTask: function() {
                if(this.taskText !== '' && this.taskTime !== '') {
                    let resObj = {
                        taskText: this.taskText,
                        taskTime: this.taskTime
                    };
                    this.tasks.push(Object.assign({}, resObj));
                }
                this.taskText = '';
                this.taskTime = '';
                this.setItems();
            },
            deleteTask: function(index) {
                this.tasks.splice(index, 1);
                this.setItems();
            },
            loadFromLS: function() {
                this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            },
            setItems: function() {
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            }
        },
        created: function() {
            this.loadFromLS();
        }
    }
</script>