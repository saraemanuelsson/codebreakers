import Vue from 'vue'
import App from './App.vue'
import SocketIO from "socket.io-client";
import {serverURL} from "@/serverURL.js"


Vue.config.productionTip = false

export const eventBus = new Vue();

export const socketIo = SocketIO(serverURL); 

new Vue({
  render: h => h(App),
}).$mount('#app')
