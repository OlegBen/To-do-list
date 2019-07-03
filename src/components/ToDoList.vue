<template>
    <div class="toDoList">
        <input type="text" v-model.lazy="text">
        <input type="time" v-model.lazy="time">
        <button @click="addElement">Добавить</button>

        <ul>
            <li v-for="(elem, index) in arr">
                <div class="wrapper">
                    {{ index }}: {{ elem.text }} - {{ elem.time }}
                    <button @click="deleteElement(index)">Удалить</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: '',
                time: '',
                arr: []
            }
        },
        methods: {
            addElement: function() {
                if(this.text !== '' && this.time !== '') {
                    let resObj = {
                        text: this.text,
                        time: this.time
                    };
                    this.arr.push(Object.assign({}, resObj));
                }
                this.text = '';
                this.time = '';
            },
            deleteElement: function(index) {
                this.arr.splice(index,1);
            }
        }
    }
</script>