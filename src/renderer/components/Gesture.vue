<template>
    <div>
        <h2>Gesture Name</h2> <br>
            <h4>{{ name }}</h4> <br>
            <h3>Gesture Type</h3> <br>
            <h4>{{ type }}</h4 > <br>
            <h3>Description</h3> <br>
            <p>{{ description }}</p>
            <h3>Action</h3>
            <p>{{ script }}</p>
            <button @click="runScript">Script</button>
            <button @click="record">RECORD</button>
            <font-awesome-icon icon="edit" @click="editWindow" />
            <font-awesome-icon icon="trash-alt" />
            
    </div>
</template>

<script>
import { PythonShell } from "python-shell"
  export default {
    name: 'gesture',
    props: ['name', 'type', 'description', 'script'],
    methods: {
      editWindow(event) {
        this.$emit('edit', 1)
      },
      record() {
        var pyshell = new PythonShell('./src/shortcuts/record.py')
        pyshell.on('message', function (message) {
          console.log(message);
        });
        pyshell.end(function (err) {
          if (err){
              console.log(process.cwd())
              throw err;
          };
          console.log('finished');
        });
      },
      runScript() {
        var pyshell = new PythonShell('./src/shortcuts/' + this.script)
        pyshell.on('message', function (message) {
          console.log(message);
        });
        pyshell.end(function (err) {
          if (err){
              console.log(process.cwd())
              throw err;
          };
          console.log('finished');
        });
      }
    }
  }
</script>