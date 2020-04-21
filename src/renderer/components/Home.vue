/* eslint-disable */
<template>
  <div id="wrapper">
    <gesture-header></gesture-header>
    <main class="container">
        <div class="menu">
            <span v-for="(gesture, index) in gestureNames" :key="index">
                <p @click="selectGesture">{{ gesture }}</p>
                <br>
            </span>
            <p @click="addGesture">Add New Gesture +</p>
        </div>
        <div 
          class="gesture" 
          :name="curGesture.name" 
          :type="curGesture.type" 
          :description="curGesture.description"
          :script="curGesture.script"
          :shortcuts="shortcuts"
          @edit="editWindow"
          @add="add"
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
  export default {
    name: 'home',
    components: { GestureHeader, FixedHeader, SideNav, Gesture, Add },
    data () {
      return {
        electron: process.versions.electron,
        currentComponent: Gesture,
        componentArray: [GestureHeader, Gesture, Add],
        gestureNames: [ 'Exit Window', 'Open Google Chrome' ],
        shortcuts: ['exit_window.py', 'open_app.py'],
        gestures: {
          'Exit Window': {
            name: 'Exit Window',
            type: 'Hand',
            description: 'Closes the Current window',
            script: 'exit_window.py'
          },
          'Open Google Chrome': {
            name: 'Open Google Chrome',
            type: 'Hand',
            description: 'Opens Chrome',
            script: 'open_app.py'
          }
        },
        curGesture: {
          name: 'Exit Windowss',
          type: 'Hand',
          description: 'Closes the Current window',
          script: 'exit_window.py'
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
      },
      editWindow: function () {
        alert("c")
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

    #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100%;
    }

  .container {
      display: flex;
      font-family: sans-serif;
      font-size: 1.25rem;
      line-height: 150%;
      text-shadow: 0 2px 2px #b6701e;
  }

  .menu {
      background-color: #ff9e2c;
      height: 90vh;
      width: 20%;
      flex: 1;
      overflow-y: scroll;
      text-align: center;
  }
  
  .gesture {
      background-color: #b6701e;
      height: 90vh;
      width: 20%;
      flex: 2;
  }


</style>
