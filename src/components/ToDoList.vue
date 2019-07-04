<template>
    <div class="wrapper">
        <div v-if="isLoad">
            <div class="d-flex justify-content-center mt-5">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        <div class="toDoList" v-else="">
            <h1>Список дел</h1>
            <!--Поле для текста задания-->
            <div class="input-group mb-3 col">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Задание</span>
                </div>
                <input
                        type="text"
                        class="form-control"
                        v-model.lazy="task.text"
                />
            </div>

            <!--Поле для времени-->
            <div class="input-group mb-3 col">
                <div class="input-group-prepend">
                    <span class="input-group-text">Время</span>
                </div>
                <input
                        type="time"
                        class="form-control"
                        v-model.lazy="task.time"
                />
            </div>

            <!--Предупреждение о наличии незаполненых полей-->
            <div class="invalid-feedback mb-1" v-if="emptyFields">
                Заполните все поля.
            </div>

            <!--Кнопка добавления нового задания-->
            <button class="btn btn-primary" @click="addTask">Добавить</button>

            <!--Список всех дел-->
            <ul class="list-group list-group-horizontal mt-3">
                <!--Шаблон задания-->
                <li class="list-group-item" v-for="(task, index) in tasks">
                    <div class="card text-white bg-success">
                        <div class="card-header">Задание №{{ index + 1 }}</div>
                        <div class="card-body">
                            <h5 class="card-title">Выполнить до {{ task.time }}</h5>
                            <p class="card-text">{{ task.text }}</p>
                            <button class="btn btn-light" @click="deleteTask(index)">Удалить</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoad: false,
                emptyFields: false,
                task: {
                    text: '', //Сохранение значения поля с заданием
                    time: '' //Сохранение значения поля с временем
                },
                tasks: [] //Список дел
            }
        },
        mounted: function() {
            //Функция для получения массива из localStorage
            this.loadFromLS();
            //Убрать лоадер
            this.isLoad = false;
        },
        methods: {
            addTask: function() { //Добавление нового задания
                //Проверка на валидность
                if(this.task.text !== '' && this.task.time !== '' && this.task.text.trim() !== '') {
                    //Отправка копии объекта в массив с заданиями
                    this.tasks.push({...this.task});
                    //Скрытие предупреждения
                    this.emptyFields = false;
                    //Очищаем значения полей
                    this.task.text = '';
                    this.task.time = '';
                    //Записываем в localStorage новый массив
                    this.setItems();
                } else {
                    //В случае наличия незаполненых полей, выводим предупреждение
                    this.emptyFields = true;
                }
            },
            deleteTask: function(index) { //Удаление задания из массива
                //Удаление задания по индексу
                this.tasks.splice(index, 1);
                //Обновление массива в localStorage
                this.setItems();
            },
            loadFromLS: function() { //Получение массива из localStorage
                //Запуск лоадера
                this.isLoad = true;
                //В переменную tasks записываем либо полученный массив из localStorage
                //либо пустой массив, если ничего не найдено
                this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            },
            setItems: function() { //Сохранение массива в localStorage
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            }
        }
    }
</script>

<style scoped>
    /*Правки стилей списка*/
    ul {
        max-height: 300px;
        max-width: 100%;
        overflow-x: auto;
    }
    /*Правки стилей элементов списка*/
    ul > li {
        width: 250px;
        border: none;
    }
    /*Правки стилей предупреждеия*/
    .invalid-feedback {
        display: block;
        margin-top: -10px;
    }
</style>