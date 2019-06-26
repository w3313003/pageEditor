import Vue from 'vue'
import App from './App.vue'
import routes from './routes'
import store from './store'
import Router from 'vue-router'
Vue.use(Router)

const pageInfo = [
    {
        "name": "主页",
        "path": "/",
        "componentList": [
            {
                "name": "容器",
                "component": "z-Area",
                "container": true,
                "type": "base",
                "enableCustomTemplate": false,
                "id": "c4a88b0d-ab8a-8879-7282-56da49aa1962",
                "children": [
                    {
                        "name": "分隔符",
                        "component": "z-WhiteSpace",
                        "container": false,
                        "type": "base",
                        "enableCustomTemplate": true,
                        "id": "c6b18327-cab9-e121-bcd1-145a5d831a83",
                        "parentId": "c4a88b0d-ab8a-8879-7282-56da49aa1962",
                        "props": {
                            "height": "101",
                            "unit": "px",
                            "transparent": false,
                            "bgColor": "rgba(44,155,141,1)"
                        }
                    }
                ]
            }
        ]
    },
    {
        "name": "test",
        "path": "/test",
        "componentList": []
    }
]


Vue.config.productionTip = false;

Vue.mixin({
    beforeCreate() {
        Vue.util.defineReactive(this, '_pageInfo', pageInfo);
    }
});
const dynamicRoutes = pageInfo.map(page => (
    {
        path: page.path,
        name: page.name,
        meta: {
            title: page.name,
            pageInfo: page.componentList || []
        },
        component: () => import('./views/Wrap.vue')
    }
));

const router = new Router({
    routes: [...dynamicRoutes, ...routes]
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
