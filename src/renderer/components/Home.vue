/* eslint-disable */
<template>
  <div >
    <!-- <gesture-header></gesture-header> -->
    <main class="wrapper">
        <div class="menu">
            <div class="title"><p style="margin: auto;">Gesture Navigation</p></div>
            <div class="gestureList" v-for="(gesture, index) in gestures" :key="index">
                <p style="margin: 10px auto;" @click="selectGesture">{{ gesture.name }}</p>
            </div>
            <p class="addBtn" @click="addGesture">Add New Gesture +</p>
        </div>
        <div 
          class="gesture" 
          :name="curGesture.name" 
          :type="curGesture.type" 
          :description="curGesture.description"
          :shortcuts="shortcuts"
          @edit="editWindow"
          @add="add"
          @deleteGesture="deleteGesture"
          :is="currentComponent">
        </div>
    </main>
  </div>
</template>

<script>
  import GestureHeader from './GestureHeader.vue'
  import FixedHeader from 'vue-fixed-header'
  import SideNav from './SideNav.vue'
  import Gesture from './Gesture.vue'
  import Add from './Add.vue'
import { PythonShell } from "python-shell"
  import gestures from './gestures.json'
  export default {
    name: 'home',
    components: { GestureHeader, FixedHeader, SideNav, Gesture, Add },
    created() {
      var fs = require("fs");
      // var data = fs.readFileSync('src/shortcuts/name_shortcuts.txt');
      // this.shortcuts = data.toString().split("\n")
    },
    beforeUpdate() {
      this.recordGestures();
    },
    data () {
      return {
        electron: process.versions.electron,
        index: 0,
        currentComponent: Add,
        componentArray: [GestureHeader, Gesture, Add],
        gestureNames: [ 'Exit Window', 'Open Google Chrome' ],
        shortcuts: [],
        gestures: gestures,
        curGesture: {
          name: 'Exit Windowss',
          type: 'Hand',
          description: 'Closes the Current window',
          // script: 'exit_window.py'
        }
      }
    },
    methods: {
      selectGesture: function (event) {
        alert(event.target.textContent)
        this.currentComponent = Gesture
        for (const [key, value] of Object.entries(this.gestures)) {
          if (event.target.textContent === key) {
            console.log(this.gestures[key])
            this.curGesture = this.gestures[key]
          }
        }
      },
      addGesture: function () {
        this.currentComponent = Add
      },
      add: function (data) {
        let newGesture = {
          name: data.name,
          type: data.type,
          description: data.description
        }
        this.gestures[data.name] = newGesture
        this.gestureNames.push(data.name)
        this.curGesture = this.gestures[data.name]
        this.currentComponent = Gesture
        let json = JSON.stringify(this.gestures);
        var fs = require('fs');
        fs.writeFile('src/renderer/components/gestures.json', json, 'utf8')
      },
      editWindow: function () {
        alert("c")
      },
      deleteGesture: function () {
        console.log(this.gestures[this.curGesture.name])
        delete this.gestures[this.curGesture.name];
        let json = JSON.stringify(this.gestures);
        var fs = require('fs');
        fs.writeFile('src/renderer/components/gestures.json', json, 'utf8')
      },
      recordGestures: function () {
        let gesture = ""
        var pyshell = new PythonShell('./capstone/recordGestures.py')
          pyshell.on('message', function (message) {
          console.log(message);
          gesture = message;
          });
          pyshell.end(function (err) {
          if (err){
              console.log(process.cwd())
              throw err;
          };
          console.log('finished');
          var pyshell = new PythonShell('./capstone/playShortcut.py')
          });
      },
      playShortcut: function (gesture) {
        var pyshell = new PythonShell('./capstone/playShortcut.py')
      } 
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  .wrapper {
      display: flex;
      font-family: sans-serif;
      font-size: 1.25rem;
      line-height: 150%;
  }

  .menu {
      height: 100vh;
      flex: 1;
      /* overflow-y: scroll; */
      text-align: center;
      color: white;
      background-color: rgb(40,40,40);
      /* background: url('http://fc03.deviantart.net/fs71/i/2013/270/f/a/blurred_sea_by_thevirtualdragon-d6o4p2p.png') */
  }
  
  .gesture {
      background-color: white;
      height: 100vh;
      width: 20%;
      flex: 3;
  }

  .title {
    padding: 5%; 
    background-color: #2574a9;
    margin: auto;
  }

  .gestureList {
    border: 1px solid rgba(255,255,255,0.2);
    margin: auto;
    transition: 0.3s;
  }
  .gestureList:hover {
    background-color: teal;
  }

  .addBtn {
    font-weight: 600;
    padding-top: 10px;
    transition: 0.3s;
  }
  .addBtn:hover {
    background-color: teal;
  }



</style>
