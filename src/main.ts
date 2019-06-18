/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Z·J <w3313003@163.com>                     +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/14 12:21:30 by Z·J               #+#    #+#             */
/*   Updated: 2019/05/28 17:28:18 by Z·J              ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


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
