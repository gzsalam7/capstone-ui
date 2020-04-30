<template>
    <div style="padding: 2%">
      <div class="content">
            <h2 style="font-weight: 600;">{{ name }}</h2>
            <h3 style="font-weight: 300;">Gesture Type</h3>
            <p>{{ type }}</p>
            <h3 style="font-weight: 300;">Description</h3>
            <p>{{ description }}</p>
            <h3>Action</h3>
            <p>{{ script }}</p>
            <b-button @click="runScript()"></b-button>
            <font-awesome-icon class="fa-lg" style="float: right; margin: 10px 10px 20px 0px;" icon="trash-alt" @click="deleteGesture"/>
            <font-awesome-icon class="fa-lg" style="float: right; margin: 10px 10px 20px 10px;" icon="edit" @click="editWindow" />
      </div>        
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
        var pyshell = new PythonShell('./src/shortcuts/playShortcut.py')
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
      deleteGesture() {
        this.$emit('deleteGesture', 1)
      }
    }
  }
</script>

<style scoped>
.content {
  margin: auto; 
  padding: 5%; 
  background-color: #eeeeee; 
  border-radius: 5px;
}
</style>