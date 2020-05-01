<template>
    <div style="padding: 2%">
        <div class="content">
        <!-- <form onsubmit="add()"> -->
            <p style="font-weight: 600">Add New Gesture</p>
            <p style="font-size: 15px; line-height: 1">To create a new gesture, you must first type in a name and description
                (*this is required*), then you can click Record New shortcut and follow
                the on screen instructions on the new terminal window that opens, then
                Record The Hand Gesture and follow the instructions on the new camera window
                then finally you can click Create Gesture to load the Gesture
            </p>
            <label for="name">Gesture Name</label> <b-form-input id="name" type="text" v-model="name"></b-form-input>
            <!-- <h2>Type:</h2> <select v-model="type"><option value="hand">Hand</option></select> -->
            <label for="description">Description</label><b-form-input id="description" type="text" v-model="description"></b-form-input>
            <label for="shortcut">Shortcut</label>
            <b-input-group>
            <b-button @click="newShortcut">Record New Shortcut</b-button>
            </b-input-group> <br>
            <b-button @click="recordNewGesture">Record The Hand Gesture</b-button><br><br>
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
            gesture: '04_new',
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
            var execFile = require('child_process').execFile;       
            execFile('python', ['.recordShortcut.py ', this.name]);
        },
        recordNewGesture() {
            var execFile = require('child_process').execFile;       
            execFile('python', ['./recordNewGesture.py']);
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