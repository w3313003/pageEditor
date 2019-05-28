import Vue from "vue";
import App from "./App.vue";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store';
import './register'
Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App)
}).$mount("#app");
