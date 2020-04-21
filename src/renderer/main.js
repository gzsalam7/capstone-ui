import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { PythonShell } from "python-shell"

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

library.add(faUserSecret)
library.add(faTrashAlt, faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// PythonShell.runString('x=1+1;print("FUYCK")', null, function (err) {
//   if (err) throw err;
//   console.log('finished');
// });
// console.log(process.cwd())
// var pyshell = new PythonShell('./src/renderer/shortcut.py')
// pyshell.on('message', function (message) {
//   // received a message sent from the Python script (a simple "print" statement)
//   console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function (err) {
//   if (err){
//       throw err;
//   };

//   console.log('finished');
// });
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
