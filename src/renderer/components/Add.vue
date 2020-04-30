<template>
    <div style="padding: 2%">
        <div class="content">
        <!-- <form onsubmit="add()"> -->
            <label for="name">Gesture Name</label> <b-form-input id="name" type="text" v-model="name"></b-form-input>
            <!-- <h2>Type:</h2> <select v-model="type"><option value="hand">Hand</option></select> -->
            <label for="description">Description</label><b-form-input id="description" type="text" v-model="description"></b-form-input>
            <label for="shortcut">Shortcut</label>
            <b-input-group>
            <b-form-select v-model="script" id="shortcut" :options="shortcuts"></b-form-select>
            <b-button @click="newShortcut">Record New Shortcut</b-button>
            </b-input-group> <br>
            <b-button @click="runScript">Record The Hand Gesture</b-button><br><br>
            <b-button @click="add">Create Gesture</b-button>
        <!-- </form> -->
        </div>
    </div>
</template>

<script>
import { PythonShell } from "python-shell"
import { exec } from 'child_process'
import openTerminal from 'open-terminal';
import { shell } from 'electron'
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
        },
        getCommandLine() {
            switch (process.platform) { 
                case 'darwin' : return 'open';
                case 'win32' : return 'start';
                case 'win64' : return 'start';
                default : return 'xdg-open';
            }
    },
        newShortcut() {
            var sys = require('sys');
            var exec = require('child_process').exec;       
            exec(this.getCommandLine() + ' ' + './capstone/recordShortcut.py ' + this.name);
      },
    }
}
</script>

<style>
.content {
  margin: auto; 
  padding: 5%; 
  background-color: #eeeeee; 
  border-radius: 5px;
}
</style>