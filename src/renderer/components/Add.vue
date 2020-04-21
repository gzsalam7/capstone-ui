<template>
    <div>
        <!-- <form onsubmit="add()"> -->
            <h2>Name:</h2> <input type="text" v-model="name">
            <h2>Type:</h2> <select v-model="type"><option value="hand">Hand</option></select>
            <h2>Description:</h2> <input type="text" v-model="description">
            <h2>Action:</h2>
            <select v-model="script">
                <option v-for="shortcut in shortcuts" :value="shortcut">
                    {{ shortcut }}
                </option>
            </select>
            <button @click="add">add</button>
        <!-- </form> -->
    </div>
</template>

<script>
export default {
    name: "add",
    props: ['shortcuts'],
    data() {
        return {
            name: '',
            type: '',
            description: '',
            script: '',
        }
    },
    methods: {
        add: function () {
            this.$emit('add', this.$data)
        }
    }
}
</script>

<style>

</style>