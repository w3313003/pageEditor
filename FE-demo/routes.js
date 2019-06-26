
export default [
    {
        path: "/404",
        component: () => import("./components/404.vue")
    },
    {
        path: "*",
        redirect: '/404'
    }
]