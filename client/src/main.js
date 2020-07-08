import Vue from 'vue'
import App from './App.vue'
import SocketIO from "socket.io-client";


Vue.config.productionTip = false

export const eventBus = new Vue();

export const socketIo = SocketIO("http://localhost:3000"); 

new Vue({
  render: h => h(App),
}).$mount('#app')
