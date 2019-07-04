<template>
    <div class="toDoList">
        <h1>Список дел</h1>

        <!--Поле для текста задания-->
        <div class="input-group mb-3 col">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Задание</span>
            </div>
            <input
                    type="text"
                    class="form-control"
                    v-model.lazy="taskText"
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
                    v-model.lazy="taskTime"
            />
        </div>

        <!--Предупреждение о наличии незаполненых полей-->
        <div class="invalid-feedback mb-1">
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
                        <h5 class="card-title">Выполнить до {{ task.taskTime }}</h5>
                        <p class="card-text">{{ task.taskText }}</p>
                        <button class="btn btn-light" @click="deleteTask(index)">Удалить</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                taskText: '', //Сохранение значения поля с заданием
                taskTime: '', //Сохранение значения поля с временем
                tasks: [] //Список дел
            }
        },
        methods: {
            addTask: function() { //Добавление нового задания
                //Получаю доступ к преудпреждению
                let warningAlert = document.querySelector('.invalid-feedback');

                //Проверка на валидность
                if(this.taskText !== '' && this.taskTime !== '') {
                    //Объект с данными из полей
                    let resObj = {
                        taskText: this.taskText,
                        taskTime: this.taskTime
                    };
                    //Отправка копии объекта в массив с заданиями
                    this.tasks.push(Object.assign({}, resObj));
                    //Скрытие предупреждения
                    warningAlert.style.display = 'none';
                    //Очищаем значения полей
                    this.taskText = '';
                    this.taskTime = '';
                    //Записываем в localStorage новый массив
                    this.setItems();
                } else {
                    //В случае наличия незаполненых полей, выводим предупреждение
                    warningAlert.style.display = 'block';
                }
            },
            deleteTask: function(index) { //Удаление задания из массива
                //Удаление задания по индексу
                this.tasks.splice(index, 1);
                //Обновление массива в localStorage
                this.setItems();
            },
            loadFromLS: function() { //Получение массива из localStorage
                //В переменную tasks записываем либо полученный массив из localStorage
                //либо пустой массив, если ничего не найдено
                this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            },
            setItems: function() { //Сохранение массива в localStorage
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            }
        },
        created: function() {
            //Почему именно created?
            //Так как используя beforeCreate, невозможно обратится к переменным,
            //так как они ещё не были созданы. А при использовании created,
            //переменные внутри data уже созданы, и к ним можно обратится.

            //Функция для получения массива из localStorage
            this.loadFromLS();
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
        margin-top: -10px;
    }
</style>